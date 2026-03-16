/**
 * Authentication Context
 * 
 * Provides authentication state and methods throughout the app.
 * Handles Firebase Auth and user role management.
 */

import { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up with email and password
  const signup = async (email, password, name, role = 'student') => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Create user profile in Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      name,
      email,
      role,
      branch: '',
      year: null,
      career_interest: '',
      skills: [],
      createdAt: serverTimestamp()
    });

    return userCredential.user;
  };

  // Sign in with email and password
  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  };

  // Sign out
  const logout = async () => {
    await signOut(auth);
    setUserProfile(null);
  };

  // Fetch user profile from Firestore
  const fetchUserProfile = async (uid) => {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() };
    }
    return null;
  };

  // Update user profile
  const updateUserProfile = async (uid, data) => {
    await setDoc(doc(db, 'users', uid), data, { merge: true });
    const updatedProfile = await fetchUserProfile(uid);
    setUserProfile(updatedProfile);
    return updatedProfile;
  };

  // Listen for auth state changes
  useEffect(() => {
    let unsubscribe;
    
    try {
      unsubscribe = onAuthStateChanged(auth, async (user) => {
        setCurrentUser(user);
        
        if (user) {
          try {
            const profile = await fetchUserProfile(user.uid);
            setUserProfile(profile);
          } catch (err) {
            console.error('Error fetching user profile:', err);
          }
        } else {
          setUserProfile(null);
        }
        
        setLoading(false);
      }, (error) => {
        console.error('Auth state error:', error);
        setLoading(false);
      });
    } catch (error) {
      console.error('Firebase initialization error:', error);
      setLoading(false);
    }

    return () => unsubscribe && unsubscribe();
  }, []);

  const value = {
    currentUser,
    userProfile,
    loading,
    signup,
    login,
    logout,
    updateUserProfile,
    isAdmin: userProfile?.role === 'admin',
    isStudent: userProfile?.role === 'student'
  };

  // Show loading spinner while initializing
  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
