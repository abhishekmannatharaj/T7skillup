import { industryRoles } from './industrySkills';

// Helper to get random items from an array
const getRandomItems = (arr, n) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};

const platforms = [
  { name: 'LinkedIn', color: 'bg-blue-100 text-blue-700' },
  { name: 'Internshala', color: 'bg-sky-100 text-sky-700' },
  { name: 'Naukri', color: 'bg-indigo-100 text-indigo-700' },
  { name: 'Indeed', color: 'bg-blue-50 text-blue-800' }
];

const companies = ['Tech Innovators Inc.', 'Global Solutions Ltd.', 'Startup Hub', 'NextGen Systems', 'Alpha Corp', 'Beta Technologies', 'Nexus Dynamics', 'Pioneer Group'];
const locations = ['Remote', 'Bangalore, India', 'Hyderabad, India', 'Pune, India', 'Chennai, India', 'Mumbai, India', 'Delhi NCR', 'Hybrid'];
const types = ['Full-time', 'Internship', 'Contract', 'Part-time'];

/**
 * Generates relevant job listings based on the selected career role.
 * In a real app, this would be an API call to a job board.
 */
export const getJobsForRole = (roleId) => {
  const role = industryRoles.find(r => r.id === roleId);
  if (!role) return [];

  const allRoleSkills = role.required_skills.map(s => s.name);
  
  // Generate 4 dynamic jobs
  return Array.from({ length: 4 }).map((_, index) => {
    const platform = platforms[index % platforms.length];
    
    // Pick 5-7 random skills from the role's required skills to form this job's requirements
    const numSkills = Math.floor(Math.random() * 3) + 5; // 5 to 7
    const requiredSkills = getRandomItems(allRoleSkills, Math.min(numSkills, allRoleSkills.length));

    return {
      id: `${roleId}-job-${index}`,
      title: `${role.role_name} ${index % 2 === 0 ? 'Intern' : 'Associate'}`,
      company: getRandomItems(companies, 1)[0],
      platform: platform.name,
      platformColor: platform.color,
      location: getRandomItems(locations, 1)[0],
      type: types[index % types.length],
      salary: index % 2 === 0 ? '₹15k - ₹25k / mo' : '₹6L - ₹12L / yr',
      requiredSkills: requiredSkills,
      posted: `${Math.floor(Math.random() * 5) + 1} days ago`
    };
  });
};
