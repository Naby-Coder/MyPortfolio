'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/language/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { ArrowUpRight, Search, RefreshCw } from 'lucide-react';
import { projectsData, ProjectDetailData } from '@/data/projectsData';

const content = {
  fr: {
    hero: {
      badge: 'PROJETS SÉLECTIONNÉS',
      titleLine1: 'Réalisations conçues, développées &',
      titleLine2: 'mises en production.',
      subtitle: 'Découvrez une sélection d’études de cas et d’applications réelles combinant design d’interface rigoureux et ingénierie logicielle robuste.',
    },
    filters: [
      { id: 'all', label: 'Tous' },
      { id: 'web', label: 'Web' },
      { id: 'mobile', label: 'Mobile' },
      { id: 'fullstack', label: 'Full-Stack' },
      { id: 'uiux', label: 'UI/UX' },
      { id: 'branding', label: 'Graphic / Design' },
    ],
    searchPlaceholder: 'Rechercher un projet (ex: Next.js, Flutter)...',
    viewCaseStudy: 'Voir l’étude de cas',
    emptyTitle: 'Aucun projet trouvé',
    emptyDesc: 'Essayez un autre mot-clé ou modifiez les filtres de catégorie.',
    clearFilters: 'Réinitialiser les filtres',
  },
  en: {
    hero: {
      badge: 'SELECTED WORK',
      titleLine1: 'Things I’ve designed, built and',
      titleLine2: 'brought to life.',
      subtitle: 'Explore a curated list of case studies and enterprise web/mobile applications combining rigorous product design and software engineering.',
    },
    filters: [
      { id: 'all', label: 'All' },
      { id: 'web', label: 'Web' },
      { id: 'mobile', label: 'Mobile' },
      { id: 'fullstack', label: 'Full-Stack' },
      { id: 'uiux', label: 'UI/UX' },
      { id: 'branding', label: 'Graphic / Branding' },
    ],
    searchPlaceholder: 'Search projects (e.g. Next.js, Flutter)...',
    viewCaseStudy: 'View case study',
    emptyTitle: 'No projects found',
    emptyDesc: 'Try another keyword or category filter combination.',
    clearFilters: 'Clear filters',
  },
};

export default function ProjectsPage() {
  const { locale } = useLanguage();
  const t = content[locale];

  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [projectList, setProjectList] = useState<ProjectDetailData[]>(projectsData);

  useEffect(() => {
    async function loadProjects() {
      // 1. Immediate local storage check for instant UI update on same browser
      try {
        const stored = localStorage.getItem('myfolio_projects');
        if (stored) {
          const customProjects = JSON.parse(stored);
          if (Array.isArray(customProjects) && customProjects.length > 0) {
            const customMapped: ProjectDetailData[] = customProjects.map((p: any, idx: number) => {
              const base = projectsData.find((m) => m.slug === p.slug) || projectsData[0];
              return {
                ...base,
                id: p.id || 100 + idx,
                slug: p.slug || base.slug,
                titleFr: p.title_fr || p.title || base.titleFr,
                titleEn: p.title_en || p.title || base.titleEn,
                category: p.category || base.category,
                categoryFilter: (p.categoryFilter as any) || base.categoryFilter,
                summaryFr: p.summary_fr || p.summary || base.summaryFr,
                summaryEn: p.summary_en || p.summary || base.summaryEn,
                image: p.featured_image || p.image || base.image,
                tech: p.technologies || p.tech || base.tech,
              };
            });
            setProjectList([
              ...customMapped,
              ...projectsData.filter((m) => !customMapped.some((f) => f.slug === m.slug)),
            ]);
          }
        }
      } catch (e) {
        console.error('Error loading local projects:', e);
      }

      // 2. Fetch fresh cloud data with no cache
      try {
        const res = await fetch('/api/projects', { cache: 'no-store' });
        const json = await res.json();
        if (json?.success && Array.isArray(json.data) && json.data.length > 0) {
          setProjectList(json.data);
        }
      } catch (e) {
        console.warn('Cloud fetch notice:', e);
      }
    }

    loadProjects();
    window.addEventListener('myfolio_projects_updated', loadProjects);
    return () => window.removeEventListener('myfolio_projects_updated', loadProjects);
  }, []);

  const filteredProjects = projectList.filter((project) => {
    const title = locale === 'fr' ? project.titleFr : project.titleEn;
    const summary = locale === 'fr' ? project.summaryFr : project.summaryEn;
    const matchesFilter = selectedFilter === 'all' || project.categoryFilter === selectedFilter;
    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.tech || []).some((tc) => tc.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-900 dark:text-white">
      {/* Hero */}
      <div className="mb-12">
        <Badge variant="violet" size="md" className="mb-4">{t.hero.badge}</Badge>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
          {t.hero.titleLine1} <br />
          <span className="text-gradient-electric">{t.hero.titleLine2}</span>
        </h1>
        <p className="text-slate-600 dark:text-zinc-300 text-base max-w-2xl leading-relaxed">
          {t.hero.subtitle}
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-8 border-b border-slate-200 dark:border-white/10">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          {t.filters.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
                selectedFilter === tab.id
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'bg-white dark:bg-zinc-900/80 text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-white/5 border border-slate-200 dark:border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="w-full md:w-72">
          <Input
            isSearch
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const title = locale === 'fr' ? project.titleFr : project.titleEn;
            const summary = locale === 'fr' ? project.summaryFr : project.summaryEn;

            return (
              <Card key={project.id} variant="glass" className="flex flex-col justify-between group">
                <div>
                  <div className="relative overflow-hidden h-52 bg-zinc-950">
                    <img
                      src={project.image}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-blue-400 font-semibold">
                      {project.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed mb-4 line-clamp-3">
                      {summary}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {(project.tech || []).map((tc, idx) => (
                        <Badge key={idx} variant="outline" size="sm">
                          {tc}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 mt-auto">
                  <Link href={`/projects/${project.slug}`}>
                    <Button variant="glass" size="sm" className="w-full justify-between" icon={<ArrowUpRight className="w-4 h-4" />}>
                      {t.viewCaseStudy}
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center flex flex-col items-center justify-center">
          <div className="p-4 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-4 text-slate-400 dark:text-zinc-300">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t.emptyTitle}</h3>
          <p className="text-slate-600 dark:text-zinc-300 text-sm max-w-sm mb-6">
            {t.emptyDesc}
          </p>
          <Button
            variant="outlined"
            size="md"
            icon={<RefreshCw className="w-4 h-4" />}
            onClick={() => {
              setSelectedFilter('all');
              setSearchQuery('');
            }}
          >
            {t.clearFilters}
          </Button>
        </div>
      )}
    </div>
  );
}
