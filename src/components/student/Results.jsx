/**
 * Results Page - Robust Detailed Roadmap Display
 * Handles multiple data formats from Gemini AI
 */

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LogOut, ArrowLeft, Check, Calendar, ChevronDown, Download, Target, Sparkles,
  Trophy, Rocket, BookOpen, Zap, Clock, Code, ExternalLink, CheckCircle,
  GraduationCap, Briefcase, Play, AlertTriangle, Linkedin, FileText,
  Youtube, Globe, TrendingUp, Award
} from 'lucide-react';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userProfile, logout } = useAuth();
  const [expandedMonth, setExpandedMonth] = useState(0);
  const [activeTab, setActiveTab] = useState('roadmap');
  
  const { analysis, role } = location.state || {};

  if (!analysis) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-zinc-100">
          <div className="text-6xl mb-4">🤔</div>
          <p className="text-zinc-700 mb-4 font-medium">No analysis data found</p>
          <button onClick={() => navigate('/dashboard')} className="px-6 py-3 bg-zinc-900 text-white font-bold rounded-xl shadow-lg">
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Extract data with fallbacks for different formats
  const readiness_score = analysis.readiness_score || 0;
  const score_breakdown = analysis.score_breakdown || {};
  const honest_assessment = analysis.honest_assessment || '';
  const matched_skills = analysis.matched_skills || [];
  const missing_skills = analysis.missing_skills || [];
  const skill_priority_order = analysis.skill_priority_order || analysis.recommended_skills || [];
  const learning_roadmap = analysis.learning_roadmap || [];
  const quick_wins = analysis.quick_wins || [];
  const resume_tips = analysis.resume_tips || [];
  const linkedin_tips = analysis.linkedin_tips || [];
  const motivation = analysis.motivation || '';
  const final_outcome = analysis.final_outcome || analysis.final_goal || '';

  const getScoreColor = (score) => {
    if (score >= 70) return 'text-emerald-500';
    if (score >= 50) return 'text-amber-500';
    return 'text-red-500';
  };

  // Helper to generate roadmap.sh links for skills
  const getRoadmapLink = (skill) => {
    const skillMap = {
      'react': 'react',
      'reactjs': 'react',
      'react.js': 'react',
      'javascript': 'javascript',
      'js': 'javascript',
      'typescript': 'typescript',
      'ts': 'typescript',
      'python': 'python',
      'java': 'java',
      'node': 'nodejs',
      'nodejs': 'nodejs',
      'node.js': 'nodejs',
      'express': 'nodejs',
      'angular': 'angular',
      'vue': 'vue',
      'vuejs': 'vue',
      'vue.js': 'vue',
      'frontend': 'frontend',
      'backend': 'backend',
      'full stack': 'full-stack',
      'fullstack': 'full-stack',
      'devops': 'devops',
      'docker': 'docker',
      'kubernetes': 'kubernetes',
      'k8s': 'kubernetes',
      'aws': 'aws',
      'mongodb': 'mongodb',
      'sql': 'sql',
      'postgresql': 'postgresql',
      'postgres': 'postgresql',
      'mysql': 'sql',
      'graphql': 'graphql',
      'git': 'git-github',
      'github': 'git-github',
      'android': 'android',
      'flutter': 'flutter',
      'react native': 'react-native',
      'machine learning': 'mlops',
      'ml': 'mlops',
      'data science': 'data-analyst',
      'data analyst': 'data-analyst',
      'cyber security': 'cyber-security',
      'blockchain': 'blockchain',
      'golang': 'golang',
      'go': 'golang',
      'rust': 'rust',
      'c++': 'cpp',
      'cpp': 'cpp',
      'system design': 'system-design',
      'software architecture': 'software-architect',
      'dsa': 'datastructures-and-algorithms',
      'data structures': 'datastructures-and-algorithms',
      'algorithms': 'datastructures-and-algorithms',
      'api': 'api-design',
      'rest api': 'api-design',
      'linux': 'linux',
      'computer science': 'computer-science',
      'ai': 'ai-engineer'
    };
    
    const normalizedSkill = skill.toLowerCase().trim();
    const roadmapPath = skillMap[normalizedSkill];
    if (roadmapPath) {
      return `https://roadmap.sh/${roadmapPath}`;
    }
    // Try partial match
    for (const [key, value] of Object.entries(skillMap)) {
      if (normalizedSkill.includes(key) || key.includes(normalizedSkill)) {
        return `https://roadmap.sh/${value}`;
      }
    }
    return null;
  };

  // Helper to safely render resources (handles both string and object formats)
  const renderResource = (resource, index) => {
    if (typeof resource === 'string') {
      return (
        <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <ExternalLink className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="font-medium text-blue-800 text-base">{resource}</p>
        </div>
      );
    }
    return (
      <div key={index} className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-100">
        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
          {resource.type?.toLowerCase().includes('youtube') ? (
            <Youtube className="w-6 h-6 text-red-600" />
          ) : (
            <Globe className="w-6 h-6 text-red-600" />
          )}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-zinc-900 text-base">{resource.name}</p>
          {resource.type && <p className="text-sm text-zinc-500">{resource.type}</p>}
          {resource.url && <p className="text-sm text-blue-600 truncate">{resource.url}</p>}
          {resource.why && <p className="text-sm text-red-600 mt-1">💡 {resource.why}</p>}
          {resource.how_to_use && <p className="text-sm text-zinc-600 mt-1">📝 {resource.how_to_use}</p>}
        </div>
      </div>
    );
  };

  // Helper to safely render projects
  const renderProject = (project, index) => {
    if (typeof project === 'string') {
      return (
        <div key={index} className="p-5 bg-purple-50 rounded-xl border border-purple-100">
          <h5 className="font-bold text-purple-800 text-lg">🛠️ {project}</h5>
        </div>
      );
    }
    return (
      <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100 mb-4">
        <h5 className="font-bold text-purple-900 text-xl mb-3">🛠️ {project.name}</h5>
        {project.description && <p className="text-purple-800 text-base mb-4">{project.description}</p>}
        
        {project.features?.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-semibold text-purple-600 mb-2">FEATURES:</p>
            <div className="flex flex-wrap gap-2">
              {project.features.map((f, j) => (
                <span key={j} className="text-sm bg-white text-purple-700 px-3 py-1.5 rounded border border-purple-200">{f}</span>
              ))}
            </div>
          </div>
        )}

        {project.tech_stack?.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-semibold text-purple-600 mb-2">TECH STACK:</p>
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.map((t, j) => (
                <span key={j} className="text-sm bg-purple-900 text-white px-3 py-1.5 rounded font-medium">{t}</span>
              ))}
            </div>
          </div>
        )}

        {project.skills_practiced?.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-purple-600 mb-1">SKILLS PRACTICED:</p>
            <div className="flex flex-wrap gap-1">
              {project.skills_practiced.map((s, j) => (
                <span key={j} className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded">{s}</span>
              ))}
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-2 text-xs">
          {project.time_required && (
            <div className="bg-white rounded-lg p-2 border border-purple-100">
              <span className="text-purple-600">⏱️ Time:</span> {project.time_required}
            </div>
          )}
          {project.deploy_on && (
            <div className="bg-white rounded-lg p-2 border border-purple-100">
              <span className="text-purple-600">🚀 Deploy:</span> {project.deploy_on}
            </div>
          )}
        </div>

        {project.github_tips && <p className="text-xs text-purple-700 mt-2">📁 {project.github_tips}</p>}

        {project.interview_talking_points?.length > 0 && (
          <div className="mt-3 bg-white rounded-lg p-3 border border-purple-100">
            <p className="text-xs font-semibold text-purple-600 mb-1">🎤 INTERVIEW TALKING POINTS:</p>
            <ul className="space-y-1">
              {project.interview_talking_points.map((point, j) => (
                <li key={j} className="text-xs text-zinc-600 flex items-start gap-1">
                  <span>•</span> {point}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  // Helper to render week content
  const renderWeek = (week, index) => {
    const weekLabel = typeof week.week === 'number' ? `Week ${week.week}` : week.week;
    const theme = week.theme || week.topic || '';
    const tasks = week.daily_tasks || week.tasks || [];

    return (
      <div key={index} className="bg-zinc-50 rounded-xl p-5 border border-zinc-100">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-4 py-1.5 bg-zinc-900 text-white text-base font-bold rounded-lg">{weekLabel}</span>
          {theme && <span className="font-semibold text-zinc-800 text-lg">{theme}</span>}
        </div>
        
        {/* Daily Tasks - handles both formats */}
        {tasks.length > 0 && (
          <div className="space-y-2 mb-4">
            {tasks.map((task, j) => {
              if (typeof task === 'string') {
                return (
                  <div key={j} className="flex items-start gap-2 text-base text-zinc-700">
                    <Play className="w-4 h-4 mt-1 text-zinc-400 flex-shrink-0" />
                    {task}
                  </div>
                );
              }
              return (
                <div key={j} className="flex items-center gap-3 bg-white rounded-lg p-3 border border-zinc-100">
                  <span className="text-sm font-bold text-zinc-500 w-16">{task.day}</span>
                  <span className="flex-1 text-base text-zinc-700">{task.task}</span>
                  {task.duration && <span className="text-sm text-zinc-400">{task.duration}</span>}
                </div>
              );
            })}
          </div>
        )}

        {/* Coding Problems */}
        {week.coding_problems && (
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-100 mt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-purple-800 text-base flex items-center gap-2">
                <Code className="w-5 h-5" /> Coding Practice
              </span>
              <span className="text-sm bg-purple-200 text-purple-800 px-3 py-1 rounded font-medium">
                {week.coding_problems.count} problems • {week.coding_problems.difficulty}
              </span>
            </div>
            {week.coding_problems.topics?.length > 0 && (
              <p className="text-sm text-purple-600 mb-3">Topics: {week.coding_problems.topics.join(', ')}</p>
            )}
            {week.coding_problems.must_solve?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {week.coding_problems.must_solve.map((prob, k) => (
                  <span key={k} className="text-sm bg-white text-purple-700 px-3 py-1.5 rounded border border-purple-200">{prob}</span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Checkpoint */}
        {week.checkpoint && (
          <div className="mt-4 flex items-start gap-2 text-base">
            <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
            <span className="text-emerald-700 font-medium">{week.checkpoint}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-zinc-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-18 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/dashboard')} className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-zinc-900 text-xl">Your Placement Roadmap</span>
                <p className="text-sm text-zinc-500">{role?.role_name || analysis.career_role}</p>
              </div>
            </div>
          </div>
          
          <button onClick={logout} className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Score Hero */}
        <div className="bg-zinc-900 rounded-3xl p-8 mb-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-800 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-8">
            {/* Score Circle */}
            <div className="flex-shrink-0">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="rgba(255,255,255,0.1)" strokeWidth="14" fill="none" />
                  <circle cx="80" cy="80" r="70"
                    stroke={readiness_score >= 70 ? '#10b981' : readiness_score >= 50 ? '#f59e0b' : '#ef4444'}
                    strokeWidth="14" fill="none"
                    strokeDasharray={`${2 * Math.PI * 70}`}
                    strokeDashoffset={`${2 * Math.PI * 70 * (1 - readiness_score / 100)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-black text-white">{readiness_score}%</span>
                  <span className="text-zinc-400 text-base">Ready</span>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 text-white">
              <h1 className="text-3xl font-black mb-3">{role?.role_name || analysis.career_role}</h1>
              
              {honest_assessment && (
                <p className="text-zinc-300 mb-5 text-base bg-zinc-800/50 p-4 rounded-xl">💬 {honest_assessment}</p>
              )}

              {Object.keys(score_breakdown).length > 0 && (
                <div className="grid grid-cols-3 gap-4 mb-5">
                  {score_breakdown.technical_skills !== undefined && (
                    <div className="bg-zinc-800 rounded-xl p-4 text-center">
                      <p className={`text-3xl font-black ${getScoreColor(score_breakdown.technical_skills)}`}>{score_breakdown.technical_skills}%</p>
                      <p className="text-sm text-zinc-400">Technical</p>
                    </div>
                  )}
                  {score_breakdown.projects !== undefined && (
                    <div className="bg-zinc-800 rounded-xl p-4 text-center">
                      <p className={`text-3xl font-black ${getScoreColor(score_breakdown.projects)}`}>{score_breakdown.projects}%</p>
                      <p className="text-sm text-zinc-400">Projects</p>
                    </div>
                  )}
                  {score_breakdown.interview_readiness !== undefined && (
                    <div className="bg-zinc-800 rounded-xl p-4 text-center">
                      <p className={`text-3xl font-black ${getScoreColor(score_breakdown.interview_readiness)}`}>{score_breakdown.interview_readiness}%</p>
                      <p className="text-sm text-zinc-400">Interview</p>
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg text-base font-medium">
                  ✓ {matched_skills.length} skills matched
                </span>
                <span className="px-4 py-2 bg-amber-500/20 text-amber-400 rounded-lg text-base font-medium">
                  📚 {missing_skills.length} to learn
                </span>
                <span className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-base font-medium">
                  📅 {learning_roadmap.length} months plan
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'roadmap', icon: Rocket, label: 'Roadmap' },
            { id: 'skills', icon: Target, label: 'Skills' },
            { id: 'tips', icon: Briefcase, label: 'Career Tips' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-base transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-zinc-900 text-white shadow-lg'
                  : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB: Roadmap */}
        {activeTab === 'roadmap' && (
          <div className="space-y-4">
            {motivation && (
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border-2 border-emerald-100 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-6 h-6 text-emerald-600" />
                  <h3 className="font-bold text-emerald-800 text-xl">You've Got This! 💪</h3>
                </div>
                <p className="text-emerald-700 text-lg">{motivation}</p>
              </div>
            )}

            {/* Quick Access Roadmaps from roadmap.sh */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-zinc-100 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-zinc-900 text-lg flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-500" /> Explore Detailed Roadmaps
                </h2>
                <a 
                  href="https://roadmap.sh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                >
                  Visit roadmap.sh <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-base text-zinc-600 mb-5">📚 Interactive learning paths created by the community. Click to explore in-depth roadmaps:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[
                  { name: 'Frontend', path: 'frontend', color: 'bg-blue-500' },
                  { name: 'Backend', path: 'backend', color: 'bg-emerald-500' },
                  { name: 'React', path: 'react', color: 'bg-cyan-500' },
                  { name: 'JavaScript', path: 'javascript', color: 'bg-yellow-500' },
                  { name: 'Python', path: 'python', color: 'bg-green-500' },
                  { name: 'Node.js', path: 'nodejs', color: 'bg-lime-600' },
                  { name: 'DSA', path: 'datastructures-and-algorithms', color: 'bg-purple-500' },
                  { name: 'System Design', path: 'system-design', color: 'bg-pink-500' },
                ].map((item) => (
                  <a
                    key={item.path}
                    href={`https://roadmap.sh/${item.path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-zinc-50 hover:bg-zinc-100 rounded-xl border border-zinc-200 transition-all hover:shadow-md group"
                  >
                    <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center`}>
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-zinc-800 text-base">{item.name}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600" />
                  </a>
                ))}
              </div>

              {/* Skills-specific roadmaps based on missing skills */}
              {missing_skills.length > 0 && (
                <div className="mt-5 pt-5 border-t border-zinc-100">
                  <p className="text-base font-semibold text-zinc-700 mb-3">🎯 Roadmaps for your missing skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {missing_skills.map((skill, i) => {
                      const roadmapUrl = getRoadmapLink(skill);
                      return roadmapUrl ? (
                        <a
                          key={i}
                          href={roadmapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2.5 bg-amber-100 text-amber-800 rounded-lg text-base font-medium hover:bg-amber-200 transition-colors flex items-center gap-2"
                        >
                          {skill}
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Learning Resources */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 shadow-lg border border-purple-100 mb-6">
              <h2 className="font-bold text-zinc-900 text-xl mb-5 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-500" /> Free Learning Platforms
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'freeCodeCamp', url: 'https://freecodecamp.org', desc: 'Full-stack curriculum', icon: '💻' },
                  { name: 'LeetCode', url: 'https://leetcode.com', desc: 'DSA & Interview prep', icon: '🧩' },
                  { name: 'The Odin Project', url: 'https://theodinproject.com', desc: 'Web Development', icon: '🌐' },
                  { name: 'CS50', url: 'https://cs50.harvard.edu', desc: 'Harvard CS Course', icon: '🎓' },
                  { name: 'Scrimba', url: 'https://scrimba.com', desc: 'Interactive coding', icon: '🎬' },
                  { name: 'GeeksforGeeks', url: 'https://geeksforgeeks.org', desc: 'DSA & Tutorials', icon: '📚' },
                ].map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-white rounded-xl border border-purple-100 hover:shadow-md transition-all group"
                  >
                    <span className="text-3xl">{platform.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-zinc-800 text-base">{platform.name}</p>
                      <p className="text-sm text-zinc-500">{platform.desc}</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-zinc-400 group-hover:text-purple-500" />
                  </a>
                ))}
              </div>
            </div>

            {/* Study Tips */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-zinc-100 mb-6">
              <h2 className="font-bold text-zinc-900 text-xl mb-5 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-blue-500" /> How to Use This Roadmap Effectively
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold text-base flex-shrink-0">1</div>
                    <div>
                      <p className="font-semibold text-zinc-800 text-base">Follow the Order</p>
                      <p className="text-sm text-zinc-600">Each month builds on the previous. Don't skip ahead!</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold text-base flex-shrink-0">2</div>
                    <div>
                      <p className="font-semibold text-zinc-800 text-base">Build Projects</p>
                      <p className="text-sm text-zinc-600">Projects {'>'} Tutorials. Actually code, don't just watch.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold text-base flex-shrink-0">3</div>
                    <div>
                      <p className="font-semibold text-zinc-800 text-base">Solve Daily Problems</p>
                      <p className="text-sm text-zinc-600">2-3 LeetCode problems daily. Start easy, go to medium.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-emerald-50 rounded-xl">
                    <div className="w-10 h-10 bg-emerald-500 text-white rounded-lg flex items-center justify-center font-bold text-base flex-shrink-0">4</div>
                    <div>
                      <p className="font-semibold text-zinc-800 text-base">Track Progress</p>
                      <p className="text-sm text-zinc-600">Use the checklists. Tick off completed items.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-emerald-50 rounded-xl">
                    <div className="w-10 h-10 bg-emerald-500 text-white rounded-lg flex items-center justify-center font-bold text-base flex-shrink-0">5</div>
                    <div>
                      <p className="font-semibold text-zinc-800 text-base">Join Communities</p>
                      <p className="text-sm text-zinc-600">Discord, Reddit, Twitter. Learn with others!</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-emerald-50 rounded-xl">
                    <div className="w-10 h-10 bg-emerald-500 text-white rounded-lg flex items-center justify-center font-bold text-base flex-shrink-0">6</div>
                    <div>
                      <p className="font-semibold text-zinc-800 text-base">Stay Consistent</p>
                      <p className="text-sm text-zinc-600">2 hours daily {'>'} 10 hours on weekends. Consistency wins.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {learning_roadmap.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-zinc-200">
                <Rocket className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                <p className="text-zinc-500">No roadmap data available. Try analyzing again.</p>
              </div>
            ) : (
              learning_roadmap.map((phase, index) => {
                // Handle both data formats
                const skills = phase.skills_covered || phase.skills || [];
                const weeks = phase.weeks || [];
                const resources = phase.resources || [];
                const projects = phase.projects || [];
                const milestones = phase.milestones || phase.end_of_month_checklist || [];
                const mistakes = phase.mistakes_to_avoid || [];
                const interviewPrep = phase.interview_prep;

                return (
                  <div key={index} className="bg-white border-2 border-zinc-100 rounded-2xl overflow-hidden shadow-lg">
                    {/* Month Header */}
                    <button
                      onClick={() => setExpandedMonth(expandedMonth === index ? -1 : index)}
                      className="w-full p-6 hover:bg-zinc-50 transition-colors flex items-center justify-between text-left"
                    >
                      <div className="flex items-center gap-5">
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-xl ${
                          index === 0 ? 'bg-zinc-900' : 'bg-zinc-400'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-bold text-zinc-900 text-xl">
                            {phase.month}{phase.title ? `: ${phase.title}` : phase.focus ? `: ${phase.focus}` : ''}
                          </h3>
                          <p className="text-zinc-500 text-base">{phase.goal || phase.theme || `Focus: ${phase.focus || 'Learning'}`}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {phase.hours_per_week && (
                          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-zinc-100 rounded-lg">
                            <Clock className="w-5 h-5 text-zinc-500" />
                            <span className="text-base font-medium text-zinc-700">{phase.hours_per_week} hrs/week</span>
                          </div>
                        )}
                        <ChevronDown className={`w-6 h-6 text-zinc-400 transition-transform ${expandedMonth === index ? 'rotate-180' : ''}`} />
                      </div>
                    </button>

                    {/* Expanded Content */}
                    {expandedMonth === index && (
                      <div className="p-6 border-t-2 border-zinc-100 space-y-6">
                        {/* Daily Schedule */}
                        {phase.daily_schedule && (
                          <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                            <h4 className="font-bold text-blue-800 text-lg mb-4 flex items-center gap-2">
                              <Clock className="w-5 h-5" /> Daily Study Schedule
                            </h4>
                            <div className="grid sm:grid-cols-2 gap-4">
                              {phase.daily_schedule.weekdays && (
                                <div className="bg-white rounded-lg p-4">
                                  <p className="text-sm font-semibold text-blue-600 mb-2">📅 WEEKDAYS</p>
                                  <p className="text-base text-zinc-700">{phase.daily_schedule.weekdays}</p>
                                </div>
                              )}
                              {phase.daily_schedule.weekends && (
                                <div className="bg-white rounded-lg p-4">
                                  <p className="text-sm font-semibold text-blue-600 mb-2">🏠 WEEKENDS</p>
                                  <p className="text-base text-zinc-700">{phase.daily_schedule.weekends}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Skills */}
                        {skills.length > 0 && (
                          <div>
                            <h4 className="font-bold text-zinc-800 text-lg mb-4 flex items-center gap-2">
                              <Target className="w-5 h-5" /> Skills to Master
                            </h4>
                            <div className="flex flex-wrap gap-3">
                              {skills.map((skill, i) => {
                                const roadmapUrl = getRoadmapLink(skill);
                                return roadmapUrl ? (
                                  <a
                                    key={i}
                                    href={roadmapUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 py-2.5 bg-zinc-900 text-white rounded-xl text-base font-semibold hover:bg-zinc-700 transition-colors flex items-center gap-2 group"
                                  >
                                    {skill}
                                    <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                                  </a>
                                ) : (
                                  <span key={i} className="px-5 py-2.5 bg-zinc-900 text-white rounded-xl text-base font-semibold">{skill}</span>
                                );
                              })}
                            </div>
                            <p className="text-sm text-zinc-500 mt-3 flex items-center gap-1">
                              <ExternalLink className="w-4 h-4" /> Click on skills to view detailed roadmap on roadmap.sh
                            </p>
                          </div>
                        )}

                        {/* Weeks */}
                        {weeks.length > 0 && (
                          <div>
                            <h4 className="font-bold text-zinc-800 text-lg mb-4 flex items-center gap-2">
                              <Calendar className="w-5 h-5" /> Week-by-Week Plan
                            </h4>
                            <div className="space-y-4">
                              {weeks.map((week, i) => renderWeek(week, i))}
                            </div>
                          </div>
                        )}

                        {/* Resources */}
                        {resources.length > 0 && (
                          <div>
                            <h4 className="font-bold text-zinc-800 text-lg mb-4 flex items-center gap-2">
                              <BookOpen className="w-5 h-5" /> Free Resources
                            </h4>
                            <div className="grid sm:grid-cols-2 gap-4">
                              {resources.map((res, i) => renderResource(res, i))}
                            </div>
                          </div>
                        )}

                        {/* Projects */}
                        {projects.length > 0 && (
                          <div>
                            <h4 className="font-bold text-zinc-800 text-lg mb-4 flex items-center gap-2">
                              <Code className="w-5 h-5" /> Portfolio Projects
                            </h4>
                            {projects.map((proj, i) => renderProject(proj, i))}
                          </div>
                        )}

                        {/* Interview Prep */}
                        {interviewPrep && (
                          <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
                            <h4 className="font-bold text-amber-800 text-lg mb-4 flex items-center gap-2">
                              <Briefcase className="w-5 h-5" /> Interview Preparation
                            </h4>
                            
                            {typeof interviewPrep === 'string' ? (
                              <p className="text-base text-amber-700">{interviewPrep}</p>
                            ) : (
                              <>
                                {interviewPrep.concepts_to_master?.length > 0 && (
                                  <div className="mb-4">
                                    <p className="text-sm font-semibold text-amber-600 mb-2">MASTER THESE:</p>
                                    <div className="flex flex-wrap gap-2">
                                      {interviewPrep.concepts_to_master.map((c, i) => (
                                        <span key={i} className="text-sm bg-white text-amber-700 px-3 py-1.5 rounded border border-amber-200">{c}</span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                {interviewPrep.common_questions?.length > 0 && (
                                  <div className="space-y-3">
                                    {interviewPrep.common_questions.map((q, i) => (
                                      <div key={i} className="bg-white rounded-lg p-4 border border-amber-100">
                                        <p className="font-medium text-zinc-900 text-base mb-2">❓ {q.question}</p>
                                        <p className="text-sm text-amber-700">💡 {q.how_to_answer}</p>
                                      </div>
                                    ))}
                                  </div>
                                )}
                                {interviewPrep.practice_tip && (
                                  <p className="text-base text-amber-700 mt-4">🎯 {interviewPrep.practice_tip}</p>
                                )}
                              </>
                            )}
                          </div>
                        )}

                        {/* Mistakes */}
                        {mistakes.length > 0 && (
                          <div className="bg-red-50 rounded-xl p-5 border border-red-100">
                            <h4 className="font-bold text-red-800 text-lg mb-4 flex items-center gap-2">
                              <AlertTriangle className="w-5 h-5" /> Avoid These Mistakes
                            </h4>
                            <ul className="space-y-3">
                              {mistakes.map((m, i) => (
                                <li key={i} className="flex items-start gap-3 text-base text-red-700">
                                  <span className="text-red-500 text-lg">✗</span> {m}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Milestones */}
                        {milestones.length > 0 && (
                          <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
                            <h4 className="font-bold text-emerald-800 text-lg mb-4 flex items-center gap-2">
                              <CheckCircle className="w-5 h-5" /> End of Month Checklist
                            </h4>
                            <ul className="space-y-3">
                              {milestones.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-base text-emerald-700">
                                  <span className="w-6 h-6 rounded border-2 border-emerald-300 flex-shrink-0 mt-0.5"></span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}

            {/* Final Outcome */}
            {final_outcome && (
              <div className="bg-zinc-900 rounded-2xl p-8 text-white text-center">
                <Award className="w-14 h-14 mx-auto mb-4 text-amber-400" />
                <h3 className="text-2xl font-bold mb-3">🎓 After This Roadmap</h3>
                <p className="text-zinc-300 text-lg">{final_outcome}</p>
              </div>
            )}
          </div>
        )}

        {/* TAB: Skills */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            {/* Priority Order */}
            {skill_priority_order.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-zinc-100">
                <h2 className="font-bold text-zinc-900 text-xl mb-5 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6" /> Skills Priority Order
                </h2>
                <div className="space-y-4">
                  {skill_priority_order.map((item, i) => {
                    const isObject = typeof item === 'object';
                    return (
                      <div key={i} className="flex items-start gap-5 p-5 bg-zinc-50 rounded-xl border border-zinc-100">
                        <div className="w-12 h-12 bg-zinc-900 text-white rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0">
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-zinc-900 text-lg">{isObject ? item.skill : item}</h4>
                          {isObject && item.reason && <p className="text-base text-zinc-600 mb-3">{item.reason}</p>}
                          {isObject && (
                            <div className="flex gap-3">
                              {item.time_to_learn && (
                                <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1.5 rounded">⏱️ {item.time_to_learn}</span>
                              )}
                              {item.difficulty && (
                                <span className="text-sm bg-amber-100 text-amber-700 px-3 py-1.5 rounded">📊 {item.difficulty}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-zinc-100">
                <h2 className="font-bold text-zinc-900 text-xl mb-5 flex items-center gap-2">
                  <Check className="w-6 h-6 text-emerald-500" /> Skills You Have ✅
                </h2>
                <div className="flex flex-wrap gap-3">
                  {matched_skills.map((skill, i) => (
                    <span key={i} className="px-5 py-2.5 bg-emerald-50 text-emerald-700 rounded-xl text-base font-semibold border border-emerald-100">{skill}</span>
                  ))}
                  {matched_skills.length === 0 && <p className="text-zinc-500 text-base">No matched skills</p>}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-zinc-100">
                <h2 className="font-bold text-zinc-900 text-xl mb-5 flex items-center gap-2">
                  <Target className="w-6 h-6 text-amber-500" /> Skills to Learn 📚
                </h2>
                <div className="flex flex-wrap gap-3">
                  {missing_skills.map((skill, i) => (
                    <span key={i} className="px-5 py-2.5 bg-amber-50 text-amber-700 rounded-xl text-base font-semibold border border-amber-100">{skill}</span>
                  ))}
                  {missing_skills.length === 0 && <p className="text-zinc-500 text-base">No missing skills!</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: Career Tips */}
        {activeTab === 'tips' && (
          <div className="space-y-6">
            {/* Quick Wins */}
            {quick_wins.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-zinc-100">
                <h2 className="font-bold text-zinc-900 text-xl mb-5 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-amber-500" /> Quick Wins (Do These Today!)
                </h2>
                <div className="space-y-4">
                  {quick_wins.map((win, i) => {
                    const isObject = typeof win === 'object';
                    return (
                      <div key={i} className="flex items-start gap-5 p-5 bg-amber-50 rounded-xl border border-amber-100">
                        <div className="w-12 h-12 bg-amber-500 text-white rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0">{i + 1}</div>
                        <div>
                          <p className="font-semibold text-zinc-900 text-lg">{isObject ? win.task : win}</p>
                          {isObject && win.time && <p className="text-base text-amber-600">⏱️ {win.time}</p>}
                          {isObject && win.impact && <p className="text-base text-zinc-600">💡 {win.impact}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Interview Preparation Guide */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 shadow-lg border border-purple-100">
              <h2 className="font-bold text-zinc-900 text-xl mb-5 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-purple-600" /> Interview Preparation Guide
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="bg-white rounded-xl p-5 border border-purple-100">
                  <h3 className="font-bold text-purple-800 mb-4 text-base">📝 Before the Interview</h3>
                  <ul className="space-y-3 text-base text-zinc-700">
                    <li className="flex items-start gap-2"><span className="text-purple-500">•</span> Research the company thoroughly - products, culture, recent news</li>
                    <li className="flex items-start gap-2"><span className="text-purple-500">•</span> Practice explaining your projects in 2-3 minutes</li>
                    <li className="flex items-start gap-2"><span className="text-purple-500">•</span> Prepare 3-4 questions to ask the interviewer</li>
                    <li className="flex items-start gap-2"><span className="text-purple-500">•</span> Review your resume - be ready to discuss everything on it</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-5 border border-purple-100">
                  <h3 className="font-bold text-purple-800 mb-4 text-base">💬 During the Interview</h3>
                  <ul className="space-y-3 text-base text-zinc-700">
                    <li className="flex items-start gap-2"><span className="text-purple-500">•</span> Use STAR method for behavioral questions</li>
                    <li className="flex items-start gap-2"><span className="text-purple-500">•</span> Think aloud during coding problems</li>
                    <li className="flex items-start gap-2"><span className="text-purple-500">•</span> Ask clarifying questions before solving</li>
                    <li className="flex items-start gap-2"><span className="text-purple-500">•</span> It's okay to say "I don't know, but I would..."</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Common HR Questions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-zinc-100">
              <h2 className="font-bold text-zinc-900 text-xl mb-5 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-blue-600" /> Common HR Questions & How to Answer
              </h2>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                  <p className="font-semibold text-zinc-900 text-lg mb-2">❓ "Tell me about yourself"</p>
                  <p className="text-base text-blue-700">💡 Use the Present-Past-Future formula: Current situation → Past experiences → Future goals. Keep it under 2 minutes. Focus on professional journey, not personal life.</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                  <p className="font-semibold text-zinc-900 text-lg mb-2">❓ "Why do you want to work here?"</p>
                  <p className="text-base text-blue-700">💡 Research the company! Mention specific products, values, or initiatives. Connect your skills to their needs. Show genuine enthusiasm.</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                  <p className="font-semibold text-zinc-900 text-lg mb-2">❓ "What's your biggest weakness?"</p>
                  <p className="text-base text-blue-700">💡 Be genuine but strategic. Pick a real weakness, explain what you're doing to improve it. Never say "I'm a perfectionist" or "I work too hard."</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                  <p className="font-semibold text-zinc-900 text-lg mb-2">❓ "Where do you see yourself in 5 years?"</p>
                  <p className="text-base text-blue-700">💡 Show ambition but be realistic. Focus on skill growth and contributions. Align your goals with the company's trajectory.</p>
                </div>
              </div>
            </div>

            {resume_tips.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-zinc-100">
                <h2 className="font-bold text-zinc-900 text-xl mb-5 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-blue-500" /> Resume Tips
                </h2>
                <ul className="space-y-3">
                  {resume_tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-zinc-700 text-base">
                      <span className="text-blue-500">•</span> {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Resume Writing Guide (Always Show) */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-zinc-100">
              <h2 className="font-bold text-zinc-900 text-xl mb-5 flex items-center gap-2">
                <FileText className="w-6 h-6 text-emerald-500" /> Resume Writing Essentials
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <h3 className="font-bold text-emerald-800 mb-4 text-base">✅ DO's</h3>
                  <ul className="space-y-3 text-base text-zinc-700">
                    <li className="flex items-start gap-2"><span className="text-emerald-500">•</span> Use action verbs: Built, Developed, Implemented, Led</li>
                    <li className="flex items-start gap-2"><span className="text-emerald-500">•</span> Quantify achievements: "Improved load time by 40%"</li>
                    <li className="flex items-start gap-2"><span className="text-emerald-500">•</span> Keep it to 1 page for freshers</li>
                    <li className="flex items-start gap-2"><span className="text-emerald-500">•</span> Add GitHub and LinkedIn links</li>
                    <li className="flex items-start gap-2"><span className="text-emerald-500">•</span> Tailor resume for each job application</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-red-800 mb-4 text-base">❌ DON'Ts</h3>
                  <ul className="space-y-3 text-base text-zinc-700">
                    <li className="flex items-start gap-2"><span className="text-red-500">•</span> Don't include photo or personal details</li>
                    <li className="flex items-start gap-2"><span className="text-red-500">•</span> Avoid generic objectives like "seeking a challenging role"</li>
                    <li className="flex items-start gap-2"><span className="text-red-500">•</span> Don't list every technology - focus on relevant ones</li>
                    <li className="flex items-start gap-2"><span className="text-red-500">•</span> Never lie about skills or experience</li>
                    <li className="flex items-start gap-2"><span className="text-red-500">•</span> Avoid fancy fonts or excessive colors</li>
                  </ul>
                </div>
              </div>
            </div>

            {linkedin_tips.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-zinc-100">
                <h2 className="font-bold text-zinc-900 text-xl mb-5 flex items-center gap-2">
                  <Linkedin className="w-6 h-6 text-blue-600" /> LinkedIn Tips
                </h2>
                <ul className="space-y-3">
                  {linkedin_tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-zinc-700 text-base">
                      <span className="text-blue-600">•</span> {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* LinkedIn Optimization (Always Show) */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 shadow-lg border border-blue-100">
              <h2 className="font-bold text-zinc-900 text-xl mb-5 flex items-center gap-2">
                <Linkedin className="w-6 h-6 text-blue-700" /> LinkedIn Profile Optimization
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-5 border border-blue-100">
                  <h3 className="font-bold text-blue-800 mb-3 text-base">📸 Profile Photo</h3>
                  <p className="text-sm text-zinc-600">Professional headshot, plain background, good lighting, smile naturally. Profiles with photos get 21x more views.</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-blue-100">
                  <h3 className="font-bold text-blue-800 mb-3 text-base">✍️ Headline</h3>
                  <p className="text-sm text-zinc-600">Don't just put "Student" - add value! Example: "CSE Student | React Developer | Building AI-powered apps"</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-blue-100">
                  <h3 className="font-bold text-blue-800 mb-3 text-base">📝 About Section</h3>
                  <p className="text-sm text-zinc-600">Tell your story in first person. Include skills, achievements, and what you're looking for. Add a call-to-action.</p>
                </div>
              </div>
              <div className="mt-5 bg-white rounded-xl p-5 border border-blue-100">
                <h3 className="font-bold text-blue-800 mb-3 text-base">🚀 Pro Tips to Stand Out</h3>
                <div className="grid sm:grid-cols-2 gap-3 text-sm text-zinc-600">
                  <p>• Post about your projects and learnings weekly</p>
                  <p>• Engage with posts from your target companies</p>
                  <p>• Get recommendations from professors/mentors</p>
                  <p>• Join groups related to your career interest</p>
                  <p>• Use keywords recruiters search for in your profile</p>
                  <p>• Connect with alumni working at dream companies</p>
                </div>
              </div>
            </div>

            {/* Networking Tips */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-zinc-100">
              <h2 className="font-bold text-zinc-900 text-xl mb-5 flex items-center gap-2">
                <Globe className="w-6 h-6 text-purple-500" /> Networking & Job Search Strategy
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-5 p-5 bg-purple-50 rounded-xl border border-purple-100">
                  <div className="w-12 h-12 bg-purple-500 text-white rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0">1</div>
                  <div>
                    <p className="font-semibold text-zinc-900 text-lg">Build in Public</p>
                    <p className="text-base text-zinc-600">Share your learning journey on Twitter/LinkedIn. Tweet about what you're building. People notice consistent effort.</p>
                  </div>
                </div>
                <div className="flex items-start gap-5 p-5 bg-purple-50 rounded-xl border border-purple-100">
                  <div className="w-12 h-12 bg-purple-500 text-white rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0">2</div>
                  <div>
                    <p className="font-semibold text-zinc-900 text-lg">Cold Email Strategy</p>
                    <p className="text-base text-zinc-600">Research the person, personalize your email, be specific about why you're reaching out, and always provide value first.</p>
                  </div>
                </div>
                <div className="flex items-start gap-5 p-5 bg-purple-50 rounded-xl border border-purple-100">
                  <div className="w-12 h-12 bg-purple-500 text-white rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0">3</div>
                  <div>
                    <p className="font-semibold text-zinc-900 text-lg">Contribute to Open Source</p>
                    <p className="text-base text-zinc-600">Start with "good first issues" on GitHub. It shows collaboration skills and gets you noticed by maintainers (often working at top companies).</p>
                  </div>
                </div>
                <div className="flex items-start gap-5 p-5 bg-purple-50 rounded-xl border border-purple-100">
                  <div className="w-12 h-12 bg-purple-500 text-white rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0">4</div>
                  <div>
                    <p className="font-semibold text-zinc-900 text-lg">Attend Tech Events</p>
                    <p className="text-base text-zinc-600">Hackathons, meetups, webinars. In-person events are goldmines for networking. Follow up within 24 hours of meeting someone.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mental Health & Motivation */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 shadow-lg border border-amber-100">
              <h2 className="font-bold text-zinc-900 text-xl mb-5 flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-600" /> Stay Motivated During Placements
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border border-amber-100">
                    <p className="font-medium text-zinc-900 text-base">🎯 Set Small Daily Goals</p>
                    <p className="text-sm text-zinc-600">Solve 3 problems, learn 1 concept, apply to 2 jobs</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-amber-100">
                    <p className="font-medium text-zinc-900 text-base">📊 Track Your Progress</p>
                    <p className="text-sm text-zinc-600">Maintain a spreadsheet of applications and learnings</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-amber-100">
                    <p className="font-medium text-zinc-900 text-base">👥 Find Study Buddies</p>
                    <p className="text-sm text-zinc-600">Prepare with friends, do mock interviews together</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border border-amber-100">
                    <p className="font-medium text-zinc-900 text-base">😴 Take Care of Health</p>
                    <p className="text-sm text-zinc-600">Sleep 7-8 hours, exercise, take breaks from screens</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-amber-100">
                    <p className="font-medium text-zinc-900 text-base">🚫 Handle Rejections</p>
                    <p className="text-sm text-zinc-600">Every "No" is practice for the right "Yes". Learn & move on.</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-amber-100">
                    <p className="font-medium text-zinc-900 text-base">🏆 Celebrate Small Wins</p>
                    <p className="text-sm text-zinc-600">Completed a project? Solved 100 problems? Celebrate!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-8 py-4 bg-white text-zinc-700 font-bold text-lg rounded-xl border-2 border-zinc-200 hover:bg-zinc-50 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Update Skills
          </button>
          <button
            onClick={() => window.print()}
            className="px-8 py-4 bg-zinc-900 text-white font-bold text-lg rounded-xl shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download Report
          </button>
        </div>
      </main>
    </div>
  );
};

export default Results;
