/**
 * Industry Skill Dataset
 * 
 * This dataset contains career roles and their required skills
 * with priority levels for the Skill Gap Analyzer MVP.
 * 
 * Priority Levels:
 * - high: Must-have skills for the role
 * - medium: Important skills that add value
 * - low: Nice-to-have skills
 */

export const industryRoles = [
  {
    id: 'frontend-developer',
    role_name: 'Frontend Developer',
    description: 'Build user interfaces and web applications',
    required_skills: [
      { name: 'HTML', priority: 'high' },
      { name: 'CSS', priority: 'high' },
      { name: 'JavaScript', priority: 'high' },
      { name: 'React', priority: 'high' },
      { name: 'TypeScript', priority: 'medium' },
      { name: 'Git', priority: 'high' },
      { name: 'REST APIs', priority: 'medium' },
      { name: 'Responsive Design', priority: 'high' },
      { name: 'Tailwind CSS', priority: 'medium' },
      { name: 'Testing (Jest)', priority: 'low' },
      { name: 'Webpack/Vite', priority: 'low' },
      { name: 'Next.js', priority: 'medium' }
    ],
    priority_skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Git']
  },
  {
    id: 'backend-developer',
    role_name: 'Backend Developer',
    description: 'Build server-side logic and APIs',
    required_skills: [
      { name: 'Node.js', priority: 'high' },
      { name: 'Python', priority: 'medium' },
      { name: 'SQL', priority: 'high' },
      { name: 'REST APIs', priority: 'high' },
      { name: 'MongoDB', priority: 'medium' },
      { name: 'Git', priority: 'high' },
      { name: 'Express.js', priority: 'high' },
      { name: 'Authentication (JWT)', priority: 'medium' },
      { name: 'Docker', priority: 'medium' },
      { name: 'AWS/GCP', priority: 'low' },
      { name: 'GraphQL', priority: 'low' },
      { name: 'Redis', priority: 'low' }
    ],
    priority_skills: ['Node.js', 'SQL', 'REST APIs', 'Git', 'Express.js']
  },
  {
    id: 'fullstack-developer',
    role_name: 'Full Stack Developer',
    description: 'Build complete web applications end-to-end',
    required_skills: [
      { name: 'HTML', priority: 'high' },
      { name: 'CSS', priority: 'high' },
      { name: 'JavaScript', priority: 'high' },
      { name: 'React', priority: 'high' },
      { name: 'Node.js', priority: 'high' },
      { name: 'SQL', priority: 'high' },
      { name: 'MongoDB', priority: 'medium' },
      { name: 'Git', priority: 'high' },
      { name: 'REST APIs', priority: 'high' },
      { name: 'Docker', priority: 'medium' },
      { name: 'TypeScript', priority: 'medium' },
      { name: 'AWS/GCP', priority: 'low' }
    ],
    priority_skills: ['JavaScript', 'React', 'Node.js', 'SQL', 'Git', 'REST APIs']
  },
  {
    id: 'data-analyst',
    role_name: 'Data Analyst',
    description: 'Analyze data and generate insights',
    required_skills: [
      { name: 'Python', priority: 'high' },
      { name: 'SQL', priority: 'high' },
      { name: 'Excel', priority: 'high' },
      { name: 'Data Visualization', priority: 'high' },
      { name: 'Pandas', priority: 'high' },
      { name: 'Statistics', priority: 'high' },
      { name: 'Power BI/Tableau', priority: 'medium' },
      { name: 'NumPy', priority: 'medium' },
      { name: 'Data Cleaning', priority: 'high' },
      { name: 'R', priority: 'low' },
      { name: 'A/B Testing', priority: 'medium' },
      { name: 'Google Analytics', priority: 'low' }
    ],
    priority_skills: ['Python', 'SQL', 'Excel', 'Data Visualization', 'Pandas', 'Statistics']
  },
  {
    id: 'ai-ml-engineer',
    role_name: 'AI/ML Engineer',
    description: 'Build and deploy machine learning models',
    required_skills: [
      { name: 'Python', priority: 'high' },
      { name: 'Machine Learning', priority: 'high' },
      { name: 'Deep Learning', priority: 'high' },
      { name: 'TensorFlow/PyTorch', priority: 'high' },
      { name: 'NumPy', priority: 'high' },
      { name: 'Pandas', priority: 'high' },
      { name: 'Scikit-learn', priority: 'high' },
      { name: 'Mathematics', priority: 'high' },
      { name: 'Statistics', priority: 'high' },
      { name: 'NLP', priority: 'medium' },
      { name: 'Computer Vision', priority: 'medium' },
      { name: 'MLOps', priority: 'low' },
      { name: 'SQL', priority: 'medium' },
      { name: 'Git', priority: 'medium' }
    ],
    priority_skills: ['Python', 'Machine Learning', 'Deep Learning', 'TensorFlow/PyTorch', 'Mathematics']
  },
  {
    id: 'devops-engineer',
    role_name: 'DevOps Engineer',
    description: 'Manage infrastructure and deployment pipelines',
    required_skills: [
      { name: 'Linux', priority: 'high' },
      { name: 'Docker', priority: 'high' },
      { name: 'Kubernetes', priority: 'high' },
      { name: 'CI/CD', priority: 'high' },
      { name: 'AWS/GCP/Azure', priority: 'high' },
      { name: 'Git', priority: 'high' },
      { name: 'Python/Bash', priority: 'medium' },
      { name: 'Terraform', priority: 'medium' },
      { name: 'Monitoring (Prometheus)', priority: 'medium' },
      { name: 'Networking', priority: 'medium' },
      { name: 'Security', priority: 'medium' },
      { name: 'Ansible', priority: 'low' }
    ],
    priority_skills: ['Linux', 'Docker', 'Kubernetes', 'CI/CD', 'AWS/GCP/Azure', 'Git']
  },
  {
    id: 'mobile-developer',
    role_name: 'Mobile Developer',
    description: 'Build mobile applications for iOS and Android',
    required_skills: [
      { name: 'React Native', priority: 'high' },
      { name: 'JavaScript', priority: 'high' },
      { name: 'TypeScript', priority: 'medium' },
      { name: 'Flutter', priority: 'medium' },
      { name: 'Git', priority: 'high' },
      { name: 'REST APIs', priority: 'high' },
      { name: 'Firebase', priority: 'medium' },
      { name: 'iOS (Swift)', priority: 'medium' },
      { name: 'Android (Kotlin)', priority: 'medium' },
      { name: 'App Store Deployment', priority: 'low' },
      { name: 'UI/UX Design', priority: 'medium' },
      { name: 'State Management', priority: 'medium' }
    ],
    priority_skills: ['React Native', 'JavaScript', 'Git', 'REST APIs']
  },
  {
    id: 'cloud-engineer',
    role_name: 'Cloud Engineer',
    description: 'Design and manage cloud infrastructure',
    required_skills: [
      { name: 'AWS/GCP/Azure', priority: 'high' },
      { name: 'Linux', priority: 'high' },
      { name: 'Networking', priority: 'high' },
      { name: 'Docker', priority: 'high' },
      { name: 'Kubernetes', priority: 'medium' },
      { name: 'Terraform', priority: 'high' },
      { name: 'Python/Bash', priority: 'medium' },
      { name: 'Security', priority: 'high' },
      { name: 'CI/CD', priority: 'medium' },
      { name: 'Serverless', priority: 'medium' },
      { name: 'Databases', priority: 'medium' },
      { name: 'Cost Optimization', priority: 'low' }
    ],
    priority_skills: ['AWS/GCP/Azure', 'Linux', 'Networking', 'Docker', 'Terraform', 'Security']
  }
];

/**
 * All available skills for student selection
 * Aggregated from all roles for the skill picker
 */
export const allSkills = [
  // Programming Languages
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C++',
  'C',
  'Go',
  'Rust',
  'R',
  'Swift',
  'Kotlin',
  
  // Frontend
  'HTML',
  'CSS',
  'React',
  'Vue.js',
  'Angular',
  'Next.js',
  'Tailwind CSS',
  'Bootstrap',
  'Sass/SCSS',
  'Responsive Design',
  'Webpack/Vite',
  
  // Backend
  'Node.js',
  'Express.js',
  'Django',
  'Flask',
  'Spring Boot',
  'FastAPI',
  'GraphQL',
  'REST APIs',
  
  // Databases
  'SQL',
  'MongoDB',
  'PostgreSQL',
  'MySQL',
  'Redis',
  'Firebase',
  
  // DevOps & Cloud
  'Git',
  'Docker',
  'Kubernetes',
  'AWS/GCP/Azure',
  'Linux',
  'CI/CD',
  'Terraform',
  'Networking',
  'Security',
  
  // Data Science & ML
  'Machine Learning',
  'Deep Learning',
  'TensorFlow/PyTorch',
  'Pandas',
  'NumPy',
  'Scikit-learn',
  'Data Visualization',
  'Statistics',
  'Mathematics',
  'NLP',
  'Computer Vision',
  'Data Cleaning',
  'A/B Testing',
  
  // Tools & Others
  'Excel',
  'Power BI/Tableau',
  'Google Analytics',
  'Testing (Jest)',
  'Authentication (JWT)',
  'UI/UX Design',
  'Agile/Scrum',
  'Problem Solving',
  'Data Structures',
  'Algorithms'
];

/**
 * Branch options for students
 */
export const branches = [
  'Computer Science',
  'Information Technology',
  'Electronics & Communication',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Biotechnology',
  'Other'
];

/**
 * Year options for students
 */
export const years = [1, 2, 3, 4];

export default industryRoles;
