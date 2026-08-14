'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/components/language/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { GithubIcon } from '@/components/ui/Icons';
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Layout,
  Server,
  Database,
  ArrowRight,
  ArrowDown,
} from 'lucide-react';
import { projectsData, ProjectDetailData } from '@/data/projectsData';

const translations = {
  fr: {
    backLink: 'Retour à tous les projets',
    liveDemo: 'Démonstration en Direct',
    githubRepo: 'Répertoire GitHub',
    metrics: {
      role: 'Rôle',
      timeline: 'Durée',
      category: 'Catégorie',
      stack: 'Technologies',
      status: 'Statut',
    },
    jump: 'ALLER À :',
    jumpItems: ['01. Le Défi', '02. La Solution', '03. Architecture', '04. Impact & Résultats'],
    mediaGallery: 'Galerie Média du projet',
    clickToZoom: 'Cliquez sur une photo pour l’agrandir en plein écran',
    fullscreen: 'Afficher en plein écran',
    close: 'Fermer',
    prevProject: 'Projet précédent',
    nextProject: 'Projet suivant',
  },
  en: {
    backLink: 'Back to all projects',
    liveDemo: 'Live Demo',
    githubRepo: 'GitHub Repository',
    metrics: {
      role: 'Role',
      timeline: 'Timeline',
      category: 'Category',
      stack: 'Stack',
      status: 'Status',
    },
    jump: 'JUMP TO:',
    jumpItems: ['01. The Challenge', '02. The Solution', '03. Architecture', '04. Impact & Results'],
    mediaGallery: 'Project Media Gallery',
    clickToZoom: 'Click a photo to view full-screen',
    fullscreen: 'View full-screen photo',
    close: 'Close',
    prevProject: 'Previous project',
    nextProject: 'Next project',
  },
};

export default function ProjectDetailPage() {
  const { locale } = useLanguage();
  const t = translations[locale];
  const params = useParams();
  const slugParam = params?.slug as string;

  const [activeProject, setActiveProject] = useState<ProjectDetailData>(() => {
    const defaultProj = projectsData.find((p) => p.slug === slugParam) || projectsData[0];
    return defaultProj;
  });

  const [allProjectsList, setAllProjectsList] = useState<ProjectDetailData[]>(projectsData);

  useEffect(() => {
    function loadCurrentProject() {
      try {
        const stored = localStorage.getItem('myfolio_projects');
        let combinedList = [...projectsData];

        if (stored) {
          const customList = JSON.parse(stored);
          if (Array.isArray(customList) && customList.length > 0) {
            // merge or override with custom projects from admin
            const customMapped: ProjectDetailData[] = customList.map((cp: any, idx: number) => {
              const base = projectsData.find((p) => p.slug === cp.slug) || projectsData[0];
              const techList: string[] = Array.isArray(cp.technologies)
                ? cp.technologies
                : typeof cp.technologies === 'string'
                ? cp.technologies.split(',').map((s: string) => s.trim())
                : base.tech || [];

              const isFlutter = techList.some((t) => t.toLowerCase().includes('flutter'));
              const isReactNat = techList.some((t) => t.toLowerCase().includes('native'));
              const isNext = techList.some((t) => t.toLowerCase().includes('next'));
              const isReact = techList.some((t) => t.toLowerCase().includes('react'));
              const isVue = techList.some((t) => t.toLowerCase().includes('vue'));
              const isAngular = techList.some((t) => t.toLowerCase().includes('angular'));
              const isWP = techList.some((t) => t.toLowerCase().includes('wordpress'));

              const isLaravel = techList.some((t) => t.toLowerCase().includes('laravel'));
              const isNode = techList.some((t) => t.toLowerCase().includes('node') || t.toLowerCase().includes('express'));
              const isDjango = techList.some((t) => t.toLowerCase().includes('django') || t.toLowerCase().includes('python'));
              const isSpring = techList.some((t) => t.toLowerCase().includes('spring'));

              const isPostgres = techList.some((t) => t.toLowerCase().includes('postgres'));
              const isMySQL = techList.some((t) => t.toLowerCase().includes('mysql'));
              const isSupabase = techList.some((t) => t.toLowerCase().includes('supabase'));
              const isFirebase = techList.some((t) => t.toLowerCase().includes('firebase'));

              const clientTitle = isFlutter
                ? 'Flutter Mobile App'
                : isReactNat
                ? 'React Native Mobile App'
                : isNext
                ? 'Next.js App Router'
                : isReact
                ? 'React SPA Client'
                : isVue
                ? 'Vue.js Web App'
                : isAngular
                ? 'Angular Web App'
                : isWP
                ? 'WordPress CMS / UI'
                : base.architecture?.client?.title || 'Modern Web / Mobile Client';

              const backendTitle = isLaravel
                ? 'Laravel REST API'
                : isNode
                ? 'Node.js / Express API'
                : isDjango
                ? 'Django REST Framework'
                : isSpring
                ? 'Spring Boot Services'
                : isSupabase
                ? 'Supabase Backend & Auth'
                : isWP
                ? 'WordPress REST & Core'
                : base.architecture?.backend?.title || 'RESTful API Services';

              const dbTitle = isSupabase
                ? 'Supabase PostgreSQL'
                : isPostgres
                ? 'PostgreSQL Database'
                : isMySQL
                ? 'MySQL 8.0 Database'
                : isFirebase
                ? 'Firebase Firestore'
                : base.architecture?.database?.title || 'Relational Database / Cloud';

              return {
                ...base,
                id: cp.id || 100 + idx,
                slug: cp.slug || base.slug,
                titleFr: cp.title_fr || cp.title || base.titleFr,
                titleEn: cp.title_en || cp.title || base.titleEn,
                summaryFr: cp.summary_fr || cp.summary || base.summaryFr,
                summaryEn: cp.summary_en || cp.summary || base.summaryEn,
                category: cp.category || base.category,
                timelineFr: cp.timeline_fr || base.timelineFr,
                timelineEn: cp.timeline_en || base.timelineEn,
                statusFr: cp.status_text_fr || (cp.status === 'DRAFT' ? 'En Développement' : 'Produit en Ligne') || base.statusFr,
                statusEn: cp.status_text_en || (cp.status === 'DRAFT' ? 'In Development' : 'Live Product') || base.statusEn,
                roleFr: cp.role_fr || base.roleFr,
                roleEn: cp.role_en || base.roleEn,
                tech: techList,
                image: cp.featured_image || cp.image || base.image,
                gallery: cp.gallery || (cp.gallery_items ? cp.gallery_items.map((g: any) => g.url) : base.gallery),
                demoUrl: cp.demo_url || base.demoUrl,
                githubUrl: cp.github_url || base.githubUrl,
                challenge: {
                  ...base.challenge,
                  p1Fr: cp.problem_fr || base.challenge.p1Fr,
                  p1En: cp.problem_en || base.challenge.p1En,
                },
                solution: {
                  ...base.solution,
                  overviewFr: cp.solution_fr || base.solution.overviewFr || '',
                  overviewEn: cp.solution_en || base.solution.overviewEn || '',
                  cards: cp.features_fr && Array.isArray(cp.features_fr) && cp.features_fr.length > 0
                    ? cp.features_fr.map((feat: string, fIdx: number) => ({
                        titleFr: feat,
                        titleEn: (cp.features_en && cp.features_en[fIdx]) || feat,
                        descFr: '',
                        descEn: '',
                      }))
                    : base.solution.cards,
                },
                architecture: {
                  ...base.architecture,
                  client: {
                    layer: 'CLIENT LAYER',
                    title: cp.architecture_client_title || clientTitle,
                    sub: cp.architecture_client_sub || techList.slice(0, 3).join(' · ') || base.architecture?.client?.sub || 'Responsive UI',
                  },
                  backend: {
                    layer: 'BACKEND API',
                    title: cp.architecture_backend_title || backendTitle,
                    sub: cp.architecture_backend_sub || (isLaravel
                      ? 'Eloquent · Sanctum Auth · Redis Cache'
                      : isNode
                      ? 'Express · JWT Auth · REST'
                      : isDjango
                      ? 'Python · ORM · Token Auth'
                      : isSupabase
                      ? 'Edge Functions · PostgREST'
                      : base.architecture?.backend?.sub || 'Business Logic & API'),
                  },
                  database: {
                    layer: 'DATABASE',
                    title: cp.architecture_database_title || dbTitle,
                    sub: cp.architecture_database_sub || (isSupabase
                      ? 'Cloud PostgreSQL · RLS Security'
                      : isMySQL
                      ? 'Indexed Queries · ACID Compliance'
                      : isPostgres
                      ? 'Relational Schema · Indexing'
                      : isFirebase
                      ? 'NoSQL Realtime · Security Rules'
                      : base.architecture?.database?.sub || 'Data Storage & Persistence'),
                  },
                },
                results: {
                  ...base.results,
                  metrics: [
                    cp.metric1_val ? { value: cp.metric1_val, labelFr: cp.metric1_label_fr || '', labelEn: cp.metric1_label_en || '' } : null,
                    cp.metric2_val ? { value: cp.metric2_val, labelFr: cp.metric2_label_fr || '', labelEn: cp.metric2_label_en || '' } : null,
                    cp.metric3_val ? { value: cp.metric3_val, labelFr: cp.metric3_label_fr || '', labelEn: cp.metric3_label_en || '' } : null,
                  ].filter(Boolean).length > 0
                    ? ([
                        cp.metric1_val ? { value: cp.metric1_val, labelFr: cp.metric1_label_fr || '', labelEn: cp.metric1_label_en || '' } : null,
                        cp.metric2_val ? { value: cp.metric2_val, labelFr: cp.metric2_label_fr || '', labelEn: cp.metric2_label_en || '' } : null,
                        cp.metric3_val ? { value: cp.metric3_val, labelFr: cp.metric3_label_fr || '', labelEn: cp.metric3_label_en || '' } : null,
                      ].filter(Boolean) as any)
                    : base.results.metrics,
                },
              };
            });

            combinedList = [
              ...customMapped,
              ...projectsData.filter((p) => !customMapped.some((c) => c.slug === p.slug)),
            ];
          }
        }

        setAllProjectsList(combinedList);

        const found = combinedList.find((p) => p.slug === slugParam) || combinedList[0];
        setActiveProject(found);
      } catch (e) {
        console.error('Error loading project details:', e);
        const fallback = projectsData.find((p) => p.slug === slugParam) || projectsData[0];
        setActiveProject(fallback);
      }
    }

    loadCurrentProject();
    window.addEventListener('myfolio_projects_updated', loadCurrentProject);
    return () => window.removeEventListener('myfolio_projects_updated', loadCurrentProject);
  }, [slugParam]);

  // Gallery and Lightbox State
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const galleryList = activeProject.gallery && activeProject.gallery.length > 0
    ? activeProject.gallery
    : [activeProject.image];

  const currentMainImage = activePhoto || galleryList[0];

  // Calculate Previous & Next Projects
  const currentIndex = allProjectsList.findIndex((p) => p.slug === activeProject.slug);
  const prevIndex = currentIndex > 0 ? currentIndex - 1 : allProjectsList.length - 1;
  const nextIndex = currentIndex < allProjectsList.length - 1 ? currentIndex + 1 : 0;

  const prevProj = allProjectsList[prevIndex];
  const nextProj = allProjectsList[nextIndex];

  const openLightboxForUrl = (url: string) => {
    const idx = galleryList.indexOf(url);
    setLightboxIndex(idx >= 0 ? idx : 0);
    setIsLightboxOpen(true);
  };

  const nextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % galleryList.length);
  };

  const prevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + galleryList.length) % galleryList.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev + 1) % galleryList.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev - 1 + galleryList.length) % galleryList.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, galleryList.length]);

  // Reset active photo when project changes
  useEffect(() => {
    setActivePhoto(null);
  }, [activeProject.slug]);

  const title = locale === 'fr' ? activeProject.titleFr : activeProject.titleEn;
  const summary = locale === 'fr' ? activeProject.summaryFr : activeProject.summaryEn;
  const role = locale === 'fr' ? activeProject.roleFr : activeProject.roleEn;
  const timeline = locale === 'fr' ? activeProject.timelineFr : activeProject.timelineEn;
  const status = locale === 'fr' ? activeProject.statusFr : activeProject.statusEn;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-slate-900 dark:text-white">
      {/* Back Link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>{t.backLink}</span>
      </Link>

      {/* Case Study Hero */}
      <div className="mb-12">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {activeProject.badges.map((badge, idx) => (
            <Badge key={idx} variant={idx === 0 ? 'blue' : idx === 1 ? 'violet' : 'gray'}>
              {badge}
            </Badge>
          ))}
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 text-slate-900 dark:text-white">
          {title}
        </h1>
        <p className="text-slate-600 dark:text-zinc-300 text-lg max-w-3xl leading-relaxed mb-8">
          {summary}
        </p>

        <div className="flex flex-wrap gap-4">
          {activeProject.demoUrl && (
            <a href={activeProject.demoUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="md" icon={<ExternalLink className="w-4 h-4" />}>
                {t.liveDemo}
              </Button>
            </a>
          )}
          {activeProject.githubUrl && (
            <a href={activeProject.githubUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="glass" size="md" icon={<GithubIcon className="w-4 h-4" />}>
                {t.githubRepo}
              </Button>
            </a>
          )}
        </div>
      </div>

      {/* Main Cover Image (Click for Fullscreen Lightbox) */}
      <div
        onClick={() => openLightboxForUrl(currentMainImage)}
        className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 mb-6 shadow-2xl relative bg-zinc-950/90 group cursor-pointer"
      >
        <img
          src={currentMainImage}
          alt={title}
          className="w-full max-h-[620px] object-contain transition-all duration-300 mx-auto py-2"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <span className="px-4 py-2 rounded-full bg-blue-600/90 text-white text-xs font-mono font-bold shadow-lg backdrop-blur-md flex items-center gap-2">
            <Maximize2 className="w-4 h-4" />
            {t.fullscreen}
          </span>
        </div>
      </div>

      {/* Interactive Photo Gallery Grid */}
      {galleryList.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
              {t.mediaGallery} ({galleryList.length} photo{galleryList.length > 1 ? 's' : ''})
            </span>
            <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400">
              {t.clickToZoom}
            </span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {galleryList.map((photoUrl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setActivePhoto(photoUrl);
                  openLightboxForUrl(photoUrl);
                }}
                className={`relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer aspect-video group ${
                  currentMainImage === photoUrl
                    ? 'border-blue-500 ring-2 ring-blue-500/30 scale-105 shadow-md'
                    : 'border-slate-200 dark:border-white/10 opacity-70 hover:opacity-100 hover:border-slate-400'
                }`}
              >
                <img src={photoUrl} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 className="w-4 h-4 text-white" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Full-Screen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 animate-fade-in select-none"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white font-mono text-xs z-50 max-w-7xl mx-auto w-full pt-2">
            <span className="font-semibold text-slate-200 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              {title} — ({lightboxIndex + 1} / {galleryList.length})
            </span>
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="px-4 py-2 rounded-full bg-red-600/90 hover:bg-red-700 text-white font-bold transition-all shadow-xl flex items-center gap-1.5 cursor-pointer border border-red-400/30"
              title="Fermer (Échap)"
            >
              <X className="w-4 h-4" />
              <span>{t.close}</span>
            </button>
          </div>

          {/* Center Main Photo */}
          <div
            className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {galleryList.length > 1 && (
              <button
                type="button"
                onClick={prevPhoto}
                className="absolute left-2 sm:left-6 p-3.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-colors cursor-pointer z-20 border border-white/20"
                title="Photo précédente"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>
            )}

            <img
              src={galleryList[lightboxIndex]}
              alt={`Project Screenshot ${lightboxIndex + 1}`}
              className="max-w-full max-h-[82vh] object-contain rounded-xl shadow-2xl transition-all border border-white/10"
            />

            {galleryList.length > 1 && (
              <button
                type="button"
                onClick={nextPhoto}
                className="absolute right-2 sm:right-6 p-3.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-colors cursor-pointer z-20 border border-white/20"
                title="Photo suivante"
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnails */}
          {galleryList.length > 1 && (
            <div
              className="flex items-center justify-center gap-3 overflow-x-auto py-2 z-10 max-w-7xl mx-auto w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {galleryList.map((photo, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    i === lightboxIndex
                      ? 'border-blue-500 ring-2 ring-blue-500/40 scale-110 shadow-lg'
                      : 'border-white/20 opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={photo} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Overview Metrics & Role Unified Card */}
      <div className="rounded-2xl bg-white dark:bg-zinc-900/70 border border-slate-200 dark:border-white/10 shadow-xs mb-16 overflow-hidden">
        {/* Full-width Role & Responsibilities */}
        {role && (
          <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-white/10">
            <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider block mb-2">
              {t.metrics.role}
            </span>
            <p className="text-slate-800 dark:text-zinc-200 text-sm leading-relaxed font-normal">
              {role}
            </p>
          </div>
        )}

        {/* 4-column Metrics Bar: Durée, Catégorie, Technologies, Statut */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 sm:p-8 text-xs font-mono items-center bg-slate-50/50 dark:bg-zinc-900/30">
          <div>
            <span className="text-slate-500 dark:text-zinc-400 block uppercase mb-1">{t.metrics.timeline}</span>
            <span className="text-slate-900 dark:text-white font-semibold text-sm">{timeline}</span>
          </div>
          <div>
            <span className="text-slate-500 dark:text-zinc-400 block uppercase mb-1">{t.metrics.category}</span>
            <span className="text-slate-900 dark:text-white font-semibold text-sm">{activeProject.category}</span>
          </div>
          <div>
            <span className="text-slate-500 dark:text-zinc-400 block uppercase mb-1">{t.metrics.stack}</span>
            <span className="text-slate-900 dark:text-white font-semibold text-sm">{activeProject.tech.slice(0, 4).join(' · ')}</span>
          </div>
          <div>
            <span className="text-slate-500 dark:text-zinc-400 block uppercase mb-1">{t.metrics.status}</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              {status}
            </span>
          </div>
        </div>
      </div>

      {/* Sticky Section Bar */}
      <div className="sticky top-16 md:top-20 z-30 py-3 px-4 -mx-4 sm:mx-0 sm:px-4 sm:rounded-xl mb-12 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-md flex items-center gap-4 sm:gap-6 overflow-x-auto whitespace-nowrap text-xs font-mono scrollbar-none">
        <span className="text-blue-600 dark:text-blue-400 font-bold shrink-0">{t.jump}</span>
        <a href="#challenge" className="text-slate-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shrink-0">
          {t.jumpItems[0]}
        </a>
        <a href="#solution" className="text-slate-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shrink-0">
          {t.jumpItems[1]}
        </a>
        <a href="#architecture" className="text-slate-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shrink-0">
          {t.jumpItems[2]}
        </a>
        <a href="#results" className="text-slate-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shrink-0">
          {t.jumpItems[3]}
        </a>
      </div>

      {/* 01. The Challenge */}
      <section id="challenge" className="mb-16">
        <Badge variant="blue" size="md" className="mb-3">
          {locale === 'fr' ? activeProject.challenge.badgeFr : activeProject.challenge.badgeEn}
        </Badge>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
          {locale === 'fr' ? activeProject.challenge.titleFr : activeProject.challenge.titleEn}
        </h2>
        <div className="max-w-none text-slate-600 dark:text-zinc-300 leading-relaxed text-sm space-y-4">
          <p>{locale === 'fr' ? activeProject.challenge.p1Fr : activeProject.challenge.p1En}</p>
          <p>{locale === 'fr' ? activeProject.challenge.p2Fr : activeProject.challenge.p2En}</p>
        </div>
      </section>

      {/* 02. The Solution */}
      <section id="solution" className="mb-16">
        <Badge variant="violet" size="md" className="mb-3">
          {locale === 'fr' ? activeProject.solution.badgeFr : activeProject.solution.badgeEn}
        </Badge>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
          {locale === 'fr' ? activeProject.solution.titleFr : activeProject.solution.titleEn}
        </h2>

        {/* Solution Overview Paragraph */}
        {(activeProject.solution.overviewFr || activeProject.solution.overviewEn) && (
          <div className="text-slate-600 dark:text-zinc-300 leading-relaxed text-sm mb-8 max-w-none">
            <p>
              {locale === 'fr'
                ? (activeProject.solution.overviewFr || activeProject.solution.overviewEn)
                : (activeProject.solution.overviewEn || activeProject.solution.overviewFr)}
            </p>
          </div>
        )}

        {/* Compact & Clean Feature Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {activeProject.solution.cards.map((card, cIdx) => (
            <div
              key={cIdx}
              className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10 hover:border-blue-500/40 transition-all flex items-start gap-3 shadow-xs"
            >
              <span className="w-6 h-6 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 border border-blue-500/20 mt-0.5">
                {String(cIdx + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm leading-snug">
                  {locale === 'fr' ? card.titleFr : card.titleEn}
                </h3>
                {(card.descFr || card.descEn) && (
                  <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed mt-1">
                    {locale === 'fr' ? card.descFr : card.descEn}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 03. Technical Architecture */}
      <section id="architecture" className="mb-16">
        <Badge variant="gray" size="md" className="mb-3">
          {locale === 'fr' ? activeProject.architecture.badgeFr : activeProject.architecture.badgeEn}
        </Badge>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
          {locale === 'fr' ? activeProject.architecture.titleFr : activeProject.architecture.titleEn}
        </h2>
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/70 border border-slate-200 dark:border-white/10 shadow-xs font-mono text-xs">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* 1. Client Layer */}
            <div className="flex-1 w-full p-5 rounded-xl bg-blue-50/80 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 transition-all hover:border-blue-400">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-blue-600/10 dark:bg-blue-400/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Layout className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  {activeProject.architecture.client.layer}
                </span>
              </div>
              <strong className="text-slate-900 dark:text-white text-sm font-semibold block mb-1">
                {activeProject.architecture.client.title}
              </strong>
              <span className="text-slate-600 dark:text-zinc-400 text-xs block leading-relaxed">
                {activeProject.architecture.client.sub}
              </span>
            </div>

            {/* Pipeline Step 1 */}
            <div className="flex flex-col items-center justify-center shrink-0 px-2 py-1">
              <div className="hidden lg:flex items-center gap-1.5 text-slate-500 dark:text-zinc-400 text-[11px] font-semibold">
                <span>REST / API</span>
                <ArrowRight className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex lg:hidden items-center gap-1.5 text-slate-500 dark:text-zinc-400 text-[11px] font-semibold py-1">
                <ArrowDown className="w-4 h-4 text-blue-500" />
                <span>REST / API</span>
              </div>
            </div>

            {/* 2. Backend Layer */}
            <div className="flex-1 w-full p-5 rounded-xl bg-purple-50/80 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/30 transition-all hover:border-purple-400">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-purple-600/10 dark:bg-purple-400/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <Server className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                  {activeProject.architecture.backend.layer}
                </span>
              </div>
              <strong className="text-slate-900 dark:text-white text-sm font-semibold block mb-1">
                {activeProject.architecture.backend.title}
              </strong>
              <span className="text-slate-600 dark:text-zinc-400 text-xs block leading-relaxed">
                {activeProject.architecture.backend.sub}
              </span>
            </div>

            {/* Pipeline Step 2 */}
            <div className="flex flex-col items-center justify-center shrink-0 px-2 py-1">
              <div className="hidden lg:flex items-center gap-1.5 text-slate-500 dark:text-zinc-400 text-[11px] font-semibold">
                <span>Database</span>
                <ArrowRight className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="flex lg:hidden items-center gap-1.5 text-slate-500 dark:text-zinc-400 text-[11px] font-semibold py-1">
                <ArrowDown className="w-4 h-4 text-emerald-500" />
                <span>Database</span>
              </div>
            </div>

            {/* 3. Database Layer */}
            <div className="flex-1 w-full p-5 rounded-xl bg-emerald-50/80 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 transition-all hover:border-emerald-400">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-600/10 dark:bg-emerald-400/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Database className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  {activeProject.architecture.database.layer}
                </span>
              </div>
              <strong className="text-slate-900 dark:text-white text-sm font-semibold block mb-1">
                {activeProject.architecture.database.title}
              </strong>
              <span className="text-slate-600 dark:text-zinc-400 text-xs block leading-relaxed">
                {activeProject.architecture.database.sub}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 04. Impact & Results */}
      {activeProject.results?.metrics?.filter((m) => Boolean(m.value)).length > 0 && (
        <section id="results" className="mb-16">
          <Badge variant="blue" size="md" className="mb-3">
            {locale === 'fr' ? activeProject.results.badgeFr : activeProject.results.badgeEn}
          </Badge>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
            {locale === 'fr' ? activeProject.results.titleFr : activeProject.results.titleEn}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeProject.results.metrics
              .filter((m) => Boolean(m.value))
              .map((m, mIdx) => (
                <Card key={mIdx} variant="glow" className="p-6 text-center">
                  <span
                    className={`text-4xl font-bold block mb-2 ${
                      mIdx === 0
                        ? 'text-blue-600 dark:text-blue-400'
                        : mIdx === 1
                        ? 'text-purple-600 dark:text-purple-400'
                        : 'text-emerald-500 dark:text-emerald-400'
                    }`}
                  >
                    {m.value}
                  </span>
                  <span className="text-xs text-slate-600 dark:text-zinc-300">
                    {locale === 'fr' ? m.labelFr : m.labelEn}
                  </span>
                </Card>
              ))}
          </div>
        </section>
      )}

      {/* Dynamic Prev / Next Project Footer Navigation */}
      <div className="pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        {prevProj && (
          <Link
            href={`/projects/${prevProj.slug}`}
            className="text-xs font-mono text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>
              {t.prevProject}: {locale === 'fr' ? prevProj.titleFr : prevProj.titleEn}
            </span>
          </Link>
        )}
        {nextProj && (
          <Link href={`/projects/${nextProj.slug}`} className="sm:ml-auto">
            <Button variant="glass" size="md" icon={<ChevronRight className="w-4 h-4" />}>
              {t.nextProject}: {locale === 'fr' ? nextProj.titleFr : nextProj.titleEn}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
