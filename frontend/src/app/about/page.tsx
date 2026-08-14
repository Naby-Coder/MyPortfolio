'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/language/LanguageContext';
import { fetchSupabaseSkills, SupabaseSkill } from '@/lib/supabase-api';
import { categoryLabels, fallbackSkills } from '@/app/admin/skills/page';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { PartnerLogoMarquee } from '@/components/ui/PartnerLogoMarquee';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Award,
  ChevronDown,
  FileText,
  BadgeCheck,
  CheckCircle2,
  MapPin,
  Calendar,
  Sparkles,
  Layers,
  ExternalLink,
  Clock,
  ArrowRight,
} from 'lucide-react';

const content = {
  fr: {
    hero: {
      badge: 'À PROPOS DE MOI',
      titleLine1: 'Développeur Full-Stack, Designer',
      titleLine2: '& Administrateur Systèmes & Réseaux.',
      subtitle:
        'Je suis Mouhamed Ndione, développeur Full-Stack, designer UI/UX & graphique et administrateur systèmes & réseaux. Fort d’une expertise éprouvée dans la conception d’applications web et mobiles modernes (Next.js, React, Laravel, Flutter, WordPress, CMS), la création d’identités visuelles percutantes (Figma, Photoshop, Illustrator) et la gestion d’infrastructures informatiques fiables (Windows Server, Linux, Cisco CCNA, Sécurité).',
    },
    philosophy: {
      badge: 'MON APPROCHE EN 4 ÉTAPES',
      title: 'Une vision globale du projet numérique.',
      steps: [
        {
          num: '01',
          title: 'Analyser & Comprendre (Besoins Client)',
          desc: 'Identifier les besoins réels du client, les contraintes techniques et les objectifs métier avant de proposer une solution sur-mesure.',
        },
        {
          num: '02',
          title: 'Concevoir & Prototyper (UI/UX & Graphisme)',
          desc: 'Créer des maquettes interactives, chartes graphiques, logos et systèmes visuels avec Figma, Photoshop & Illustrator.',
        },
        {
          num: '03',
          title: 'Développer & Intégrer (Full-Stack & CMS)',
          desc: 'Développer des applications web & mobiles robustes (Next.js, React, Laravel, Flutter) et intégrer des solutions CMS (WordPress, WooCommerce, Joomla).',
        },
        {
          num: '04',
          title: 'Déployer & Administrer (Systèmes & Réseaux)',
          desc: 'Administrer les serveurs (Windows Server, Linux), configurer les réseaux (Active Directory, Cisco CCNA, VPN, DNS) et assurer la sécurité des données.',
        },
      ],
    },
    journey: {
      badge: 'MON PARCOURS',
      featuredTitle: 'RÔLE PRINCIPAL',
      roleTitle: 'Développeur Web & Mobile · Designer Graphique (Freelance)',
      roleCompany: 'Kossy Tech Solutions · En télétravail / Remote · 2023 — Présent',
      activeBadge: 'Rôle Actif',
      roleDesc:
        'Conception et développement sur-mesure de sites et applications web & mobiles réactives (Next.js, React, WordPress, Laravel, Flutter...), création complète d’identités visuelles (logos, chartes, UI/UX Figma), et administration technique / gestion de serveurs (CI/CD, Cloud, Vercel).',
      expTitle: 'Expérience Professionnelle',
      expSub:
        'Stagiaire en Administration de Sites Web — Université Numérique Cheikh Hamidou Kane – ANDS (Sénégal) · Octobre 2024 — Juin 2025. Intégration WordPress, gestion de contenu, optimisation et sauvegardes.',
      eduTitle: 'Parcours Académique',
      eduDegree: 'Licence en Développement d’Applications Web, Mobiles et Jeux Vidéo',
      eduSchool: 'Université Numérique Cheikh Hamidou Kane (UNCHK) · Dakar, Sénégal · 2021 — 2025',
      eduDesc:
        'Formation universitaire approfondie couvrant le développement web Full-Stack, le développement mobile, les bases de données, la conception UML, les méthodes Agiles/Scrum et la gestion de projets.',
      certTitle: 'Certifications & Diplômes',
      verify: 'Voir la certification ->',
      modalTitle: 'Détails de la Certification',
      verifyBtn: 'Vérifier l’authenticité',
    },
    techWall: {
      badge: 'ÉCOSYSTÈME TECHNIQUE',
      title: 'Langages, frameworks, outils & systèmes maîtrisés.',
      subtitle:
        'Une expertise polyvalente couvrant le développement Full-Stack & CMS, le design UI/UX & graphique, l’administration système et la sécurité réseau.',
      allTab: 'Tous',
    },
    learning: {
      badge: 'FORMATION CONTINUE',
      title: 'Apprendre → Construire → Tester → Améliorer → Répéter',
      subtitle:
        'Actuellement en formation en Réseaux et Sécurité de l’Information au CCNB – Campus de Dieppe (Canada). Une démarche d’apprentissage constant à travers des projets concrets et une veille technologique rigoureuse.',
    },
    cta: {
      title: 'Besoin d’un développeur Full-Stack, designer ou administrateur IT ?',
      subtitle: 'Discutons de votre projet ou téléchargez mon CV au format PDF.',
      contactBtn: 'Me contacter',
      viewCv: 'Consulter le CV',
    },
  },
  en: {
    hero: {
      badge: 'ABOUT ME',
      titleLine1: 'Full-Stack Developer, Designer',
      titleLine2: '& Systems & Networks Administrator.',
      subtitle:
        'I am Mouhamed Ndione, a Full-Stack Developer, UI/UX & Graphic Designer, and Systems & Network Administrator. Proven expertise in building modern web and mobile applications (Next.js, React, Laravel, Flutter, WordPress, CMS), crafting striking visual identities (Figma, Adobe Creative Cloud), and managing secure IT infrastructures (Windows Server, Linux, Cisco CCNA, Security).',
    },
    philosophy: {
      badge: '4-STEP APPROACH',
      title: 'A complete vision of the digital project.',
      steps: [
        {
          num: '01',
          title: 'Analyze & Understand (Client Needs)',
          desc: 'Identify real client needs, technical constraints, and business goals before proposing tailored solutions.',
        },
        {
          num: '02',
          title: 'Design & Prototype (UI/UX & Graphics)',
          desc: 'Create interactive mockups, brand guidelines, logos, and visual design systems with Figma, Photoshop & Illustrator.',
        },
        {
          num: '03',
          title: 'Develop & Integrate (Full-Stack & CMS)',
          desc: 'Build robust web & mobile applications (Next.js, React, Laravel, Flutter) and integrate customized CMS platforms (WordPress, WooCommerce, Joomla).',
        },
        {
          num: '04',
          title: 'Deploy & Administrate (Systems & Networks)',
          desc: 'Administer servers (Windows Server, Linux), configure network services (Active Directory, Cisco CCNA, VPN, DNS), and ensure system security.',
        },
      ],
    },
    journey: {
      badge: 'MY JOURNEY',
      featuredTitle: 'FEATURED ROLE',
      roleTitle: 'Web & Mobile Developer · Graphic Designer (Freelance)',
      roleCompany: 'Kossy Tech Solutions · Remote · 2023 — Present',
      activeBadge: 'Active Role',
      roleDesc:
        'Custom engineering of responsive websites and web/mobile apps (Next.js, React, WordPress, Laravel, Flutter...), full visual identity and branding design (logos, guidelines, UI/UX Figma), and technical server administration (CI/CD, Cloud, Vercel).',
      expTitle: 'Professional Experience',
      expSub:
        'Website Administration Intern — Université Numérique Cheikh Hamidou Kane – ANDS (Senegal) · October 2024 — June 2025. WordPress page integration, content management, website optimization, and backup management.',
      eduTitle: 'Academic Background',
      eduDegree: 'Bachelor Degree in Web, Mobile and Gaming Application Development',
      eduSchool: 'Université Numérique Cheikh Hamidou Kane (UNCHK) · Dakar, Senegal · 2021 — 2025',
      eduDesc:
        'Comprehensive training covering Full-Stack web development, mobile development, databases, UML design, Agile/Scrum methodologies, and IT project management.',
      certTitle: 'Certifications & Credentials',
      verify: 'View Credential ->',
      modalTitle: 'Certification Details',
      verifyBtn: 'Verify Credential Online',
    },
    techWall: {
      badge: 'TECHNICAL ECOSYSTEM',
      title: 'Languages, frameworks, tools & systems mastered.',
      subtitle:
        'Proven expertise across Full-Stack development, CMS platforms, graphic & UI/UX design, system administration, and network security.',
      allTab: 'All',
    },
    learning: {
      badge: 'CONTINUOUS LEARNING',
      title: 'Learn → Build → Test → Iterate → Repeat',
      subtitle:
        'Currently enrolled in the Networking & Information Security program at Collège communautaire du Nouveau-Brunswick (CCNB) – Dieppe Campus, Canada. Continuously improving through personal projects and technology monitoring.',
    },
    cta: {
      title: 'Looking for a Full-Stack Developer, Designer, or IT Administrator?',
      subtitle: 'Let’s talk about your project or download my full CV in PDF format.',
      contactBtn: 'Contact Me',
      viewCv: 'View Resume',
    },
  },
};

// Certifications from the real CV with official documents
const certifications = [
  {
    id: 'cyber',
    badgeCode: 'CYBERSECURITY',
    titleFr: 'Analyste Junior en Cybersécurité',
    titleEn: 'Junior Cybersecurity Analyst',
    issuer: 'FORCE-N · UNCHK · Mastercard Foundation',
    date: 'Décembre 2023',
    category: 'Sécurité / Security',
    image: '/certificates/cert-analyste-cybersecurite.png',
    credentialUrl: 'https://unchk.edu.sn/',
  },
  {
    id: 'frontend',
    badgeCode: 'FRONT-END DEV',
    titleFr: 'Développement Front-End',
    titleEn: 'Front-End Web Development',
    issuer: 'FORCE-N · UNCHK · Mastercard Foundation',
    date: 'Janvier 2024',
    category: 'Développement / Dev',
    image: '/certificates/cert-dev-frontend.png',
    credentialUrl: 'https://unchk.edu.sn/',
  },
  {
    id: 'marketing',
    badgeCode: 'MARKETING DIGITAL',
    titleFr: 'Certificat en Marketing Digital',
    titleEn: 'Digital Marketing Certificate',
    issuer: 'FORCE-N · UNCHK · Mastercard Foundation',
    date: 'Juin 2023',
    category: 'Marketing',
    image: '/certificates/cert-marketing-digital.png',
    credentialUrl: 'https://unchk.edu.sn/',
  },
  {
    id: 'streaming',
    badgeCode: 'OBS STUDIO PRO',
    titleFr: 'Création de Contenu & Streaming (OBS Studio)',
    titleEn: 'Content Creation & Streaming (OBS Studio)',
    issuer: 'FORCE-N · UNCHK · Mastercard Foundation',
    date: 'Décembre 2022',
    category: 'Contenu / Content',
    image: '/certificates/cert-obs-streaming.png',
    credentialUrl: 'https://obsproject.com/',
  },
  {
    id: 'entrepreneurship',
    badgeCode: 'TECH@WORK MICROSOFT',
    titleFr: 'Compétences Numériques & Entrepreneuriat',
    titleEn: 'Digital & Entrepreneurship Skills',
    issuer: 'TECH@WORK · IOE · Microsoft',
    date: 'Octobre 2023',
    category: 'Business & Leadership',
    image: '/certificates/cert-tech-at-work-microsoft.png',
    credentialUrl: 'https://unchk.edu.sn/',
  },
  {
    id: 'ccna',
    badgeCode: 'CCNA 1',
    titleFr: 'CCNA 1 (Cisco Certified Network Associate)',
    titleEn: 'CCNA 1 (Cisco Certified Network Associate)',
    issuer: 'Cisco Networking Academy',
    date: '2024',
    category: 'Réseau / Network',
    image: '/certificates/cisco-ccna-verified.png',
    credentialUrl: 'https://www.netacad.com/',
  },
  {
    id: 'webgraphic',
    badgeCode: 'WEB & GRAPHIC PRO',
    titleFr: 'Certificat Pro en Développement Web & Design Graphique',
    titleEn: 'Professional Cert. in Web Development & Graphic Design',
    issuer: 'Certificat Spécialité Professionnelle',
    date: '2023',
    category: 'Design & Dev',
    image: 'https://images.credly.com/size/340x340/images/d37803b9-1d22-4841-b2ec-2d338be357e6/Graphic_Design_Foundations.png',
    credentialUrl: 'https://unchk.edu.sn/',
  },
];

const defaultTechCategories = [
  {
    id: 'cms',
    labelFr: 'Web & Mobile',
    labelEn: 'Web & Mobile',
    items: ['WordPress', 'Elementor', 'Divi', 'Gutenberg', 'WooCommerce', 'Joomla', 'HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
  },
  {
    id: 'design',
    labelFr: 'Design Graphique & UI/UX',
    labelEn: 'Graphic Design & UI/UX',
    items: ['Figma', 'Photoshop', 'Illustrator', 'InDesign', 'UI/UX Design', 'Logos', 'Affiches'],
  },
  {
    id: 'dev',
    labelFr: 'Développement & Frameworks',
    labelEn: 'Development & Frameworks',
    items: ['Next.js', 'React', 'Angular', 'Vue.js', 'Laravel', 'Django', 'Node.js', 'Flutter', 'React Native', 'TypeScript', 'Python', 'Java', 'Dart'],
  },
  {
    id: 'systems',
    labelFr: 'Systèmes & Réseaux',
    labelEn: 'Systems & Networks',
    items: ['Windows Server', 'Active Directory', 'Linux', 'macOS', 'Windows', 'CCNA', 'TCP/IP', 'VPN'],
  },
  {
    id: 'tools',
    labelFr: 'Outils & Méthodes',
    labelEn: 'Tools & Methodologies',
    items: ['Git', 'GitHub', 'Agile/Scrum', 'Docker', 'Microsoft Office', 'OBS Studio', 'Trello', 'Jira'],
  },
  {
    id: 'databases_cloud',
    labelFr: 'Bases de Données & Cloud',
    labelEn: 'Databases & Cloud Architecture',
    items: ['PostgreSQL', 'Supabase', 'MySQL', 'REST API', 'GraphQL', 'Firebase', 'Vercel', 'Postman'],
  },
];

// Experience timeline data
const experiencesFr = [
  {
    id: 1,
    role: 'Développeur Web & Mobile · Designer Graphique (Freelance)',
    company: 'Kossy Tech Solutions · En télétravail / Remote',
    period: 'Janvier 2023 — Présent',
    bullets: [
      'Conception et développement sur-mesure de sites web et applications web & mobiles réactives (Next.js, React, WordPress, Laravel, MySQL, Flutter...).',
      'Création complète d’identités visuelles percutantes : logos, chartes graphiques, maquettes et prototypes interactifs UI/UX (Figma, Photoshop, Illustrator).',
      'Administration technique complète du site de l’entreprise et des sites clients : gestion des hébergements, noms de domaine, sauvegardes et déploiements continus (CI/CD, Vercel, Cloud).',
      'Gestion et support informatique : installation et optimisation de systèmes d’exploitation (Windows, Linux), montage de PC et maintenance technique.',
      'Collaboration étroite et conseil technique auprès des clients pour concevoir des solutions numériques clé-en-main.',
    ],
    tags: ['WordPress', 'Next.js', 'React', 'Flutter', 'Laravel', 'PHP / MySQL', 'Figma', 'Identité Visuelle', 'CI/CD & Cloud'],
  },
  {
    id: 2,
    role: 'Stagiaire en Administration de Sites Web',
    company: 'Université Numérique Cheikh Hamidou Kane – ANDS · Sénégal',
    period: 'Octobre 2024 — Juin 2025',
    bullets: [
      'Administration technique du site web et intégration de pages sous WordPress.',
      'Gestion de contenu et mise à jour régulière des informations.',
      'Optimisation des performances web et gestion des sauvegardes régulières.',
    ],
    tags: ['WordPress', 'Contenu', 'Optimisation'],
  },
  {
    id: 3,
    role: 'Participant — Hackathon Cezat & Sonatel',
    company: 'Tivaouane, Sénégal',
    period: 'Septembre 2023 & Septembre 2024',
    bullets: [
      'Programmation et développement technique au sein d’une équipe pluridisciplinaire.',
      'Présentation de projets, créativité et gestion des délais sous contrainte de temps.',
    ],
    tags: ['Hackathon', 'Travail d’équipe', 'Créativité'],
  },
];

const experiencesEn = [
  {
    id: 1,
    role: 'Web & Mobile Developer · Graphic Designer (Freelance)',
    company: 'Kossy Tech Solutions · Remote',
    period: 'January 2023 — Present',
    bullets: [
      'Custom engineering and development of responsive websites and web/mobile apps (Next.js, React, WordPress, Laravel, MySQL, Flutter...).',
      'End-to-end visual identity and branding design: logos, brand guidelines, and interactive UI/UX prototypes (Figma, Photoshop, Illustrator).',
      'Complete technical administration of company and client websites: managing hosting servers, domain configurations, automated backups, and continuous deployments (CI/CD, Vercel, Cloud).',
      'IT infrastructure and systems support: OS setup (Windows, Linux), PC hardware assembly, and maintenance.',
      'Close client collaboration and technical consulting to deliver turnkey digital transformation solutions.',
    ],
    tags: ['WordPress', 'Next.js', 'React', 'Flutter', 'Laravel', 'PHP / MySQL', 'Figma', 'Visual Identity', 'CI/CD & Cloud'],
  },
  {
    id: 2,
    role: 'Website Administration Intern',
    company: 'Université Numérique Cheikh Hamidou Kane – ANDS · Senegal',
    period: 'October 2024 — June 2025',
    bullets: [
      'Technical administration of the website and page integration on WordPress.',
      'Content management and regular information updates.',
      'Website optimization and backup management.',
    ],
    tags: ['WordPress', 'Content', 'Optimization'],
  },
  {
    id: 3,
    role: 'Participant — Cezat & Sonatel Hackathon',
    company: 'Tivaouane, Senegal',
    period: 'Sept. 2023 & Sept. 2024',
    bullets: [
      'Programming and technical development in a team setting.',
      'Project presentation, creativity, and time management under pressure.',
    ],
    tags: ['Hackathon', 'Teamwork', 'Creativity'],
  },
];

const educationsFr = [
  {
    degree: 'Master en Conception & Développement d’Applications Web, Full-Stack et Gaming',
    school: 'Université Numérique Cheikh Hamidou Kane (UNCHK) · Dakar, Sénégal',
    period: 'Août 2026 — En cours',
    badge: 'En cours',
    badgeVariant: 'success' as const,
  },
  {
    degree: 'Diplôme en Réseaux et Sécurité de l’Information',
    school: 'Collège communautaire du Nouveau-Brunswick (CCNB) – Campus de Dieppe · Dieppe, NB, Canada',
    period: 'Septembre 2025 — En cours',
    badge: 'En cours',
    badgeVariant: 'success' as const,
  },
  {
    degree: 'Licence en Développement d’Applications Web, Mobiles et Jeux Vidéo',
    school: 'Université Numérique Cheikh Hamidou Kane (UNCHK) · Dakar, Sénégal',
    period: 'Janvier 2021 — Juillet 2025',
    badge: 'Obtenu',
    badgeVariant: 'violet' as const,
  },
  {
    degree: 'Baccalauréat en Sciences Sociales et Humaines',
    school: 'Cheikh Anta Diop Académie · Thiès, Sénégal',
    period: 'Octobre 2018 — Juillet 2021',
    badge: 'Obtenu',
    badgeVariant: 'violet' as const,
  },
];

const educationsEn = [
  {
    degree: 'Master’s Degree in Web, Full-Stack & Gaming Application Design & Development',
    school: 'Université Numérique Cheikh Hamidou Kane (UNCHK) · Dakar, Senegal',
    period: 'August 2026 — In progress',
    badge: 'In Progress',
    badgeVariant: 'success' as const,
  },
  {
    degree: 'Diploma in Networking and Information Security',
    school: 'Collège communautaire du Nouveau-Brunswick (CCNB) – Dieppe Campus · Dieppe, NB, Canada',
    period: 'September 2025 — In progress',
    badge: 'In Progress',
    badgeVariant: 'success' as const,
  },
  {
    degree: 'Bachelor Degree in Web, Mobile and Gaming Application Development',
    school: 'Université Numérique Cheikh Hamidou Kane (UNCHK) · Dakar, Senegal',
    period: 'January 2021 — July 2025',
    badge: 'Obtained',
    badgeVariant: 'violet' as const,
  },
  {
    degree: 'High School Diploma in Social and Human Sciences',
    school: 'Cheikh Anta Diop Académie · Thiès, Senegal',
    period: 'October 2018 — July 2021',
    badge: 'Obtained',
    badgeVariant: 'violet' as const,
  },
];

export default function AboutPage() {
  const { locale } = useLanguage();
  const t = content[locale];

  const [activeTechTab, setActiveTechTab] = useState<string>('all');
  const [activeJourneyTab, setActiveJourneyTab] = useState<'all' | 'experience' | 'education' | 'certifications'>('all');
  const [categoriesData, setCategoriesData] = useState(defaultTechCategories);
  const [expandedExp, setExpandedExp] = useState<number | string | null>(1);
  const [selectedCert, setSelectedCert] = useState<any | null>(null);

  const [experiences, setExperiences] = useState(locale === 'fr' ? experiencesFr : experiencesEn);
  const [educations, setEducations] = useState(locale === 'fr' ? educationsFr : educationsEn);
  const [certificationsList, setCertificationsList] = useState<any[]>(certifications);

  useEffect(() => {
    setExperiences(locale === 'fr' ? experiencesFr : experiencesEn);
    setEducations(locale === 'fr' ? educationsFr : educationsEn);

    function loadCustomJourney() {
      fetch('/api/experiences')
        .then((r) => r.json())
        .then((res) => {
          if (res?.success && Array.isArray(res.data)) {
            setExperiences(res.data);
          }
        })
        .catch((err) => console.error('Error fetching experiences in About page:', err));

      fetch('/api/education')
        .then((r) => r.json())
        .then((res) => {
          if (res?.success && Array.isArray(res.data)) {
            setEducations(res.data);
          }
        })
        .catch((err) => console.error('Error fetching education in About page:', err));

      fetch('/api/certifications')
        .then((r) => r.json())
        .then((res) => {
          if (res?.success && Array.isArray(res.data)) {
            setCertificationsList(res.data);
          }
        })
        .catch((err) => console.error('Error fetching certifications in About page:', err));
    }

    loadCustomJourney();

    async function loadSkills() {
      try {
        let skills: SupabaseSkill[] = [];
        const res = await fetch('/api/skills');
        const json = await res.json();
        if (json?.success && Array.isArray(json.data)) {
          skills = json.data;
        } else {
          skills = await fetchSupabaseSkills();
        }

        if (skills && skills.length > 0) {
          const categoryMap = new Map<string, string[]>();
          skills.forEach((sk) => {
            const cat = sk.category || 'Other';
            if (!categoryMap.has(cat)) {
              categoryMap.set(cat, []);
            }
            categoryMap.get(cat)!.push(sk.name);
          });

          const dynamicCategories = Array.from(categoryMap.entries()).map(([catName, items], index) => ({
            id: `cat-${index}`,
            labelFr: categoryLabels[catName]?.fr || catName,
            labelEn: categoryLabels[catName]?.en || catName,
            items: items,
          }));

          if (dynamicCategories.length > 0) {
            setCategoriesData(dynamicCategories);
          }
        }
      } catch (err) {
        console.error('Error loading skills on about page:', err);
      }
    }

    loadSkills();
    window.addEventListener('myfolio_skills_updated', loadSkills);

    return () => {
      window.removeEventListener('myfolio_journey_updated', loadCustomJourney);
      window.removeEventListener('myfolio_badges_updated', loadCustomJourney);
      window.removeEventListener('myfolio_skills_updated', loadSkills);
    };
  }, [locale]);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-900 dark:text-white">
      {/* 1. HERO HEADER */}
      <div className="mb-16">
        <Badge variant="blue" size="md" className="mb-4">{t.hero.badge}</Badge>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 text-slate-900 dark:text-white">
          {t.hero.titleLine1} <span className="text-gradient-electric">{t.hero.titleLine2}</span>
        </h1>
        <p className="text-slate-600 dark:text-zinc-300 text-lg max-w-3xl leading-relaxed font-normal">
          {t.hero.subtitle}
        </p>
      </div>

      {/* 2. EDITORIAL PROFILE & PHILOSOPHY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-center">
        <div className="lg:col-span-6 relative">
          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 relative group shadow-xl">
            <img
              src="/profile-about.jpg"
              alt="Mouhamed Ndione"
              className="w-full h-[480px] object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-slate-200 dark:border-white/10">
              <span className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold block mb-1">MOUHAMED NDIONE</span>
              <span className="text-xs text-slate-600 dark:text-zinc-300 font-light">&quot;Full-Stack Developer · Graphic Designer · Systems &amp; Network Security&quot;</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col gap-6">
          <Badge variant="violet" size="md" className="w-fit">{t.philosophy.badge}</Badge>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t.philosophy.title}
          </h2>
          <div className="flex flex-col gap-4 text-sm leading-relaxed">
            {t.philosophy.steps.map((st) => (
              <div key={st.num} className="p-4 rounded-xl bg-white dark:bg-zinc-900/70 border border-slate-200 dark:border-white/10 shadow-xs flex gap-3">
                <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{st.num}</span>
                <div>
                  <strong className="text-slate-900 dark:text-white block mb-1">{st.title}</strong>
                  <span className="text-slate-600 dark:text-zinc-300 text-xs">{st.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. TECHNICAL ECOSYSTEM SECTION */}
      <section className="mb-20 pt-12 border-t border-slate-200 dark:border-white/10">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <Badge variant="blue" size="md" className="mb-3">{t.techWall.badge}</Badge>
          <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
            {t.techWall.title}
          </h2>
          <p className="text-slate-600 dark:text-zinc-300 text-sm leading-relaxed">
            {t.techWall.subtitle}
          </p>

          {/* Tech Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveTechTab('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${activeTechTab === 'all'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'bg-white dark:bg-zinc-900/80 text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-white/5 border border-slate-200 dark:border-white/10'
                }`}
            >
              {t.techWall.allTab}
            </button>
            {categoriesData.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTechTab(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${activeTechTab === cat.id
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'bg-white dark:bg-zinc-900/80 text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-white/5 border border-slate-200 dark:border-white/10'
                  }`}
              >
                {locale === 'fr' ? cat.labelFr : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Tech Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesData
            .filter((cat) => activeTechTab === 'all' || activeTechTab === cat.id)
            .map((cat) => (
              <Card key={cat.id} variant="glass" className="p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-4 flex items-center justify-between font-mono pb-2 border-b border-slate-200 dark:border-white/10">
                    <span>{locale === 'fr' ? cat.labelFr : cat.labelEn}</span>
                    <Badge variant="blue" size="sm">{cat.items.length}</Badge>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-zinc-200 hover:border-blue-500/50 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </section>

      {/* 4. JOURNEY SECTION */}
      <section className="mb-20 pt-12 border-t border-slate-200 dark:border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Badge variant="blue" size="md" className="mb-3">{t.journey.badge}</Badge>
            <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
              {t.journey.expTitle} &amp; {t.journey.eduTitle}
            </h2>
          </div>

          {/* Filter Tabs for Timeline */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-xs">
            {[
              { id: 'all', label: locale === 'fr' ? 'Tout le Parcours' : 'Full Timeline', icon: Layers },
              { id: 'experience', label: locale === 'fr' ? 'Expériences Pro' : 'Experiences', icon: Briefcase },
              { id: 'education', label: locale === 'fr' ? 'Formations' : 'Education', icon: GraduationCap },
              { id: 'certifications', label: locale === 'fr' ? 'Certifications' : 'Credentials', icon: Award },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeJourneyTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveJourneyTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Continuous Interactive Timeline */}
        <div className="relative pl-6 sm:pl-10 space-y-10">
          {/* Continuous Glowing Gradient Spine */}
          <div className="absolute left-2.5 sm:left-4 top-3 bottom-3 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.5)]" />

          {/* FEATURED ROLE / ACTIVE EXP: Kossy Tech */}
          {(activeJourneyTab === 'all' || activeJourneyTab === 'experience') && experiences.length > 0 && (() => {
            const featuredExp = experiences.find((e) => e.id === 1) || experiences[0];
            const featuredRole = (locale === 'fr' ? (featuredExp as any).role_fr : (featuredExp as any).role_en) || featuredExp?.role || t.journey.roleTitle;
            const featuredCompany = (featuredExp as any)?.company || t.journey.roleCompany;
            const featuredLocation = (featuredExp as any)?.location;
            const featuredPeriod = (locale === 'fr' ? (featuredExp as any).period_fr : (featuredExp as any).period_en) || featuredExp?.period || `2023 — ${locale === 'fr' ? 'Présent' : 'Present'}`;
            const featuredBullets = (locale === 'fr' ? (featuredExp as any).bullets_fr : (featuredExp as any).bullets_en) || (featuredExp as any)?.bullets || [];
            const featuredDesc = Array.isArray(featuredBullets) && featuredBullets.length > 0 ? featuredBullets.join(' ') : t.journey.roleDesc;
            const featuredTags: string[] = (featuredExp as any)?.tags || ['WordPress', 'Joomla', 'Laravel', 'PHP', 'Flutter', 'React', 'MySQL'];

            return (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {/* Live Node Indicator */}
                <div className="absolute -left-6 sm:-left-10 top-3.5 w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 z-10">
                  <Briefcase className="w-3.5 h-3.5 text-white" />
                  <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 ring-2 ring-white dark:ring-zinc-950"></span>
                  </span>
                </div>

                {/* Glass Card Container */}
                <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-blue-500/30 dark:border-blue-500/40 shadow-xl relative overflow-hidden group hover:border-blue-500 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="blue" size="sm" className="font-mono uppercase">{t.journey.featuredTitle}</Badge>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        {t.journey.activeBadge}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-zinc-400 bg-slate-100 dark:bg-white/5 px-3 py-1 rounded-full border border-slate-200 dark:border-white/10">
                      <Calendar className="w-3.5 h-3.5 text-blue-500" />
                      <span>{featuredPeriod}</span>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    {featuredRole}
                  </h3>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{featuredCompany} {featuredLocation ? `· ${featuredLocation}` : ''}</span>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed mb-6">
                    {featuredDesc}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200/80 dark:border-white/10">
                    {featuredTags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full text-xs font-mono bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })()}

          {/* OTHER EXPERIENCES */}
          {(activeJourneyTab === 'all' || activeJourneyTab === 'experience') && (
            <div className="space-y-6 pt-2">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-lg mb-2">
                <Briefcase className="w-5 h-5 text-blue-500" />
                <span>{t.journey.expTitle}</span>
              </div>
              {experiences.filter((exp) => exp.id !== (experiences.find((e) => e.id === 1)?.id || experiences[0]?.id)).map((exp, index) => {
                const role = (locale === 'fr' ? (exp as any).role_fr : (exp as any).role_en) || exp.role;
                const period = (locale === 'fr' ? (exp as any).period_fr : (exp as any).period_en) || exp.period;
                const bullets = (locale === 'fr' ? (exp as any).bullets_fr : (exp as any).bullets_en) || exp.bullets || [];
                const tags = exp.tags || [];

                return (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative"
                  >
                    {/* Unified Blue Node Icon */}
                    <div className="absolute -left-6 sm:-left-10 top-4 w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center shadow-md shadow-blue-500/30 z-10">
                      <Briefcase className="w-3.5 h-3.5 text-white" />
                    </div>

                    <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-white/10 hover:border-blue-500/40 transition-all">
                      <div
                        className="flex items-start justify-between gap-4 cursor-pointer"
                        onClick={() => setExpandedExp(expandedExp === exp.id ? null : exp.id)}
                      >
                        <div>
                          <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">{role}</h4>
                          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 dark:text-zinc-400 mt-1">
                            <span>{exp.company}</span>
                            <span>•</span>
                            <span className="text-blue-600 dark:text-blue-400">{period}</span>
                          </div>
                        </div>
                        <div className="p-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-zinc-300">
                          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedExp === exp.id ? 'rotate-180' : ''}`} />
                        </div>
                      </div>

                      <AnimatePresence>
                        {expandedExp === exp.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10 overflow-hidden"
                          >
                            <ul className="space-y-2 mb-4">
                              {bullets.map((bullet: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="flex flex-wrap gap-2">
                              {tags.map((tag: string) => (
                                <Badge key={tag} variant="blue" size="sm">{tag}</Badge>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* ACADEMIC / EDUCATION SECTION */}
          {(activeJourneyTab === 'all' || activeJourneyTab === 'education') && (
            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-lg mb-2">
                <GraduationCap className="w-5 h-5 text-purple-500" />
                <span>{t.journey.eduTitle}</span>
              </div>
              {educations.map((edu, idx) => {
                const degree = (locale === 'fr' ? (edu as any).degree_fr : (edu as any).degree_en) || edu.degree;
                const period = (locale === 'fr' ? (edu as any).period_fr : (edu as any).period_en) || edu.period;
                const badge = (locale === 'fr' ? (edu as any).badge_fr : (edu as any).badge_en) || edu.badge;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="relative"
                  >
                    {/* Unified Purple Node Icon */}
                    <div className="absolute -left-6 sm:-left-10 top-4 w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-purple-600 dark:bg-purple-500 text-white flex items-center justify-center shadow-md shadow-purple-500/30 z-10">
                      <GraduationCap className="w-3.5 h-3.5 text-white" />
                    </div>

                    <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-white/10 hover:border-purple-500/40 transition-all">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">{degree}</h4>
                          <p className="text-xs text-slate-600 dark:text-zinc-300 font-mono mb-2">{edu.school}</p>
                          <div className="flex items-center gap-2 text-xs font-mono text-purple-600 dark:text-purple-400">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{period}</span>
                          </div>
                        </div>
                        <Badge variant={edu.badgeVariant} size="sm">{badge}</Badge>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* CERTIFICATIONS SHOWCASE */}
          {(activeJourneyTab === 'all' || activeJourneyTab === 'certifications') && (
            <div className="space-y-6 pt-4 relative">
              {/* Unified Emerald Node Icon */}
              <div className="absolute -left-6 sm:-left-10 top-5 w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-emerald-600 dark:bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/30 z-10">
                <Award className="w-3.5 h-3.5 text-white" />
              </div>

              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-lg mb-2">
                <Award className="w-5 h-5 text-emerald-500" />
                <span>{t.journey.certTitle}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {certificationsList.map((cert) => (
                  <motion.div
                    key={cert.id}
                    whileHover={{ y: -4 }}
                    onClick={() => setSelectedCert(cert)}
                    className="glass-card rounded-2xl p-5 border border-slate-200/80 dark:border-white/10 hover:border-emerald-500/40 cursor-pointer transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="blue" size="sm">{cert.category}</Badge>
                        <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">{cert.date}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1 leading-snug">
                        {locale === 'fr' ? cert.titleFr : cert.titleEn}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-zinc-400 font-mono">{cert.issuer}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-mono font-medium">
                      <span>{t.journey.verify}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Animated Infinite Partner & Certification Logo Marquee */}
        <PartnerLogoMarquee />
      </section>

      {/* 5. ALWAYS LEARNING LOOP */}
      <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900/70 border border-slate-200 dark:border-white/10 text-center mb-16 shadow-xs">
        <Badge variant="violet" size="md" className="mb-4">{t.learning.badge}</Badge>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t.learning.title}</h3>
        <p className="text-xs text-slate-600 dark:text-zinc-300 max-w-lg mx-auto leading-relaxed">
          {t.learning.subtitle}
        </p>
      </div>

      {/* 6. CALL TO ACTION */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
            {t.cta.title}
          </h3>
          <p className="text-xs text-slate-600 dark:text-zinc-300">
            {t.cta.subtitle}
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/contact">
            <Button variant="primary" size="md" icon={<ArrowUpRight className="w-4 h-4" />}>
              {t.cta.contactBtn}
            </Button>
          </Link>
          <Link href="/cv">
            <Button variant="glass" size="md" icon={<FileText className="w-4 h-4" />}>
              {t.cta.viewCv}
            </Button>
          </Link>
        </div>
      </div>

      {/* Certification Modal */}
      <Modal isOpen={!!selectedCert} onClose={() => setSelectedCert(null)} title={t.journey.modalTitle}>
        {selectedCert && (
          <div className="flex flex-col gap-5 text-xs font-mono">
            {/* Top row: Title full width */}
            <div>
              <span className="text-slate-500 dark:text-zinc-400 block uppercase mb-0.5">Certification</span>
              <span className="text-slate-900 dark:text-white font-bold text-base leading-snug">
                {locale === 'fr' ? selectedCert.titleFr : selectedCert.titleEn}
              </span>
            </div>

            {/* Middle Section: Left Details & Right Badge Image */}
            <div className="flex items-end justify-between gap-4">
              <div className="space-y-3.5 flex-1">
                <div>
                  <span className="text-slate-500 dark:text-zinc-400 block uppercase mb-0.5">Issuer</span>
                  <span className="text-slate-800 dark:text-zinc-200 font-medium">{selectedCert.issuer}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-zinc-400 block uppercase mb-0.5">Category</span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">{selectedCert.category}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-zinc-400 block uppercase mb-0.5">Year</span>
                  <span className="text-slate-800 dark:text-zinc-200">{selectedCert.date}</span>
                </div>
              </div>

              {/* Right Side: Badge Logo / Certificate Image */}
              <div className="shrink-0 flex flex-col items-center">
                {selectedCert.image ? (
                  <div className="w-32 h-24 sm:w-40 sm:h-28 rounded-xl bg-white dark:bg-zinc-900/90 p-1.5 border border-slate-200/80 dark:border-white/10 shadow-md flex items-center justify-center overflow-hidden">
                    <img
                      src={selectedCert.image}
                      alt={selectedCert.titleFr || 'Badge'}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center text-blue-600 dark:text-blue-400 p-2 text-center shadow-xs">
                    <ShieldCheck className="w-9 h-9 mb-1 text-blue-500" />
                    <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-slate-700 dark:text-zinc-300">
                      {selectedCert.badgeCode || 'OFFICIAL'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <Button
                variant="primary"
                size="sm"
                icon={<ShieldCheck className="w-4 h-4" />}
                onClick={() => {
                  const url = (selectedCert as any).credentialUrl || (selectedCert as any).credential_url || 'https://unchk.edu.sn/';
                  window.open(url, '_blank', 'noopener,noreferrer');
                }}
              >
                {t.journey.verifyBtn}
              </Button>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Accréditation Authentique</span>
              </span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
