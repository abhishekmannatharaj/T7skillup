/**
 * Student Dashboard - Sleek Black & Grey Theme with Images
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { analyzeT7skillup } from '../../services/geminiService';
import { saveAnalysis, getLatestAnalysis } from '../../services/firestoreService';
import { industryRoles, allSkills, branches, years } from '../../data/industrySkills';
import {
  LogOut,
  Search,
  X,
  Loader2,
  ChevronDown,
  ArrowRight,
  Check,
  Briefcase,
  GraduationCap,
  Sparkles,
  Rocket,
  Target,
  TrendingUp,
  Zap,
  Star
} from 'lucide-react';
import ChatbotWidget from '../Chatbot/ChatbotWidget';

const StudentDashboard = () => {
  const { currentUser, userProfile, updateUserProfile, logout } = useAuth();
  const navigate = useNavigate();

  // Form state
  const [branch, setBranch] = useState(userProfile?.branch || '');
  const [year, setYear] = useState(userProfile?.year || '');
  const [selectedSkills, setSelectedSkills] = useState(userProfile?.skills || []);
  const [careerInterest, setCareerInterest] = useState(userProfile?.career_interest || '');

  // UI state
  const [skillSearch, setSkillSearch] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [lastAnalysis, setLastAnalysis] = useState(null);

  useEffect(() => {
    const loadLastAnalysis = async () => {
      if (currentUser) {
        const analysis = await getLatestAnalysis(currentUser.uid);
        setLastAnalysis(analysis);
      }
    };
    loadLastAnalysis();
  }, [currentUser]);

  const filteredSkills = allSkills.filter(skill =>
    skill.toLowerCase().includes(skillSearch.toLowerCase())
  );

  const toggleSkill = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleAnalyze = async () => {
    setError('');

    if (!branch || !year || selectedSkills.length === 0 || !careerInterest) {
      setError('Please complete all fields before analyzing');
      return;
    }

    setAnalyzing(true);

    try {
      await updateUserProfile(currentUser.uid, {
        branch,
        year: parseInt(year),
        skills: selectedSkills,
        career_interest: careerInterest
      });

      const selectedRole = industryRoles.find(r => r.id === careerInterest);

      const analysisResult = await analyzeT7skillup(
        selectedSkills,
        selectedRole,
        industryRoles
      );

      await saveAnalysis(currentUser.uid, {
        career_role: selectedRole.role_name,
        ...analysisResult
      });

      navigate('/results', { state: { analysis: analysisResult, role: selectedRole } });
    } catch (err) {
      console.error('Analysis error:', err);
      setError('Analysis failed. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  const viewPreviousResults = () => {
    if (lastAnalysis) {
      const role = industryRoles.find(r => r.role_name === lastAnalysis.career_role);
      navigate('/results', { state: { analysis: lastAnalysis, role } });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-zinc-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-zinc-900 text-lg">T7skillup</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-zinc-900">{userProfile?.name}</p>
              <p className="text-xs text-zinc-500">{userProfile?.email}</p>
            </div>
            <button
              onClick={logout}
              className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-zinc-900 mb-2 flex items-center gap-3">
              Hey, {userProfile?.name?.split(' ')[0]}!
              <span className="text-3xl">👋</span>
            </h1>
            <p className="text-zinc-600 text-lg">Let's analyze your placement readiness</p>
          </div>

          {/* Quick stats */}
          <div className="flex gap-4">
            <div className="px-4 py-3 bg-white rounded-xl border border-zinc-200 shadow-sm">
              <div className="flex items-center gap-2 text-zinc-500 mb-1">
                <Target className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase">Skills</span>
              </div>
              <p className="text-2xl font-black text-zinc-900">{selectedSkills.length}</p>
            </div>
            <div className="px-4 py-3 bg-white rounded-xl border border-zinc-200 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-600 mb-1">
                <Star className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase">Ready</span>
              </div>
              <p className="text-2xl font-black text-zinc-900">{lastAnalysis?.readiness_score || '—'}%</p>
            </div>
          </div>
        </div>

        {/* Previous Analysis Banner */}
        {lastAnalysis && (
          <div className="mb-6 p-5 bg-zinc-900 rounded-2xl shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <span className="text-2xl font-black text-white">{lastAnalysis.readiness_score}%</span>
              </div>
              <div>
                <p className="font-bold text-white text-lg">Previous analysis ready! 🎉</p>
                <p className="text-zinc-400">{lastAnalysis.career_role}</p>
              </div>
            </div>
            <button
              onClick={viewPreviousResults}
              className="px-5 py-2.5 bg-white text-zinc-900 font-bold rounded-xl hover:bg-zinc-100 transition-all flex items-center gap-2"
            >
              View results
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-100 rounded-xl text-red-700 font-medium">
            ⚠️ {error}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Profile & Career */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-zinc-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-zinc-900 text-lg">Your Profile</h2>
                  <p className="text-sm text-zinc-500">Academic details</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-2">Branch</label>
                  <div className="relative">
                    <select
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-50 border-2 border-zinc-200 rounded-xl appearance-none focus:border-zinc-900 outline-none text-zinc-900 font-medium"
                    >
                      <option value="">Select branch</option>
                      {branches.map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-2">Year</label>
                  <div className="grid grid-cols-4 gap-2">
                    {years.map(y => (
                      <button
                        key={y}
                        type="button"
                        onClick={() => setYear(y)}
                        className={`py-3 text-sm font-bold rounded-xl transition-all ${year === y
                            ? 'bg-zinc-900 text-white shadow-lg'
                            : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                          }`}
                      >
                        {y}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Career Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-zinc-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-zinc-900 text-lg">Dream Career</h2>
                  <p className="text-sm text-zinc-500">Pick your target role</p>
                </div>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-2">
                {industryRoles.map(role => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setCareerInterest(role.id)}
                    className={`w-full p-4 rounded-xl text-left transition-all flex items-center justify-between ${careerInterest === role.id
                        ? 'bg-zinc-900 text-white shadow-lg'
                        : 'bg-zinc-50 text-zinc-700 hover:bg-zinc-100 border border-zinc-100'
                      }`}
                  >
                    <div>
                      <p className="font-bold">{role.role_name}</p>
                      <p className={`text-sm mt-0.5 ${careerInterest === role.id ? 'text-zinc-400' : 'text-zinc-500'}`}>
                        {role.required_skills.length} skills required
                      </p>
                    </div>
                    {careerInterest === role.id && (
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Skills */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-zinc-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-zinc-900 text-lg">Your Skills</h2>
                    <p className="text-sm text-zinc-500">
                      <span className="text-zinc-900 font-bold">{selectedSkills.length}</span> selected
                    </p>
                  </div>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop"
                  alt=""
                  className="w-14 h-14 rounded-xl object-cover hidden sm:block"
                />
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type="text"
                  value={skillSearch}
                  onChange={(e) => setSkillSearch(e.target.value)}
                  placeholder="Search skills..."
                  className="w-full pl-12 pr-4 py-3.5 bg-zinc-50 border-2 border-zinc-200 rounded-xl focus:bg-white focus:border-zinc-900 outline-none text-zinc-900 font-medium placeholder:text-zinc-400"
                />
              </div>

              {/* Selected Skills */}
              {selectedSkills.length > 0 && (
                <div className="mb-4 pb-4 border-b-2 border-zinc-100">
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">✨ Selected Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkills.map(skill => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-xl text-sm font-semibold"
                      >
                        {skill}
                        <button
                          onClick={() => toggleSkill(skill)}
                          className="hover:bg-white/20 rounded-full p-0.5"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* All Skills */}
              <div className="max-h-56 overflow-y-auto">
                <div className="flex flex-wrap gap-2">
                  {filteredSkills.map(skill => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      disabled={selectedSkills.includes(skill)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${selectedSkills.includes(skill)
                          ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                          : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-900 hover:text-white'
                        }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Analyze Button */}
              <div className="mt-6 pt-6 border-t-2 border-zinc-100">
                <button
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className="w-full py-4 bg-zinc-900 text-white font-bold rounded-xl hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-900/20 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-3 text-lg"
                >
                  {analyzing ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Analyzing with AI...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-6 h-6" />
                      Analyze my skills
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
                <p className="text-center text-sm text-zinc-500 mt-4 flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Powered by Google Gemini AI
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
