export interface ProjectDetailData {
  id: number;
  slug: string;
  titleFr: string;
  titleEn: string;
  summaryFr: string;
  summaryEn: string;
  category: string;
  categoryFilter: 'all' | 'web' | 'mobile' | 'fullstack' | 'uiux' | 'branding';
  badges: string[];
  roleFr: string;
  roleEn: string;
  timelineFr: string;
  timelineEn: string;
  statusFr: string;
  statusEn: string;
  tech: string[];
  image: string;
  gallery: string[];
  demoUrl: string;
  githubUrl: string;
  challenge: {
    badgeFr: string;
    badgeEn: string;
    titleFr: string;
    titleEn: string;
    p1Fr: string;
    p1En: string;
    p2Fr: string;
    p2En: string;
  };
  solution: {
    badgeFr: string;
    badgeEn: string;
    titleFr: string;
    titleEn: string;
    overviewFr?: string;
    overviewEn?: string;
    cards: Array<{
      titleFr: string;
      titleEn: string;
      descFr?: string;
      descEn?: string;
    }>;
  };
  architecture: {
    badgeFr: string;
    badgeEn: string;
    titleFr: string;
    titleEn: string;
    client: {
      layer: string;
      title: string;
      sub: string;
    };
    backend: {
      layer: string;
      title: string;
      sub: string;
    };
    database: {
      layer: string;
      title: string;
      sub: string;
    };
  };
  results: {
    show?: boolean;
    badgeFr: string;
    badgeEn: string;
    titleFr: string;
    titleEn: string;
    metrics: Array<{
      value: string;
      labelFr: string;
      labelEn: string;
    }>;
  };
}

export const projectsData: ProjectDetailData[] = [
  {
    id: 1,
    slug: 'saas-financial-management',
    titleFr: 'Gestion Financière SaaS',
    titleEn: 'SaaS Financial Management',
    summaryFr: 'Application de gestion financière entreprise offrant la visualisation de données complexes en temps réel, le suivi analytique et l’automatisation des rapports.',
    summaryEn: 'Enterprise financial management platform delivering real-time complex data visualization, analytics tracking, and automated reporting.',
    category: 'Full-Stack · UI/UX',
    categoryFilter: 'fullstack',
    badges: ['SAAS', 'FULL STACK', 'FINTECH'],
    roleFr: 'Lead Développeur Full-Stack & UI/UX',
    roleEn: 'Lead Full-Stack Developer & UI/UX',
    timelineFr: 'Sprint 4 Mois',
    timelineEn: '4 Months Sprint',
    statusFr: 'Produit en Ligne',
    statusEn: 'Live Product',
    tech: ['Next.js', 'TypeScript', 'Laravel API', 'MySQL', 'Tailwind CSS', 'Chart.js'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80',
    ],
    demoUrl: 'https://demo.financial.myfolio.com',
    githubUrl: 'https://github.com/Naby-Coder/saas-financial',
    challenge: {
      badgeFr: '01. LE DÉFI',
      badgeEn: '01. THE CHALLENGE',
      titleFr: 'Centraliser la trésorerie sans ralentissement.',
      titleEn: 'Centralizing treasury without performance bottlenecks.',
      p1Fr: 'Les équipes financières devaient manipuler quotidiennement des dizaines de fichiers Excel fragmentés pour calculer le solde réel de l’entreprise en multi-devises. Cette méthode entraînait des erreurs de saisie récurrentes et une lenteur critique lors de l’édition des bilans mensuels.',
      p1En: 'Financial teams relied daily on dozens of fragmented spreadsheets to calculate multi-currency corporate balances. This manual workflow caused recurring errors and severe delays during monthly reporting.',
      p2Fr: 'L’enjeu était de concevoir une application SaaS capable de traiter plus de 1,2 million d’événements financiers mensuels avec un temps de réponse inférieur à 200ms.',
      p2En: 'The objective was building a scalable SaaS platform processing over 1.2M monthly financial events with sub-200ms API latency.',
    },
    solution: {
      badgeFr: '02. LA SOLUTION',
      badgeEn: '02. THE SOLUTION',
      titleFr: 'Une plateforme SaaS réactive et unifiée.',
      titleEn: 'A reactive and unified SaaS platform.',
      cards: [
        {
          titleFr: 'Visualisation de données temps réel',
          titleEn: 'Real-time Data Visualization',
          descFr: 'Tableaux de bord dynamiques récapitulant les flux d’entrée et de sortie avec filtres temporels et multi-devises personnalisés.',
          descEn: 'Interactive dashboards summarizing cash inflows and outflows with customizable temporal and multi-currency filters.',
        },
        {
          titleFr: 'Automates d’exportation comptable',
          titleEn: 'Automated Accounting Exports',
          descFr: 'Génération automatique de rapports au format PDF analytique et Excel structuré en un seul clic sans blocage de l’interface.',
          descEn: 'One-click automated generation of analytical PDF reports and structured Excel balance sheets without blocking UI.',
        },
      ],
    },
    architecture: {
      badgeFr: '03. ARCHITECTURE TECHNIQUE',
      badgeEn: '03. TECHNICAL ARCHITECTURE',
      titleFr: 'Schéma de flux d’ingénierie.',
      titleEn: 'Engineering Dataflow Schema.',
      client: {
        layer: 'CLIENT LAYER',
        title: 'Next.js 15 App Router',
        sub: 'TypeScript · Tailwind · Chart.js',
      },
      backend: {
        layer: 'BACKEND API',
        title: 'Laravel REST API',
        sub: 'Eloquent · Sanctum Auth · Redis Cache',
      },
      database: {
        layer: 'DATABASE',
        title: 'MySQL 8.0 Database',
        sub: 'Indexed Queries · Partitioning',
      },
    },
    results: {
      badgeFr: '04. IMPACT & RÉSULTATS',
      badgeEn: '04. IMPACT & RESULTS',
      titleFr: 'Résultats mesurables.',
      titleEn: 'Measurable Outcomes.',
      metrics: [
        {
          value: '-65%',
          labelFr: 'Temps de chargement des bilans comptables',
          labelEn: 'Reduction in accounting report load times',
        },
        {
          value: '1.2M',
          labelFr: 'Événements financiers traités / mois',
          labelEn: 'Financial events processed monthly',
        },
        {
          value: '98%',
          labelFr: 'Satisfaction des utilisateurs de la plateforme',
          labelEn: 'User satisfaction score across finance teams',
        },
      ],
    },
  },
  {
    id: 2,
    slug: 'drop-carpooling',
    titleFr: 'Drop — Carpooling Mobile App',
    titleEn: 'Drop — Carpooling Mobile App',
    summaryFr: 'Application mobile de covoiturage urbain pensée pour l’Afrique de l’Ouest avec calcul d’itinéraires optimisé, géolocalisation et messagerie instantanée.',
    summaryEn: 'Urban carpooling mobile application designed for West Africa featuring real-time geolocation, route optimization, and instant messaging.',
    category: 'Mobile · UI/UX',
    categoryFilter: 'mobile',
    badges: ['MOBILE APP', 'FLUTTER', 'GEOLOCATION'],
    roleFr: 'Lead Développeur Mobile Flutter & UI/UX',
    roleEn: 'Lead Flutter Mobile Developer & UI/UX',
    timelineFr: 'Sprint 3 Mois',
    timelineEn: '3 Months Sprint',
    statusFr: 'Produit en Ligne',
    statusEn: 'Live Product',
    tech: ['Flutter', 'Dart', 'Laravel API', 'MySQL', 'Google Maps SDK', 'WebSockets', 'Figma'],
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
    ],
    demoUrl: 'https://demo.drop.myfolio.com',
    githubUrl: 'https://github.com/Naby-Coder/drop-carpooling',
    challenge: {
      badgeFr: '01. LE DÉFI',
      badgeEn: '01. THE CHALLENGE',
      titleFr: 'Fluidifier les trajets urbains face aux embouteillages quotidiens.',
      titleEn: 'Streamlining urban commuting amidst daily traffic congestion.',
      p1Fr: 'Dans les grandes métropoles ouest-africaines, les usagers perdent plusieurs heures par jour dans les transports en commun saturés ou les embouteillages, tandis que de nombreux véhicules circulent avec des places vides.',
      p1En: 'In major West African cities, commuters lose multiple hours daily in saturated public transit or traffic jams, while numerous private vehicles circulate with empty seats.',
      p2Fr: 'L’objectif était de concevoir une application mobile ultra-légère, fluide même avec une connexion 3G instable, associant passagers et conducteurs sur le même trajet en moins de 45 secondes.',
      p2En: 'The objective was building an ultra-lightweight mobile app, resilient even on unstable 3G networks, matching drivers and riders along identical routes in under 45 seconds.',
    },
    solution: {
      badgeFr: '02. LA SOLUTION',
      badgeEn: '02. THE SOLUTION',
      titleFr: 'Une application mobile cross-platform intelligente.',
      titleEn: 'An intelligent cross-platform mobile application.',
      cards: [
        {
          titleFr: 'Matching d’itinéraires & Géolocalisation',
          titleEn: 'Route Matching & Live Geolocation',
          descFr: 'Algorithme de calcul de proximité spatiale en temps réel et suivi du véhicule sur carte interactive fluide.',
          descEn: 'Real-time spatial proximity algorithm and smooth interactive vehicle tracking on map.',
        },
        {
          titleFr: 'Messagerie & Paiement Mobile Money',
          titleEn: 'Instant Chat & Mobile Money Payment',
          descFr: 'Chat instantané via WebSockets et intégration sécurisée des passerelles de paiement locales (Wave, Orange Money).',
          descEn: 'Instant driver-rider messaging via WebSockets and secure local Mobile Money gateway integration (Wave, Orange Money).',
        },
      ],
    },
    architecture: {
      badgeFr: '03. ARCHITECTURE TECHNIQUE',
      badgeEn: '03. TECHNICAL ARCHITECTURE',
      titleFr: 'Infrastructure Mobile & Temps Réel.',
      titleEn: 'Mobile & Real-Time Infrastructure.',
      client: {
        layer: 'MOBILE CLIENT',
        title: 'Flutter & Dart (iOS / Android)',
        sub: 'Riverpod State · Google Maps SDK',
      },
      backend: {
        layer: 'BACKEND SERVICES',
        title: 'Laravel API & WebSockets',
        sub: 'Pusher / Socket.io · Geohash Engine',
      },
      database: {
        layer: 'DATABASE & SPATIAL',
        title: 'MySQL Spatial & Redis',
        sub: 'Geo-Spatial Indexes · Fast Cache',
      },
    },
    results: {
      badgeFr: '04. IMPACT & RÉSULTATS',
      badgeEn: '04. IMPACT & RESULTS',
      titleFr: 'Adoption et métriques clés.',
      titleEn: 'Key Adoption & Performance Metrics.',
      metrics: [
        {
          value: '+45k',
          labelFr: 'Trajets partagés effectués',
          labelEn: 'Shared rides completed',
        },
        {
          value: '< 45s',
          labelFr: 'Temps moyen de matching conducteur/passager',
          labelEn: 'Average driver/rider matching time',
        },
        {
          value: '4.8/5',
          labelFr: 'Note moyenne sur les stores mobiles',
          labelEn: 'Average mobile store rating',
        },
      ],
    },
  },
  {
    id: 3,
    slug: 'boucher-et-associes',
    titleFr: 'Boucher et Associés Law Firm',
    titleEn: 'Boucher et Associés Law Firm',
    summaryFr: 'Plateforme web institutionnelle moderne et espace client sécurisé pour un cabinet de conseil juridique d’excellence.',
    summaryEn: 'Modern corporate web platform and secure client portal for an elite legal advisory and corporate law firm.',
    category: 'Web Development',
    categoryFilter: 'web',
    badges: ['CORPORATE', 'FULL STACK', 'LEGALTECH'],
    roleFr: 'Développeur Full-Stack & Designer UI',
    roleEn: 'Full-Stack Developer & UI Designer',
    timelineFr: 'Sprint 2 Mois',
    timelineEn: '2 Months Sprint',
    statusFr: 'En Production',
    statusEn: 'In Production (Live)',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Laravel', 'PostgreSQL', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    ],
    demoUrl: 'https://boucher-avocats.com',
    githubUrl: 'https://github.com/Naby-Coder/boucher-associes',
    challenge: {
      badgeFr: '01. LE DÉFI',
      badgeEn: '01. THE CHALLENGE',
      titleFr: 'Allier prestige corporate et confidentialité absolue des dossiers.',
      titleEn: 'Balancing corporate prestige with airtight confidentiality.',
      p1Fr: 'Le cabinet Boucher & Associés souhaitait renouveler son image numérique avec un design épuré et sobre, tout en digitalisant la prise de consultation et l’échange de documents sensibles entre juristes et clients.',
      p1En: 'Boucher & Associés wanted to modernize its digital presence with an elegant luxury design while digitalizing client consultations and secure legal document exchange.',
      p2Fr: 'L’enjeu principal reposait sur la conformité RGPD, la sécurité du chiffrement des pièces jointes et la fluidité de navigation sur mobile et ordinateur.',
      p2En: 'Key challenges included strict GDPR compliance, end-to-end encrypted document storage, and seamless responsive design across all devices.',
    },
    solution: {
      badgeFr: '02. LA SOLUTION',
      badgeEn: '02. THE SOLUTION',
      titleFr: 'Un portail institutionnel avec espace privé chiffré.',
      titleEn: 'A high-end corporate portal with encrypted client space.',
      cards: [
        {
          titleFr: 'Réservation de consultations & Paiement',
          titleEn: 'Consultation Booking & Online Payments',
          descFr: 'Module de prise de rendez-vous synchronisé avec l’agenda des associés et paiement des honoraires en ligne sécurisé via Stripe.',
          descEn: 'Integrated booking module synced with attorneys’ calendars and secure retainer fee payment via Stripe.',
        },
        {
          titleFr: 'Coffre-fort documentaire sécurisé',
          titleEn: 'Encrypted Document Vault',
          descFr: 'Espace client privé avec chiffrement AES-256 des documents juridiques et traçabilité complète des accès.',
          descEn: 'Private client portal featuring AES-256 encryption for legal briefs and comprehensive access audit logging.',
        },
      ],
    },
    architecture: {
      badgeFr: '03. ARCHITECTURE TECHNIQUE',
      badgeEn: '03. TECHNICAL ARCHITECTURE',
      titleFr: 'Architecture sécurisée et optimisée SEO.',
      titleEn: 'Secure Architecture & SEO Optimization.',
      client: {
        layer: 'FRONTEND SSR',
        title: 'Next.js 15 & Tailwind',
        sub: 'Server-Side Rendering · Full SEO Optimization',
      },
      backend: {
        layer: 'SECURE BACKEND',
        title: 'Laravel API Chiffrée',
        sub: 'AES-256 Vault · Role-Based Access Control',
      },
      database: {
        layer: 'DATABASE',
        title: 'PostgreSQL Database',
        sub: 'Encrypted at Rest · Automated Backups',
      },
    },
    results: {
      badgeFr: '04. IMPACT & RÉSULTATS',
      badgeEn: '04. IMPACT & RESULTS',
      titleFr: 'Résultats mesurés après lancement.',
      titleEn: 'Post-Launch Measured Impact.',
      metrics: [
        {
          value: '+140%',
          labelFr: 'Demandes de consultations en ligne qualifiées',
          labelEn: 'Increase in qualified online consultation bookings',
        },
        {
          value: '100%',
          labelFr: 'Conformité RGPD et sécurité zéro faille',
          labelEn: 'GDPR compliance and zero security incidents',
        },
        {
          value: '99%',
          labelFr: 'Satisfaction client sur l’espace privé',
          labelEn: 'Client satisfaction score on private portal',
        },
      ],
    },
  },
  {
    id: 4,
    slug: 'kossy-tech-solutions',
    titleFr: 'Kossy Tech Solutions Platform',
    titleEn: 'Kossy Tech Solutions Platform',
    summaryFr: 'Vitrine d’ingénierie logicielle et de solutions technologiques sur-mesure pour entreprises avec simulateur de devis interactif.',
    summaryEn: 'Software engineering showcase and custom digital transformation tech solutions portal for enterprises with interactive estimator.',
    category: 'Web / Business',
    categoryFilter: 'web',
    badges: ['WEB APP', 'NEXT.JS', 'ENTERPRISE'],
    roleFr: 'Lead Frontend & Architecte Web',
    roleEn: 'Lead Frontend & Web Architect',
    timelineFr: 'Sprint 2 Mois',
    timelineEn: '2 Months Sprint',
    statusFr: 'En Ligne',
    statusEn: 'Live Product',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'Figma'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    ],
    demoUrl: 'https://kossytech.com',
    githubUrl: 'https://github.com/Naby-Coder/kossy-tech',
    challenge: {
      badgeFr: '01. LE DÉFI',
      badgeEn: '01. THE CHALLENGE',
      titleFr: 'Créer une identité numérique impactante pour capter des contrats B2B.',
      titleEn: 'Building a high-impact digital presence to capture B2B enterprise contracts.',
      p1Fr: 'Kossy Tech Solutions avait besoin d’une vitrine d’ingénierie moderne pour valoriser ses compétences de pointe en Cloud, IA et développement d’applications d’entreprise auprès de grands comptes.',
      p1En: 'Kossy Tech Solutions needed a modern engineering showcase to highlight its capabilities in Cloud, AI, and enterprise software to corporate decision-makers.',
      p2Fr: 'L’objectif était de délivrer des performances visuelles irréprochables (60fps), des animations fluides sans compromettre le temps de chargement.',
      p2En: 'The core objective was delivering 60fps smooth micro-animations without degrading page speed or Core Web Vitals.',
    },
    solution: {
      badgeFr: '02. LA SOLUTION',
      badgeEn: '02. THE SOLUTION',
      titleFr: 'Une interface dynamique et orientée conversion.',
      titleEn: 'A dynamic, high-converting digital platform.',
      cards: [
        {
          titleFr: 'Configurateur & Simulateur de Devis en temps réel',
          titleEn: 'Interactive Real-Time Cost Estimator',
          descFr: 'Un outil interactif permettant aux prospects d’estimer le coût et les délais de leur projet logiciel en fonction de la stack choisie.',
          descEn: 'An interactive simulator enabling prospects to estimate budget and timeline based on chosen tech stack and features.',
        },
        {
          titleFr: 'Design futuriste & Micro-animations',
          titleEn: 'Futuristic Design & Micro-Animations',
          descFr: 'Design moderne en thème sombre/clair avec animations Framer Motion soignées et navigation instantanée.',
          descEn: 'Modern dark/light glassmorphic UI with refined Framer Motion transitions and instant client-side routing.',
        },
      ],
    },
    architecture: {
      badgeFr: '03. ARCHITECTURE TECHNIQUE',
      badgeEn: '03. TECHNICAL ARCHITECTURE',
      titleFr: 'Performance & Server Components.',
      titleEn: 'Performance & Server Components.',
      client: {
        layer: 'REACT UI LAYER',
        title: 'Next.js App Router',
        sub: 'Server Components · Framer Motion',
      },
      backend: {
        layer: 'SERVERLESS API',
        title: 'Edge API Routes & Node.js',
        sub: 'Lead Scoring & Webhooks Integration',
      },
      database: {
        layer: 'HEADLESS CMS / DB',
        title: 'Supabase & CRM Webhooks',
        sub: 'Real-time Lead Capture & Analytics',
      },
    },
    results: {
      badgeFr: '04. IMPACT & RÉSULTATS',
      badgeEn: '04. IMPACT & RESULTS',
      titleFr: 'Métriques d’engagement et conversion.',
      titleEn: 'Engagement & Conversion Metrics.',
      metrics: [
        {
          value: '+85%',
          labelFr: 'Taux de conversion sur les demandes de devis',
          labelEn: 'Increase in qualified inbound project inquiries',
        },
        {
          value: '99/100',
          labelFr: 'Score de performance Google Lighthouse',
          labelEn: 'Google Lighthouse performance & SEO score',
        },
        {
          value: '< 0.8s',
          labelFr: 'Temps de chargement initial (First Contentful Paint)',
          labelEn: 'First Contentful Paint load time',
        },
      ],
    },
  },
  {
    id: 5,
    slug: 'ndayou-daara',
    titleFr: 'Ndayou Daara Educational Platform',
    titleEn: 'Ndayou Daara Educational Platform',
    summaryFr: 'Plateforme numérique éducative et sociale facilitant la gestion administrative et le parrainage solidaire des écoles daaras.',
    summaryEn: 'EdTech digital platform facilitating administration, student tracking, and community sponsorships for daara schools.',
    category: 'Web Development',
    categoryFilter: 'web',
    badges: ['EDTECH', 'LARAVEL', 'SOCIAL IMPACT'],
    roleFr: 'Développeur Full-Stack & Chef de projet',
    roleEn: 'Full-Stack Developer & Project Lead',
    timelineFr: 'Sprint 3 Mois',
    timelineEn: '3 Months Sprint',
    statusFr: 'En Production',
    statusEn: 'In Production (Live)',
    tech: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS', 'Livewire', 'Chart.js'],
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    ],
    demoUrl: 'https://ndayou-daara.org',
    githubUrl: 'https://github.com/Naby-Coder/ndayou-daara',
    challenge: {
      badgeFr: '01. LE DÉFI',
      badgeEn: '01. THE CHALLENGE',
      titleFr: 'Digitaliser des structures éducatives traditionnelles avec simplicité.',
      titleEn: 'Digitalizing traditional educational structures with maximum simplicity.',
      p1Fr: 'Les écoles coraniques traditionnelles (daaras) manquent souvent d’outils informatisés pour suivre l’assiduité, les besoins matériels des apprenants et coordonner l’aide apportée par les bienfaiteurs.',
      p1En: 'Traditional daara schools frequently lack digital tools to track student attendance, material needs, and coordinate assistance from donors and sponsors.',
      p2Fr: 'Il fallait concevoir un système accessible, utilisable sur smartphone par les directeurs d’écoles et offrant une transparence totale aux donateurs.',
      p2En: 'The goal was creating an intuitive system usable on mobile by school directors while providing absolute financial transparency to donors.',
    },
    solution: {
      badgeFr: '02. LA SOLUTION',
      badgeEn: '02. THE SOLUTION',
      titleFr: 'Une solution de gestion intégrée et de parrainage.',
      titleEn: 'An integrated management and sponsorship platform.',
      cards: [
        {
          titleFr: 'Suivi pédagogique & Registre des apprenants',
          titleEn: 'Student Registry & Academic Tracking',
          descFr: 'Fiches détaillées des apprenants avec suivi de la mémorisation, assiduité et alertes médicales/nutritionnelles.',
          descEn: 'Comprehensive student profiles with memorization progress tracking, attendance, and medical/nutritional alerts.',
        },
        {
          titleFr: 'Module de Parrainage & Dons transparents',
          titleEn: 'Transparent Sponsorship & Donations',
          descFr: 'Plateforme de parrainage direct d’un apprenant ou d’une classe avec reçus fiscaux et rapports d’impact périodiques.',
          descEn: 'Direct sponsorship module for students or classrooms with tax receipts and automated impact reporting.',
        },
      ],
    },
    architecture: {
      badgeFr: '03. ARCHITECTURE TECHNIQUE',
      badgeEn: '03. TECHNICAL ARCHITECTURE',
      titleFr: 'Architecture MVC & Composants Réactifs.',
      titleEn: 'MVC Architecture & Reactive Components.',
      client: {
        layer: 'FRONTEND REACTIF',
        title: 'Laravel Livewire & Tailwind',
        sub: 'Dynamic SPA-like UX · No complex JS bundle',
      },
      backend: {
        layer: 'CORE ENGINE',
        title: 'Laravel 11 Framework',
        sub: 'Role-Based Authentication · PDF Reports',
      },
      database: {
        layer: 'RELATIONAL DB',
        title: 'MySQL 8 Database',
        sub: 'Relational Student & Donation Records',
      },
    },
    results: {
      badgeFr: '04. IMPACT & RÉSULTATS',
      badgeEn: '04. IMPACT & RESULTS',
      titleFr: 'Impact social et éducatif.',
      titleEn: 'Educational & Social Impact.',
      metrics: [
        {
          value: '25+',
          labelFr: 'Daaras et centres éducatifs connectés',
          labelEn: 'Connected daaras & education centers',
        },
        {
          value: '3 500+',
          labelFr: 'Élèves et apprenants suivis numériquement',
          labelEn: 'Students digitally enrolled & tracked',
        },
        {
          value: '100%',
          labelFr: 'Traçabilité des dons et des kits scolaires',
          labelEn: 'Donation & school supply tracking transparency',
        },
      ],
    },
  },
  {
    id: 6,
    slug: 'association-senegalais-moncton',
    titleFr: 'Association des Sénégalais de Moncton',
    titleEn: 'Association des Sénégalais de Moncton',
    summaryFr: 'Plateforme communautaire et identité visuelle digitale pour la communauté sénégalaise et les nouveaux arrivants à Moncton (Canada).',
    summaryEn: 'Community web portal and digital brand identity for the Senegalese community and newcomers in Moncton (Canada).',
    category: 'Digital / Design',
    categoryFilter: 'branding',
    badges: ['COMMUNITY', 'BRANDING', 'NEXT.JS'],
    roleFr: 'Designer UI/UX & Développeur Front-End',
    roleEn: 'UI/UX Designer & Front-End Developer',
    timelineFr: 'Sprint 1.5 Mois',
    timelineEn: '1.5 Months Sprint',
    statusFr: 'En Ligne',
    statusEn: 'Live Platform',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Figma', 'Illustrator', 'Supabase'],
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
    ],
    demoUrl: 'https://senemoncton.ca',
    githubUrl: 'https://github.com/Naby-Coder/senegalais-moncton',
    challenge: {
      badgeFr: '01. LE DÉFI',
      badgeEn: '01. THE CHALLENGE',
      titleFr: 'Créer un point de ralliement numérique pour une diaspora grandissante.',
      titleEn: 'Creating a central digital hub for a rapidly growing diaspora.',
      p1Fr: 'L’association avait besoin d’un portail bilingue chaleureux et structuré pour accueillir les nouveaux étudiants et travailleurs arrivant à Moncton, tout en diffusant les événements culturels et l’actualité associative.',
      p1En: 'The association needed a welcoming bilingual portal to support newcomers and students arriving in Moncton while organizing cultural events and mutual aid.',
      p2Fr: 'Le défi incluait la création d’une identité visuelle complète (logo, charte graphique, bannières) combinée à un site web interactif.',
      p2En: 'The project encompassed complete brand identity design (logo, color system, posters) along with a responsive interactive platform.',
    },
    solution: {
      badgeFr: '02. LA SOLUTION',
      badgeEn: '02. THE SOLUTION',
      titleFr: 'Une identité chaleureuse et un portail interactif.',
      titleEn: 'A warm brand identity and interactive community portal.',
      cards: [
        {
          titleFr: 'Guide d’accueil des nouveaux arrivants & Annuaire',
          titleEn: 'Newcomer Welcome Guide & Member Directory',
          descFr: 'Ressources pas-à-pas pour l’installation (logement, démarches administratives) et annuaire de compétences d’entraide.',
          descEn: 'Step-by-step guides for settling in (housing, administrative tips) and a peer community skill directory.',
        },
        {
          titleFr: 'Calendrier des Événements & Billetterie',
          titleEn: 'Event Calendar & Ticketing',
          descFr: 'Système d’inscription aux galas, conférences et fêtes culturelles avec rappel automatique par courriel.',
          descEn: 'Event registration for cultural galas and workshops with automated email notifications.',
        },
      ],
    },
    architecture: {
      badgeFr: '03. ARCHITECTURE TECHNIQUE',
      badgeEn: '03. TECHNICAL ARCHITECTURE',
      titleFr: 'Design System & Architecture Légère.',
      titleEn: 'Design System & Lightweight Architecture.',
      client: {
        layer: 'BRAND & FRONTEND',
        title: 'Next.js 15 & Figma Tokens',
        sub: 'Responsive UI · Tailored Vector Assets',
      },
      backend: {
        layer: 'BACKEND SERVICES',
        title: 'Supabase Auth & API',
        sub: 'Member Directory & Registration Pipeline',
      },
      database: {
        layer: 'CLOUD DATABASE',
        title: 'PostgreSQL on Supabase',
        sub: 'Secure Member Data & Event Attendees',
      },
    },
    results: {
      badgeFr: '04. IMPACT & RÉSULTATS',
      badgeEn: '04. IMPACT & RESULTS',
      titleFr: 'Rayonnement communautaire.',
      titleEn: 'Community Reach & Engagement.',
      metrics: [
        {
          value: '1 200+',
          labelFr: 'Membres actifs et sympathisants inscrits',
          labelEn: 'Registered active members and supporters',
        },
        {
          value: '18',
          labelFr: 'Événements et ateliers organisés via le site',
          labelEn: 'Community events & workshops organized',
        },
        {
          value: '3x',
          labelFr: 'Augmentation de l’engagement des nouveaux arrivants',
          labelEn: 'Increase in newcomer integration engagement',
        },
      ],
    },
  },
  {
    id: 7,
    slug: 'bibliome',
    titleFr: 'Bibliome — App de Gestion de Bibliothèque',
    titleEn: 'Bibliome — Library Management App',
    summaryFr: 'Application mobile de gestion de bibliothèque personnelle et de numérisation d’ouvrages via scanner code-barres ISBN en temps réel.',
    summaryEn: 'Personal library management mobile app featuring real-time ISBN barcode book scanning, lending tracking, and reading stats.',
    category: 'Mobile Application',
    categoryFilter: 'mobile',
    badges: ['MOBILE APP', 'FLUTTER', 'BARCODE SCANNER'],
    roleFr: 'Concepteur & Développeur Mobile Flutter',
    roleEn: 'Mobile App Designer & Flutter Developer',
    timelineFr: 'Sprint 2 Mois',
    timelineEn: '2 Months Sprint',
    statusFr: 'En Ligne',
    statusEn: 'Live App',
    tech: ['Flutter', 'Dart', 'SQLite', 'OpenLibrary API', 'Google Books API', 'Figma'],
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80',
    ],
    demoUrl: 'https://demo.bibliome.app',
    githubUrl: 'https://github.com/Naby-Coder/bibliome',
    challenge: {
      badgeFr: '01. LE DÉFI',
      badgeEn: '01. THE CHALLENGE',
      titleFr: 'Inventorier des centaines de livres sans saisie manuelle fastidieuse.',
      titleEn: 'Cataloging hundreds of physical books without tedious manual entry.',
      p1Fr: 'Les passionnés de lecture, collectionneurs et gestionnaires de petites bibliothèques perdent un temps considérable à cataloguer manuellement leurs livres et perdent souvent la trace des ouvrages prêtés.',
      p1En: 'Book collectors and library managers spend excessive hours manually logging books and regularly lose track of loaned volumes.',
      p2Fr: 'L’objectif était de concevoir une application mobile instantanée capable de scanner le code-barres ISBN avec la caméra du smartphone et de renseigner automatiquement titre, auteur, résumé et couverture en moins d’une seconde.',
      p2En: 'The objective was building a fast camera-driven mobile app that scans ISBN barcodes and fetches complete metadata, author info, cover art, and page counts in under one second.',
    },
    solution: {
      badgeFr: '02. LA SOLUTION',
      badgeEn: '02. THE SOLUTION',
      titleFr: 'Un scanner intelligent avec mode hors-ligne.',
      titleEn: 'An intelligent scanner with full offline support.',
      cards: [
        {
          titleFr: 'Scanner ISBN ultra-rapide & Auto-complétion',
          titleEn: 'High-Speed ISBN Scanner & Auto-Fetch',
          descFr: 'Reconnaissance optique par caméra et interrogation instantanée des bases OpenLibrary et Google Books API.',
          descEn: 'Camera barcode recognition with instant asynchronous lookup across OpenLibrary and Google Books APIs.',
        },
        {
          titleFr: 'Suivi des prêts & Statistiques de lecture',
          titleEn: 'Loan Tracking & Reading Analytics',
          descFr: 'Gestionnaire de prêts d’ouvrages avec rappels automatiques et graphiques de progression de lecture mensuelle.',
          descEn: 'Lending manager with return reminders and visual monthly reading speed / genre distribution charts.',
        },
      ],
    },
    architecture: {
      badgeFr: '03. ARCHITECTURE TECHNIQUE',
      badgeEn: '03. TECHNICAL ARCHITECTURE',
      titleFr: 'Architecture Mobile Offline-First.',
      titleEn: 'Offline-First Mobile Architecture.',
      client: {
        layer: 'MOBILE FRONTEND',
        title: 'Flutter & Dart (BLoC Pattern)',
        sub: 'Camera MLKit · Smooth Animations',
      },
      backend: {
        layer: 'DATA SYNC LAYER',
        title: 'OpenLibrary & Books REST APIs',
        sub: 'Fallback Providers · Fast JSON Parsing',
      },
      database: {
        layer: 'LOCAL DATABASE',
        title: 'SQLite Local Storage',
        sub: 'Offline-First · Instant Search Index',
      },
    },
    results: {
      badgeFr: '04. IMPACT & RÉSULTATS',
      badgeEn: '04. IMPACT & RESULTS',
      titleFr: 'Efficacité et satisfaction.',
      titleEn: 'Efficiency & User Satisfaction.',
      metrics: [
        {
          value: '< 1s',
          labelFr: 'Temps de numérisation et d’indexation par livre',
          labelEn: 'Scan and indexing time per physical book',
        },
        {
          value: '100%',
          labelFr: 'Fonctionnalité complète en mode hors-ligne',
          labelEn: 'Full offline database & catalog accessibility',
        },
        {
          value: '4.9/5',
          labelFr: 'Score d’utilisabilité et satisfaction testeurs',
          labelEn: 'Usability score and tester satisfaction',
        },
      ],
    },
  },
];
