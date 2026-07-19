-- Supabase Seed Data for Shanmugapriyan's Portfolio Website

-- 1. Profile Seed
INSERT INTO public.profiles (id, name, role, bio, avatar_url, resume_url, email, phone, location, whatsapp_url, calendar_url, github_username, leetcode_username)
VALUES (
    'd8b76c8c-1e64-44df-bb62-63bc58b292e1',
    'Shanmugapriyan',
    'AI Engineer | Machine Learning Engineer | Full Stack Developer | Power BI Developer',
    'Elite software engineer and AI researcher specialized in building intelligent systems, full-stack platforms, and data-driven business intelligence dashboards. Experienced in bridging the gap between deep mathematical ML models and highly aesthetic, responsive user experiences.',
    '/images/profile.jpg',
    '/resume.pdf',
    'mashanmugapriyan777@gmail.com',
    '+91 98765 43210',
    'Tamil Nadu, India',
    'https://wa.me/919876543210',
    'https://calendly.com/shanmugapriyan',
    'ShanmugapriyanMA777',
    'shanmugapriyan_leetcode'
) ON CONFLICT (id) DO NOTHING;

-- 2. Social Links Seed
INSERT INTO public.social_links (platform, url, icon, display_order) VALUES
('GitHub', 'https://github.com/ShanmugapriyanMA777', 'github', 1),
('LinkedIn', 'https://www.linkedin.com/in/shanmuga-priyan-m-a-b53889321', 'linkedin', 2),
('LeetCode', 'https://leetcode.com/shanmugapriyan_leetcode', 'code', 3),
('Twitter', 'https://twitter.com/shanmugapriyan', 'twitter', 4),
('Email', 'mailto:mashanmugapriyan777@gmail.com', 'mail', 5)
ON CONFLICT DO NOTHING;

-- 3. Skills Seed
INSERT INTO public.skills (name, category, icon, description, experience_years, proficiency, display_order) VALUES
-- AI & ML
('Python', 'AI & ML', 'python', 'Primary language for ML modeling, deep learning architectures, and scripting.', 3, 95, 1),
('PyTorch', 'AI & ML', 'cpu', 'Deep learning framework for training neural networks, custom layers, and CNNs.', 2, 88, 2),
('TensorFlow', 'AI & ML', 'activity', 'Building, optimization, and export of neural network models (Keras/TF-Lite).', 2, 85, 3),
('Scikit-Learn', 'AI & ML', 'database', 'Machine learning algorithms, preprocessing pipelines, clustering, and regression.', 3, 92, 4),
('Natural Language Processing', 'AI & ML', 'message-square', 'Transformers, BERT, sentiment analysis, text classification, and tokenization.', 2, 87, 5),
('Computer Vision', 'AI & ML', 'eye', 'OpenCV, YOLO, image classification, object detection, and face recognition.', 2, 90, 6),
-- Data Visualization
('Power BI', 'Power BI', 'bar-chart-3', 'Creating interactive corporate dashboards, DAX queries, ETL pipelines, and reporting.', 2, 95, 7),
('DAX & Power Query', 'Power BI', 'terminal', 'Data analysis expressions, advanced parameters, and clean tabular data modeling.', 2, 90, 8),
-- Frontend
('Next.js', 'Frontend', 'chrome', 'React framework for server-side rendering, static site generation, and optimized routes.', 2, 92, 9),
('React.js', 'Frontend', 'atom', 'Modern single page apps using Hooks, Context API, React Query, and state managers.', 3, 94, 10),
('TypeScript', 'Frontend', 'shield', 'Statically typed JavaScript for enterprise-grade, clean, self-documenting codebases.', 2, 90, 11),
('Tailwind CSS', 'Frontend', 'palette', 'Utility-first CSS framework for fast styling and beautiful, fully responsive designs.', 3, 96, 12),
-- Backend & Database
('Node.js / Express', 'Backend', 'server', 'Scalable RESTful API backends, middleware, token authentication, and web sockets.', 2, 88, 13),
('PostgreSQL', 'Databases', 'database', 'Relational database schema designs, window functions, custom triggers, and RLS.', 2, 85, 14),
('Supabase', 'Backend', 'cloud', 'Backend-as-a-service, handling realtime databases, auth, edge functions, and storage.', 2, 90, 15),
-- Cloud & DevOps
('AWS', 'Cloud', 'cloud-lightning', 'Cloud deployments, EC2, S3 bucket storage, Lambda serverless, and IAM policies.', 1.5, 80, 16),
('Docker', 'DevOps', 'container', 'Containerization of full-stack services for consistency across environments.', 1.5, 82, 17),
('Git & GitHub Actions', 'DevOps', 'git-branch', 'Source control management and custom CI/CD build/test/deployment pipelines.', 3, 92, 18)
ON CONFLICT DO NOTHING;

-- 4. Projects Seed
INSERT INTO public.projects (id, title, category, description, problem_statement, solution, features, challenges, future_scope, role, duration, timeline, status, github_url, live_url, display_order)
VALUES
(
    'a7b76c8c-1e64-44df-bb62-63bc58b292a1',
    'AI Disease Analyzer',
    'AI & ML',
    'Deep learning-based diagnostic tool analyzing user symptoms, laboratory datasets, and medical scans to forecast potential ailments with high predictive confidence.',
    'A shortage of medical practitioners in rural areas leads to delayed diagnoses and poor healthcare accessibility.',
    'Developed an integrated CNN and Random Forest modeling architecture that screens chest X-rays and inputs symptoms to generate instant preliminary diagnostic reports.',
    ARRAY['Multi-modal disease prediction (X-Ray uploads and symptom questionnaires)', 'Pre-trained ResNet-50 CNN model achieving 94.6% accuracy on chest conditions', 'Interactive clinical dashboard for doctor review and patient appointment scheduling', 'PDF report builder containing symptom breakdown, model confidence metrics, and health tips'],
    'Optimizing the CNN to run on edge/mobile devices with minimal memory latency.',
    'Integration with EHR/EMR clinical databases via HL7 FHIR standards for automated hospital charting.',
    'Lead AI Engineer & Backend Architect',
    '4 Months',
    'Jan 2025 - Apr 2025',
    'Completed',
    'https://github.com/ShanmugapriyanMA777/ai-disease-analyzer',
    'https://ai-disease-analyzer.vercel.app',
    1
),
(
    'a7b76c8c-1e64-44df-bb62-63bc58b292a2',
    'Fake News Detection',
    'AI & ML',
    'NLP text classifier detecting deceptive news items, propaganda articles, and online rumors using TF-IDF vectorization and ensemble learning algorithms.',
    'Rapid dissemination of digital misinformation destabilizes social consensus and polarizes public opinion.',
    'Built a TF-IDF text preprocessing pipeline combined with an ensemble Voting Classifier (LSTM, XGBoost, and Naive Bayes) to rank news credibility.',
    ARRAY['Real-time web URL credibility checker via scraping and text analysis', 'Comprehensive NLP preprocessing (stopword extraction, lemmatization, sentiment score tracking)', 'Interactive dashboard showing term frequency matrices and prediction confidences', 'User rating feedback loop to crowdsource truth verification'],
    'Handling sarcastic text and contextual subtleties that confuse baseline NLP bag-of-words models.',
    'Deploying dynamic graph neural networks (GNNs) to track news propagation trees across social media platforms.',
    'ML Developer',
    '3 Months',
    'Sep 2024 - Nov 2024',
    'Completed',
    'https://github.com/ShanmugapriyanMA777/fake-news-detector',
    'https://news-verifier.vercel.app',
    2
),
(
    'a7b76c8c-1e64-44df-bb62-63bc58b292a3',
    'Power BI Business Dashboards',
    'Power BI',
    'Corporate operational analytics suite displaying sales trends, logistical efficiency, financial summaries, and inventory health using advanced DAX modeling.',
    'Managers struggle to consolidate raw ERP spreadsheets into actionable decision points in real-time.',
    'Configured automated ETL pipelines loading raw data into visual layouts utilizing HSL-curated colors, star schemas, and dynamic target indicators.',
    ARRAY['Unified landing executive summarizing overall profit margins and YoY growth', 'Dynamic parameter selection allowing instant region, store, and product category filtering', 'Advanced DAX scripts calculations for rolling 12-month metrics and cohort churn rates', 'Role-based security permissions restricting regional managers to localized data rows'],
    'Optimizing complex DAX calculations across large tables without performance lags in cloud reports.',
    'Implementing Power BI Embedded packages inside Next.js corporate dashboards with automated row-level filters.',
    'Power BI Developer',
    'Ongoing',
    'Aug 2024 - Present',
    'Active',
    'https://github.com/ShanmugapriyanMA777/powerbi-dashboards',
    'https://app.powerbi.com/view?r=mock',
    3
),
(
    'a7b76c8c-1e64-44df-bb62-63bc58b292a4',
    'Smart Attendance System',
    'AI & ML',
    'Facial recognition-based attendance tracking platform leveraging YOLOv8 object detection and Facenet embeddings for seamless institutional register management.',
    'Manual attendance logging wastes teaching time and is highly prone to proxy signing.',
    'Constructed an automated IP-camera feed system that detects faces in a lecture room, extracts biometric vectors, matches records, and logs database entries.',
    ARRAY['Real-time multi-face detection and vector pairing in high-density conditions', 'Automated entry/exit timestamps synced directly with school PostgreSQL databases', 'Teacher panel for manual corrections, analytics, and CSV log exporting', 'Secure biometric encryption preventing storage of raw facial images'],
    'Minimizing vector matching latency when dealing with hundreds of registered students.',
    'Integrating anti-spoofing algorithms to detect attempts using physical photographs or mobile screens.',
    'Computer Vision Engineer',
    '5 Months',
    'Feb 2024 - Jun 2024',
    'Completed',
    'https://github.com/ShanmugapriyanMA777/smart-attendance',
    'https://smart-attend.vercel.app',
    4
) ON CONFLICT (id) DO NOTHING;

-- 5. Project Images Seed (Hero Images)
INSERT INTO public.project_images (project_id, image_url, is_hero, display_order) VALUES
('a7b76c8c-1e64-44df-bb62-63bc58b292a1', '/images/projects/disease-analyzer-hero.jpg', true, 1),
('a7b76c8c-1e64-44df-bb62-63bc58b292a2', '/images/projects/fake-news-hero.jpg', true, 1),
('a7b76c8c-1e64-44df-bb62-63bc58b292a3', '/images/projects/powerbi-dashboards-hero.jpg', true, 1),
('a7b76c8c-1e64-44df-bb62-63bc58b292a4', '/images/projects/smart-attendance-hero.jpg', true, 1)
ON CONFLICT DO NOTHING;

-- 6. Experience Seed
INSERT INTO public.experience (company, position, description, achievements, start_date, end_date, is_current, logo_url, display_order) VALUES
(
    'AI Research Lab',
    'AI Engineer Intern',
    'Researched and trained deep learning models for medical image diagnostics and NLP sequence processing.',
    ARRAY['Boosted disease classifier accuracy by 6.2% by integrating custom residual blocks', 'Automated data augmentation routines speeding up dataset preparation times by 40%', 'Co-authored scientific documentation for computer vision pipelines'],
    '2024-06-01', '2024-12-31', false, '/images/logos/research-lab.png', 1
),
(
    'Freelance Tech Services',
    'Full Stack & Data Consultant',
    'Developed high-converting web applications and interactive business intelligence systems for regional businesses.',
    ARRAY['Built 5+ client dashboards in Power BI resulting in an average 18% cost efficiency identification', 'Created serverless Next.js landing pages with sub-second loading speeds', 'Maintained 100% database uptime by hosting and optimizing PostgreSQL instances on Supabase'],
    '2023-01-15', null, true, '/images/logos/freelance.png', 2
) ON CONFLICT DO NOTHING;

-- 7. Education Seed
INSERT INTO public.education (institution, degree, field_of_study, grade, achievements, start_date, end_date, logo_url, display_order) VALUES
(
    'Anna University affiliated college',
    'Bachelor of Engineering',
    'Computer Science and Engineering',
    '8.9 CGPA',
    ARRAY['Placed 1st in annual college hackathon for building an emergency alert application', 'Secretary of the Student Computer Science Society', 'Graduated with Distinction in core algorithm modules'],
    '2021-08-01', '2025-05-31', '/images/logos/university.png', 1
) ON CONFLICT DO NOTHING;

-- 8. Achievements Seed
INSERT INTO public.achievements (title, issuer, description, date, credential_url, display_order) VALUES
('Hackathon Winner', 'Google Developer Student Clubs', 'First place among 80 competing teams for developing a smart logistics routing prototype.', '2024-10-15', 'https://gdsc.community.dev/events/mock', 1),
('Outstanding Contributor Award', 'IBM Academic Initiative', 'Awarded for completing advanced research models in Deep Learning & Neural Networks.', '2024-03-22', 'https://ibm.com/verify/mock', 2),
('Elite Gold Certification', 'NPTEL (IIT Madras)', 'Ranked in the top 1% candidates nationally in Python and Database Systems examinations.', '2023-11-10', 'https://nptel.ac.in/noc/mock', 3)
ON CONFLICT DO NOTHING;
