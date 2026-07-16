USE job_board_db;

-- Clear existing data if needed
TRUNCATE TABLE jobs;

-- Insert Mock Job Data
INSERT INTO jobs (title, company_name, company_logo, location, job_type, experience_level, salary_range, description, requirements, contact_email, is_active)
VALUES
(
    'Senior Full-Stack Engineer',
    'TechNova Solutions',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop',
    'San Francisco, CA (Hybrid)',
    'Full-time',
    'Senior',
    '$140,000 - $180,000',
    'We are looking for a Senior Full-Stack Engineer to lead the design and execution of our core software solutions. You will work closely with product managers and visual designers to build scalable features and mentor junior developers.',
    'Minimum 5 years experience with React and Java Spring Boot; Proficient in SQL database tuning; Experience with cloud deployments (AWS/GCP); Strong systems communication and mentoring background.',
    'careers@technova.io',
    TRUE
),
(
    'Backend Engineer (Spring Boot)',
    'ByteStream Systems',
    'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=100&h=100&fit=crop',
    'Austin, TX (On-site)',
    'Full-time',
    'Mid-level',
    '$110,000 - $140,000',
    'Join our backend engineering crew responsible for processing microservice interactions and optimizing transaction speeds. You will design, build, and deploy critical payment systems.',
    '3+ years experience in Java and Spring Boot; Solid database foundation in MySQL or Postgres; Familiarity with Docker and Kubernetes; Experience writing secure REST APIs.',
    'jobs@bytestream.com',
    TRUE
),
(
    'Frontend Developer (React)',
    'PixelCraft Agency',
    'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=100&h=100&fit=crop',
    'Remote',
    'Full-time',
    'Mid-level',
    '$95,000 - $125,000',
    'PixelCraft is a visual-first creative agency building next-gen web applications. We need a frontend wizard who loves crafting beautiful React interfaces with smooth animations, high accessibility standards, and clean state management.',
    'Proficient with modern React, Hooks, Context API; Strong Vanilla CSS, CSS Grid/Flexbox, and keyframe animations; Experience with responsive design; Solid JavaScript and TypeScript skills.',
    'talent@pixelcraft.agency',
    TRUE
),
(
    'Product Designer',
    'Aura Health',
    'https://images.unsplash.com/photo-1618005198143-e528346d9a59?w=100&h=100&fit=crop',
    'Remote',
    'Full-time',
    'Senior',
    '$120,000 - $150,000',
    'Aura Health is building the future of digital mental wellness. We are seeking a Product Designer who can turn complex customer data into intuitive user journeys, mockups, and beautiful functional user interfaces.',
    'Portfolio demonstrating consumer-facing design work; Experience working closely with developers; Expert knowledge of Figma; Strong communication and remote collaboration skills.',
    'joinus@aurahealth.com',
    TRUE
),
(
    'Junior Data Analyst',
    'MetricsIQ',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
    'Chicago, IL',
    'Full-time',
    'Entry-level',
    '$65,000 - $85,000',
    'We are seeking a detail-oriented Junior Data Analyst to join our business intelligence department. You will assist in writing SQL reports, analyzing visitor behavior, and creating executive dashboard displays.',
    'Proficient in writing SQL SELECT queries; Experience with Excel and Python (Pandas); Understanding of statistical modeling; Strong logical reasoning capabilities.',
    'recruiting@metricsiq.com',
    TRUE
),
(
    'DevOps Engineer',
    'CloudScale Labs',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&h=100&fit=crop',
    'Seattle, WA (Hybrid)',
    'Full-time',
    'Senior',
    '$150,000 - $190,000',
    'CloudScale Labs optimizes server infrastructure. We need an automation specialist to secure our CI/CD delivery pipelines, automate scaling rules, and ensure high availability of global resources.',
    'Deep knowledge of Kubernetes, Docker, and Terraform; Proficiency in Linux shell scripting; Multi-year experience managing AWS environments; Strong understanding of network security.',
    'jobs@cloudscale.net',
    TRUE
),
(
    'Summer Software Engineer Intern',
    'InnoLabs',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop',
    'Boston, MA (On-site)',
    'Internship',
    'Entry-level',
    '$35 - $45 / hour',
    'InnoLabs welcomes current computer science students to apply for our 12-week summer cohort. You will write shipping production code, attend scrum syncs, and present an end-of-summer capstone project.',
    'Currently enrolled in BS/MS in Computer Science or related fields; Familiarity with Git; Basic Java, Javascript, or Python experience; Eagerness to learn.',
    'internships@innolabs.com',
    TRUE
),
(
    'Contract UI Developer',
    'Vibe Interactive',
    'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=100&h=100&fit=crop',
    'Remote',
    'Contract',
    'Senior',
    '$80 - $100 / hour',
    'We need a contract visual developer to refresh the user dashboards of our main software suite. This is a 6-month contract with a high probability of extension based on performance.',
    'Expertise in CSS, SVG animations, and standard React hooks; Experience with Tailwind or Vanilla CSS component design; Fast delivery timelines; Strong UI eyes.',
    'contracts@vibe.agency',
    TRUE
);
