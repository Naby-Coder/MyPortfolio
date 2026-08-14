export interface BlogArticleData {
  id: number;
  slug: string;
  categoryFr: string;
  categoryEn: string;
  titleFr: string;
  titleEn: string;
  excerptFr: string;
  excerptEn: string;
  author: string;
  dateFr: string;
  dateEn: string;
  readingTime: number;
  image: string;
  tocFr: string[];
  tocEn: string[];
  sections: {
    titleFr: string;
    titleEn: string;
    bodyFr: string;
    bodyEn: string;
    codeSnippet?: {
      language: string;
      code: string;
    };
  }[];
}

export const blogArticles: BlogArticleData[] = [
  {
    id: 1,
    slug: 'building-modern-portfolio-nextjs-laravel',
    categoryFr: 'Développement Full-Stack',
    categoryEn: 'Full-Stack Development',
    titleFr: 'Concevoir un portfolio d’ingénierie moderne avec Next.js 15 et Laravel API',
    titleEn: 'Building a modern engineering portfolio with Next.js 15 and Laravel API',
    excerptFr: 'Retour d’expérience sur l’architecture d’un portfolio découplé séparant le frontend haute performance du backend de gestion sécurisé.',
    excerptEn: 'Case study on building a decoupled portfolio architecture separating high-performance frontend from a secure management backend.',
    author: 'Mouhamed Ndione',
    dateFr: '12 août 2026',
    dateEn: 'August 12, 2026',
    readingTime: 8,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    tocFr: [
      '01. Introduction & Vision Architecturale',
      '02. Pourquoi un Découplage Total Frontend / Backend ?',
      '03. Implémentation du Code & Intégration API',
      '04. Optimisation des Performances & Déploiement Cloud',
    ],
    tocEn: [
      '01. Introduction & Architectural Vision',
      '02. Why Full Frontend / Backend Decoupling?',
      '03. Code Implementation & API Integration',
      '04. Performance Optimization & Cloud Deployment',
    ],
    sections: [
      {
        titleFr: '01. Introduction & Vision Architecturale',
        titleEn: '01. Introduction & Architectural Vision',
        bodyFr:
          'Lorsqu’on conçoit un portfolio professionnel d’ingénieur logiciel et designer, la tentation est grande de se reposer sur un template générique ou un CMS traditionnel. Cependant, pour démontrer une maîtrise complète de la chaîne de valeur (Frontend, UI/UX, Backend et DevOps), construire une application sur-mesure découplée constitue le choix le plus rigoureux.',
        bodyEn:
          'When building a professional portfolio for a software engineer and designer, it is tempting to rely on generic templates or legacy CMS platforms. However, to demonstrate end-to-end engineering mastery across Frontend, UI/UX, Backend, and DevOps, building a custom decoupled architecture is the most rigorous choice.',
      },
      {
        titleFr: '02. Pourquoi un Découplage Total Frontend / Backend ?',
        titleEn: '02. Why Full Frontend / Backend Decoupling?',
        bodyFr:
          'Séparer le frontend Next.js App Router (rendu côté serveur SSG/ISR) du backend Laravel (API REST et base de données PostgreSQL) offre une vitesse de chargement instantanée (First Contentful Paint < 0.4s) et une isolation de sécurité idéale avec authentification par jetons sécurisés.',
        bodyEn:
          'Decoupling the Next.js App Router frontend (SSG/ISR rendering) from the Laravel REST API backend (PostgreSQL database) delivers sub-second load performance (First Contentful Paint < 0.4s) and enterprise security isolation.',
      },
      {
        titleFr: '03. Implémentation du Code & Intégration API',
        titleEn: '03. Code Implementation & API Integration',
        bodyFr:
          'La consommation des données est typée de bout en bout grâce à TypeScript. Voici un aperçu du contrôleur d’authentification et de routage mis en œuvre :',
        bodyEn:
          'Data consumption is end-to-end type-safe using TypeScript interfaces. Here is an overview of the authentication and API dispatch layer:',
        codeSnippet: {
          language: 'typescript',
          code: `// Fetching type-safe data with Next.js Cache & Revalidation
export async function getFeaturedProjects(): Promise<Project[]> {
  const res = await fetch(\`\${process.env.NEXT_PUBLIC_API_URL}/api/projects\`, {
    next: { revalidate: 3600 },
    headers: {
      'Accept': 'application/json',
      'Authorization': \`Bearer \${process.env.INTERNAL_API_SECRET}\`
    }
  });

  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}`,
        },
      },
      {
        titleFr: '04. Optimisation des Performances & Déploiement Cloud',
        titleEn: '04. Performance Optimization & Cloud Deployment',
        bodyFr:
          'Grâce à l’optimisation automatique des images WebP, au cache Edge Vercel et au CDN global, le score Google Lighthouse atteint 100/100 sur l’ensemble des métriques Core Web Vitals.',
        bodyEn:
          'Through automated WebP image optimization, Vercel Edge caching, and a global CDN, the project achieves a flawless 100/100 score across all Google Lighthouse Core Web Vitals.',
      },
    ],
  },
  {
    id: 2,
    slug: 'network-security-cloud-infrastructure-hardening',
    categoryFr: 'Sécurité & Réseaux',
    categoryEn: 'Security & Networks',
    titleFr: 'Sécurisation et Durcissement d’une Infrastructure Réseau & Cloud : Bonnes Pratiques en Entreprise',
    titleEn: 'Securing and Hardening Network & Cloud Infrastructure: Enterprise Best Practices',
    excerptFr: 'Guide pratique sur la mise en place de politiques de sécurité Zero-Trust, pare-feu UFW/pfSense, isolation VLAN et surveillance IDS/IPS.',
    excerptEn: 'Practical guide to establishing Zero-Trust security policies, UFW/pfSense firewalls, VLAN network segmentation, and IDS/IPS monitoring.',
    author: 'Mouhamed Ndione',
    dateFr: '10 août 2026',
    dateEn: 'August 10, 2026',
    readingTime: 10,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    tocFr: [
      '01. Principe du Zero Trust en Environnement Moderne',
      '02. Segmentation Réseau : VLANs & Règles de Pare-feu',
      '03. Durcissement des Serveurs Linux & Accès SSH',
      '04. Monitoring Actif : Suricata & Fail2ban',
    ],
    tocEn: [
      '01. Zero Trust Principles in Modern Environments',
      '02. Network Segmentation: VLANs & Firewall Rules',
      '03. Linux Server Hardening & SSH Key Management',
      '04. Active Monitoring: Suricata & Fail2ban',
    ],
    sections: [
      {
        titleFr: '01. Principe du Zero Trust en Environnement Moderne',
        titleEn: '01. Zero Trust Principles in Modern Environments',
        bodyFr:
          'Le paradigme « Never Trust, Always Verify » (Ne jamais faire confiance, toujours vérifier) impose que chaque utilisateur, appareil et paquet réseau soit authentifié et chiffré, qu’il provienne de l’extérieur ou de l’intérieur du réseau local.',
        bodyEn:
          'The "Never Trust, Always Verify" paradigm mandates that every user, device, and network packet is authenticated and encrypted, regardless of whether it originates inside or outside the local perimeter.',
      },
      {
        titleFr: '02. Segmentation Réseau : VLANs & Règles de Pare-feu',
        titleEn: '02. Network Segmentation: VLANs & Firewall Rules',
        bodyFr:
          'L’isolation des serveurs d’application (DMZ), des bases de données et des postes de gestion dans des sous-réseaux (VLAN) distincts empêche tout déplacement latéral en cas de compromission d’un point d’entrée.',
        bodyEn:
          'Isolating application servers (DMZ), database clusters, and management workstations into dedicated VLANs prevents lateral movement in the event of an initial intrusion.',
      },
      {
        titleFr: '03. Durcissement des Serveurs Linux & Accès SSH',
        titleEn: '03. Linux Server Hardening & SSH Key Management',
        bodyFr:
          'La désactivation de l’authentification par mot de passe SSH, le changement du port par défaut, l’application de règles UFW strictes et l’activation de Fail2ban réduisent de 99% les tentatives de brute-force.',
        bodyEn:
          'Disabling SSH password authentication, enforcing ed25519 cryptographic keys, restricting UFW firewall ingress, and enabling Fail2ban eliminates over 99% of brute-force attack vectors.',
        codeSnippet: {
          language: 'bash',
          code: `# /etc/ssh/sshd_config hardening
Port 2222
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
X11Forwarding no
MaxAuthTries 3

# UFW Firewall Rules
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 2222/tcp comment 'Hardened SSH'
sudo ufw allow 443/tcp comment 'HTTPS'
sudo ufw enable`,
        },
      },
      {
        titleFr: '04. Monitoring Actif : Suricata & Fail2ban',
        titleEn: '04. Active Monitoring: Suricata & Fail2ban',
        bodyFr:
          'L’intégration d’un système de détection et prévention d’intrusion (IDS/IPS) comme Suricata couplé à des alertes automatisées permet d’intercepter les scans de vulnérabilités en temps réel.',
        bodyEn:
          'Deploying an Intrusion Detection & Prevention System (IDS/IPS) such as Suricata alongside automated telemetry ensures real-time vulnerability scan mitigation.',
      },
    ],
  },
  {
    id: 3,
    slug: 'cross-platform-flutter-supabase-realtime',
    categoryFr: 'Mobile & Flutter',
    categoryEn: 'Mobile & Flutter',
    titleFr: 'Développement Mobile Multiplateforme avec Flutter & Supabase : Architecture Réactive et Mode Hors-Ligne',
    titleEn: 'Cross-Platform Mobile Engineering with Flutter & Supabase: Reactive Architecture & Offline-First',
    excerptFr: 'Comment concevoir des applications mobiles ultra-fluides avec Flutter, synchronisation temps réel Supabase et persistance locale Hive.',
    excerptEn: 'How to build lightning-fast mobile apps using Flutter, Supabase real-time subscriptions, and Hive local offline caching.',
    author: 'Mouhamed Ndione',
    dateFr: '06 août 2026',
    dateEn: 'August 06, 2026',
    readingTime: 7,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    tocFr: [
      '01. Pourquoi le duo Flutter & Supabase ?',
      '02. Architecture en Couches (BLoC / Riverpod)',
      '03. Synchronisation Temps Réel & Mode Offline',
      '04. Gestion Sécurisée des Sessions Utilisateur',
    ],
    tocEn: [
      '01. Why the Flutter & Supabase Combo?',
      '02. Layered Architecture (BLoC / Riverpod)',
      '03. Real-Time Sync & Offline-First Persistence',
      '04. Secure User Session Management',
    ],
    sections: [
      {
        titleFr: '01. Pourquoi le duo Flutter & Supabase ?',
        titleEn: '01. Why the Flutter & Supabase Combo?',
        bodyFr:
          'Flutter offre un rendu à 60/120 images par seconde sur iOS et Android à partir d’un code source unique, tandis que Supabase apporte la puissance de PostgreSQL avec authentification, WebSockets temps réel et stockage sécurisé.',
        bodyEn:
          'Flutter provides seamless 60/120 FPS rendering across iOS and Android from a unified codebase, while Supabase delivers scalable PostgreSQL with auth, real-time WebSockets, and storage out of the box.',
      },
      {
        titleFr: '02. Architecture en Couches (BLoC / Riverpod)',
        titleEn: '02. Layered Architecture (BLoC / Riverpod)',
        bodyFr:
          'Adopter une architecture propre (Clean Architecture) séparant la couche Présentation (Widgets UI), la couche Logique Métier (State Management) et la couche Données (Repositories) assure une maintenance sans friction.',
        bodyEn:
          'Adopting Clean Architecture separating Presentation (UI Widgets), Domain (Business Logic & State), and Data (Repositories) ensures maintainable long-term scalability.',
        codeSnippet: {
          language: 'dart',
          code: `// Supabase Real-Time Stream Provider with Riverpod
final orderUpdatesProvider = StreamProvider.autoDispose<List<Order>>((ref) {
  final supabase = ref.watch(supabaseClientProvider);
  return supabase
      .from('orders')
      .stream(primaryKey: ['id'])
      .eq('user_id', supabase.auth.currentUser!.id)
      .map((maps) => maps.map((item) => Order.fromJson(item)).toList());
});`,
        },
      },
      {
        titleFr: '03. Synchronisation Temps Réel & Mode Offline',
        titleEn: '03. Real-Time Sync & Offline-First Persistence',
        bodyFr:
          'En combinant Hive ou SQLite local avec une file d’attente de synchronisation bidirectionnelle, l’application reste 100% utilisable sans connexion internet et synchronise les mutations dès le retour du réseau.',
        bodyEn:
          'Pairing local Hive/SQLite storage with bidirectional sync queues ensures 100% offline usability with immediate optimistic updates synchronized on reconnection.',
      },
    ],
  },
  {
    id: 4,
    slug: 'figma-to-code-enterprise-design-system',
    categoryFr: 'Design UI/UX',
    categoryEn: 'UI/UX Design',
    titleFr: 'De Figma au Code : Structurer un Design System Moderne et Accessible pour SaaS',
    titleEn: 'From Figma to Code: Building a Modern & Accessible Design System for Enterprise SaaS',
    excerptFr: 'Méthodologie complète pour transformer des tokens Figma en composants React/Tailwind accessibles (WCAG 2.1 AA) et réutilisables.',
    excerptEn: 'Complete methodology to translate Figma tokens into accessible (WCAG 2.1 AA) and reusable React & Tailwind CSS components.',
    author: 'Mouhamed Ndione',
    dateFr: '02 août 2026',
    dateEn: 'August 02, 2026',
    readingTime: 6,
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    tocFr: [
      '01. L’Importance des Design Tokens',
      '02. Organisation Atomique dans Figma',
      '03. Traduction en Composants React & Tailwind',
      '04. Accessibilité WCAG & Tests d’Ergonomie',
    ],
    tocEn: [
      '01. The Power of Design Tokens',
      '02. Atomic Structure in Figma',
      '03. Translation to React & Tailwind Components',
      '04. WCAG Accessibility & Usability Testing',
    ],
    sections: [
      {
        titleFr: '01. L’Importance des Design Tokens',
        titleEn: '01. The Power of Design Tokens',
        bodyFr:
          'Les Design Tokens définissent les variables fondamentales d’une marque : échelle typographique, palettes de couleurs sémantiques, rayons de courbure et espacements. Ils constituent le pont direct entre l’équipe design et l’équipe technique.',
        bodyEn:
          'Design Tokens represent the atomic visual DNA of a product: typographic scales, semantic color palettes, border radiuses, and spatial units, bridging the gap between Figma and code.',
      },
      {
        titleFr: '02. Organisation Atomique dans Figma',
        titleEn: '02. Atomic Structure in Figma',
        bodyFr:
          'En structurant les maquettes selon la hiérarchie Atomes (Boutons, Inputs), Molécules (Formulaires, Cartes) et Organismes (Headers, Modales), chaque composant s’intègre dans le code sans friction.',
        bodyEn:
          'Organizing UI components atomically—Atoms (Buttons, Badges), Molecules (Cards, Inputs), and Organisms (Navbars, Modals)—mirrors modular component architecture in frontend frameworks.',
      },
      {
        titleFr: '03. Traduction en Composants React & Tailwind',
        titleEn: '03. Translation to React & Tailwind Components',
        bodyFr:
          'L’utilisation de variables CSS personnalisées et de classes utilitaires Tailwind garantit un basculement fluide entre le mode sombre (Dark Mode) et le mode clair avec un contraste certifié.',
        bodyEn:
          'Leveraging custom CSS variables and Tailwind utility classes allows instant Dark/Light mode switching with guaranteed contrast ratios.',
      },
    ],
  },
  {
    id: 5,
    slug: 'headless-wordpress-core-web-vitals-jamstack',
    categoryFr: 'CMS & WordPress',
    categoryEn: 'CMS & WordPress',
    titleFr: 'WordPress Headless & Performance Web : Optimiser Core Web Vitals et Architecture Jamstack',
    titleEn: 'Headless WordPress & Web Performance: Optimizing Core Web Vitals with Jamstack Architecture',
    excerptFr: 'Comment allier la facilité éditoriale de WordPress avec la vitesse fulgurante de Next.js via GraphQL et le rendu statique ISR.',
    excerptEn: 'How to combine WordPress editorial ease with ultra-fast Next.js speed via GraphQL APIs and Incremental Static Regeneration.',
    author: 'Mouhamed Ndione',
    dateFr: '28 juillet 2026',
    dateEn: 'July 28, 2026',
    readingTime: 9,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    tocFr: [
      '01. Pourquoi le Headless WordPress ?',
      '02. GraphQL vs REST API pour la Récupération de Contenu',
      '03. Régénération Statique Incrémentale (ISR)',
      '04. Résultats & Score Lighthouse 100/100',
    ],
    tocEn: [
      '01. Why Headless WordPress?',
      '02. GraphQL vs REST API for Content Queries',
      '03. Incremental Static Regeneration (ISR)',
      '04. Benchmark Results & 100/100 Lighthouse',
    ],
    sections: [
      {
        titleFr: '01. Pourquoi le Headless WordPress ?',
        titleEn: '01. Why Headless WordPress?',
        bodyFr:
          'WordPress propulse plus de 40% du Web grâce à son interface de gestion intuitive. Cependant, les thèmes traditionnels souffrent souvent de lourdeurs techniques. En dissociant le CMS comme backend de gestion et en utilisant Next.js pour le rendu, on obtient le meilleur des deux mondes.',
        bodyEn:
          'WordPress powers over 40% of the web thanks to its editorial dashboard. However, legacy monolithic themes often suffer from asset bloat. Decoupling WordPress as a headless content backend and using Next.js for presentation gives the best of both worlds.',
      },
      {
        titleFr: '02. GraphQL vs REST API pour la Récupération de Contenu',
        titleEn: '02. GraphQL vs REST API for Content Queries',
        bodyFr:
          'Avec WPGraphQL, on évite le sur-échantillonnage de données (over-fetching) en demandant uniquement les champs nécessaires pour chaque composant de page.',
        bodyEn:
          'With WPGraphQL, frontend components request precisely the JSON fields required, eliminating network overhead and payload bloat.',
      },
      {
        titleFr: '03. Régénération Statique Incrémentale (ISR)',
        titleEn: '03. Incremental Static Regeneration (ISR)',
        bodyFr:
          'Grâce à l’ISR de Next.js, les pages sont pré-générées sous forme de fichiers HTML statiques ultra-rapides et se mettent à jour automatiquement en arrière-plan à chaque publication.',
        bodyEn:
          'Next.js Incremental Static Regeneration pre-renders static HTML pages served globally from the edge, auto-revalidating in the background upon editorial publication.',
      },
    ],
  },
];
