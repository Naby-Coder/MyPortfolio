/**
 * MYFOLIO OFFLINE & LOCAL BACKUP DATA
 * Ce fichier assure que le portfolio fonctionne à 100% de manière autonome
 * même si le compte Supabase expire, est suspendu ou hors-ligne.
 */

import { ExperienceItem } from '@/app/api/experiences/route';
import { EducationItem } from '@/app/api/education/route';

export const fallbackCategories = [
  { id: 1, nameFr: 'Développement Web & SaaS', nameEn: 'Web Development & SaaS', slug: 'web' },
  { id: 2, nameFr: 'Applications Mobiles', nameEn: 'Mobile Applications', slug: 'mobile' },
  { id: 3, nameFr: 'Design UI/UX & Graphique', nameEn: 'UI/UX & Graphic Design', slug: 'design' },
  { id: 4, nameFr: 'Architecture Full-Stack', nameEn: 'Full-Stack Architecture', slug: 'fullstack' },
];

export const fallbackExperiences: ExperienceItem[] = [
  {
    id: 1,
    company: 'Kossy Tech Solutions · En télétravail / Remote',
    role_fr: 'Développeur Web & Mobile · Designer Graphique (Freelance)',
    role_en: 'Web & Mobile Developer · Graphic Designer (Freelance)',
    period_fr: 'Janvier 2023 — Présent',
    period_en: 'January 2023 — Present',
    bullets_fr: [
      'Conception et développement sur-mesure de sites web et applications web & mobiles réactives (Next.js, React, WordPress, Laravel, MySQL, Flutter...).',
      'Création complète d’identités visuelles percutantes : logos, chartes graphiques, maquettes et prototypes interactifs UI/UX (Figma, Photoshop, Illustrator).',
      'Administration technique complète du site de l’entreprise et des sites clients : gestion des hébergements, noms de domaine, sauvegardes et déploiements continus (CI/CD, Vercel, Cloud).',
      'Gestion et support informatique : installation et optimisation de systèmes d’exploitation (Windows, Linux), montage de PC et maintenance technique.',
      'Collaboration étroite et conseil technique auprès des clients pour concevoir des solutions numériques clé-en-main.',
    ],
    bullets_en: [
      'Custom engineering and development of responsive websites and web/mobile apps (Next.js, React, WordPress, Laravel, MySQL, Flutter...).',
      'End-to-end visual identity and branding design: logos, brand guidelines, and interactive UI/UX prototypes (Figma, Photoshop, Illustrator).',
      'Complete technical administration of company and client websites: managing hosting servers, domain configurations, automated backups, and continuous deployments (CI/CD, Vercel, Cloud).',
      'IT infrastructure and systems support: OS setup (Windows, Linux), PC hardware assembly, and maintenance.',
      'Close client collaboration and technical consulting to deliver turnkey digital transformation solutions.',
    ],
    tags: ['WordPress', 'Next.js', 'React', 'Flutter', 'Laravel', 'PHP / MySQL', 'Figma', 'Identité Visuelle', 'CI/CD & Cloud'],
  },
  {
    id: 2,
    company: 'Université Numérique Cheikh Hamidou Kane – ANDS · Sénégal',
    role_fr: 'Stagiaire en Administration de Sites Web',
    role_en: 'Website Administration Intern',
    period_fr: 'Octobre 2024 — Juin 2025',
    period_en: 'October 2024 — June 2025',
    bullets_fr: [
      'Administration technique du site web et intégration de pages sous WordPress.',
      'Gestion de contenu et mise à jour régulière des informations.',
      'Optimisation des performances web et gestion des sauvegardes régulières.',
    ],
    bullets_en: [
      'Technical administration of the website and page integration on WordPress.',
      'Content management and regular information updates.',
      'Website optimization and backup management.',
    ],
    tags: ['WordPress', 'Contenu', 'Optimisation', 'CMS'],
  },
  {
    id: 3,
    company: 'Tivaouane, Sénégal',
    role_fr: 'Participant — Hackathon Cezat & Sonatel',
    role_en: 'Participant — Cezat & Sonatel Hackathon',
    period_fr: 'Septembre 2023 & Septembre 2024',
    period_en: 'Sept. 2023 & Sept. 2024',
    bullets_fr: [
      'Programmation et développement technique au sein d’une équipe pluridisciplinaire.',
      'Présentation de projets, créativité et gestion des délais sous contrainte de temps.',
    ],
    bullets_en: [
      'Programming and technical development in a team setting.',
      'Project presentation, creativity, and time management under pressure.',
    ],
    tags: ['Hackathon', 'Travail d’équipe', 'Créativité'],
  },
];

export const fallbackEducation: EducationItem[] = [
  {
    id: 1,
    degree_fr: 'Master en Conception & Développement d’Applications Web, Full-Stack et Gaming',
    degree_en: 'Master’s Degree in Web, Full-Stack & Gaming Application Design & Development',
    school: 'Université Numérique Cheikh Hamidou Kane (UNCHK) · Dakar, Sénégal',
    period_fr: 'Août 2026 — En cours',
    period_en: 'August 2026 — In progress',
    badge_fr: 'En cours',
    badge_en: 'In progress',
    badgeVariant: 'success',
  },
  {
    id: 2,
    degree_fr: 'Diplôme en Réseaux et Sécurité de l’Information',
    degree_en: 'Diploma in Networking and Information Security',
    school: 'Collège communautaire du Nouveau-Brunswick (CCNB) – Campus de Dieppe · Dieppe, NB, Canada',
    period_fr: 'Septembre 2025 — En cours',
    period_en: 'September 2025 — In progress',
    badge_fr: 'En cours',
    badge_en: 'In progress',
    badgeVariant: 'success',
  },
  {
    id: 3,
    degree_fr: 'Licence en Développement d’Applications Web, Mobiles et Jeux Vidéo',
    degree_en: 'Bachelor Degree in Web, Mobile and Gaming Application Development',
    school: 'Université Numérique Cheikh Hamidou Kane (UNCHK) · Dakar, Sénégal',
    period_fr: 'Janvier 2021 — Juillet 2025',
    period_en: 'January 2021 — July 2025',
    badge_fr: 'Obtenu',
    badge_en: 'Obtained',
    badgeVariant: 'violet',
  },
  {
    id: 4,
    degree_fr: 'Baccalauréat en Sciences Sociales et Humaines',
    degree_en: 'High School Diploma in Social and Human Sciences',
    school: 'Cheikh Anta Diop Académie · Thiès, Sénégal',
    period_fr: 'Octobre 2018 — Juillet 2021',
    period_en: 'October 2018 — July 2021',
    badge_fr: 'Obtenu',
    badge_en: 'Obtained',
    badgeVariant: 'violet',
  },
];

export const fallbackSkills = [
  { id: 1, name: 'Next.js & React', category: 'Frontend', level_percentage: 95, proficiency_label: 'Expert', is_featured: true },
  { id: 2, name: 'TypeScript & JavaScript', category: 'Languages', level_percentage: 92, proficiency_label: 'Avancé', is_featured: true },
  { id: 3, name: 'Flutter & Dart', category: 'Mobile', level_percentage: 88, proficiency_label: 'Avancé', is_featured: true },
  { id: 4, name: 'WordPress & WooCommerce', category: 'CMS', level_percentage: 95, proficiency_label: 'Expert', is_featured: true },
  { id: 5, name: 'Laravel & PHP', category: 'Backend', level_percentage: 85, proficiency_label: 'Avancé', is_featured: true },
  { id: 6, name: 'Figma & UI/UX Design', category: 'Design', level_percentage: 90, proficiency_label: 'Expert', is_featured: true },
  { id: 7, name: 'Réseaux & Cisco CCNA', category: 'Systèmes & Réseaux', level_percentage: 85, proficiency_label: 'Avancé', is_featured: true },
  { id: 8, name: 'Linux & Windows Server', category: 'Systèmes & Réseaux', level_percentage: 88, proficiency_label: 'Avancé', is_featured: true },
  { id: 9, name: 'PostgreSQL & MySQL', category: 'Databases', level_percentage: 88, proficiency_label: 'Avancé', is_featured: true },
  { id: 10, name: 'Git, CI/CD & Vercel', category: 'DevOps', level_percentage: 90, proficiency_label: 'Expert', is_featured: true },
];
