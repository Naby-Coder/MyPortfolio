'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/language/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Quote, ArrowUpRight, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

const content = {
  fr: {
    hero: {
      badge: 'TÉMOIGNAGES',
      titleLine1: 'Ce qu’ils disent de leur',
      titleLine2: 'collaboration avec moi.',
      subtitle: 'Une excellente ingénierie logicielle ne repose pas uniquement sur le code, mais sur la communication, la fiabilité et la compréhension des besoins.',
    },
    viewProject: 'Voir le projet',
    principlesBadge: 'PRINCIPES DE COLLABORATION',
    principlesTitle: 'Ce que j’apporte à une collaboration',
    principles: [
      {
        title: '01 · Communication',
        desc: 'Une communication constante, transparente et proactive à chaque étape du projet.',
      },
      {
        title: '02 · Fiabilité',
        desc: 'Engagement strict sur la livraison du périmètre convenu et le respect des délais.',
      },
      {
        title: '03 · Créativité',
        desc: 'Recherche de solutions élégantes et innovantes aux problématiques complexes.',
      },
      {
        title: '04 · Vision Produit',
        desc: 'Compréhension globale du produit, de son design d’expérience et de sa faisabilité technique.',
      },
    ],
  },
  en: {
    hero: {
      badge: 'TESTIMONIALS',
      titleLine1: 'What people say about',
      titleLine2: 'working with me.',
      subtitle: 'Great software engineering goes beyond writing clean code; it is built on clear communication, dependability, and user-first empathy.',
    },
    viewProject: 'View project',
    principlesBadge: 'COLLABORATION PRINCIPLES',
    principlesTitle: 'What I bring to a collaboration',
    principles: [
      {
        title: '01 · Communication',
        desc: 'Transparent, proactive, and structured communication throughout every sprint phase.',
      },
      {
        title: '02 · Reliability',
        desc: 'Uncompromising commitment to agreed project milestones, deadlines, and code quality.',
      },
      {
        title: '03 · Creativity',
        desc: 'Devising elegant, scalable technical and design solutions for complex problems.',
      },
      {
        title: '04 · Product Thinking',
        desc: '360° product vision connecting user experience design with robust backend architecture.',
      },
    ],
  },
};

const mockTestimonials = [
  {
    id: 1,
    name: 'Elena Rodriguez',
    role: 'VP of Engineering',
    company: 'Vertigo Tech',
    category: 'Employer',
    quoteFr: 'Mouhamed possède un alliage rare entre une profonde culture d’architecture technique et un œil esthétique exigeant pour le détail. Il ne se contente pas d’écrire du code ; il façonne des expériences numériques.',
    quoteEn: 'Mouhamed possesses a rare blend of deep technical architecture knowledge and an uncompromising eye for design detail. He doesn’t just write code; he crafts digital experiences.',
    project: 'SaaS Financial Management',
    projectSlug: 'saas-financial-management',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 2,
    name: 'Marcus Chen',
    role: 'Creative Director',
    company: 'Studio Aether',
    category: 'Collaborator',
    quoteFr: 'Collaborer avec Mouhamed sur des interfaces utilisateur est d’une grande fluidité. Il traduit les design tokens Figma en composants Next.js sans perdre le moindre pixel de précision.',
    quoteEn: 'Working with Mouhamed on user interfaces is seamless. He translates Figma design tokens into clean Next.js React components without losing a single pixel of quality.',
    project: 'Drop Carpooling',
    projectSlug: 'drop-carpooling',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
];

export default function TestimonialsPage() {
  const { locale } = useLanguage();
  const t = content[locale];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextQuote = () => {
    setCurrentIndex((prev) => (prev + 1) % mockTestimonials.length);
  };

  const prevQuote = () => {
    setCurrentIndex((prev) => (prev - 1 + mockTestimonials.length) % mockTestimonials.length);
  };

  const currentTestimonial = mockTestimonials[currentIndex];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-900 dark:text-white">
      {/* Hero */}
      <div className="mb-12">
        <Badge variant="blue" size="md" className="mb-4">{t.hero.badge}</Badge>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
          {t.hero.titleLine1} <br />
          <span className="text-gradient-electric">{t.hero.titleLine2}</span>
        </h1>
        <p className="text-slate-600 dark:text-zinc-300 text-lg max-w-2xl leading-relaxed font-normal">
          {t.hero.subtitle}
        </p>
      </div>

      {/* Featured Testimonial Showcase */}
      <Card variant="glass" className="p-8 sm:p-12 mb-16 border border-blue-500/30 relative">
        <Quote className="w-12 h-12 text-blue-600/30 dark:text-blue-400/30 mb-6" />
        <p className="text-xl sm:text-2xl font-light text-slate-900 dark:text-white leading-relaxed mb-8 italic">
          &quot;{locale === 'fr' ? currentTestimonial.quoteFr : currentTestimonial.quoteEn}&quot;
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-4">
            <img
              src={currentTestimonial.avatar}
              alt={currentTestimonial.name}
              className="w-12 h-12 rounded-full object-cover border border-slate-300 dark:border-white/20 shadow-xs"
            />
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">{currentTestimonial.name}</h3>
              <span className="text-xs font-mono text-slate-500 dark:text-zinc-300">{currentTestimonial.role} · {currentTestimonial.company}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="violet" size="sm">{currentTestimonial.category}</Badge>
            <Link href={`/projects/${currentTestimonial.projectSlug}`}>
              <Button variant="outlined" size="sm" icon={<ArrowUpRight className="w-4 h-4" />}>
                {t.viewProject}
              </Button>
            </Link>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-end gap-2 mt-6">
          <button onClick={prevQuote} className="p-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-white transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-mono text-xs text-slate-500 dark:text-zinc-300">
            {currentIndex + 1} / {mockTestimonials.length}
          </span>
          <button onClick={nextQuote} className="p-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-white transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </Card>

      {/* Trust Principles Section */}
      <div className="mb-16">
        <Badge variant="violet" size="md" className="mb-4">{t.principlesBadge}</Badge>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">{t.principlesTitle}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.principles.map((pr, idx) => (
            <Card key={idx} variant="glass" className="p-6">
              <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-3" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">{pr.title}</h3>
              <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                {pr.desc}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
