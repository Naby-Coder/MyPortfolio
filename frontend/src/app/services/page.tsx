'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/language/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ArrowUpRight, Code2, Layout, Smartphone, Wrench, Palette, Cloud, ChevronDown, CheckCircle2 } from 'lucide-react';

const content = {
  fr: {
    hero: {
      badge: 'CE QUE JE FAIS',
      titleLine1: 'De l’idée initiale au',
      titleLine2: 'produit numérique final.',
      subtitle: 'Combinez le design visuel, l’ingénierie logicielle et la gestion informatique pour transformer des idées brutes en produits performants et des systèmes fiables.',
    },
    services: [
      {
        num: '01',
        title: 'Développement d’Applications Web',
        desc: 'Conception et développement d’applications web complexes, SaaS et plateformes sur-mesure, des interfaces utilisateur aux APIs REST et bases de données.',
        bullets: ['Next.js 15 & TypeScript', 'Laravel REST API & MySQL', 'Authentification Sanctum'],
      },
      {
        num: '02',
        title: 'Conception de Sites Web',
        desc: 'Création de sites web vitrines et institutionnels ultra-performants optimisés pour l’expérience utilisateur, le design moderne et le référencement SEO.',
        bullets: ['Sites Vitrines & Institutionnels', 'Tableaux de bord admin', 'SEO & Performance > 90'],
      },
      {
        num: '03',
        title: 'Développement Mobile',
        desc: 'Développement d’expériences mobiles réactives axées sur l’ergonomie tactile, la performance native et la synchronisation d’APIs.',
        bullets: ['React Native & Flutter', 'Mobile Money Integration', 'Suivi GPS Temps Réel'],
      },
      {
        num: '04',
        title: 'Gestion Informatique & Maintenance',
        desc: 'Installation et configuration de systèmes d’exploitation (Windows/Linux/Mac), montage et assemblage de matériel informatique, réparation, diagnostic et entretien préventif.',
        bullets: ['Installation & Configuration Système', 'Montage & Assemblage Matériel', 'Réparation, Diagnostic & Entretien'],
      },
      {
        num: '05',
        title: 'Design UI/UX & Design Graphique',
        desc: 'Conception d’interfaces intuitives (wireframes UI/UX, prototypes Figma), création d’identités visuelles fortes, logos, affiches et supports marketing digitaux.',
        bullets: ['Prototypes Figma, UI/UX & User Flows', 'Logos & Chartes Graphiques', 'Supports Réseaux Sociaux (Photoshop / Illustrator)'],
      },
      {
        num: '06',
        title: 'DevOps & Cloud',
        desc: 'Support au déploiement d’applications, orchestration de serveurs et configuration des environnements cloud.',
        bullets: ['Déploiements Vercel / VPS', 'Docker Containers', 'Git Workflows & CI/CD'],
      },
    ],
    discuss: 'Discuter d’un projet',
    methodologyBadge: 'MÉTHODOLOGIE',
    methodologyTitle: 'Comment je travaille (01 à 05)',
    steps: [
      { num: '01 · DÉCOUVERTE', desc: 'Comprendre vos besoins et vos utilisateurs.' },
      { num: '02 · STRATÉGIE', desc: 'Définir l’architecture technique et la direction UI.' },
      { num: '03 · DESIGN', desc: 'Créer les wireframes et maquettes HD (Figma, Stitch...).' },
      { num: '04 · DÉVELOPPEMENT', desc: 'Choix des technologies adaptées au projet, code propre et typé.' },
      { num: '05 · LIVRAISON', desc: 'Recette, déploiement et livraison.' },
    ],
    faqTitle: 'Foire Aux Questions',
    faqItems: [
      {
        q: 'Combinez-vous le design UI/UX d’applications et la création graphique ?',
        a: 'Absolument. Je conçois à la fois les maquettes interactives et ergonomiques d’applications sur Figma (UI/UX) et les identités visuelles gratuites ou supports marketing (logos, affiches, charte graphique) sur Photoshop & Illustrator.',
      },
      {
        q: 'Proposez-vous des services d’installation et de maintenance informatique ?',
        a: 'Oui. En plus du développement logiciel, je gère l’installation de systèmes d’exploitation (Windows, Linux, MacOS), l’assemblage de PC, la réparation matérielle et la maintenance informatique.',
      },
      {
        q: 'Développez-vous à la fois le Frontend et le Backend ?',
        a: 'Oui. Je crée les interfaces réactives côté client (Next.js/React) et les APIs REST côté serveur avec Laravel et bases de données MySQL.',
      },
      {
        q: 'Prenez-vous en charge le déploiement de l’application ?',
        a: 'Oui, le déploiement est inclus dans ma prestation (Vercel, VPS Linux, Docker, nom de domaine et certificats SSL).',
      },
    ],
  },
  en: {
    hero: {
      badge: 'WHAT I DO',
      titleLine1: 'From initial idea to',
      titleLine2: 'digital product.',
      subtitle: 'Combining visual design, software engineering, and IT management to transform raw concepts into reliable high-performing systems.',
    },
    services: [
      {
        num: '01',
        title: 'Web Application Development',
        desc: 'Architecting and developing custom web applications, SaaS platforms, and enterprise systems from reactive UI to secure REST APIs and databases.',
        bullets: ['Next.js 15 & TypeScript', 'Laravel REST API & MySQL', 'Sanctum Authentication'],
      },
      {
        num: '02',
        title: 'Website Creation & Design',
        desc: 'Building high-performance corporate showcase websites optimized for user experience, modern aesthetics, and top SEO rankings.',
        bullets: ['Corporate Showcase Sites', 'Admin Dashboards', 'SEO & Performance > 90'],
      },
      {
        num: '03',
        title: 'Mobile App Development',
        desc: 'Creating responsive cross-platform mobile apps engineered for touch ergonomics, native performance, and API sync.',
        bullets: ['React Native & Flutter', 'Mobile Money Integration', 'Real-time GPS Tracking'],
      },
      {
        num: '04',
        title: 'IT Management & Maintenance',
        desc: 'Operating system installation & setup (Windows/Linux/Mac), PC hardware assembly, computer repairs, system diagnostics, and preventive maintenance.',
        bullets: ['OS Setup & System Configuration', 'Hardware Assembly & Upgrades', 'Repairs, Diagnostics & Maintenance'],
      },
      {
        num: '05',
        title: 'UI/UX & Graphic Design',
        desc: 'Designing intuitive user interfaces (Figma UI/UX wireframes & prototypes) and crafting distinct visual brand identities, logos, and digital marketing graphics.',
        bullets: ['Figma UI/UX Prototypes & User Flows', 'Logos & Brand Identity Systems', 'Social Media Graphics (Photoshop / Illustrator)'],
      },
      {
        num: '06',
        title: 'DevOps & Cloud',
        desc: 'Application deployment support, server orchestration, and cloud development environment setup.',
        bullets: ['Vercel & VPS Deployments', 'Docker Containers', 'Git Workflows & CI/CD'],
      },
    ],
    discuss: 'Discuss a project',
    methodologyBadge: 'METHODOLOGY',
    methodologyTitle: 'How I Work (01 to 05)',
    steps: [
      { num: '01 · DISCOVERY', desc: 'Understand requirements and user goals.' },
      { num: '02 · STRATEGY', desc: 'Define tech architecture and UI direction.' },
      { num: '03 · DESIGN', desc: 'Build wireframes & high-fidelity mockups (Figma, Stitch...).' },
      { num: '04 · DEVELOPMENT', desc: 'Tech stack tailored to project needs with clean, typed code.' },
      { num: '05 · DELIVERY', desc: 'QA testing, deployment, and handover.' },
    ],
    faqTitle: 'Frequently Asked Questions',
    faqItems: [
      {
        q: 'Do you combine application UI/UX design with graphic branding?',
        a: 'Yes. I design both interactive digital product UI/UX mockups in Figma and visual branding assets (logos, posters, brand identity guidelines) in Photoshop & Illustrator.',
      },
      {
        q: 'Do you offer IT maintenance and computer hardware assembly services?',
        a: 'Yes. Alongside software engineering, I handle operating system setups (Windows, Linux, MacOS), PC hardware assembly, diagnostic repairs, and system maintenance.',
      },
      {
        q: 'Do you develop both Frontend and Backend?',
        a: 'Yes. I build reactive client-side interfaces (Next.js/React) and server-side REST APIs using Laravel and MySQL databases.',
      },
      {
        q: 'Is application deployment included?',
        a: 'Yes, deployment configuration (Vercel, Linux VPS, Docker, domain setup, and SSL certificates) is included in my engineering workflow.',
      },
    ],
  },
};

export default function ServicesPage() {
  const { locale } = useLanguage();
  const t = content[locale];

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const serviceIcons = [
    <Code2 key="0" className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />,
    <Layout key="1" className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-4" />,
    <Smartphone key="2" className="w-8 h-8 text-emerald-500 dark:text-emerald-400 mb-4" />,
    <Wrench key="3" className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />,
    <Palette key="4" className="w-8 h-8 text-amber-500 dark:text-amber-400 mb-4" />,
    <Cloud key="5" className="w-8 h-8 text-slate-500 dark:text-zinc-400 mb-4" />,
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-900 dark:text-white">
      {/* Hero */}
      <div className="mb-16">
        <Badge variant="blue" size="md" className="mb-4">{t.hero.badge}</Badge>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 text-slate-900 dark:text-white">
          {t.hero.titleLine1} <span className="text-gradient-electric">{t.hero.titleLine2}</span>
        </h1>
        <p className="text-slate-600 dark:text-zinc-300 text-lg max-w-3xl leading-relaxed font-normal">
          {t.hero.subtitle}
        </p>
      </div>

      {/* 6 Services Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {t.services.map((svc, idx) => (
          <Card key={idx} variant="glass" className="p-8 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold block mb-2">{svc.num} · SERVICE</span>
              {serviceIcons[idx]}
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{svc.title}</h3>
              <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed mb-6 font-normal">
                {svc.desc}
              </p>
              <ul className="text-xs text-slate-700 dark:text-zinc-300 flex flex-col gap-2 font-mono mb-6">
                {svc.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/contact">
              <Button variant="outlined" size="sm" className="w-full" icon={<ArrowUpRight className="w-4 h-4" />}>
                {t.discuss}
              </Button>
            </Link>
          </Card>
        ))}
      </div>

      {/* Process Methodology */}
      <div className="mb-20">
        <Badge variant="violet" size="md" className="mb-4">{t.methodologyBadge}</Badge>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10">{t.methodologyTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-xs font-mono">
          {t.steps.map((st, idx) => (
            <Card key={idx} variant="glass" className="p-4">
              <span className="text-blue-600 dark:text-blue-400 font-bold block mb-1">{st.num}</span>
              <p className="text-slate-600 dark:text-zinc-300 leading-relaxed text-[11px]">{st.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">{t.faqTitle}</h2>
        <div className="flex flex-col gap-4">
          {t.faqItems.map((item, idx) => (
            <div key={idx} className="rounded-xl bg-white dark:bg-zinc-900/70 border border-slate-200 dark:border-white/10 overflow-hidden shadow-xs">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between font-semibold text-slate-900 dark:text-white text-sm"
              >
                <span>{item.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 dark:text-zinc-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="p-4 pt-0 text-xs text-slate-600 dark:text-zinc-300 leading-relaxed border-t border-slate-100 dark:border-white/5">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
