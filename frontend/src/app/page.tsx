'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/language/LanguageContext';
import { ThreeNodeScene } from '@/components/canvas/ThreeNodeScene';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  ArrowUpRight,
  Code2,
  Layout,
  Smartphone,
  Cloud,
  Layers,
  Sparkles,
  FileText,
  MessageSquare,
  ChevronRight,
  CheckCircle2,
  Palette,
} from 'lucide-react';

const content = {
  fr: {
    hero: {
      badge: 'DÉVELOPPEUR FULL-STACK · DESIGNER · GRAPHIC DESIGNER',
      titleLine1: 'Concevoir des expériences numériques &',
      titleLine2: 'des systèmes fiables.',
      subtitle: 'Je combine le développement Full-Stack (Next.js, React, Angular, Laravel, Spring Boot, CMS), le design d’interface UI/UX & graphique (Figma, Photoshop, Illustrator) et le développement mobile (Flutter, React Native, Android).',
      ctaProjects: 'Explorer mes projets',
      ctaContact: 'Discutons d’un projet',
      ctaCv: 'Voir le CV (PDF)',
      terminalTitle: 'architecte.ts',
      focus: ['Full-Stack', 'Design'],
      motto: 'Design + Code',
      systemTopology: 'Topologie Système',
      designTokensTitle: 'Identité & Design System',
      designTokensDesc: 'Figma Tokens, Photoshop, Illustrator, chartes graphiques, logos & UI/UX.',
    },
    intro: {
      badge: 'DOUBLE IDENTITÉ',
      titleLine1: 'Développeur par logique.',
      titleLine2: 'Designer par instinct.',
      body: 'Du développement d’architectures web, CMS & microservices complexes jusqu’à la création d’identités visuelles percutantes, j’apporte une vision globale aux projets numériques.',
      checks: [
        'Interlocuteur unique Full-Stack & Design',
        'Architecture logicielle POO & Microservices',
        'Design Graphique (Logos, Affiches, Chartes)',
        'Applications Web, Mobiles & Solutions CMS',
      ],
      cards: {
        fullstack: {
          title: 'Full-Stack Dev',
          desc: 'Next.js, React, Angular, Vue.js, Laravel, Spring Boot, Django, Node.js, CMS (WordPress, Shopify), MySQL, PostgreSQL.',
        },
        design: {
          title: 'Design',
          desc: 'Design UI/UX, Logos, Affiches, Chartes graphiques, Wireframes, Figma, Photoshop, Illustrator.',
        },
        mobile: {
          title: 'Mobile Apps',
          desc: 'Flutter, React Native, Ionic, Android Studio, Kotlin, Dart.',
        },
        devops: {
          title: 'DevOps & Méthodologies',
          desc: 'Docker, GitHub, GitLab, CI/CD, Jira, Trello, SEO, Linux, Windows, MacOS, UML, MERISE.',
        },
      },
    },
    projects: {
      badge: 'TRAVAUX SÉLECTIONNÉS',
      title: 'Réalisations & études de cas.',
      viewAll: 'Voir tous les projets',
      saasSummary: 'Application de gestion financière entreprise offrant la visualisation de données complexes en temps réel, le suivi analytique et l’automatisation des rapports.',
      caseStudyBtn: 'Étude de cas complète',
    },
    contactHero: {
      badge: 'LANCER UN PROJET',
      title: 'Vous avez un projet ? Construisons-le ensemble.',
      subtitle: 'Que vous soyez un recruteur, une entreprise ou une startup, discutons de vos objectifs pour donner vie à votre prochain produit numérique.',
      ctaTalk: 'Lancer la conversation',
      ctaProjects: 'Voir tous les projets',
    },
  },
  en: {
    hero: {
      badge: 'FULL-STACK DEVELOPER · DESIGNER · GRAPHIC DESIGNER',
      titleLine1: 'Building digital experiences &',
      titleLine2: 'reliable systems.',
      subtitle: 'I combine Full-Stack development (Next.js, React, Angular, Laravel, Spring Boot, CMS), UI/UX & Graphic design (Figma, Photoshop, Illustrator), and mobile app engineering (Flutter, React Native, Android).',
      ctaProjects: 'Explore my work',
      ctaContact: "Let's discuss a project",
      ctaCv: 'View CV (PDF)',
      terminalTitle: 'architect.ts',
      focus: ['Full-Stack', 'Design'],
      motto: 'Design + Code',
      systemTopology: 'System Topology',
      designTokensTitle: 'Brand Identity & Design System',
      designTokensDesc: 'Figma Tokens, Photoshop, Illustrator, logos, brand guidelines & UI/UX.',
    },
    intro: {
      badge: 'DUAL IDENTITY',
      titleLine1: 'Developer by logic.',
      titleLine2: 'Designer by instinct.',
      body: 'From complex web architectures, CMS solutions & microservices to impactful visual brand identities, I deliver an end-to-end vision for digital products.',
      checks: [
        'Single point of contact (Dev + Design)',
        'OOP & Microservices architecture',
        'Graphic Design (Logos, Posters, Branding)',
        'Web, Mobile & CMS Solutions',
      ],
      cards: {
        fullstack: {
          title: 'Full-Stack Dev',
          desc: 'Next.js, React, Angular, Vue.js, Laravel, Spring Boot, Django, Node.js, CMS (WordPress, Shopify), MySQL, PostgreSQL.',
        },
        design: {
          title: 'Design',
          desc: 'UI/UX Design, Logos, Posters, Brand Guidelines, Wireframes, Figma, Photoshop, Illustrator.',
        },
        mobile: {
          title: 'Mobile Apps',
          desc: 'Flutter, React Native, Ionic, Android Studio, Kotlin, Dart.',
        },
        devops: {
          title: 'DevOps & Methodologies',
          desc: 'Docker, GitHub, GitLab, CI/CD, Jira, Trello, SEO, Linux, Windows, MacOS, UML, MERISE.',
        },
      },
    },
    projects: {
      badge: 'SELECTED WORK',
      title: 'Projects & case studies.',
      viewAll: 'View all projects',
      saasSummary: 'Enterprise financial management platform delivering real-time complex data visualization, analytics tracking, and automated reporting.',
      caseStudyBtn: 'Full case study',
    },
    contactHero: {
      badge: 'START A PROJECT',
      title: "Have an idea? Let's build it together.",
      subtitle: "Whether you are a recruiter, a company, or a startup, let's discuss your goals to bring your next digital product to life.",
      ctaTalk: 'Start a conversation',
      ctaProjects: 'View all projects',
    },
  },
};

import { projectsData } from '@/data/projectsData';

export default function HomePage() {
  const { locale } = useLanguage();
  const t = content[locale];

  const [featuredProject, setFeaturedProject] = React.useState<any>(projectsData[0]);

  React.useEffect(() => {
    function loadFeatured() {
      try {
        const stored = localStorage.getItem('myfolio_projects');
        if (stored) {
          const list = JSON.parse(stored);
          if (Array.isArray(list) && list.length > 0) {
            setFeaturedProject(list[0]);
          }
        }
      } catch (e) {
        console.error('Error loading featured project on homepage:', e);
      }
    }
    loadFeatured();
    window.addEventListener('myfolio_projects_updated', loadFeatured);
    return () => window.removeEventListener('myfolio_projects_updated', loadFeatured);
  }, []);

  const featuredTitle = featuredProject
    ? (locale === 'fr' ? (featuredProject.titleFr || featuredProject.title_fr || featuredProject.title) : (featuredProject.titleEn || featuredProject.title_en || featuredProject.title || featuredProject.title_fr))
    : (locale === 'fr' ? projectsData[0].titleFr : projectsData[0].titleEn);

  const featuredSummary = featuredProject
    ? (locale === 'fr' ? (featuredProject.summaryFr || featuredProject.summary_fr || featuredProject.summary) : (featuredProject.summaryEn || featuredProject.summary_en || featuredProject.summary || featuredProject.summary_fr))
    : (locale === 'fr' ? projectsData[0].summaryFr : projectsData[0].summaryEn);

  const featuredImage = featuredProject?.image || featuredProject?.featured_image || projectsData[0].image;

  const featuredTech: string[] = featuredProject?.tech || featuredProject?.technologies || projectsData[0].tech;

  const featuredSlug: string = featuredProject?.slug || projectsData[0].slug;

  return (
    <div className="relative min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 font-mono text-xs mb-8 shadow-xs animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.hero.badge}</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white max-w-5xl leading-[1.1] mb-6">
          {t.hero.titleLine1} <span className="text-gradient-electric">{t.hero.titleLine2}</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-600 dark:text-zinc-400 max-w-3xl mb-10 leading-relaxed font-light">
          {t.hero.subtitle}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Link href="/projects">
            <Button variant="primary" size="lg" icon={<ArrowUpRight className="w-5 h-5" />}>
              {t.hero.ctaProjects}
            </Button>
          </Link>

          <Link href="/contact">
            <Button variant="glass" size="lg" icon={<MessageSquare className="w-5 h-5" />}>
              {t.hero.ctaContact}
            </Button>
          </Link>

          <Link href="/cv">
            <Button variant="outlined" size="lg" icon={<FileText className="w-5 h-5" />}>
              {t.hero.ctaCv}
            </Button>
          </Link>
        </div>

        {/* Interactive Hero Visual Composition */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Visual Card 1: Terminal Code Snippet */}
          <Card variant="glass" className="p-6 relative group bg-zinc-950 text-zinc-100 border-zinc-800">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="font-mono text-[10px] text-zinc-400">{t.hero.terminalTitle}</span>
            </div>
            <pre className="font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto">
              <code>
                <span className="text-purple-400">const</span> architect = &#123;{'\n'}
                {'  '}name: <span className="text-emerald-400">&quot;Mouhamed Ndione&quot;</span>,{'\n'}
                {'  '}focus: [<span className="text-blue-400">&quot;{t.hero.focus[0]}&quot;</span>, <span className="text-blue-400">&quot;{t.hero.focus[1]}&quot;</span>],{'\n'}
                {'  '}motto: <span className="text-amber-300">&quot;{t.hero.motto}&quot;</span>{'\n'}
                &#125;;
              </code>
            </pre>
          </Card>

          {/* Visual Card 2: 3D Three.js Node Scene */}
          <Card variant="glass" className="p-4 flex flex-col items-center justify-center relative min-h-[220px]">
            <span className="absolute top-3 left-4 font-mono text-[10px] text-slate-500 dark:text-zinc-400 flex items-center gap-1">
              <Layers className="w-3 h-3 text-blue-600 dark:text-blue-400" />
              {t.hero.systemTopology}
            </span>
            <ThreeNodeScene />
          </Card>

          {/* Visual Card 3: Design Tokens Glass UI */}
          <Card variant="glass" className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] text-slate-500 dark:text-zinc-400 uppercase">Design System</span>
                <Badge variant="violet" size="sm">Figma · PS · AI</Badge>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-base mb-2">{t.hero.designTokensTitle}</h3>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                {t.hero.designTokensDesc}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-200 dark:border-white/10">
              <span className="w-4 h-4 rounded-full bg-[#0A0A0B] border border-slate-300 dark:border-white/20" title="#0A0A0B" />
              <span className="w-4 h-4 rounded-full bg-[#2563EB]" title="#2563EB" />
              <span className="w-4 h-4 rounded-full bg-[#7C3AED]" title="#7C3AED" />
              <span className="w-4 h-4 rounded-full bg-[#64748B]" title="#64748B" />
              <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400 ml-auto">Geist / Geist Mono</span>
            </div>
          </Card>
        </div>
      </section>

      {/* 2. QUICK INTRO & 4 PILLARS SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200 dark:border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="blue" size="md" className="mb-4">
              {t.intro.badge}
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
              {t.intro.titleLine1}<br />
              <span className="text-gradient-electric">{t.intro.titleLine2}</span>
            </h2>
            <p className="text-slate-600 dark:text-zinc-400 text-base leading-relaxed mb-6">
              {t.intro.body}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-white/10 text-xs font-mono">
              {t.intro.checks.map((chk, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-700 dark:text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{chk}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card variant="glass" className="p-6 flex flex-col gap-3 border border-blue-500/20">
              <Code2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h3 className="font-semibold text-slate-900 dark:text-white text-lg">{t.intro.cards.fullstack.title}</h3>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                {t.intro.cards.fullstack.desc}
              </p>
            </Card>

            <Card variant="glass" className="p-6 flex flex-col gap-3 border border-purple-500/20">
              <Palette className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              <h3 className="font-semibold text-slate-900 dark:text-white text-lg">{t.intro.cards.design.title}</h3>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                {t.intro.cards.design.desc}
              </p>
            </Card>

            <Card variant="glass" className="p-6 flex flex-col gap-3 border border-emerald-500/20">
              <Smartphone className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-semibold text-slate-900 dark:text-white text-lg">{t.intro.cards.mobile.title}</h3>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                {t.intro.cards.mobile.desc}
              </p>
            </Card>

            <Card variant="glass" className="p-6 flex flex-col gap-3 border border-amber-500/20">
              <Cloud className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              <h3 className="font-semibold text-slate-900 dark:text-white text-lg">{t.intro.cards.devops.title}</h3>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                {t.intro.cards.devops.desc}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROJECTS SHOWCASE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200 dark:border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <Badge variant="violet" size="md" className="mb-3">{t.projects.badge}</Badge>
            <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
              {t.projects.title}
            </h2>
          </div>
          <Link href="/projects">
            <Button variant="outlined" size="md" icon={<ChevronRight className="w-4 h-4" />}>
              {t.projects.viewAll}
            </Button>
          </Link>
        </div>

        {/* Featured Project Showcase: SaaS Financial */}
        <Card variant="glass" className="p-8 mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-blue-500/30">
          <div className="lg:col-span-7 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 relative group">
            <img
              src={featuredImage}
              alt={featuredTitle}
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
          </div>

          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="blue">SAAS</Badge>
              <Badge variant="violet">FULL STACK</Badge>
              <Badge variant="gray">DESIGN</Badge>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{featuredTitle}</h3>
            <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              {featuredSummary}
            </p>
            <div className="flex flex-wrap gap-2 py-2">
              {featuredTech.map((techItem, idx) => (
                <Badge key={idx} variant="outline" size="sm">
                  {techItem}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-3 pt-2">
              <Link href={`/projects/${featuredSlug}`}>
                <Button variant="primary" size="md" icon={<ArrowUpRight className="w-4 h-4" />}>
                  {t.projects.caseStudyBtn}
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </section>

      {/* 4. FINAL CONTACT CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center border-t border-slate-200 dark:border-white/10 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-mono mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-ping" />
          <span>{t.contactHero.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-6xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
          {t.contactHero.title}
        </h2>
        <p className="text-slate-600 dark:text-zinc-400 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          {t.contactHero.subtitle}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/contact">
            <Button variant="primary" size="lg" icon={<ArrowUpRight className="w-5 h-5" />}>
              {t.contactHero.ctaTalk}
            </Button>
          </Link>
          <Link href="/projects">
            <Button variant="glass" size="lg">
              {t.contactHero.ctaProjects}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
