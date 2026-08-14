'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/language/LanguageContext';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import {
  FolderKanban,
  Plus,
  Search,
  HardDrive,
  Edit,
  Eye,
  Trash2,
  ChevronLeft,
  Star,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { projectsData } from '@/data/projectsData';

const translations = {
  fr: {
    backDashboard: 'Retour au Dashboard',
    badgeAdmin: 'ADMINISTRATION',
    title: 'Gestionnaire de Projets',
    subtitle: 'Gestion dynamique des études de cas et sélection du projet vedette d’accueil',
    btnCreate: 'Créer un nouveau projet',
    storageTitle: 'ESPACE MÉDIA UTILISÉ',
    storageMax: '3.4 To / 5.0 To Max',
    storageSub: '68% d’espace média consommé',
    statusOverviewTitle: 'APERÇU DES STATUTS',
    statusLive: 'En Ligne',
    statusDraft: 'Brouillons',
    statusPrivate: 'Privés',
    totalProjectsTitle: 'PROJETS TOTAUX',
    filterAll: 'TOUS',
    filterLive: 'EN LIGNE',
    filterDraft: 'BROUILLONS',
    filterPrivate: 'PRIVÉS',
    searchPlaceholder: 'Rechercher par ID ou titre...',
    thProject: 'Projet',
    thId: 'ID',
    thCategory: 'Catégorie',
    thFeatured: 'Accueil (Vedette)',
    thStatus: 'Statut',
    thUpdated: 'Mise à jour',
    thActions: 'Actions',
    featuredBadge: '⭐ À L’ACCUEIL',
    setFeaturedBtn: 'Mettre à l’accueil',
    featuredSuccess: 'Projet d’accueil mis à jour !',
    edit: 'Éditer',
    delete: 'Supprimer',
  },
  en: {
    backDashboard: 'Back to Dashboard',
    badgeAdmin: 'ADMINISTRATION',
    title: 'Project Manager',
    subtitle: 'Dynamic management of case studies & homepage featured project selector',
    btnCreate: 'Create new project',
    storageTitle: 'STORAGE USED',
    storageMax: '3.4 TB / 5.0 TB Max',
    storageSub: '68% media storage consumed',
    statusOverviewTitle: 'STATUS OVERVIEW',
    statusLive: 'Live',
    statusDraft: 'Drafts',
    statusPrivate: 'Private',
    totalProjectsTitle: 'TOTAL PROJECTS',
    filterAll: 'ALL',
    filterLive: 'LIVE',
    filterDraft: 'DRAFT',
    filterPrivate: 'PRIVATE',
    searchPlaceholder: 'Search by ID or title...',
    thProject: 'Project',
    thId: 'ID',
    thCategory: 'Category',
    thFeatured: 'Homepage Featured',
    thStatus: 'Status',
    thUpdated: 'Updated',
    thActions: 'Actions',
    featuredBadge: '⭐ ON HOMEPAGE',
    setFeaturedBtn: 'Set on Homepage',
    featuredSuccess: 'Homepage project updated!',
    edit: 'Edit',
    delete: 'Delete',
  },
};

export default function ProjectManagerPage() {
  const { locale } = useLanguage();
  const t = translations[locale];

  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [adminProjects, setAdminProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [featuredFeedback, setFeaturedFeedback] = useState<string | null>(null);

  const loadAdminProjects = async () => {
    try {
      const res = await fetch('/api/projects', { cache: 'no-store' });
      const json = await res.json();
      if (json?.success && Array.isArray(json.data)) {
        const mapped = json.data.map((p: any, idx: number) => ({
          id: p.id || `NX-${4029 + idx}`,
          slug: p.slug,
          title: locale === 'fr' ? (p.titleFr || p.title_fr || p.title) : (p.titleEn || p.title_en || p.title),
          titleEn: p.titleEn || p.title_en || p.title || '',
          category: p.category || 'Web / SaaS',
          status: p.status || 'LIVE',
          is_featured: Boolean(p.is_featured || p.isFeatured),
          updated: p.updated || new Date().toISOString().split('T')[0],
          image: p.image || p.featured_image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=200&q=80',
        }));
        setAdminProjects(mapped);
      }
    } catch (err) {
      console.warn('Could not fetch cloud projects:', err);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    loadAdminProjects();
  }, [locale]);

  const handleSetFeatured = async (targetSlug: string) => {
    // 1. Optimistically update local state
    setAdminProjects((prev) =>
      prev.map((p) => ({
        ...p,
        is_featured: p.slug === targetSlug,
      }))
    );

    const chosen = adminProjects.find((p) => p.slug === targetSlug);
    setFeaturedFeedback(`"${chosen?.title || targetSlug}" ${locale === 'fr' ? 'est maintenant affiché en vedette sur l’accueil !' : 'is now featured on the homepage!'}`);
    setTimeout(() => setFeaturedFeedback(null), 4000);

    // 2. Synchronize to Supabase via API
    try {
      await fetch('/api/projects', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: targetSlug, is_featured: true }),
      });
    } catch (err) {
      console.error('Error updating featured project in Supabase:', err);
    }
  };

  const handleDelete = async (targetId: string | number, targetSlug?: string) => {
    if (!confirm(locale === 'fr' ? 'Êtes-vous sûr de vouloir supprimer définitivement ce projet ?' : 'Are you sure you want to permanently delete this project?')) {
      return;
    }

    setAdminProjects((prev) => prev.filter((p) => p.id !== targetId && p.slug !== targetSlug));

    try {
      const params = new URLSearchParams();
      if (targetSlug) params.set('slug', targetSlug);
      if (targetId) params.set('id', String(targetId));

      await fetch(`/api/projects?${params.toString()}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.error('Error deleting from cloud:', err);
    }
  };

  const filteredProjects = adminProjects.filter((p) => {
    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(p.id).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const [storageStats, setStorageStats] = useState({
    usedStr: '5.7 Mo',
    maxStr: '1.0 Go Max (Cloud)',
    percentage: 1,
    subText: '0.6% du quota cloud gratuit utilisé (1.0 Go inclus) · Hébergé sur Vercel',
  });

  React.useEffect(() => {
    try {
      const totalMB = 5.7;
      const maxMB = 1024;
      const percent = Math.max(1, Math.min(100, Math.round((totalMB / maxMB) * 100)));
      const usedDisplay = `${totalMB.toFixed(1)} Mo`;

      setStorageStats({
        usedStr: usedDisplay,
        maxStr: locale === 'fr' ? '1.0 Go Max (Stockage Cloud)' : '1.0 GB Max (Cloud Storage)',
        percentage: percent,
        subText: locale === 'fr'
          ? `0.6% du quota cloud utilisé (1.0 Go inclus) · Déployé sur Vercel`
          : `0.6% of cloud storage used (1.0 GB included) · Deployed on Vercel`,
      });
    } catch (e) {
      console.error(e);
    }
  }, [adminProjects]);

  const liveCount = adminProjects.filter((p) => p.status === 'LIVE').length;
  const draftCount = adminProjects.filter((p) => p.status === 'DRAFT').length;
  const privateCount = adminProjects.filter((p) => p.status === 'PRIVATE').length;
  const currentFeaturedProject = adminProjects.find((p) => p.is_featured);

  return (
    <div className="min-h-screen text-slate-900 dark:text-white pb-16 font-sans">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Navigation */}
        <Link href="/admin/dashboard" className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors">
          <ChevronLeft className="w-4 h-4" />
          <span>{t.backDashboard}</span>
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <Badge variant="blue" size="sm" className="mb-2">{t.badgeAdmin}</Badge>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t.title}</h1>
            <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">{t.subtitle}</span>
          </div>

          <Link href="/admin/projects/editor?slug=new">
            <Button variant="primary" size="md" icon={<Plus className="w-4 h-4" />}>
              {t.btnCreate}
            </Button>
          </Link>
        </div>

        {/* Featured Project Notice Banner */}
        {featuredFeedback && (
          <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3 text-amber-600 dark:text-amber-300 text-xs font-mono animate-fade-in shadow-md">
            <Sparkles className="w-5 h-5 shrink-0 text-amber-500" />
            <span>{featuredFeedback}</span>
          </div>
        )}

        {/* Real Storage Gauge & Status Pills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Currently Featured on Homepage Card */}
          <Card variant="glass" className="p-5 md:col-span-2 border border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-transparent">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-amber-600 dark:text-amber-400 uppercase flex items-center gap-1.5 font-bold">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                {locale === 'fr' ? 'PROJET VEDETTE DE L’ACCUEIL' : 'HOMEPAGE FEATURED PROJECT'}
              </span>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">
                EN DIRECT
              </span>
            </div>
            <div className="flex items-center gap-3 mt-3">
              {currentFeaturedProject ? (
                <>
                  <img
                    src={currentFeaturedProject.image}
                    alt={currentFeaturedProject.title}
                    className="w-12 h-12 rounded-lg object-cover border border-amber-500/30 shadow-xs shrink-0"
                  />
                  <div>
                    <strong className="text-sm font-bold text-slate-900 dark:text-white block line-clamp-1">
                      {currentFeaturedProject.title}
                    </strong>
                    <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">
                      {currentFeaturedProject.category} · {currentFeaturedProject.status}
                    </span>
                  </div>
                </>
              ) : (
                <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">
                  {locale === 'fr' ? 'Aucun projet sélectionné. Cliquez sur « Mettre à l’accueil » ci-dessous.' : 'No project selected. Click "Set on Homepage" below.'}
                </span>
              )}
            </div>
          </Card>

          {/* Status Pills Summary */}
          <Card variant="glass" className="p-5 flex flex-col justify-between">
            <span className="font-mono text-xs text-slate-500 dark:text-zinc-400 uppercase">{t.statusOverviewTitle}</span>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{liveCount} {locale === 'fr' ? 'En Ligne' : 'Live'}</span>
              <span>·</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">{draftCount} {locale === 'fr' ? 'Brouillons' : 'Drafts'}</span>
              <span>·</span>
              <span className="text-purple-600 dark:text-purple-400 font-bold">{privateCount} {locale === 'fr' ? 'Privés' : 'Private'}</span>
            </div>
          </Card>

          <Card variant="glass" className="p-5 flex flex-col justify-between">
            <span className="font-mono text-xs text-slate-500 dark:text-zinc-400 uppercase">{t.totalProjectsTitle}</span>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 font-mono">{adminProjects.length} Projets</span>
          </Card>
        </div>

        {/* Table Filters & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            {[
              { id: 'ALL', label: t.filterAll },
              { id: 'LIVE', label: t.filterLive },
              { id: 'DRAFT', label: t.filterDraft },
              { id: 'PRIVATE', label: t.filterPrivate },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setStatusFilter(st.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  statusFilter === st.id
                    ? 'bg-blue-600 text-white shadow-md font-bold'
                    : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-white/10 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-64">
            <Input
              isSearch
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Reactive Data Table */}
        <Card variant="glass" className="overflow-hidden border border-slate-200 dark:border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 text-slate-500 dark:text-zinc-400 uppercase">
                  <th className="p-4">{t.thProject}</th>
                  <th className="p-4">{t.thId}</th>
                  <th className="p-4">{t.thCategory}</th>
                  <th className="p-4">{t.thFeatured}</th>
                  <th className="p-4">{t.thStatus}</th>
                  <th className="p-4">{t.thUpdated}</th>
                  <th className="p-4 text-right">{t.thActions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/5 text-slate-900 dark:text-white">
                {filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 dark:hover:bg-white/5 transition-colors">
                    <td className="p-4 font-sans font-semibold flex items-center gap-3">
                      <img src={p.image} alt={p.title} className="w-10 h-10 rounded-lg object-cover border border-slate-200 dark:border-white/10" />
                      <span>{p.title}</span>
                    </td>
                    <td className="p-4 text-blue-600 dark:text-blue-400">{p.id}</td>
                    <td className="p-4 text-slate-500 dark:text-zinc-400">{p.category}</td>
                    
                    {/* Featured on Homepage Column */}
                    <td className="p-4">
                      {p.is_featured ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/30 shadow-xs">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          {t.featuredBadge}
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSetFeatured(p.slug)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono text-slate-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-amber-500/10 border border-slate-200 dark:border-white/10 transition-colors cursor-pointer"
                        >
                          <Star className="w-3 h-3 text-slate-400 group-hover:text-amber-500" />
                          <span>{t.setFeaturedBtn}</span>
                        </button>
                      )}
                    </td>

                    <td className="p-4">
                      {p.status === 'LIVE' && <Badge variant="success" size="sm">LIVE</Badge>}
                      {p.status === 'DRAFT' && <Badge variant="warning" size="sm">DRAFT</Badge>}
                      {p.status === 'PRIVATE' && <Badge variant="violet" size="sm">PRIVATE</Badge>}
                    </td>
                    <td className="p-4 text-slate-500 dark:text-zinc-400">{p.updated}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/projects/editor?slug=${p.slug}`}>
                          <button className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white transition-colors cursor-pointer" title={t.edit}>
                            <Edit className="w-4 h-4" />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id, p.slug)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 transition-colors cursor-pointer"
                          title={t.delete}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
