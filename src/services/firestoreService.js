/**
 * Firestore Service
 * 
 * Handles all Firestore database operations for:
 * - User profiles
 * - Skill analyses
 * - Admin aggregations
 */

import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * Save skill analysis result to Firestore
 * 
 * @param {string} userId - User ID
 * @param {object} analysisData - Analysis result from Gemini
 * @returns {Promise<string>} - Document ID of saved analysis
 */
export const saveAnalysis = async (userId, analysisData) => {
  try {
    const analysisRef = collection(db, 'skill_analysis');
    const docRef = await addDoc(analysisRef, {
      userId,
      career_role: analysisData.career_role,
      readiness_score: analysisData.readiness_score,
      matched_skills: analysisData.matched_skills,
      missing_skills: analysisData.missing_skills,
      recommended_skills: analysisData.recommended_skills,
      learning_roadmap: analysisData.learning_roadmap,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving analysis:', error);
    throw error;
  }
};

/**
 * Get the latest analysis for a user
 * 
 * @param {string} userId - User ID
 * @returns {Promise<object|null>} - Latest analysis or null
 */
export const getLatestAnalysis = async (userId) => {
  try {
    const analysisRef = collection(db, 'skill_analysis');
    const q = query(
      analysisRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(1)
    );
    
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return null;
    }
    
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error('Error fetching latest analysis:', error);
    return null;
  }
};

/**
 * Get all analyses for a user
 * 
 * @param {string} userId - User ID
 * @returns {Promise<object[]>} - Array of analyses
 */
export const getUserAnalyses = async (userId) => {
  try {
    const analysisRef = collection(db, 'skill_analysis');
    const q = query(
      analysisRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching user analyses:', error);
    return [];
  }
};

/**
 * Admin: Get all analyses for campus-wide insights
 * 
 * @returns {Promise<object[]>} - All analyses
 */
export const getAllAnalyses = async () => {
  try {
    const analysisRef = collection(db, 'skill_analysis');
    const q = query(analysisRef, orderBy('createdAt', 'desc'));
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching all analyses:', error);
    return [];
  }
};

/**
 * Admin: Get aggregated campus analytics
 * 
 * @returns {Promise<object>} - Aggregated analytics data
 */
export const getCampusAnalytics = async () => {
  try {
    const analyses = await getAllAnalyses();
    
    if (analyses.length === 0) {
      return {
        totalStudents: 0,
        averageReadiness: 0,
        topMissingSkills: [],
        roleWiseStats: {}
      };
    }

    // Calculate total students analyzed
    const uniqueUsers = new Set(analyses.map(a => a.userId));
    const totalStudents = uniqueUsers.size;

    // Calculate average readiness score
    const totalScore = analyses.reduce((sum, a) => sum + (a.readiness_score || 0), 0);
    const averageReadiness = Math.round(totalScore / analyses.length);

    // Calculate most missing skills
    const skillCount = {};
    analyses.forEach(analysis => {
      (analysis.missing_skills || []).forEach(skill => {
        skillCount[skill] = (skillCount[skill] || 0) + 1;
      });
    });

    const topMissingSkills = Object.entries(skillCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([skill, count]) => ({ skill, count }));

    // Calculate role-wise statistics
    const roleStats = {};
    analyses.forEach(analysis => {
      const role = analysis.career_role || 'Unknown';
      if (!roleStats[role]) {
        roleStats[role] = { totalScore: 0, count: 0 };
      }
      roleStats[role].totalScore += analysis.readiness_score || 0;
      roleStats[role].count += 1;
    });

    const roleWiseStats = Object.entries(roleStats).map(([role, stats]) => ({
      role,
      averageScore: Math.round(stats.totalScore / stats.count),
      studentCount: stats.count
    }));

    return {
      totalStudents,
      averageReadiness,
      topMissingSkills,
      roleWiseStats
    };
  } catch (error) {
    console.error('Error calculating campus analytics:', error);
    return {
      totalStudents: 0,
      averageReadiness: 0,
      topMissingSkills: [],
      roleWiseStats: []
    };
  }
};

/**
 * Get all students (for admin view)
 * 
 * @returns {Promise<object[]>} - Array of student profiles
 */
export const getAllStudents = async () => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('role', '==', 'student'));
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching students:', error);
    return [];
  }
};

export default {
  saveAnalysis,
  getLatestAnalysis,
  getUserAnalyses,
  getAllAnalyses,
  getCampusAnalytics,
  getAllStudents
};
