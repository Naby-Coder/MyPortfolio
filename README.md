# Portfolio Personnel — Mouhamed Ndione

> **"Building digital experiences & reliable systems."**

---

## 1. Nom du projet

**Mouhamed Ndione Portfolio** (`MyFolio`)

---

## 2. Présentation

Ce projet est une application web moderne, personnalisée et entièrement sur mesure, conçue pour servir de vitrine professionnelle haut de gamme pour **Mouhamed Ndione**.

Le portfolio combine une esthétique créative et futuriste (*Dark/Tech*, *Glassmorphism léger*, effets immersifs WebGL/Three.js) avec une ingénierie logicielle robuste et performante sous **Next.js 15 App Router** et **Supabase PostgreSQL**. Il met en valeur un profil multidisciplinaire couvrant le développement Web & Mobile Full Stack, le Design UI/UX & Graphique, ainsi que des compétences complémentaires en DevOps & Cloud.

---

## 3. Objectifs

Le portfolio est conçu pour répondre aux objectifs stratégiques suivants :

- **Recherche d'emploi au Canada** : Présenter un profil complet, des réalisations tangibles et un CV interactif répondant aux exigences du marché canadien.
- **Acquisition de clients Freelance** : Valoriser l'expertise technique et le savoir-faire créatif pour convaincre de futurs clients.
- **Développement de la Marque Personnelle** : Établir une présence en ligne forte, moderne et différenciante.
- **Démonstration de Compétences** : Mettre en avant la maîtrise des technologies modernes Full Stack, UI/UX et DevOps à travers des projets réels et mesurables.

---

## 4. Positionnement

- **Orientation** : Full-Stack Developer & UI/UX / Graphic Designer
- **Niveau de personnalisation visuelle** : 10 / 10 (Design sur-mesure, Dark/Tech, Futuriste, Glassmorphism léger, animations au scroll, micro-interactions, effets 3D/particules dosés)
- **Maquette Figma** : [Consulter le design Figma officiel MyFolio](https://www.figma.com/design/Qt9KgKvPrFZ9RbaeHljStu/MyFolio?node-id=0-1&m=dev&t=hNIX4FdfM60BMXvV-1)
- **Approche technique** : Clean Architecture, découplage strict Frontend/Backend via **Supabase JavaScript Client**, administration sur-mesure (`/admin`).

---

## 5. Fonctionnalités principales

- **Vitrine Publique** :
  - Hero Section dynamique avec signature et arrière-plan planétaire WebGL (`ShaderCanvas`)
  - Présentation détaillée (À propos, Parcours)
  - Grille & filtres interactifs des compétences de l'Écosystème Technique (54 compétences réparties en 6 catégories)
  - Showcase Projets avec filtres par technologie et modalité de recherche
  - Galerie de réalisations graphiques & UI/UX
  - Section Expériences & Parcours académique / Formations / Certifications
  - Intégration GitHub API (Repositories, activités réelles)
  - Section Blog & Articles techniques avec liseur Markdown et widget SEO
  - Témoignages & Recommandations
  - Téléchargement et visualiseur interactif de CV (PDF bilingue)
  - Formulaire de contact avec enregistrement réactif dans Supabase (`contact_messages`)
- **Internationalisation (i18n)** : Support bilingue homogène (Français / Anglais) en temps réel.
- **Gestion des Thèmes** : Mode Sombre (Dark), Mode Clair (Light) avec sélecteur et persistance de préférence.
- **Interface Administrateur (`/admin`)** : Back-office privé sur mesure pour administrer l'ensemble du contenu sans dépendre d'un CMS externe.

---

## 6. Stack technique

### Design System & Graphisme (Cyber-Creative Portfolio)
- **Palette de Couleurs** :
  - Background Primaire : `#0A0A0B` (Deep Cyber Black)
  - Accent Secondaire : `#3B82F6` (Electric Blue)
  - Accent Tertiaire : `#8B5CF6` (Electric Violet)
  - Texte Neutre : `#9A9A9E` (Muted Gray)
- **Typographie** : **Geist** (Headlines, Body, Labels) & **Geist Mono** (Terminal Code)
- **Composants Immersifs** : Background WebGL Canvas interactif (`ShaderCanvas`) et scène 3D Three.js Icosaèdre (`ThreeNodeScene`).

### Frontend
- **Framework** : Next.js 15 (App Router, React 19)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS v4, CSS Modules custom
- **Animations & Effets** : Framer Motion, Lucide Icons, WebGL Shaders, Three.js

### Backend & Cloud Infrastructure
- **BaaS Platform** : **Supabase**
- **Base de données** : PostgreSQL (13 tables relationnelles avec Row Level Security - RLS)
- **Client JS** : `@supabase/supabase-js` et `@supabase/ssr`

---

## 7. Architecture générale

```text
  [ Client Browser ]
         │
         ├───► Next.js 15 App Router (Frontend)
         │          │
         │          ▼ (@supabase/supabase-js API Client)
         └───────► Supabase Cloud Platform
                    ├── PostgreSQL Database (13 Tables, RLS)
                    ├── Supabase Auth & Storage
                    └── Realtime API
```

---

## 8. Structure du projet

```text
MyFolio/
├── frontend/             # Application Next.js 15 (TypeScript + Tailwind CSS)
│   ├── public/           # Assets statiques, favicon, images
│   ├── src/
│   │   ├── app/          # App Router (pages publiques, admin, api, etc.)
│   │   ├── components/   # Composants UI, Layout, Canvas, Theme, Language
│   │   ├── config/       # Configuration du site et metadata
│   │   ├── lib/          # Client Supabase (supabase.ts, supabase-api.ts)
│   │   └── types/        # Definitions de types TypeScript
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.local        # Variables d'environnement Supabase
│
└── supabase/             # Scripts d'initialisation Supabase PostgreSQL
    ├── schema.sql        # Schéma DDL des 13 tables avec RLS
    └── seed.sql          # Données initiales (18 projets, 54 skills, articles)
```

---

## 9. Variables d'environnement (`frontend/.env.local`)

```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-cle-anon-supabase
```

---

## 10. Roadmap

- [x] **Phase 0** : Documentation et conception (README & DEVELOPMENT_PLAN)
- [x] **Phase 1** : Initialisation des projets Frontend & Supabase Client
- [x] **Phase 2** : Design System & Layout Base
- [x] **Phase 3** : Arrière-plan WebGL Shader & Scène 3D Three.js
- [x] **Phase 4** : Base de données PostgreSQL Supabase & Schémas SQL (13 tables)
- [x] **Phase 5** : Développements des 10 pages Frontend publiques bilingues
- [x] **Phase 6** : Back-office d'administration `/admin` (Project Manager, Blog SEO & Skills CRUD)
- [x] **Phase 7** : Intégration Supabase Backend complet, GitHub API & CV PDF
- [x] **Phase 8** : SEO & Internationalisation (FR / EN)
- [x] **Phase 9** : Optimisation des performances (Lighthouse 100)
- [x] **Phase 10** : Sécurité & RLS Supabase Policies
- [x] **Phase 11** : Tests & Validation TypeScript (`npx tsc --noEmit`)
- [x] **Phase 12** : Préproduction
- [x] **Phase 13** : Déploiement Production (Vercel & Supabase Cloud)
- [x] **Phase 14** : Audit final

---

## 11. Licence

Projet sous licence propriétaire © **Mouhamed Ndione**. Tous droits réservés.
