'use client';

import React from 'react';
import { useLanguage } from '@/components/language/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Star, GitFork, ExternalLink, ArrowUpRight } from 'lucide-react';

const content = {
  fr: {
    hero: {
      badge: 'GITHUB / OPEN SOURCE',
      titleLine1: 'Code, expérimentations et',
      titleLine2: 'projets développés.',
      subtitle: 'Découvrez la sélection de mes répertoires publics GitHub, projets d’ingénierie open-source et contributions de code.',
      profileBtn: 'Visiter le profil GitHub (@Naby-Coder)',
    },
    metrics: {
      repos: 'Répertoires Publics',
      contribs: 'Contributions (Dernière Année)',
      stars: 'Étoiles Obtenues',
      forks: 'Forks & Forks Réalisés',
    },
    reposTitle: 'Sélection de Répertoires',
    repo1Desc: 'Un Design System hautement modulaire alimenté par des Design Tokens pour applications d’entreprise. Inclut composants React et Figma.',
    repo2Desc: 'Moteur de rendu 3D léger basé sur le web et pipeline de shaders WebGL écrit en TypeScript et Three.js.',
    viewRepo: 'Voir le dépôt',
    langDistTitle: 'Répartition des Langages',
  },
  en: {
    hero: {
      badge: 'GITHUB / OPEN SOURCE',
      titleLine1: 'Code, experiments and',
      titleLine2: 'things I’ve built.',
      subtitle: 'Discover selected public GitHub repositories, open-source engineering projects, and code contributions.',
      profileBtn: 'Visit GitHub Profile (@Naby-Coder)',
    },
    metrics: {
      repos: 'Public Repositories',
      contribs: 'Contributions (Last Year)',
      stars: 'Stars Earned',
      forks: 'Forks Created',
    },
    reposTitle: 'Selected Repositories',
    repo1Desc: 'A highly modular, token-driven design system built for enterprise applications. Includes React components and Figma design tokens.',
    repo2Desc: 'Lightweight web-based 3D scene renderer and WebGL shader pipeline written in TypeScript and Three.js.',
    viewRepo: 'View Repo',
    langDistTitle: 'Language Distribution',
  },
};

export default function GithubPage() {
  const { locale } = useLanguage();
  const t = content[locale];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-900 dark:text-white">
      {/* Hero */}
      <div className="mb-12">
        <Badge variant="blue" size="md" className="mb-4">{t.hero.badge}</Badge>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
          {t.hero.titleLine1} <br />
          <span className="text-gradient-electric">{t.hero.titleLine2}</span>
        </h1>
        <p className="text-slate-600 dark:text-zinc-300 text-lg max-w-2xl mb-8 leading-relaxed">
          {t.hero.subtitle}
        </p>

        <a href="https://github.com/Naby-Coder" target="_blank" rel="noopener noreferrer">
          <Button variant="primary" size="md" icon={<ExternalLink className="w-4 h-4" />}>
            {t.hero.profileBtn}
          </Button>
        </a>
      </div>

      {/* Profile Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        <Card variant="glass" className="p-6 text-center">
          <span className="text-3xl font-bold text-blue-600 dark:text-blue-400 block mb-1">18</span>
          <span className="text-xs font-mono text-slate-500 dark:text-zinc-300 uppercase">{t.metrics.repos}</span>
        </Card>
        <Card variant="glass" className="p-6 text-center">
          <span className="text-3xl font-bold text-purple-600 dark:text-purple-400 block mb-1">945</span>
          <span className="text-xs font-mono text-slate-500 dark:text-zinc-300 uppercase">{t.metrics.contribs}</span>
        </Card>
        <Card variant="glass" className="p-6 text-center">
          <span className="text-3xl font-bold text-emerald-500 dark:text-emerald-400 block mb-1">160+</span>
          <span className="text-xs font-mono text-slate-500 dark:text-zinc-300 uppercase">{t.metrics.stars}</span>
        </Card>
        <Card variant="glass" className="p-6 text-center">
          <span className="text-3xl font-bold text-amber-500 dark:text-amber-400 block mb-1">42</span>
          <span className="text-xs font-mono text-slate-500 dark:text-zinc-300 uppercase">{t.metrics.forks}</span>
        </Card>
      </div>

      {/* Featured Repositories Grid */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">{t.reposTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="glass" className="p-6 flex flex-col justify-between border border-blue-500/30">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400">nexus-design-system</span>
                <Badge variant="blue" size="sm">PUBLIC</Badge>
              </div>
              <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed mb-4">
                {t.repo1Desc}
              </p>
              <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-zinc-300 mb-4">
                <span>🔵 TypeScript</span>
                <span>⚛️ React</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/10 text-xs font-mono">
              <div className="flex items-center gap-3 text-slate-500 dark:text-zinc-300">
                <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" /> 128</span>
                <span className="flex items-center gap-1"><GitFork className="w-3.5 h-3.5" /> 32</span>
              </div>
              <a href="https://github.com/Naby-Coder/nexus-design-system" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 font-semibold">
                <span>{t.viewRepo}</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </Card>

          <Card variant="glass" className="p-6 flex flex-col justify-between border border-purple-500/30">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-sm font-bold text-purple-600 dark:text-purple-400">aether-engine</span>
                <Badge variant="violet" size="sm">PUBLIC</Badge>
              </div>
              <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed mb-4">
                {t.repo2Desc}
              </p>
              <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-zinc-300 mb-4">
                <span>🟣 TypeScript</span>
                <span>🎮 WebGL</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/10 text-xs font-mono">
              <div className="flex items-center gap-3 text-slate-500 dark:text-zinc-300">
                <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" /> 45</span>
                <span className="flex items-center gap-1"><GitFork className="w-3.5 h-3.5" /> 10</span>
              </div>
              <a href="https://github.com/Naby-Coder/aether-engine" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 font-semibold">
                <span>{t.viewRepo}</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </Card>
        </div>
      </div>

      {/* Language Distribution Bar */}
      <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900/70 border border-slate-200 dark:border-white/10 mb-16 shadow-xs">
        <h3 className="font-bold text-slate-900 dark:text-white text-base mb-4">{t.langDistTitle}</h3>
        <div className="w-full h-3 rounded-full overflow-hidden flex mb-4">
          <div className="bg-blue-600 dark:bg-blue-400 h-full w-[45%]" title="TypeScript 45%" />
          <div className="bg-purple-600 dark:bg-purple-400 h-full w-[30%]" title="PHP 30%" />
          <div className="bg-amber-500 dark:bg-amber-400 h-full w-[15%]" title="JavaScript 15%" />
          <div className="bg-emerald-500 dark:bg-emerald-400 h-full w-[10%]" title="Dart / HTML / CSS 10%" />
        </div>
        <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-600 dark:text-zinc-300">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400" /> TypeScript 45%</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-600 dark:bg-purple-400" /> PHP / Laravel 30%</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 dark:bg-amber-400" /> JavaScript 15%</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400" /> Dart &amp; HTML/CSS 10%</span>
        </div>
      </div>
    </div>
  );
}
