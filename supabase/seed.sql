-- ========================================================
-- MYFOLIO SUPABASE SEED DATA (DML)
-- Pre-populating Portfolio Database for Mouhamed Ndione
-- ========================================================

-- 1. Insert Categories
INSERT INTO public.categories (id, name_fr, name_en, slug) VALUES
(1, 'Développement Web & SaaS', 'Web Development & SaaS', 'web'),
(2, 'Applications Mobiles', 'Mobile Applications', 'mobile'),
(3, 'Design UI/UX & Graphique', 'UI/UX & Graphic Design', 'design'),
(4, 'Architecture Full-Stack', 'Full-Stack Architecture', 'fullstack')
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Skills (Technical Ecosystem - 54 Skills)
INSERT INTO public.skills (id, name, category, level_percentage, proficiency_label) VALUES
-- Languages & OOP
(1, 'Java', 'Languages & OOP', 90, 'Advanced'),
(2, 'Python', 'Languages & OOP', 88, 'Advanced'),
(3, 'C', 'Languages & OOP', 82, 'Intermediate'),
(4, 'PHP', 'Languages & OOP', 92, 'Expert'),
(5, 'JavaScript', 'Languages & OOP', 95, 'Expert'),
(6, 'TypeScript', 'Languages & OOP', 92, 'Expert'),
(7, 'Dart', 'Languages & OOP', 85, 'Advanced'),
(8, 'Kotlin', 'Languages & OOP', 84, 'Advanced'),
(9, 'XML', 'Languages & OOP', 90, 'Advanced'),
(10, 'JSON', 'Languages & OOP', 98, 'Expert'),

-- Front-end & Web Solutions (CMS)
(11, 'Next.js', 'Front-end & Web Solutions (CMS)', 95, 'Expert'),
(12, 'React', 'Front-end & Web Solutions (CMS)', 95, 'Expert'),
(13, 'Angular', 'Front-end & Web Solutions (CMS)', 84, 'Advanced'),
(14, 'Vue.js', 'Front-end & Web Solutions (CMS)', 82, 'Advanced'),
(15, 'HTML5', 'Front-end & Web Solutions (CMS)', 98, 'Expert'),
(16, 'CSS3', 'Front-end & Web Solutions (CMS)', 95, 'Expert'),
(17, 'Tailwind CSS', 'Front-end & Web Solutions (CMS)', 96, 'Expert'),
(18, 'WordPress', 'Front-end & Web Solutions (CMS)', 90, 'Advanced'),
(19, 'Moodle', 'Front-end & Web Solutions (CMS)', 85, 'Advanced'),
(20, 'Drupal', 'Front-end & Web Solutions (CMS)', 80, 'Intermediate'),
(21, 'Joomla', 'Front-end & Web Solutions (CMS)', 78, 'Intermediate'),
(22, 'Shopify', 'Front-end & Web Solutions (CMS)', 88, 'Advanced'),

-- Back-end & Databases
(23, 'Laravel', 'Back-end & Databases', 94, 'Expert'),
(24, 'Spring Boot', 'Back-end & Databases', 88, 'Advanced'),
(25, 'Node.js', 'Back-end & Databases', 90, 'Advanced'),
(26, 'Django', 'Back-end & Databases', 82, 'Advanced'),
(27, 'Supabase', 'Back-end & Databases', 92, 'Expert'),
(28, 'MySQL', 'Back-end & Databases', 92, 'Expert'),
(29, 'PostgreSQL', 'Back-end & Databases', 90, 'Expert'),
(30, 'Oracle', 'Back-end & Databases', 80, 'Intermediate'),
(31, 'SQLite', 'Back-end & Databases', 88, 'Advanced'),

-- Mobile Apps
(32, 'Flutter', 'Mobile Apps', 90, 'Advanced'),
(33, 'React Native', 'Mobile Apps', 88, 'Advanced'),
(34, 'Ionic', 'Mobile Apps', 82, 'Intermediate'),
(35, 'Android Studio', 'Mobile Apps', 85, 'Advanced'),

-- Design & Visual Identity
(36, 'Figma', 'Design & Visual Identity', 96, 'Expert'),
(37, 'Photoshop', 'Design & Visual Identity', 92, 'Expert'),
(38, 'Illustrator', 'Design & Visual Identity', 90, 'Advanced'),
(39, 'UI/UX Design', 'Design & Visual Identity', 94, 'Expert'),
(40, 'Logos', 'Design & Visual Identity', 92, 'Expert'),
(41, 'Affiches', 'Design & Visual Identity', 90, 'Advanced'),
(42, 'Chartes Graphiques', 'Design & Visual Identity', 94, 'Expert'),

-- CI/CD, DevOps & Methodologies
(43, 'Docker', 'CI/CD, DevOps & Methodologies', 86, 'Advanced'),
(44, 'GitHub', 'CI/CD, DevOps & Methodologies', 95, 'Expert'),
(45, 'GitLab', 'CI/CD, DevOps & Methodologies', 90, 'Advanced'),
(46, 'Jira', 'CI/CD, DevOps & Methodologies', 88, 'Advanced'),
(47, 'Trello', 'CI/CD, DevOps & Methodologies', 92, 'Advanced'),
(48, 'Yoast SEO', 'CI/CD, DevOps & Methodologies', 88, 'Advanced'),
(49, 'Google Analytics', 'CI/CD, DevOps & Methodologies', 85, 'Advanced'),
(50, 'Linux', 'CI/CD, DevOps & Methodologies', 88, 'Advanced'),
(51, 'Windows', 'CI/CD, DevOps & Methodologies', 95, 'Expert'),
(52, 'MacOS', 'CI/CD, DevOps & Methodologies', 90, 'Advanced'),
(53, 'UML', 'CI/CD, DevOps & Methodologies', 88, 'Advanced'),
(54, 'MERISE', 'CI/CD, DevOps & Methodologies', 85, 'Advanced')
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Projects
INSERT INTO public.projects (id, slug, title_fr, title_en, summary_fr, summary_en, featured_image, demo_url, github_url, category_id, is_featured, status) VALUES
(1, 'saas-financial-management', 'SaaS Financial Management', 'SaaS Financial Management', 'Plateforme de gestion financière d’entreprise offrant la visualisation analytique en temps réel et la gestion comptable.', 'Enterprise financial management platform delivering real-time complex data visualization, analytics tracking, and automated reporting.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80', 'https://demo.financial.myfolio.com', 'https://github.com/mouhamedndione/saas-financial', 1, true, 'completed'),
(2, 'drop-carpooling', 'Drop - Carpooling Platform', 'Drop - Carpooling Platform', 'Application de covoiturage urbain intelligente avec géolocalisation et calcul d’itinéraires optimisés.', 'Smart urban carpooling application with real-time geolocation and route optimization.', 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80', 'https://demo.drop.myfolio.com', 'https://github.com/mouhamedndione/drop-carpooling', 2, true, 'completed'),
(3, 'boucher-associes', 'Boucher & Associés - Cabinet d’Avocats', 'Boucher & Associates - Law Firm', 'Site institutionnel haut de gamme avec espace client sécurisé et prise de rendez-vous juridique en ligne.', 'High-end corporate law firm portal with secure client space and online legal consultation booking.', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80', 'https://boucher-avocats.com', 'https://github.com/mouhamedndione/boucher-associes', 1, true, 'completed')
ON CONFLICT (id) DO NOTHING;
