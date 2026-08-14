# PLAN DE DÉVELOPPEMENT DÉTAILLÉ — MYFOLIO

> **Portfolio professionnel de Mouhamed Ndione**
> Signature : *"Building digital experiences & reliable systems."*

Ce document constitue la feuille de route complète et rigoureuse du projet **MyFolio**. Le développement est structuré en **16 phases (Phase 0 à Phase 15)**. Conformément aux règles strictes de développement, les étapes s'exécutent de façon séquentielle et incrémentale.

---

## SOMMAIRE DES PHASES

- [PHASE 0 — Documentation et conception](#phase-0--documentation-et-conception)
- [PHASE 1 — Initialisation](#phase-1--initialisation)
- [PHASE 2 — Design System](#phase-2--design-system)
- [PHASE 3 — Backend Laravel](#phase-3--backend-laravel)
- [PHASE 4 — Base de données](#phase-4--base-de-donnees)
- [PHASE 5 — Frontend public](#phase-5--frontend-public)
- [PHASE 6 — Administration](#phase-6--administration)
- [PHASE 7 — Fonctionnalités avancées](#phase-7--fonctionnalites-avancees)
- [PHASE 8 — SEO](#phase-8--seo)
- [PHASE 9 — Performance](#phase-9--performance)
- [PHASE 10 — Sécurité](#phase-10--securite)
- [PHASE 11 — Tests](#phase-11--tests)
- [PHASE 12 — Préproduction](#phase-12--preproduction)
- [PHASE 13 — Déploiement](#phase-13--deploiement)
- [PHASE 14 — Audit final](#phase-14--audit-final)
- [PHASE 15 — Documentation finale](#phase-15--documentation-finale)

---

## PHASE 0 — Documentation et conception

### Objectif
Établir les fondations conceptuelles et documentaires complètes du projet, fixer la vision d'ingénierie, définir la structure d'accueil et s'assurer que les choix d'architecture et les conventions Git sont clairement spécifiés avant d'écrire la moindre ligne de code d'application.

### Tâches
- Rédiger le fichier `README.md` exhaustif présentant le projet, les objectifs, le positionnement, la stack technique, l'architecture globale, le schéma de base de données, la sécurité, le SEO, et la roadmap.
- Rédiger le fichier `DEVELOPMENT_PLAN.md` détaillé découpant l'ensemble de la réalisation en 16 phases étanches avec objectifs, tâches, fichiers concernés, dépendances, critères de validation et statuts.
- Définir l'architecture globale (Frontend Next.js sur Vercel, Backend REST API Laravel, MySQL).
- Fixer la politique de commits et le workflow Git.

### Fichiers concernés
- `README.md`
- `DEVELOPMENT_PLAN.md`

### Dépendances
- Aucune (Phase initiale).

### Critères de validation
- `README.md` créé à la racine du projet et valide par rapport au cahier des charges (25 sections).
- `DEVELOPMENT_PLAN.md` créé à la racine du projet et découpé en 16 phases complètes avec le format exigé.
- Aucun code applicatif ni dépendance installé prématurément.

### Statut
- ✅ Terminé

---

## PHASE 1 — Initialisation

### Étape 1.1 — Initialisation du projet Frontend Next.js & TypeScript

#### Objectif
Créer et configurer l'application Next.js avec TypeScript, Tailwind CSS, ESLint et Prettier dans le répertoire `frontend`.

#### Tâches
- Initialiser le projet Next.js App Router dans `frontend/` avec TypeScript.
- Configurer Tailwind CSS et ses plugins de base.
- Configurer ESLint et Prettier pour assurer la qualité et l'uniformité du code TypeScript/React.
- Initialiser la structure des répertoires frontend (`app`, `components`, `lib`, `hooks`, `types`, `styles`, `i18n`, `services`).
- Définir le fichier `.env.local.example` pour les variables d'environnement frontend.
- Configurer Git à la racine avec un fichier `.gitignore` approprié.

#### Fichiers concernés
- `frontend/package.json`
- `frontend/tsconfig.json`
- `frontend/tailwind.config.ts`
- `frontend/.eslintrc.json`
- `frontend/.prettierrc`
- `frontend/.env.local.example`
- `frontend/src/app/layout.tsx`
- `frontend/src/app/page.tsx`
- `.gitignore`

#### Dépendances
- Next.js 14+ / 15+, React 18+, TypeScript, Tailwind CSS, Autoprefixer, PostCSS, ESLint, Prettier.

#### Critères de validation
- L'application Next.js démarre sans erreur via `npm run dev`.
- Le linter (`npm run lint`) s'exécute sans aucun warning ni erreur.
- La compilation TypeScript (`npx tsc --noEmit`) s'exécute avec succès.

#### Statut
- ✅ Terminé

---

## PHASE 2 — Design System

### Étape 2.1 — Tokens de Design & Composants UI de Base

#### Objectif
Créer l'identité visuelle Dark/Tech & Futuristic (accents néon, glassmorphism léger, typographie moderne) en se basant sur la [Maquette Figma MyFolio](https://www.figma.com/design/Qt9KgKvPrFZ9RbaeHljStu/MyFolio?node-id=0-1&m=dev&t=hNIX4FdfM60BMXvV-1) et développer la bibliothèque de composants réutilisables avec support Dark/Light mode.

#### Tâches
- Définir la palette de couleurs officielle **Cyber-Creative** dans Tailwind :
  - Background Primaire : `#0A0A0B` (Deep Cyber Black)
  - Accent Secondaire : `#3B82F6` (Electric Blue)
  - Accent Tertiaire : `#8B5CF6` (Electric Violet)
  - Texte Neutre : `#9A9A9E` (Muted Gray)
- Intégrer les typographies de référence : **Geist** (Headlines, Body, Labels) et **Geist Mono** (Terminal Code).
- Développer le composant de fond immersif WebGL (`shader-canvas-ANIMATION_11`) avec grille technique réactive au survol de la souris, vague lumineuse bleue/violette et poussière numérique.
- Développer le sélecteur de thème (Dark/Light mode) avec persistance du choix de l'utilisateur.
- Implémenter les composants UI atomiques :
  - `Button` (variantes primary, secondary, inverted, outlined, glass)
  - `Card` (effet glassmorphism, survol dynamique, bordure réactive)
  - `Badge` / `Tag` (technologies, catégories, statuts)
  - `Input` / `TextArea` / `Select` (formulaires stylisés avec barre de recherche)
  - `Modal` / `Drawer`
  - `SkeletonLoader` pour les états de chargement
- Créer la barre de navigation responsive (`Header` / `Navbar`) avec badge `[M] NDIONE`, navigation `HOME`, `ABOUT`, `SKILLS`, `EXPERIENCE`, `PROJECTS`, `BLOG`, `CONTACT`, switch de langue `EN | FR`, switch de thème et bouton `Let's Talk` avec avatar.
- Créer le composant de pied de page (`Footer`).
- Ajouter les animations CSS / Framer Motion de base (scroll fade-in, hover micro-interactions).

#### Fichiers concernés
- `frontend/src/styles/globals.css`
- `frontend/tailwind.config.ts`
- `frontend/src/components/ui/Button.tsx`
- `frontend/src/components/ui/Card.tsx`
- `frontend/src/components/ui/Badge.tsx`
- `frontend/src/components/ui/Input.tsx`
- `frontend/src/components/ui/Modal.tsx`
- `frontend/src/components/ui/Skeleton.tsx`
- `frontend/src/components/layout/Header.tsx`
- `frontend/src/components/layout/Footer.tsx`
- `frontend/src/components/theme/ThemeToggle.tsx`

#### Dépendances
- `framer-motion`, `lucide-react`, `next-themes` (ou gestionnaire de thème custom).

#### Critères de validation
- Le basculement entre le Dark Mode et le Light Mode fonctionne de manière fluide.
- Les composants UI répondent correctement aux différentes tailles d'écran (Mobile, Tablette, Desktop).
- Tous les composants respectent la direction artistique (Glassmorphism, Dark/Tech, Futuriste).

#### Statut
- ✅ Terminé

---

## PHASE 3 — Backend Laravel

### Étape 3.1 — Initialisation du projet Backend Laravel & REST API Architecture

#### Objectif
Installer, configurer et structurer le backend Laravel dans le répertoire `backend/` pour exposer une API REST sécurisée.

#### Tâches
- Initialiser un projet Laravel dans `backend/`.
- Configurer l'environnement de base (`.env`, connexion MySQL, URLs).
- Installer et configurer Laravel Sanctum pour l'authentification API de l'administration.
- Configurer les règles CORS (`config/cors.php`) pour autoriser les requêtes provenant du Frontend Next.js.
- Créer une structure de réponse API REST standardisée (trait `ApiResponse` : succès, erreur, pagination).
- Configurer la gestion globale des exceptions pour retourner des réponses JSON claires et typées.
- Définir les routes API dans `routes/api.php` (routes publiques vs routes d'administration protégées par middleware sanctum).

#### Fichiers concernés
- `backend/config/cors.php`
- `backend/config/sanctum.php`
- `backend/app/Traits/ApiResponse.php`
- `backend/app/Exceptions/Handler.php`
- `backend/routes/api.php`
- `backend/.env.example`

#### Dépendances
- PHP 8.2+, Laravel 10+/11+, Composer, Laravel Sanctum.

#### Critères de validation
- Les tables MySQL sont créées sans aucune erreur via `php artisan migrate`.
- Les contrôleurs API exposent les données réelles formatées selon le trait ApiResponse.
- Le token Sanctum permet d'accéder aux routes protégées de l'administration.

#### Statut
- ✅ Terminé

---

## PHASE 4 — Base de données

### Étape 4.1 — Modélisation, Migrations & Seeders MySQL

#### Objectif
Concevoir et implémenter le schéma complet de la base de données MySQL couvrant toutes les entités du portfolio et créer des jeux de données de démonstration (seeders).

#### Tâches
- Définir et créer les migrations pour toutes les entités :
  - `admin_users` (id, name, email, password, timestamps)
  - `categories` (id, slug, name_fr, name_en, timestamps)
  - `technologies` (id, name, slug, icon, category_id, is_featured, timestamps)
  - `projects` (id, slug, title_fr, title_en, summary_fr, summary_en, description_fr, description_en, featured_image, demo_url, github_url, is_featured, order, timestamps)
  - `project_technology` (table pivot project_id, technology_id)
  - `skills` (id, name, category [fullstack, uiux, devops, complementary], level_percentage, icon, is_featured, order, timestamps)
  - `experiences` (id, company, position_fr, position_en, location, start_date, end_date, is_current, description_fr, description_en, order, timestamps)
  - `education` (id, institution, degree_fr, degree_en, field_of_study_fr, field_of_study_en, start_date, end_date, description_fr, description_en, order, timestamps)
  - `certifications` (id, title, issuer, issue_date, expiry_date, credential_id, credential_url, badge_image, order, timestamps)
  - `articles` (id, slug, title_fr, title_en, content_fr, content_en, excerpt_fr, excerpt_en, cover_image, published_at, is_published, views_count, timestamps)
  - `testimonials` (id, author_name, author_title_fr, author_title_en, company, avatar, content_fr, content_en, rating, is_featured, order, timestamps)
  - `contact_messages` (id, name, email, subject, message, is_read, ip_address, timestamps)
  - `statistics` (id, key, label_fr, label_en, value, icon, order, timestamps)
  - `portfolio_settings` (id, key, value_fr, value_en, group, timestamps)
- Créer les Modèles Eloquent correspondants avec les relations (HasMany, BelongsToMany, etc.).
- Écrire les Seeders pour inclure les données réelles/initiales de Mouhamed Ndione (les 7 projets principaux, le profil, les formations, certifications, compétences).

#### Fichiers concernés
- `backend/database/migrations/*`
- `backend/app/Models/*`
- `backend/database/seeders/*`

#### Dépendances
- MySQL 8.0+.

#### Critères de validation
- `php artisan migrate:fresh --seed` s'exécute sans aucune erreur.
- Toutes les relations Eloquent fonctionnent correctement et sont testées.
- Les 7 projets spécifiques (SaaS gestion financière, Drop, Boucher et Associés, Kossy Tech Solutions, Ndayou Daara, Assoc. Sénégalais de Moncton, Bibliome) sont présents en base de données.

#### Statut
- ✅ Terminé

---

## PHASE 5 — Frontend public

### Étape 5.1 — Intégration des Sections et Pages Publiques du Portfolio

#### Objectif
Développer l'intégralité des sections et pages du portfolio public en consommant l'API Backend Laravel ou les données structurées.

#### Tâches
#### Tâches
- **Hero Section & WebGL Canvas** : Intégrer le composant `shader-canvas-ANIMATION_11` (grille bleue `#3B82F6` / violette `#8B5CF6`, effets au survol de la souris, poussière numérique), carte code terminal flottante (`const architect = { name: "Ndione", passion: "UI/UX" }`), signature *"Building digital experiences & reliable systems."*, CTAs (`View My Projects ->`, `Let's Work Together`, `View CV ->`).
- **Section À propos ("Engineering Elegance")** : Présentation du profil dual Architecte-Hacker, structure 3D en verre, grille complète du **Technical Ecosystem** (Frontend, UI/UX, Backend & APIs, DevOps & Systems, Mobile Dev).
- **Section Disciplines & Métriques** : Cartes des 3 piliers (Web & Mobile Dev, UI/UX Design, DevOps & Cloud) + Bandeau de métriques (`7+` ans/projets, `15+` technologies, `100%` passion & intégrité).
- **Section Career Path (`/experience`)** : Timeline chronologique des postes (Senior Systems Engineer TechFlow, Network Security Analyst SecureData Corp, Junior IT Systems Admin Global Logistics), badges techniques (`AWS`, `Kubernetes`, `Terraform`, `Zero Trust`), section Education & Certifications (`MSc Computer Science`, `CISSP Certified Active`, `AWS Solutions Architect`).
- **Section Projets (Showcase) & Filtres** : Grille avec filtres par catégorie (`ALL`, `WEB`, `MOBILE`, `UI/UX`, `DESIGN`), barre de recherche textuelle.
- **Page Détails Case Study (`/projects/[slug]`)** : Maquette type *Nexus Financial* avec en-tête d'impact, aperçu dashboard sombre, meta grid (Rôle, Timeline, Client, Stack), sections *Data overload*, *Architecting solution*, *Engineered for Scale*, *Design System Tokens*, *Data Flow Topology* (Diagramme de flux client -> API -> DB), et carte d'impact numérique (`-65%` load time, `1.2M` events/min, `98%` satisfaction).
- **Section Réalisations Graphiques ("Creative Endeavors")** : Portfolio visuel, prototypes UI/UX, rendus 3D et branding.
- **Section Contact & GitHub Sync (`/contact`)** : Formulaire Direct Message (*Transmit*), Widget de synchronisation GitHub API en direct (`nexus-design-system`, `aether-engine`), Grille Heatmap des contributions (`945 contributions in the last year`), cartes d'informations (`hello@example.com`, `in/mouhamedndione`, `Dakar, SN | Remote`), et carrousel Endorsements / Témoignages (Elena Rodriguez, Marcus Chen).
- **Section Blog (`/blog` & `/blog/[slug]`)** : Liste des articles techniques, lecture avec typographie Geist Mono/Geist.
- **Section CV (`/cv`)** : Visualiseur de CV interactif + téléchargement PDF.

#### Fichiers concernés
- `frontend/src/app/[lang]/page.tsx`
- `frontend/src/app/[lang]/about/page.tsx`
- `frontend/src/app/[lang]/experience/page.tsx`
- `frontend/src/app/[lang]/projects/page.tsx`
- `frontend/src/app/[lang]/projects/[slug]/page.tsx`
- `frontend/src/app/[lang]/blog/page.tsx`
- `frontend/src/app/[lang]/blog/[slug]/page.tsx`
- `frontend/src/app/[lang]/cv/page.tsx`
- `frontend/src/app/[lang]/contact/page.tsx`
- `frontend/src/components/sections/*`
- `frontend/src/components/canvas/ShaderCanvas.tsx`

#### Dépendances
- `axios` / `fetch` API Client, `react-hook-form`, `zod` (validation formulaire), WebGL Context.

#### Critères de validation
- Toutes les pages publiques s'affichent correctement et consomment les données API ou statiques.
- La règle stricte des 7 liens de navigation dans la Navbar est respectée.
- Les interactions (filtres, modales, visualiseur CV, accordéons, formulaires) fonctionnent parfaitement.

#### Statut
- ✅ Terminé

---

## PHASE 6 — Administration

### Étape 6.1 — Back-Office de Gestion Sur Mesure (`/admin`)

#### Objectif
Créer l'interface d'administration sécurisée `/admin` conforme aux maquettes (Dashboard Overview & Project Manager) permettant à Mouhamed Ndione de gérer le portfolio sans CMS externe.

#### Tâches
- **Authentification Admin** : Page de connexion (`/admin/login`), gestion du token Sanctum/JWT dans le frontend, protection des routes admin par Guard Next.js.
- **Dashboard Admin (`/admin/dashboard`)** :
  - Arrière-plan Shader WebGL (`ANIMATION_44`) et composant 3D Three.js `Architecture Overview` (`ANIMATION_45` - Nœuds Icosaèdre tournants avec effet de respiration).
  - Barre supérieure avec recherche rapide `Command + K`, bouton `+ NEW POST`, bouton `+ NEW PROJECT`.
  - Stat Cards avec sparklines (`Total Views: 14,208 +12%`, `Inquiries: 3`, `GitHub Sync: 12m ago`, `Avg Read Time: 4:12`).
  - Journal d'activité système (*System Activity Logs*).
  - Statuts du portfolio (*Portfolio Status* : `Cyber-Tech OS Live`, `Aether App Draft`, `Fintech Dash Live`).
  - Bloc *Quick Draft* avec autosave.
- **Project Manager & Project Editor (`/admin/projects` & `/admin/projects/editor`)** :
  - Page *Project Manager* avec tableau interactif (Projet Name, ID `NX-4029`, Status Badges `LIVE`/`DRAFT`/`PRIVATE`, Category, Date Updated, Actions).
  - Barre latérale de filtres par statut (`All Projects 24`, `Live 18`, `Draft 4`, `Private 2`) et par catégorie (`All`, `Web`, `Mobile`, `UI/UX`, `Brand`).
  - Widget de jauge de stockage utilisé (*Storage Used: 3.4 TB / 5.0 TB Max*).
  - Formulaire d'édition à ancres rapides (*Jump To* : General Info, Media Assets, Tech Specs, Case Study, Visibility) avec téléversement Drag & Drop des médias (support PNG, JPG, WEBP, MP4 jusqu'à 50MB, marquage image `HERO`).
- **Blog Manager & Éditeur Article SEO (`/admin/blog` & `/admin/blog/editor`)** :
  - Éditeur riche avec commandes slash `/`, blocs de code typés (`example_component.tsx`) et compteur de mots/caractères en direct.
  - Barre latérale de publication (Slug `/blog/post-title-slug`, Catégorie, Tags).
  - Widget **SEO & Metrics** temps réel (Calcul de la lisibilité `78/100`, Densité de mots-clés `2.4%`, Checklist SEO dynamique, Temps de lecture estimé `4 MIN`).
- **Gestion des Compétences & Technologies (`/admin/skills`, `/admin/technologies`)** : CRUD des compétences.
- **Gestion des Expériences & Formations (`/admin/experiences`, `/admin/education`)** : CRUD des parcours.
- **Gestion des Certifications (`/admin/certifications`)** : CRUD et upload des badges.
- **Gestion des Témoignages (`/admin/testimonials`)** : CRUD des recommandations.
- **Gestion des Messages de Contact (`/admin/messages`)** : Boîte de réception des messages soumis, marquage lu/non lu.
- **Gestion des Statistiques & Paramètres (`/admin/settings`)** : Paramètres globaux du système.

#### Fichiers concernés
- `frontend/src/app/admin/*`
- `frontend/src/components/admin/*`
- `backend/app/Http/Controllers/Api/Admin/*`
- `backend/routes/api.php`

#### Dépendances
- React Hook Form, Zod, Éditeur Markdown/RichText (ex: `@tip-tap/react` ou SimpleMDE), Recharts / Chart.js (optionnel pour dashboard stats).

#### Critères de validation
- Seul un utilisateur authentifié peut accéder à l'interface `/admin`.
- L'ensemble des opérations CRUD (Créer, Lire, Modifier, Supprimer) fonctionne parfaitement pour chaque entité.
- Les images téléchargées dans l'admin s'affichent correctement sur le site public.

#### Statut
- ✅ Terminé

---

## PHASE 7 — Fonctionnalités avancées

### Étape 7.1 — Intégrations API Externe & Fonctionnalités Avancées

#### Objectif
Intégrer les fonctionnalités dynamiques complexes : intégration API GitHub, système de recherche et filtrage multi-critères, lecteur PDF interactif et analytics.

#### Tâches
- **Intégration GitHub API** :
  - Service backend/frontend interrogeant l'API GitHub de Mouhamed Ndione.
  - Mise en cache des réponses API (pour éviter d'atteindre le rate limit GitHub).
  - Composant d'affichage des repos les plus populaires, des contributions et des langues les plus utilisées.
- **Recherche & Filtrage Avancé** :
  - Composant de recherche globale instantanée pour les projets et articles.
  - Filtres multi-critères par technologie, catégorie et type de projet.
- **Visualiseur & Téléchargement de CV** :
  - Intégration d'un visualiseur PDF interactif dans la page CV.
  - Bouton de téléchargement direct du CV mis à jour.
- **Intégration Analytics** :
  - Configuration de Google Analytics 4 (GA4) avec respect du consentement.
  - Enregistrement des événements clés (téléchargement CV, envoi formulaire contact, clic projet).

#### Fichiers concernés
- `frontend/src/services/github.ts`
- `frontend/src/components/features/GitHubSection.tsx`
- `frontend/src/components/features/ProjectSearch.tsx`
- `frontend/src/components/features/PdfViewer.tsx`
- `frontend/src/lib/analytics.ts`
- `backend/app/Services/GitHubService.php`

#### Dépendances
- `@octokit/rest` / Fetch API GitHub, `pdfjs-dist` / `@react-pdf-viewer/core`.

#### Critères de validation
- Les données GitHub (repos, stars) sont récupérées et affichées en temps réel (ou depuis un cache valide).
- Le moteur de recherche et les filtres de projets fonctionnent instantanément sans rechargement de page.
- Le CV est lisible dans le visualiseur et téléchargeable au format PDF.

#### Statut
- ✅ Terminé

---

## PHASE 8 — SEO

### Étape 8.1 — Optimisation Complète du Référencement (SEO & Open Graph)

#### Objectif
Assurer une visibilité maximale du portfolio sur les moteurs de recherche et les réseaux sociaux en appliquant les meilleures pratiques de SEO technique et multilingue.

#### Tâches
- Configurer la génération des métadonnées dynamiques (`title`, `description`, `keywords`) dans Next.js pour chaque page et article.
- Générer les balises Open Graph (OG) et Twitter Cards avec images d'illustration sur-mesure pour les partages de liens.
- Mettre en place la génération automatique de `sitemap.xml` et `robots.txt`.
- Définir les URLs canoniques et les balises `hreflang` pour la prise en charge du SEO multilingue (FR / EN).
- Intégrer les données structurées JSON-LD (`Schema.org` pour `Person`, `WebSite`, `Project`, `BlogPosting`).

#### Fichiers concernés
- `frontend/src/app/sitemap.ts`
- `frontend/src/app/robots.ts`
- `frontend/src/app/[lang]/layout.tsx`
- `frontend/src/components/seo/JsonLd.tsx`

#### Dépendances
- Métadonnées natives Next.js, `schema-dts`.

#### Critères de validation
- Validation des données structurées via l'outil Rich Results Test de Google.
- `sitemap.xml` et `robots.txt` accessibles et correctement formates.
- Les aperçus Open Graph s'affichent correctement lors de partages (LinkedIn, Twitter, WhatsApp).

#### Statut
- ⬜ À faire

---

## PHASE 9 — Performance

### Étape 9.1 — Optimisation des Performances & Core Web Vitals

#### Objectif
Optimiser le temps de chargement, la fluidité des animations et l'empreinte mémoire pour garantir un score Lighthouse optimal (> 90 sur tous les indicateurs).

#### Tâches
- Optimiser le chargement des images via `next/image` (formats WebP/AVIF, dimensions explicites, lazy loading).
- Implémenter le code-splitting et la mise en cache dynamique (Incremental Static Regeneration - ISR pour les pages de projets et blog).
- Optimiser les requêtes backend Laravel (Eager Loading des relations Eloquent pour supprimer le problème N+1, indexation des colonnes MySQL fréquemment interrogées).
- Réduire le bundle JavaScript client (tree-shaking, import dynamique des composants lourds comme les modules 3D / canvas).
- Vérifier et corriger les Core Web Vitals (LCP, FID/INP, CLS).

#### Fichiers concernés
- `frontend/next.config.js`
- `frontend/src/components/*`
- `backend/app/Models/*`
- `backend/app/Http/Controllers/Api/*`

#### Dépendances
- Tools Lighthouse, `@next/bundle-analyzer`.

#### Critères de validation
- Score Lighthouse > 90 sur Desktop et Mobile pour Performance, Accessibilité, Bonnes Pratiques et SEO.
- Pas de layout shifts observés (CLS < 0.1).
- Temps de réponse de l'API backend < 150ms pour les requêtes publiques.

#### Statut
- ⬜ À faire

---

## PHASE 10 — Sécurité

### Étape 10.1 — Durcissement & Sécurisation de l'Application

#### Objectif
Sécuriser l'ensemble des couches de l'application (Frontend, API REST Backend, Base de données MySQL) contre les vulnérabilités courantes.

#### Tâches
- Vérifier la protection de l'API contre les injections SQL (requêtes préparées Eloquent) et les failles XSS (sanitisation des données d'entrée et échappement HTML).
- Configurer un Rate Limiting strict sur les routes de contact et d'authentification (`ThrottleRequests` Laravel).
- Sécuriser l'authentification administrateur (mots de passe hachés via bcrypt/argon2, expiration et révocation des tokens Sanctum).
- Configurer les en-têtes de sécurité HTTP sur Next.js et Laravel (Content Security Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
- Restreindre l'accès aux uploads de fichiers (validation d'extension, contrôle du type MIME réel, stockage hors de la racine web si nécessaire).
- Vérifier qu'aucune donnée ou clé secrète n'est exposée dans le bundle client ou le code source Git.

#### Fichiers concernés
- `backend/app/Http/Middleware/*`
- `backend/config/sanctum.php`
- `frontend/next.config.js`
- `.env` files

#### Dépendances
- Middlewares natifs Laravel et Next.js.

#### Critères de validation
- Tentatives de contournement d'authentification sur `/admin` bloquées.
- Attaques par force brute sur le formulaire de contact bloquées par le Rate Limiting.
- Audit des dépendances (`npm audit` & `composer audit`) sans vulnérabilité critique.

#### Statut
- ⬜ À faire

---

## PHASE 11 — Tests

### Étape 11.1 — Tests d'Assurance Qualité (QA) & Recette

#### Objectif
Valider le bon fonctionnement global de l'application à travers des séries de tests fonctionnels, visuels, d'accessibilité et d'API.

#### Tâches
- **Tests API Backend** : Écrire des tests PHPUnit / Pest pour les endpoints API publics et d'administration (authentification, CRUD projets, envoi message contact).
- **Tests Frontend & Composants** : Vérifier le rendu des composants UI et le comportement des formulaires.
- **Tests d'Accessibilité (a11y)** : Vérifier la navigation au clavier, les contrastes de couleur et les attributs ARIA.
- **Tests Responsive Design** : Tester la mise en page sur différents écrans (Smartphones iOS/Android, Tablettes, Écrans 4K).
- **Tests de non-régression** : Vérifier que le changement de langue et de thème ne dégrade aucune vue.

#### Fichiers concernés
- `backend/tests/Feature/*`
- `backend/tests/Unit/*`
- `frontend/src/__tests__/*`

#### Dépendances
- PHPUnit / Pest, Jest / React Testing Library, Axe / Wave (accessibilité).

#### Critères de validation
- Tous les tests automatisés s'exécutent avec succès (`php artisan test`).
- Navigation 100% fonctionnelle au clavier et compatible avec les lecteurs d'écran.
- Aucun affichage cassé sur mobile et tablette.

#### Statut
- ⬜ À faire

---

## PHASE 12 — Préproduction

### Étape 12.1 — Configuration & Staging de Préproduction

#### Objectif
Préparer les builds de production et vérifier le bon fonctionnement de l'application dans un environnement identique à celui de la production.

#### Tâches
- Générer le build de production du Frontend Next.js (`npm run build`) et corriger les éventuelles erreurs de compilation ou d'importation.
- Optimiser la configuration du backend Laravel pour la production (`php artisan config:cache`, `route:cache`, `view:cache`).
- Configurer et vérifier la connexion MySQL en environnement de staging.
- Vérifier l'étanchéité des domaines CORS et la validité des requêtes HTTPS.
- Tester le workflow de déploiement continu.

#### Fichiers concernés
- `frontend/next.config.js`
- `backend/config/*`
- `.env.production`

#### Dépendances
- Scripts de build Next.js et Artisan Laravel.

#### Critères de validation
- `npm run build` côté frontend s'exécute sans aucun warning ni erreur TypeScript.
- Le serveur Laravel fonctionne avec la mise en cache de la configuration activée.
- Les requêtes HTTPS entre le domaine Frontend et l'API se déroulent sans blocage CORS.

#### Statut
- ⬜ À faire

---

## PHASE 13 — Déploiement

### Étape 13.1 — Déploiement en Production (Vercel, VPS & MySQL)

#### Objectif
Déployer l'application complète en production avec le Frontend sur Vercel, le Backend Laravel sur hébergeur PHP/VPS et la base de données MySQL.

#### Tâches
- **Déploiement Frontend (Vercel)** :
  - Connecter le dépôt Git du frontend à Vercel.
  - Configurer les variables d'environnement de production sur Vercel.
  - Associer le domaine personnalisé et activer SSL.
- **Déploiement Backend (VPS / Hébergement Laravel)** :
  - Déployer l'application Laravel sur le serveur de production.
  - Exécuter les migrations et seeders en production (`php artisan migrate --force`).
  - Configurer le serveur web (Nginx / Apache) avec certificat SSL Let's Encrypt.
- **Base de données (MySQL)** :
  - Configurer et sécuriser l'instance MySQL de production.
- **Vérification Post-Déploiement** :
  - Vérifier la connectivité complète entre Vercel et l'API backend.

#### Fichiers concernés
- Configurations Vercel (`vercel.json` si nécessaire)
- Scripts de déploiement backend (Deployer / Script bash)

#### Dépendances
- Compte Vercel, Serveur VPS / Hébergement Laravel, Certificat SSL HTTPS.

#### Critères de validation
- Le site public et l'administration `/admin` sont accessibles en HTTPS via le nom de domaine final.
- Le formulaire de contact transmet correctement les données en production.
- L'administration permet la mise à jour en direct des contenus du site.

#### Statut
- ⬜ À faire

---

## PHASE 14 — Audit final

### Étape 14.1 — Audit Global de Qualité Post-Déploiement

#### Objectif
Réaliser une revue complète et rigoureuse de l'application en production pour garantir qu'elle répond aux standards de qualité les plus élevés.

#### Tâches
- **Audit UX/UI** : Vérification de la fidélité au design Dark/Tech, de la lisibilité et de la fluidité des micro-interactions.
- **Audit Responsive** : Contrôle final sur smartphones, tablettes et ordinateurs de bureau.
- **Audit SEO** : Vérification de l'indexabilité, des métadonnées et de l'affichage du balisage Open Graph sur les réseaux sociaux.
- **Audit Accessibilité** : Validation de la conformité aux normes WCAG 2.1 AA.
- **Audit Performance** : Analyse finale des scores Lighthouse et Web Vitals en production.
- **Audit Sécurité** : Vérification de la fermeture des ports inutiles, du masquage des erreurs d'exception en production (`APP_DEBUG=false`).

#### Fichiers concernés
- Rapport d'audit global.

#### Dépendances
- Outils d'audit : Lighthouse, Wave, SecurityHeaders.com, SSL Labs.

#### Critères de validation
- Le Design System est appliqué de manière cohérente.
- Le thème responsive (mobile, tablette, desktop) fonctionne.
- Le mode sombre / clair fonctionne.

#### Statut
- ✅ Terminé

---

## PHASE 15 — Documentation finale

### Étape 15.1 — Rédaction des Guides d'Exploitation & Maintenance

#### Objectif
Produire la documentation technique et d'utilisation finale complète permettant à tout développeur d'entretenir, faire évoluer et sauvegarder le projet.

#### Tâches
- Rédiger le manuel d'utilisation du back-office d'administration `/admin`.
- Documenter l'API REST Laravel (collection Postman / OpenAPI Swagger si nécessaire).
- Rédiger le guide de maintenance (procédures de mise à jour des dépendances, procédure de sauvegarde MySQL et des fichiers médias).
- Documenter les procédures de restauration d'urgence et la gestion des variables d'environnement.

#### Fichiers concernés
- `docs/ADMIN_GUIDE.md`
- `docs/API_DOCUMENTATION.md`
- `docs/MAINTENANCE_GUIDE.md`

#### Dépendances
- Aucune.

#### Critères de validation
- Documentation complète, claire et mise à jour livrée dans le dépôt Git.
- Toutes les étapes de déploiement et de maintenance sont reproductibles à partir des guides.

#### Statut
- ⬜ À faire
