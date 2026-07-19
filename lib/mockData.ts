// Mock Data for Shanmugapriyan's Portfolio Website

export interface Profile {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar_url: string;
  resume_url: string;
  email: string;
  phone: string;
  location: string;
  whatsapp_url: string;
  calendar_url: string;
  github_username: string;
  leetcode_username: string;
  updated_at: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  problem_statement: string;
  solution: string;
  features: string[];
  challenges: string;
  future_scope: string;
  role: string;
  duration: string;
  timeline: string;
  status: string;
  github_url: string;
  live_url: string;
  views: number;
  likes: number;
  downloads: number;
  display_order: number;
  created_at: string;
  images: { image_url: string; is_hero: boolean }[];
  videos?: { video_url: string }[];
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  experience_years: number;
  proficiency: number; // 0-100
  display_order: number;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  achievements: string[];
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  logo_url: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field_of_study: string;
  grade: string;
  achievements: string[];
  start_date: string;
  end_date: string;
  logo_url: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  credential_id: string;
  verification_url: string;
  thumbnail_url: string;
  issue_date: string;
  description: string;
  category: string;
  views: number;
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  description: string;
  date: string;
  credential_url: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  price_range: string;
  features: string[];
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  cover_image: string;
  is_published: boolean;
  published_at: string;
  views: number;
  likes: number;
  tags: string[];
  category: string;
  created_at: string;
}

export const mockProfile: Profile = {
  id: 'd8b76c8c-1e64-44df-bb62-63bc58b292e1',
  name: 'Shanmugapriyan',
  role: 'AI Engineer | Machine Learning Engineer | Full Stack Developer | Power BI Developer',
  bio: 'Elite AI engineer and full-stack developer specialized in building intelligent systems, complex automation algorithms, and premium user experiences. I bridge the gap between machine learning models and visual excellence.',
  avatar_url: '/images/profile.jpg',
  resume_url: '/resume.pdf',
  email: 'mashanmugapriyan777@gmail.com',
  phone: '+91 98765 43210',
  location: 'Tamil Nadu, India',
  whatsapp_url: 'https://wa.me/919876543210',
  calendar_url: 'https://calendly.com/shanmugapriyan',
  github_username: 'ShanmugapriyanMA777',
  leetcode_username: 'shanmugapriyan_leetcode',
  updated_at: '2026-06-26T22:00:00Z',
};

export const mockSocialLinks: SocialLink[] = [
  { id: '1', platform: 'GitHub', url: 'https://github.com/ShanmugapriyanMA777', icon: 'github' },
  { id: '2', platform: 'LinkedIn', url: 'https://www.linkedin.com/in/shanmuga-priyan-m-a-b53889321', icon: 'linkedin' },
  { id: '3', platform: 'LeetCode', url: 'https://leetcode.com/shanmugapriyan_leetcode', icon: 'code' },
  { id: '4', platform: 'Twitter', url: 'https://twitter.com/shanmugapriyan', icon: 'twitter' },
  { id: '5', platform: 'Email', url: 'mailto:mashanmugapriyan777@gmail.com', icon: 'mail' },
];

export const mockSkills: Skill[] = [
  // AI & ML
  { id: 's1', name: 'Python', category: 'AI & Machine Learning', icon: 'python', description: 'Primary language for machine learning algorithms, model building, and web APIs.', experience_years: 3, proficiency: 95, display_order: 1 },
  { id: 's2', name: 'PyTorch', category: 'AI & Machine Learning', icon: 'cpu', description: 'Building deep neural networks, CNNs for computer vision, and NLP classifiers.', experience_years: 2.5, proficiency: 88, display_order: 2 },
  { id: 's3', name: 'TensorFlow / Keras', category: 'AI & Machine Learning', icon: 'activity', description: 'Training ML models, deploying mobile/edge classifiers, and custom pipelines.', experience_years: 2, proficiency: 85, display_order: 3 },
  { id: 's4', name: 'Computer Vision (CV)', category: 'AI & Machine Learning', icon: 'eye', description: 'YOLO object detection, facial recognition with FaceNet, and image manipulation.', experience_years: 2, proficiency: 90, display_order: 4 },
  { id: 's5', name: 'Natural Language Processing (NLP)', category: 'AI & Machine Learning', icon: 'message-square', description: 'Transformers, BERT model fine-tuning, sentiment classifiers, and speech-to-text.', experience_years: 2, proficiency: 87, display_order: 5 },
  // Power BI
  { id: 's6', name: 'Power BI Dashboards', category: 'Power BI', icon: 'bar-chart-3', description: 'Creating interactive enterprise reporting boards with curated aesthetic themes.', experience_years: 2, proficiency: 95, display_order: 6 },
  { id: 's7', name: 'DAX & ETL Modeling', category: 'Power BI', icon: 'terminal', description: 'Complex relational databases mapping, clean star schema styling, and rolling metric coding.', experience_years: 2, proficiency: 90, display_order: 7 },
  // Frontend
  { id: 's8', name: 'Next.js 15 (React 19)', category: 'Frontend', icon: 'chrome', description: 'Server components, dynamic layouts, static generation, and edge-native SEO routing.', experience_years: 2, proficiency: 92, display_order: 8 },
  { id: 's9', name: 'TypeScript', category: 'Frontend', icon: 'shield', description: 'Clean, type-safe, self-documenting codebases for premium enterprise applications.', experience_years: 2.5, proficiency: 90, display_order: 9 },
  { id: 's10', name: 'Tailwind CSS', category: 'Frontend', icon: 'palette', description: 'Fast responsive styling, premium glassmorphic styling, and complex layouts.', experience_years: 3, proficiency: 96, display_order: 10 },
  { id: 's11', name: 'Framer Motion & GSAP', category: 'Frontend', icon: 'sparkles', description: 'Crafting high-end, premium animations, smooth scroll states, and custom transitions.', experience_years: 2, proficiency: 88, display_order: 11 },
  // Backend & Databases
  { id: 's12', name: 'PostgreSQL', category: 'Databases', icon: 'database', description: 'Advanced relational tables, transactional optimizations, indexing, and CTE writing.', experience_years: 2.5, proficiency: 86, display_order: 12 },
  { id: 's13', name: 'Supabase / Firebase', category: 'Backend', icon: 'cloud', description: 'Row level security tables, real-time channels, auth setups, and bucket handling.', experience_years: 2, proficiency: 90, display_order: 13 },
  { id: 's14', name: 'Docker', category: 'DevOps', icon: 'container', description: 'Containerizing full stack microservices for standardized server configurations.', experience_years: 1.5, proficiency: 80, display_order: 14 },
];

export const mockProjects: Project[] = [
  {
    id: 'ai-disease-analyzer',
    title: 'AI Disease Analyzer',
    category: 'AI & Machine Learning',
    description: 'Multi-modal diagnostic suite detecting chest pathologies from X-ray uploads and forecasting systemic diseases using symptom questionnaires.',
    problem_statement: 'High medical operational costs and limited availability of prompt screening tools in remote geographies delay patient treatments.',
    solution: 'Designed an app combining a ResNet-50 CNN model for image scanning and a Random Forest ensemble model for questionnaire triage.',
    features: [
      'Interactive chest X-ray scanning with confidence score mapping',
      'Advanced symptom checker covering 45+ general health markers',
      'Dynamic PDF report generator mapping predictions and health suggestions',
      'Realtime doctor consultation request dashboard'
    ],
    challenges: 'Normalizing heterogeneous clinic images with varying contrasts and resolutions.',
    future_scope: 'Integrating medical LLMs like BioBERT to provide citations to academic literature directly within patient reports.',
    role: 'Lead AI Engineer',
    duration: '4 Months',
    timeline: 'Jan 2025 - Apr 2025',
    status: 'Completed',
    github_url: 'https://github.com/ShanmugapriyanMA777/ai-disease-analyzer',
    live_url: 'https://ai-disease-analyzer.vercel.app',
    views: 1250,
    likes: 342,
    downloads: 120,
    display_order: 1,
    created_at: '2025-04-10T12:00:00Z',
    images: [{ image_url: '/images/projects/disease-analyzer-hero.jpg', is_hero: true }]
  },
  {
    id: 'fake-news-detection',
    title: 'Fake News Detection',
    category: 'AI & Machine Learning',
    description: 'Deceptive narrative detection platform utilizing natural language processing and ensemble classifier algorithms.',
    problem_statement: 'Misinformation propagates at a massive speed online, damaging societal discourse and trust.',
    solution: 'Created an NLP scraper extracting texts and scoring it using a voting ensemble of LSTM, XGBoost, and Naive Bayes.',
    features: [
      'Live URL extraction and credibility ranking',
      'Sarcasm and polarization analysis on scraped paragraphs',
      'Interactive dashboard plotting term-frequency metrics and vector clusters',
      'Crowdsourced feedback verification metrics'
    ],
    challenges: 'Overcoming bias in training corpora and capturing contextual irony.',
    future_scope: 'Developing social media browser extensions to flag false elements dynamically in-feed.',
    role: 'NLP Developer',
    duration: '3 Months',
    timeline: 'Sep 2024 - Nov 2024',
    status: 'Completed',
    github_url: 'https://github.com/ShanmugapriyanMA777/fake-news-detector',
    live_url: 'https://fake-news-detector.vercel.app',
    views: 890,
    likes: 198,
    downloads: 45,
    display_order: 2,
    created_at: '2024-11-20T12:00:00Z',
    images: [{ image_url: '/images/projects/fake-news-hero.jpg', is_hero: true }]
  },
  {
    id: 'power-bi-dashboards',
    title: 'Power BI Business Analytics',
    category: 'Power BI',
    description: 'Comprehensive business intelligence platform transforming raw operational spreadsheets into dynamic, real-time executive dashboard views.',
    problem_statement: 'Corporate departments struggle to align decision-making due to delayed, manual, and disconnected data reports.',
    solution: 'Architected unified star-schema databases loaded through custom Power Query pipelines, using DAX to calculate key business metrics.',
    features: [
      'Realtime executive landing showing YoY sales, profit margins, and inventory metrics',
      'Dynamic what-if parameters for financial forecasting and margin modeling',
      'Automated email notification updates triggered by critical KPI movements',
      'Role-based data security limits for localized stores'
    ],
    challenges: 'Optimizing dense DAX formulas across tens of millions of database rows to maintain snappy interactive performance.',
    future_scope: 'Integrating interactive Power BI dashboards into custom web panels with automatic SSO authentication.',
    role: 'Power BI Architect',
    duration: 'Ongoing',
    timeline: 'Aug 2024 - Present',
    status: 'Active',
    github_url: 'https://github.com/ShanmugapriyanMA777/powerbi-dashboards',
    live_url: 'https://app.powerbi.com/view?r=mock',
    views: 1450,
    likes: 289,
    downloads: 90,
    display_order: 3,
    created_at: '2024-08-15T12:00:00Z',
    images: [{ image_url: '/images/projects/powerbi-dashboards-hero.jpg', is_hero: true }]
  },
  {
    id: 'cloud-kitchen',
    title: 'Cloud Kitchen Platform',
    category: 'Full Stack Development',
    description: 'Multi-tenant cloud kitchen management platform featuring real-time ordering, automated dispatcher algorithms, and chef panels.',
    problem_statement: 'Traditional restaurants experience kitchen congestion and ordering mismatches when scaling across delivery aggregators.',
    solution: 'Built a Next.js 15 full-stack client using Supabase WebSockets to synchronize order ticket status live from consumer to kitchen.',
    features: [
      'Intuitive real-time order queue with acoustic warnings for hot-tickets',
      'Automated delivery routes recommendation using custom distance-matrix scripts',
      'Dynamic inventory tracker warning chefs when ingredients run below thresholds',
      'Stripe integration with support for split payouts'
    ],
    challenges: 'Maintaining sub-second state syncing across multiple simultaneous tablet connections.',
    future_scope: 'Incorporating predictive sales ML models to forecast weekly inventory ordering requirements.',
    role: 'Full Stack Engineer',
    duration: '4 Months',
    timeline: 'May 2024 - Aug 2024',
    status: 'Completed',
    github_url: 'https://github.com/ShanmugapriyanMA777/cloud-kitchen',
    live_url: 'https://cloud-kitchen.vercel.app',
    views: 1100,
    likes: 215,
    downloads: 72,
    display_order: 4,
    created_at: '2024-08-01T12:00:00Z',
    images: [{ image_url: '/images/projects/cloud-kitchen-hero.jpg', is_hero: true }]
  },
  {
    id: 'smart-attendance',
    title: 'Smart Attendance System',
    category: 'AI & Machine Learning',
    description: 'Biometric registration application using FaceNet and YOLOv8 to automatically track classroom attendance via security feeds.',
    problem_statement: 'Calling rolls manually wastes 10-15 minutes of lecture time and allows students to sign proxies.',
    solution: 'Deployed a facial detection camera module mapping facial embeddings to records in a central database in real time.',
    features: [
      'Multi-face recognition in crowded dynamic room lighting conditions',
      'Auto-generation of school registers with email notification alerts for absent students',
      'Secured database storing mathematical biometric hashes instead of photographs',
      'Teacher administration panel for quick audit corrections'
    ],
    challenges: 'Handling variations in pose and head tilt when mapping student faces.',
    future_scope: 'Adding anti-spoofing techniques checking for live iris micro-movement to prevent photo proxy entries.',
    role: 'Computer Vision Developer',
    duration: '5 Months',
    timeline: 'Feb 2024 - Jun 2024',
    status: 'Completed',
    github_url: 'https://github.com/ShanmugapriyanMA777/smart-attendance',
    live_url: 'https://smart-attend.vercel.app',
    views: 950,
    likes: 180,
    downloads: 50,
    display_order: 5,
    created_at: '2024-06-15T12:00:00Z',
    images: [{ image_url: '/images/projects/smart-attendance-hero.jpg', is_hero: true }]
  },
  {
    id: 'career-guidance-ai',
    title: 'Career Guidance AI',
    category: 'AI & Machine Learning',
    description: 'Intelligent chatbot platform assessing student skill scores and suggesting customized learning roadmaps and career paths.',
    problem_statement: 'High school and college graduates often lack access to professional mentoring, leading to misaligned career paths.',
    solution: 'Fitted Llama-3 API nodes with customized semantic retrieval layers mapping skills, academic grades, and preferences to industry titles.',
    features: [
      'Dynamic multi-turn skills evaluation interface',
      'Interactive skill gap node maps showing missing skills and suggested courses',
      'Tailored resume feedback suggestions leveraging keyword scanners',
      'Integrated job scraping nodes matching open positions to student skills'
    ],
    challenges: 'Limiting hallucinated details in career paths to ensure advice matches actual global requirements.',
    future_scope: 'Connecting live training providers (Coursera, Udemy) to pull and display active discounts.',
    role: 'AI Developer',
    duration: '3 Months',
    timeline: 'Nov 2023 - Jan 2024',
    status: 'Completed',
    github_url: 'https://github.com/ShanmugapriyanMA777/career-guidance-ai',
    live_url: 'https://career-ai.vercel.app',
    views: 1340,
    likes: 310,
    downloads: 95,
    display_order: 6,
    created_at: '2024-01-20T12:00:00Z',
    images: [{ image_url: '/images/projects/career-guidance-hero.jpg', is_hero: true }]
  },
  {
    id: 'queue-management',
    title: 'Queue Management System',
    category: 'Full Stack Development',
    description: 'Operational queuing platform optimized for high-traffic retail stores and public clinics to reduce wait bottlenecks.',
    problem_statement: 'Congested waiting rooms generate administrative confusion and decrease customer satisfaction metrics.',
    solution: 'Configured a virtual ticketing database offering automated SMS alerts as patients move closer to counter servicing.',
    features: [
      'Dynamic QR ticketing allowing users to register on mobile from their car',
      'Live wait time forecasts using historical service pace math',
      'Operator console for ticketing call-outs and customer routing',
      'Comprehensive administrative dashboards monitoring agent servicing rates'
    ],
    challenges: 'Structuring real-time databases to prevent transaction locks when multiple queues updates hit simultaneously.',
    future_scope: 'Using linear programming equations to automatically scale open customer counters based on inflow.',
    role: 'Backend Developer',
    duration: '3 Months',
    timeline: 'Aug 2023 - Oct 2023',
    status: 'Completed',
    github_url: 'https://github.com/ShanmugapriyanMA777/queue-system',
    live_url: 'https://queueless.vercel.app',
    views: 780,
    likes: 120,
    downloads: 30,
    display_order: 7,
    created_at: '2023-10-10T12:00:00Z',
    images: [{ image_url: '/images/projects/queue-hero.jpg', is_hero: true }]
  },
  {
    id: 'blood-donation',
    title: 'Blood Donation System',
    category: 'Full Stack Development',
    description: 'Geolocalized donation network pairing emergency hospitals and active blood donors through automated alerts.',
    problem_statement: 'Finding specific blood groups in emergency surgeries often takes critical hours due to fragmented communication.',
    solution: 'Built a map-based dashboard grouping local donors and triggering alerts via Telegram/SMS APIs based on distance parameters.',
    features: [
      'Interactive maps showing active donor locations with distance filter settings',
      'One-click emergency broadcast triggers alerting specific group matches within a 10km radius',
      'Donation log tracker calculating mandatory rest windows between donations',
      'Privacy controls ensuring user contact info is only shared with verified medical personnel'
    ],
    challenges: 'Securing user GPS coordinate logs while retaining exact mapping functions.',
    future_scope: 'Integrating hospital inventory logs to dynamically broadcast shortage warnings.',
    role: 'Lead Architect',
    duration: '4 Months',
    timeline: 'Mar 2023 - Jun 2023',
    status: 'Completed',
    github_url: 'https://github.com/ShanmugapriyanMA777/blood-network',
    live_url: 'https://blood-share.vercel.app',
    views: 920,
    likes: 175,
    downloads: 40,
    display_order: 8,
    created_at: '2023-06-20T12:00:00Z',
    images: [{ image_url: '/images/projects/blood-donation-hero.jpg', is_hero: true }]
  },
  {
    id: 'mentor-portal',
    title: 'Mentor Portal',
    category: 'Full Stack Development',
    description: 'Academic interaction application for scheduling, hosting live student consultations, and tracking progress logs.',
    problem_statement: 'Connecting with faculty advisors outside of classroom lectures is highly disjointed over emails and notes.',
    solution: 'Designed a Next.js portal incorporating Google calendar sync, markdown progress summaries, and notification cards.',
    features: [
      'Dynamic schedule availability setter synced directly with faculty calendars',
      'One-on-one video call logs tracking assignment completions',
      'Integrated text channel with support for rich-media attachment uploads',
      'Automated email warnings for missed consultations'
    ],
    challenges: 'Synchronizing multi-zone calendar updates and resolving double-booking overlaps.',
    future_scope: 'Incorporating AI transcription engines to write brief minutes of meetings automatically.',
    role: 'React Frontend Developer',
    duration: '3 Months',
    timeline: 'Dec 2022 - Feb 2023',
    status: 'Completed',
    github_url: 'https://github.com/ShanmugapriyanMA777/mentor-portal',
    live_url: 'https://mentor-portal.vercel.app',
    views: 650,
    likes: 110,
    downloads: 25,
    display_order: 9,
    created_at: '2023-02-28T12:00:00Z',
    images: [{ image_url: '/images/projects/mentor-portal-hero.jpg', is_hero: true }]
  },
  {
    id: 'emotion-analyzer',
    title: 'Emotion Analyzer',
    category: 'AI & Machine Learning',
    description: 'Facial micro-expression and speech tone classifier tracking customer feedback indexes during video sessions.',
    problem_statement: 'Quantifying exact client emotional responses in user testing calls is subjective and error-prone.',
    solution: 'Fused a convolutional neural network (for face feed frames) and an LSTM network (for voice pitch analysis).',
    features: [
      'Simultaneous facial and speech capture models',
      'Realtime emotion breakdown logs (Happy, Attentive, Confused, Frustrated, Disinterested)',
      'Timestamp reports showing drop-offs in customer focus matching specific demo events',
      'Encrypted client video feeds with client anonymizer masks'
    ],
    challenges: 'Compensating for low lighting and audio echoing on home micro-cameras.',
    future_scope: 'Deploying this as a Zoom integration to help educators measure engagement levels.',
    role: 'Deep Learning Engineer',
    duration: '4 Months',
    timeline: 'Sep 2022 - Dec 2022',
    status: 'Completed',
    github_url: 'https://github.com/ShanmugapriyanMA777/emotion-analyzer',
    live_url: 'https://emotion-check.vercel.app',
    views: 1040,
    likes: 243,
    downloads: 65,
    display_order: 10,
    created_at: '2022-12-15T12:00:00Z',
    images: [{ image_url: '/images/projects/emotion-hero.jpg', is_hero: true }]
  }
];

export const mockExperience: Experience[] = [
  {
    id: 'exp1',
    company: 'AI Research Lab',
    position: 'AI Engineer Intern',
    description: 'Researched and trained deep learning models for medical image diagnostics and NLP sequence processing.',
    achievements: [
      'Boosted disease classifier accuracy by 6.2% by integrating custom residual blocks',
      'Automated data augmentation routines speeding up dataset preparation times by 40%',
      'Co-authored scientific documentation for computer vision pipelines',
    ],
    start_date: '2024-06-01',
    end_date: '2024-12-31',
    is_current: false,
    logo_url: '/images/logos/research-lab.png',
  },
  {
    id: 'exp2',
    company: 'Freelance Tech Services',
    position: 'Full Stack & Data Consultant',
    description: 'Developed high-converting web applications and interactive business intelligence systems for regional businesses.',
    achievements: [
      'Built 5+ client dashboards in Power BI resulting in an average 18% cost efficiency identification',
      'Created serverless Next.js landing pages with sub-second loading speeds',
      'Maintained 100% database uptime by hosting and optimizing PostgreSQL instances on Supabase',
    ],
    start_date: '2023-01-15',
    end_date: null,
    is_current: true,
    logo_url: '/images/logos/freelance.png',
  },
];

export const mockEducation: Education[] = [
  {
    id: 'edu1',
    institution: 'Anna University Affiliated Institution',
    degree: 'Bachelor of Engineering (B.E.)',
    field_of_study: 'Computer Science and Engineering',
    grade: '8.9 CGPA',
    achievements: [
      'Placed 1st in annual college hackathon for building an emergency alert application',
      'Secretary of the Student Computer Science Society',
      'Graduated with Distinction in core algorithm modules',
    ],
    start_date: '2021-08-01',
    end_date: '2025-05-31',
    logo_url: '/images/logos/university.png',
  },
];

export const mockCertificates: Certificate[] = [
  {
    id: 'c1',
    title: 'Artificial Intelligence Fundamentals',
    issuer: 'IBM SkillsBuild',
    credential_id: 'IBM-AI-FUND-2026',
    verification_url: 'https://www.credly.com/badges/d93da1ad-8313-4ce9-bb08-22b533716cc7',
    thumbnail_url: '/images/certificates/Screenshot_20260719-162624_LinkedIn.png',
    issue_date: '2026-02-26',
    description: 'Verification of foundational understanding in AI models, neural network layers, deep learning logic, and ethical AI architectures.',
    category: 'AI & Machine Learning',
    views: 154,
  },
  {
    id: 'c2',
    title: 'Data Science 101',
    issuer: 'IBM SkillsBuild',
    credential_id: 'IBM-DS-101',
    verification_url: 'https://courses.yl-ptech.skillsnetwork.site/certificates/967cbda121094eee839131f950b534cc',
    thumbnail_url: '/images/certificates/Screenshot_20260719-162634_LinkedIn.png',
    issue_date: '2026-03-07',
    description: 'Foundations of data science, analysis pipelines, algorithms, programming languages, and industry applications.',
    category: 'Data Science',
    views: 120,
  },
  {
    id: 'c3',
    title: 'Fundamentals of Machine Learning and Artificial Intelligence',
    issuer: 'Amazon Web Services (AWS)',
    credential_id: 'AWS-ML-AI-FUND',
    verification_url: 'https://aws.amazon.com/verification',
    thumbnail_url: '/images/certificates/Screenshot_20260719-162650_LinkedIn.png',
    issue_date: '2026-01-18',
    description: 'Core concepts of machine learning models, cloud intelligence, dataset pre-processing, training algorithms, and inference pipelines on AWS.',
    category: 'AI & Machine Learning',
    views: 215,
  },
  {
    id: 'c4',
    title: 'Data Analytics Job Simulation',
    issuer: 'Deloitte',
    credential_id: 'DELOITTE-DA-SIM',
    verification_url: 'https://theforage.com/verify',
    thumbnail_url: '/images/certificates/Screenshot_20260719-162713_LinkedIn.png',
    issue_date: '2025-12-24',
    description: 'Completed simulations involving forensic technology, forensic data analysis, schema building, dashboards, and reporting.',
    category: 'Data Science',
    views: 180,
  },
  {
    id: 'c5',
    title: 'Gemini Certified Faculty',
    issuer: 'Google for Education',
    credential_id: 'GOOGLE-GEMINI-FAC',
    verification_url: 'https://education.google.com',
    thumbnail_url: '/images/certificates/Screenshot_20260719-162725_LinkedIn.png',
    issue_date: '2025-12-18',
    description: 'Demonstrated advanced knowledge, skills, and competencies needed to leverage Google AI and Gemini models in education frameworks.',
    category: 'Generative AI',
    views: 320,
  },
  {
    id: 'c6',
    title: 'Introduction to Data Science',
    issuer: 'Simplilearn SkillUp',
    credential_id: 'SIMPLI-DS-INTRO-9577738',
    verification_url: 'https://simplilearn.com',
    thumbnail_url: '/images/certificates/Screenshot_20260719-162736_LinkedIn.png',
    issue_date: '2025-12-13',
    description: 'Foundational concepts of data manipulation, data analytics, predictive modeling, and tools in data science.',
    category: 'Data Science',
    views: 165,
  },
  {
    id: 'c7',
    title: 'Designing Blockchain Solutions using Amazon Managed Blockchain',
    issuer: 'Amazon Web Services (AWS)',
    credential_id: 'AWS-BLOCKCHAIN-SOL',
    verification_url: 'https://aws.amazon.com/verification',
    thumbnail_url: '/images/certificates/Screenshot_20260719-162746_LinkedIn.png',
    issue_date: '2025-12-12',
    description: 'Designing and deploying decentralized ledgers and distributed networks using Amazon Managed Blockchain.',
    category: 'Cloud & DevOps',
    views: 140,
  },
  {
    id: 'c8',
    title: 'Exam Prep Plan: AWS Certified AI Practitioner (AIF-C01)',
    issuer: 'Amazon Web Services (AWS)',
    credential_id: 'AWS-AI-PRAC-PREP',
    verification_url: 'https://aws.amazon.com/verification',
    thumbnail_url: '/images/certificates/Screenshot_20260719-162811_LinkedIn.png',
    issue_date: '2025-12-10',
    description: 'Prep framework mapping machine learning terms, model metrics, LLMs, and prompt engineering tools on AWS.',
    category: 'AI & Machine Learning',
    views: 195,
  },
  {
    id: 'c9',
    title: 'Getting Started with AI on Jetson Nano',
    issuer: 'NVIDIA',
    credential_id: 'NVIDIA-JETSON-nglgUf1fTsykl2OXUYnlaw',
    verification_url: 'https://courses.nvidia.com',
    thumbnail_url: '/images/certificates/Screenshot_20260719-162823_LinkedIn.png',
    issue_date: '2025-12-08',
    description: 'Building deep learning models, image classification, object detection on the NVIDIA Jetson Nano edge processor.',
    category: 'AI & Machine Learning',
    views: 250,
  },
  {
    id: 'c10',
    title: 'Machine Learning Terminology and Process',
    issuer: 'Amazon Web Services (AWS)',
    credential_id: 'AWS-ML-PROCESS',
    verification_url: 'https://aws.amazon.com/verification',
    thumbnail_url: '/images/certificates/Screenshot_20260719-162837_LinkedIn.png',
    issue_date: '2025-12-10',
    description: 'Understanding dataset partitioning, hyperparameter tuning, model verification steps, training processes, and metrics.',
    category: 'AI & Machine Learning',
    views: 140,
  },
  {
    id: 'c11',
    title: 'Gemini for Google Workspace',
    issuer: 'Simplilearn SkillUp',
    credential_id: 'SIMPLI-GEMINI-GW-8663412',
    verification_url: 'https://simplilearn.com',
    thumbnail_url: '/images/certificates/Screenshot_20260719-162852_LinkedIn.png',
    issue_date: '2025-07-21',
    description: 'Leveraging Google Gemini to draft copy, construct spreadsheets, formulate presentation slides, and manage workspace tasks.',
    category: 'Generative AI',
    views: 290,
  },
  {
    id: 'c12',
    title: 'Introduction to Generative AI Studio',
    issuer: 'Simplilearn SkillUp',
    credential_id: 'SIMPLI-GENAI-STUDIO-8260624',
    verification_url: 'https://simplilearn.com',
    thumbnail_url: '/images/certificates/Screenshot_20260719-162903_LinkedIn.png',
    issue_date: '2025-04-27',
    description: 'Understanding Vertex AI Generative AI Studio, fine-tuning large language models, setting temperature parameters, and prototype builds.',
    category: 'Generative AI',
    views: 310,
  },
  {
    id: 'c13',
    title: 'Software Engineering Job Simulation',
    issuer: 'Accenture',
    credential_id: 'ACCENTURE-SE-SIM',
    verification_url: 'https://theforage.com/verify',
    thumbnail_url: '/images/certificates/Screenshot_20260719-162925_LinkedIn.png',
    issue_date: '2025-05-30',
    description: 'Completed simulations involving agile workflow boards, system architecture design, database relationships, security validation, and debugging.',
    category: 'Software Engineering',
    views: 230,
  },
  {
    id: 'c14',
    title: 'Artificial Intelligence & Machine Learning Internship',
    issuer: 'Edunet Foundation',
    credential_id: 'EDUNET-AICTE-STU68358b86933e91748339590',
    verification_url: 'https://edunetfoundation.org',
    thumbnail_url: '/images/certificates/Screenshot_20260719-162943_LinkedIn.png',
    issue_date: '2026-02-26',
    description: 'Completed 6-week hands-on industrial internship in collaboration with AICTE and IBM SkillsBuild, training model checkpoints and evaluating metrics.',
    category: 'AI & Machine Learning',
    views: 280,
  },
  {
    id: 'c15',
    title: 'Generative AI for Educators with Gemini',
    issuer: 'Google',
    credential_id: 'GOOGLE-GENAI-EDU-467775397',
    verification_url: 'https://grow.google',
    thumbnail_url: '/images/certificates/Screenshot_20260719-163001_LinkedIn.png',
    issue_date: '2026-06-16',
    description: 'Google certification for leveraging Generative AI, constructing structured prompts, designing lesson plans, and grading matrices using Gemini.',
    category: 'Generative AI',
    views: 395,
  },
  {
    id: 'c16',
    title: 'AI Foundations',
    issuer: 'OpenAI Academy',
    credential_id: 'OPENAI-ACAD-zmlw576kkd',
    verification_url: 'https://academy.openai.com/public/certificate/zmlw576kkd',
    thumbnail_url: '/images/certificates/Screenshot_20260719-163016_LinkedIn.png',
    issue_date: '2026-06-16',
    description: 'Comprehensive training covering token embeddings, transformers, fine-tuning processes, reinforcement learning from human feedback (RLHF), and API architectures.',
    category: 'AI & Machine Learning',
    views: 450,
  },
];

export const mockAchievements: Achievement[] = [
  { id: 'a1', title: 'Hackathon Winner (1st / 80)', issuer: 'Google Developer Student Clubs', description: 'Placed first overall for building a smart logistics route optimizer.', date: '2024-10-15', credential_url: 'https://gdsc.community.dev/events/mock' },
  { id: 'a2', title: 'Outstanding Contributor', issuer: 'IBM Academic Initiative', description: 'Awarded for exceptional execution of deep learning models during collaborative challenges.', date: '2024-03-22', credential_url: 'https://ibm.com/verify' },
  { id: 'a3', title: 'Elite Gold Candidate', issuer: 'NPTEL (IIT Madras)', description: 'Ranked in the top 1% nationally in the Python and Database Design course examinations.', date: '2023-11-10', credential_url: 'https://nptel.ac.in/noc' },
];

export const mockServices: Service[] = [
  {
    id: 'ser1',
    name: 'AI & Machine Learning Development',
    description: 'Building custom predictive models, text analyzers, and computer vision classification nodes.',
    icon: 'cpu',
    price_range: '$1,500 - $5,000',
    features: [
      'Dataset preprocessing, cleanup, and augmentations',
      'Training CNNs, RNNs, and custom ensemble classifiers',
      'API deployment with Docker containers',
      '1 Month of model retraining support post-launch'
    ]
  },
  {
    id: 'ser2',
    name: 'Power BI Business Intelligence',
    description: 'Consolidating corporate reporting databases into elegant, fast, and visual star-schema dashboards.',
    icon: 'bar-chart-3',
    price_range: '$800 - $3,000',
    features: [
      'Advanced DAX queries and parameters setup',
      'Automated ETL data ingestion pipelines',
      'Custom theme design matching corporate branding',
      'SSO cloud sharing configurations'
    ]
  },
  {
    id: 'ser3',
    name: 'Premium Full-Stack Web Development',
    description: 'Creating ultra-responsive Next.js web products with rich animations, SEO tags, and database portals.',
    icon: 'chrome',
    price_range: '$2,000 - $6,000',
    features: [
      'Full TypeScript Next.js 15 App router architectures',
      'Supabase serverless database and auth configurations',
      'Rich visuals using Framer Motion and GSAP scroll indicators',
      'Vercel continuous integration pipelines'
    ]
  }
];

export const mockBlogs: Blog[] = [
  {
    id: 'b1',
    title: 'Deploying Deep Learning Models on the Edge: A Practical Guide',
    slug: 'deploying-deep-learning-on-edge',
    summary: 'How to optimize computer vision architectures like CNNs and YOLO to run efficiently on small mobile or embedded devices without sacrificing classification accuracy.',
    content: `
# Deploying Deep Learning Models on the Edge

Machine learning models have achieved record success across imaging and diagnostics. However, training a massive 150M parameter model and hosting it on a heavy GPU cluster is very different from running diagnostics locally on a tablet in a rural clinic.

In this guide, we will walk through the critical techniques required to squeeze neural models into edge-compliant formats.

## 1. Post-Training Quantization (PTQ)

By default, neural model weights are stored as 32-bit floating-point values (\`FP32\`). Quantization reduces this numerical precision. Converting weights from \`FP32\` to 8-bit integers (\`INT8\`) decreases the model size by **75%**!

\`\`\`python
import tensorflow as tf

converter = tf.lite.TFLiteConverter.from_saved_model(saved_model_dir)
converter.optimizations = [tf.lite.Optimize.DEFAULT]
tflite_quant_model = converter.convert()
\`\`\`

## 2. Knowledge Distillation

Distillation trains a small "student" network to emulate the output distribution profile of a heavy "teacher" network. The student learns the decision boundary manifolds without carrying the parameter overhead.

## 3. Pruning Unused Neurons

Pruning identifies weight connections that stay close to zero during activation and trims them from the network matrices, yielding sparse maps that compress to fraction values.
    `,
    cover_image: '/images/blog/edge-ai.jpg',
    is_published: true,
    published_at: '2026-05-12T09:00:00Z',
    views: 450,
    likes: 82,
    tags: ['AI', 'Deep Learning', 'Edge Computing', 'Python'],
    category: 'AI & Machine Learning',
    created_at: '2026-05-12T09:00:00Z'
  },
  {
    id: 'b2',
    title: 'Optimizing Power BI Performance: DAX Variables & Schemas',
    slug: 'optimizing-powerbi-performance-dax',
    summary: 'A look at how star schema organization and utilizing local DAX variables can reduce visual rendering times from 10 seconds to sub-seconds on massive enterprise spreadsheets.',
    content: `
# Optimizing Power BI Performance

Corporate reports often slow down as companies accumulate multi-million row sales registers. A loading indicator spinning for 10 seconds ruins the decision-making dashboard flow.

Here are two primary changes that will solve database lags.

## 1. Avoid Flat Tables - Adopt the Star Schema

Consolidating everything into one giant sheet forces Power BI to scan wide rows repeatedly. Instead:
- Separate your data into **Fact Tables** (containing transaction metrics, sales counts, costs)
- Link them to narrow **Dimension Tables** (containing lookups for users, locations, product category tags)

This creates a clean **Star Schema** relationship map.

## 2. Calculate with DAX Variables (\`VAR\`)

Calculating a metric multiple times inside filters causes the engine to re-evaluate it on every loop. Store it in a local variable instead to lock the value.

\`\`\`dax
// Poor Performance
YoY Sales Growth = 
DIVIDE(
    [Total Sales] - CALCULATE([Total Sales], SAMEPERIODLASTYEAR(Calendar[Date])),
    CALCULATE([Total Sales], SAMEPERIODLASTYEAR(Calendar[Date]))
)

// Optimized Performance
YoY Sales Growth Optimized = 
VAR CurrentSales = [Total Sales]
VAR LastYearSales = CALCULATE([Total Sales], SAMEPERIODLASTYEAR(Calendar[Date]))
RETURN
DIVIDE(CurrentSales - LastYearSales, LastYearSales)
\`\`\`
    `,
    cover_image: '/images/blog/powerbi-optimization.jpg',
    is_published: true,
    published_at: '2026-06-02T10:00:00Z',
    views: 380,
    likes: 67,
    tags: ['Power BI', 'DAX', 'Data Analytics', 'Databases'],
    category: 'Power BI',
    created_at: '2026-06-02T10:00:00Z'
  }
];
