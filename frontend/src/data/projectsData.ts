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
  status?: string;
  is_featured?: boolean;
  isFeatured?: boolean;
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
    status: 'LIVE',
    is_featured: true,
    tech: ['Next.js', 'TypeScript', 'Laravel API', 'MySQL', 'Tailwind CSS', 'Chart.js'],
    image: '/projects/mesfinances-responsive.jpg',
    gallery: [
      '/projects/mesfinances-responsive.jpg',
      '/projects/mesfinances-desktop.jpg',
      '/projects/mesfinances-mobile.png',
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
    titleFr: 'Drop - Application de covoiturage',
    titleEn: 'Drop - Carpooling Mobile App',
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
    status: 'LIVE',
    is_featured: false,
    tech: ['Flutter', 'Dart', 'Laravel API', 'MySQL', 'Google Maps SDK', 'WebSockets', 'Figma'],
    image: 'https://qjnsmdtnututsdrvbmei.supabase.co/storage/v1/object/public/portfolio_media/1786726578232-ebyame9.png',
    gallery: [
      'https://qjnsmdtnututsdrvbmei.supabase.co/storage/v1/object/public/portfolio_media/1786726578232-ebyame9.png',
      'https://qjnsmdtnututsdrvbmei.supabase.co/storage/v1/object/public/portfolio_media/1786725723022-vdnss6j.png',
      'https://qjnsmdtnututsdrvbmei.supabase.co/storage/v1/object/public/portfolio_media/1786725721918-fbl9goi.png',
      'https://qjnsmdtnututsdrvbmei.supabase.co/storage/v1/object/public/portfolio_media/1786725720749-2t1xlic.png',
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
    id: 14,
    slug: 'association-senegalais-moncton',
    titleFr: 'Association des Sénégalais de Moncton',
    titleEn: 'Association of Senegalese of Moncton',
    summaryFr: 'Identité visuelle complète, charte graphique et plateforme web pour l’Association des Sénégalais de Moncton.',
    summaryEn: 'Complete visual identity, brand guidelines, and web platform for the Association of Senegalese of Moncton.',
    category: 'Digital / Design',
    categoryFilter: 'branding',
    badges: ['BRANDING', 'IDENTITY', 'UI/UX'],
    roleFr: 'Designer Graphique & Développeur Web',
    roleEn: 'Graphic Designer & Web Developer',
    timelineFr: 'Sprint 2 Mois',
    timelineEn: '2 Months Sprint',
    statusFr: 'Produit en Ligne',
    statusEn: 'Live Product',
    status: 'LIVE',
    is_featured: false,
    tech: ['Figma', 'Photoshop', 'Illustrator', 'WordPress', 'Next.js', 'Tailwind CSS'],
    image: 'https://qjnsmdtnututsdrvbmei.supabase.co/storage/v1/object/public/portfolio_media/1786727429306-o7wwwij.jpeg',
    gallery: [
      'https://qjnsmdtnututsdrvbmei.supabase.co/storage/v1/object/public/portfolio_media/1786727429306-o7wwwij.jpeg',
      'https://qjnsmdtnututsdrvbmei.supabase.co/storage/v1/object/public/portfolio_media/1786727427958-x0b7k9b.jpeg',
      'https://qjnsmdtnututsdrvbmei.supabase.co/storage/v1/object/public/portfolio_media/1786727426749-w4h0zdf.jpeg',
    ],
    demoUrl: '',
    githubUrl: '',
    challenge: {
      badgeFr: '01. LE DÉFI',
      badgeEn: '01. THE CHALLENGE',
      titleFr: 'Unir et valoriser la communauté à travers une identité forte.',
      titleEn: 'Unifying and empowering the community through a strong identity.',
      p1Fr: 'L’Association des Sénégalais de Moncton avait besoin d’une identité visuelle professionnelle et moderne pour fédérer les membres, accueillir les nouveaux arrivants et organiser ses événements culturels et d’intégration.',
      p1En: 'The Association of Senegalese of Moncton needed a modern and professional visual identity to unite members, welcome newcomers, and promote cultural and integration events.',
      p2Fr: 'L’objectif était de concevoir un univers graphique chaleureux et structuré, déclinable sur tous les supports numériques et imprimés.',
      p2En: 'The goal was crafting a warm and structured graphic identity adaptable across all digital and print mediums.',
    },
    solution: {
      badgeFr: '02. LA SOLUTION',
      badgeEn: '02. THE SOLUTION',
      titleFr: 'Identité visuelle, charte graphique et plateforme digitale.',
      titleEn: 'Visual identity, brand system, and digital platform.',
      cards: [
        {
          titleFr: 'Création du logo et de la charte graphique',
          titleEn: 'Logo Creation & Brand Guidelines',
          descFr: 'Conception d’un logo symbolique fort avec palette de couleurs identitaire et typographie moderne.',
          descEn: 'Design of a symbolic logo with curated color palette and modern typography.',
        },
        {
          titleFr: 'Supports de communication & Réseaux sociaux',
          titleEn: 'Communication Assets & Social Media Kit',
          descFr: 'Kits de communication pour les événements, bannières et modèles de publications engageants.',
          descEn: 'Turnkey event branding kits, banners, and engaging social media templates.',
        },
      ],
    },
    architecture: {
      badgeFr: '03. STACK DE CONCEPTION',
      badgeEn: '03. DESIGN STACK',
      titleFr: 'Outils et Flux de Production Graphique.',
      titleEn: 'Tools & Graphic Production Pipeline.',
      client: {
        layer: 'DESIGN UI/UX',
        title: 'Figma & Adobe CC',
        sub: 'Vector Graphics · Design Tokens',
      },
      backend: {
        layer: 'CMS & HOSTING',
        title: 'WordPress / Next.js',
        sub: 'Responsive Web Design',
      },
      database: {
        layer: 'ASSETS & MEDIA',
        title: 'Cloud Media Storage',
        sub: 'SVG · WebP · High-Res Print',
      },
    },
    results: {
      badgeFr: '04. IMPACT & RÉSULTATS',
      badgeEn: '04. IMPACT & RESULTS',
      titleFr: 'Visibilité et engagement communautaire.',
      titleEn: 'Visibility & Community Engagement.',
      metrics: [
        {
          value: '100%',
          labelFr: 'Adhésion des membres à la nouvelle identité',
          labelEn: 'Member approval of the new visual identity',
        },
        {
          value: '+200',
          labelFr: 'Membres et participants touchés',
          labelEn: 'Community members reached',
        },
        {
          value: '5/5',
          labelFr: 'Satisfaction de l’équipe de direction',
          labelEn: 'Executive team satisfaction score',
        },
      ],
    },
  },
  {
    id: 16,
    slug: 'boucher-et-associes',
    titleFr: 'Boucher et Associés Avocats',
    titleEn: 'Boucher et Associés Law Firm',
    summaryFr: 'Plateforme web institutionnelle moderne et espace client sécurisé pour un cabinet d’avocats d’affaires et de conseil juridique d’excellence.',
    summaryEn: 'Modern corporate web platform and secure client portal for a premier corporate law and legal advisory firm.',
    category: 'Web Development',
    categoryFilter: 'web',
    badges: ['CORPORATE', 'FULL STACK', 'LEGALTECH'],
    roleFr: 'Développeur Full-Stack & Designer UI',
    roleEn: 'Full-Stack Developer & UI Designer',
    timelineFr: 'Sprint 2 Mois',
    timelineEn: '2 Months Sprint',
    statusFr: 'Produit en Ligne',
    statusEn: 'Live Product',
    status: 'LIVE',
    is_featured: false,
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Laravel', 'PostgreSQL', 'Stripe'],
    image: 'https://qjnsmdtnututsdrvbmei.supabase.co/storage/v1/object/public/portfolio_media/1786727928090-lsspxzp.webp',
    gallery: [
      'https://qjnsmdtnututsdrvbmei.supabase.co/storage/v1/object/public/portfolio_media/1786727928090-lsspxzp.webp',
      'https://qjnsmdtnututsdrvbmei.supabase.co/storage/v1/object/public/portfolio_media/1786727926868-m83103.webp',
      'https://qjnsmdtnututsdrvbmei.supabase.co/storage/v1/object/public/portfolio_media/1786727925565-x5j1c8.webp',
    ],
    demoUrl: 'https://demo.boucher-avocats.myfolio.com',
    githubUrl: 'https://github.com/Naby-Coder/boucher-associes',
    challenge: {
      badgeFr: '01. LE DÉFI',
      badgeEn: '01. THE CHALLENGE',
      titleFr: 'Moderniser l’image du cabinet et sécuriser les échanges juridiques.',
      titleEn: 'Modernizing corporate legal image while securing client data.',
      p1Fr: 'Le cabinet Boucher et Associés souhaitait renouveler sa présence en ligne avec une interface institutionnelle sobre et haut de gamme, tout en facilitant la prise de rendez-vous en ligne et la consultation préalable de dossiers juridiques confidentiels.',
      p1En: 'Boucher et Associés sought to enhance their digital presence with an elegant corporate interface while streamlining online consultations and confidential client file handling.',
      p2Fr: 'L’enjeu consistait à garantir une conformité stricte aux exigences de confidentialité et de sécurité des données tout en assurant une navigation rapide et fluide.',
      p2En: 'The challenge required strict data privacy compliance and highest-grade encryption with ultra-fast page load times.',
    },
    solution: {
      badgeFr: '02. LA SOLUTION',
      badgeEn: '02. THE SOLUTION',
      titleFr: 'Un portail web institutionnel avec prise de rendez-vous.',
      titleEn: 'An institutional web portal with integrated booking.',
      cards: [
        {
          titleFr: 'Présentation des pôles d’expertise juridique',
          titleEn: 'Legal Expertise Showcase',
          descFr: 'Pages structurées mettant en valeur les avocats du cabinet, leurs spécialités et leurs publications juridiques.',
          descEn: 'Structured sections highlighting lawyers, areas of practice, and authoritative legal publications.',
        },
        {
          titleFr: 'Module de prise de consultation en ligne',
          titleEn: 'Online Consultation & Intake System',
          descFr: 'Prise de rendez-vous automatisée avec synchronisation de calendrier et paiement préalable sécurisé.',
          descEn: 'Automated consultation scheduling with live calendar sync and secure client intake.',
        },
      ],
    },
    architecture: {
      badgeFr: '03. ARCHITECTURE TECHNIQUE',
      badgeEn: '03. TECHNICAL ARCHITECTURE',
      titleFr: 'Stack Web Sécurisée et Performante.',
      titleEn: 'Secure & High-Performance Web Stack.',
      client: {
        layer: 'FRONTEND UI',
        title: 'Next.js App Router',
        sub: 'TypeScript · Tailwind CSS · SEO Top Tier',
      },
      backend: {
        layer: 'BACKEND SERVICES',
        title: 'Laravel REST API',
        sub: 'Sanctum Auth · Encrypted Storage',
      },
      database: {
        layer: 'DATABASE',
        title: 'PostgreSQL Cloud',
        sub: 'SSL Encrypted · Strict Access Controls',
      },
    },
    results: {
      badgeFr: '04. IMPACT & RÉSULTATS',
      badgeEn: '04. IMPACT & RESULTS',
      titleFr: 'Croissance et acquisition de nouveaux dossiers.',
      titleEn: 'Growth & Client Acquisition Results.',
      metrics: [
        {
          value: '+80%',
          labelFr: 'Demandes de consultations entrantes via le site',
          labelEn: 'Increase in inbound consultation requests',
        },
        {
          value: '< 1s',
          labelFr: 'Temps de chargement moyen des pages',
          labelEn: 'Average page load speed across all devices',
        },
        {
          value: '100%',
          labelFr: 'Conformité RGPD et sécurité des échanges',
          labelEn: 'Data protection and GDPR compliance',
        },
      ],
    },
  },
];
