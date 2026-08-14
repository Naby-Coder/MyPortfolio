-- ========================================================
-- MYFOLIO SUPABASE SEED & BACKUP DATA
-- Full Stable Snapshot for Mouhamed Ndione Portfolio
-- ========================================================

-- 0. Security Policy for Contact Messages
ALTER TABLE IF EXISTS public.contact_messages DISABLE ROW LEVEL SECURITY;

-- 1. Categories
INSERT INTO public.categories (id, name_fr, name_en, slug) VALUES
(1, 'Développement Web & SaaS', 'Web Development & SaaS', 'web'),
(2, 'Applications Mobiles', 'Mobile Applications', 'mobile'),
(3, 'Design UI/UX & Graphique', 'UI/UX & Graphic Design', 'design'),
(4, 'Architecture Full-Stack', 'Full-Stack Architecture', 'fullstack')
ON CONFLICT (id) DO NOTHING;

-- 2. Projects (Your 4 Real Projects)
INSERT INTO public.projects (id, slug, title_fr, title_en, summary_fr, summary_en, featured_image, demo_url, github_url, is_featured, status) VALUES
(1, 'saas-financial-management', 'Gestion Financière SaaS', 'SaaS Financial Management', 'Application de gestion financière entreprise offrant la visualisation de données complexes en temps réel, le suivi analytique et l’automatisation des rapports.', 'Enterprise financial management platform delivering real-time complex data visualization, analytics tracking, and automated reporting.', '/projects/mesfinances-responsive.jpg', 'https://demo.financial.myfolio.com', 'https://github.com/Naby-Coder/saas-financial', true, 'LIVE'),
(2, 'drop-carpooling', 'Drop - Application de covoiturage', 'Drop - Carpooling Mobile App', 'Application mobile de covoiturage urbain pensée pour l’Afrique de l’Ouest avec calcul d’itinéraires optimisé, géolocalisation et messagerie instantanée.', 'Urban carpooling mobile application designed for West Africa featuring real-time geolocation, route optimization, and instant messaging.', 'https://qjnsmdtnututsdrvbmei.supabase.co/storage/v1/object/public/portfolio_media/1786726578232-ebyame9.png', 'https://demo.drop.myfolio.com', 'https://github.com/Naby-Coder/drop-carpooling', false, 'LIVE'),
(14, 'association-senegalais-moncton', 'Association des Sénégalais de Moncton', 'Association of Senegalese of Moncton', 'Identité visuelle complète, charte graphique et plateforme web pour l’Association des Sénégalais de Moncton.', 'Complete visual identity, brand guidelines, and web platform for the Association of Senegalese of Moncton.', 'https://qjnsmdtnututsdrvbmei.supabase.co/storage/v1/object/public/portfolio_media/1786727429306-o7wwwij.jpeg', '', '', false, 'LIVE'),
(16, 'boucher-et-associes', 'Boucher et Associés Avocats', 'Boucher et Associés Law Firm', 'Plateforme web institutionnelle moderne et espace client sécurisé pour un cabinet d’avocats d’affaires et de conseil juridique d’excellence.', 'Modern corporate web platform and secure client portal for a premier corporate law and legal advisory firm.', 'https://qjnsmdtnututsdrvbmei.supabase.co/storage/v1/object/public/portfolio_media/1786727928090-lsspxzp.webp', 'https://demo.boucher-avocats.myfolio.com', 'https://github.com/Naby-Coder/boucher-associes', false, 'LIVE')
ON CONFLICT (id) DO UPDATE SET
  title_fr = EXCLUDED.title_fr,
  title_en = EXCLUDED.title_en,
  summary_fr = EXCLUDED.summary_fr,
  summary_en = EXCLUDED.summary_en,
  featured_image = EXCLUDED.featured_image,
  is_featured = EXCLUDED.is_featured,
  status = EXCLUDED.status;

-- 3. Experiences
INSERT INTO public.experiences (id, position_fr, position_en, company, location, start_date) VALUES
(1, 'Développeur Web & Mobile · Designer Graphique (Freelance)', 'Web & Mobile Developer · Graphic Designer (Freelance)', 'Kossy Tech Solutions · Télétravail / Remote', 'Janvier 2023 — Présent', '2023-01-01'),
(2, 'Stagiaire en Administration de Sites Web', 'Web Administration Intern', 'Université Numérique Cheikh Hamidou Kane – ANDS · Sénégal', 'Octobre 2024 — Juin 2025', '2024-10-01'),
(3, 'Participant — Hackathon Cezat & Sonatel', 'Participant — Cezat & Sonatel Hackathon', 'Tivaouane, Sénégal', 'Septembre 2023 & Septembre 2024', '2023-09-01')
ON CONFLICT (id) DO NOTHING;

-- 4. Education
INSERT INTO public.education (id, degree_fr, degree_en, institution, location, is_current, start_date) VALUES
(1, 'Master en Conception & Développement d’Applications Web, Full-Stack et Gaming', 'Master’s Degree in Web, Full-Stack & Gaming Application Design & Development', 'Université Numérique Cheikh Hamidou Kane (UNCHK) · Dakar, Sénégal', 'Août 2026 — En cours', true, '2026-08-01'),
(2, 'Diplôme en Réseaux et Sécurité de l’Information', 'Diploma in Networking and Information Security', 'Collège communautaire du Nouveau-Brunswick (CCNB) – Campus de Dieppe · Dieppe, NB, Canada', 'Septembre 2025 — En cours', true, '2025-09-01'),
(3, 'Licence en Développement d’Applications Web, Mobiles et Jeux Vidéo', 'Bachelor Degree in Web, Mobile and Gaming Application Development', 'Université Numérique Cheikh Hamidou Kane (UNCHK) · Dakar, Sénégal', 'Janvier 2021 — Juillet 2025', false, '2021-01-01'),
(4, 'Baccalauréat en Sciences Sociales et Humaines', 'High School Diploma in Social and Human Sciences', 'Cheikh Anta Diop Académie · Thiès, Sénégal', 'Octobre 2018 — Juillet 2021', false, '2018-10-01')
ON CONFLICT (id) DO NOTHING;
