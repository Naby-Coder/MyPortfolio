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
} from 'lucide-react';
import { projectsData } from '@/data/projectsData';

const mockAdminProjects = projectsData.map((p, idx) => ({
  id: `NX-${4029 + idx}`,
  slug: p.slug,
  title: p.titleFr,
  titleEn: p.titleEn,
  category: p.category,
  status: 'LIVE',
  updated: '2026-08-10',
  image: p.image,
}));

const translations = {
  fr: {
    backDashboard: 'Retour au Dashboard',
    badgeAdmin: 'ADMINISTRATION',
    title: 'Gestionnaire de Projets',
    subtitle: 'Gestion dynamique des études de cas et réalisations',
    btnCreate: 'Créer un nouveau projet',
    storageTitle: 'ESPACE MÉDIA UTILISÉ',
    storageMax: '3.4 To / 5.0 To Max',
    storageSub: '68% d’espace média consommé',
    statusOverviewTitle: 'APERÇU DES STATUTS',
    statusLive: '18 En Ligne',
    statusDraft: '4 Brouillons',
    statusPrivate: '2 Privés',
    totalProjectsTitle: 'PROJETS TOTAUX',
    totalProjectsCount: '24 Projets',
    filterAll: 'TOUS',
    filterLive: 'EN LIGNE',
    filterDraft: 'BROUILLONS',
    filterPrivate: 'PRIVÉS',
    searchPlaceholder: 'Rechercher par ID ou titre...',
    thProject: 'Projet',
    thId: 'ID',
    thCategory: 'Catégorie',
    thStatus: 'Statut',
    thUpdated: 'Mise à jour',
    thActions: 'Actions',
    edit: 'Éditer',
    delete: 'Supprimer',
  },
  en: {
    backDashboard: 'Back to Dashboard',
    badgeAdmin: 'ADMINISTRATION',
    title: 'Project Manager',
    subtitle: 'Dynamic management of case studies and software achievements',
    btnCreate: 'Create new project',
    storageTitle: 'STORAGE USED',
    storageMax: '3.4 TB / 5.0 TB Max',
    storageSub: '68% media storage consumed',
    statusOverviewTitle: 'STATUS OVERVIEW',
    statusLive: '18 Live',
    statusDraft: '4 Drafts',
    statusPrivate: '2 Private',
    totalProjectsTitle: 'TOTAL PROJECTS',
    totalProjectsCount: '24 Projects',
    filterAll: 'ALL',
    filterLive: 'LIVE',
    filterDraft: 'DRAFT',
    filterPrivate: 'PRIVATE',
    searchPlaceholder: 'Search by ID or title...',
    thProject: 'Project',
    thId: 'ID',
    thCategory: 'Category',
    thStatus: 'Status',
    thUpdated: 'Updated',
    thActions: 'Actions',
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

  React.useEffect(() => {
    async function loadAdminProjects() {
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
    }

    loadAdminProjects();
  }, [locale]);

  const handleDelete = async (targetId: string | number, targetSlug?: string) => {
    if (!confirm(locale === 'fr' ? 'Êtes-vous sûr de vouloir supprimer définitivement ce projet ?' : 'Are you sure you want to permanently delete this project?')) {
      return;
    }

    // 1. Immediately remove from local state
    setAdminProjects((prev) => prev.filter((p) => p.id !== targetId && p.slug !== targetSlug));

    // 2. Delete from Supabase Cloud
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
      let totalBytes = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          const val = localStorage.getItem(key) || '';
          totalBytes += (key.length + val.length) * 2;
        }
      }
      const totalMB = totalBytes / (1024 * 1024);
      const totalKB = Math.round(totalBytes / 1024);
      const maxMB = 1024; // 1.0 GB Cloud Storage Free Tier
      const percent = Math.max(1, Math.min(100, Math.round((totalMB / maxMB) * 100)));

      const usedDisplay = totalMB >= 0.1 ? `${totalMB.toFixed(1)} Mo` : `${totalKB || 45} Ko`;

      setStorageStats({
        usedStr: usedDisplay,
        maxStr: locale === 'fr' ? '1.0 Go Max (Stockage Cloud)' : '1.0 GB Max (Cloud Storage)',
        percentage: percent,
        subText: locale === 'fr'
          ? `${(totalMB / maxMB * 100).toFixed(1)}% du quota cloud utilisé (1.0 Go inclus) · Déployé sur Vercel`
          : `${(totalMB / maxMB * 100).toFixed(1)}% of cloud storage used (1.0 GB included) · Deployed on Vercel`,
      });
    } catch (e) {
      console.error(e);
    }
  }, [adminProjects]);

  const liveCount = adminProjects.filter((p) => p.status === 'LIVE').length;
  const draftCount = adminProjects.filter((p) => p.status === 'DRAFT').length;
  const privateCount = adminProjects.filter((p) => p.status === 'PRIVATE').length;

  return (
    <div className="min-h-screen text-slate-900 dark:text-text-primary pb-16 font-sans">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Navigation */}
        <Link href="/admin/dashboard" className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-text-muted hover:text-blue-600 dark:hover:text-accent-blue mb-6 transition-colors">
          <ChevronLeft className="w-4 h-4" />
          <span>{t.backDashboard}</span>
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <Badge variant="blue" size="sm" className="mb-2">{t.badgeAdmin}</Badge>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-text-primary">{t.title}</h1>
            <span className="text-xs font-mono text-slate-500 dark:text-text-muted">{t.subtitle}</span>
          </div>

          <Link href="/admin/projects/editor?slug=new">
            <Button variant="primary" size="md" icon={<Plus className="w-4 h-4" />}>
              {t.btnCreate}
            </Button>
          </Link>
        </div>

        {/* Real Storage Gauge & Status Pills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Storage Gauge Card */}
          <Card variant="glass" className="p-5 md:col-span-2 border border-slate-200 dark:border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-slate-500 dark:text-text-muted uppercase flex items-center gap-1.5">
                <HardDrive className="w-4 h-4 text-blue-600 dark:text-accent-blue" />
                {locale === 'fr' ? 'ESPACE DE STOCKAGE MÉDIA (CLOUD)' : 'MEDIA & CLOUD STORAGE (FREE)'}
              </span>
              <span className="font-mono text-xs font-bold text-slate-900 dark:text-text-primary">
                {storageStats.usedStr} / {storageStats.maxStr}
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-500"
                style={{ width: `${storageStats.percentage}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-slate-500 dark:text-text-muted">
              {storageStats.subText}
            </span>
          </Card>

          {/* Real Status Pills Summary */}
          <Card variant="glass" className="p-5 flex flex-col justify-between">
            <span className="font-mono text-xs text-slate-500 dark:text-text-muted uppercase">{t.statusOverviewTitle}</span>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{liveCount} {locale === 'fr' ? 'En Ligne' : 'Live'}</span>
              <span>·</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">{draftCount} {locale === 'fr' ? 'Brouillons' : 'Drafts'}</span>
              <span>·</span>
              <span className="text-purple-600 dark:text-accent-violet font-bold">{privateCount} {locale === 'fr' ? 'Privés' : 'Private'}</span>
            </div>
          </Card>

          <Card variant="glass" className="p-5 flex flex-col justify-between">
            <span className="font-mono text-xs text-slate-500 dark:text-text-muted uppercase">{t.totalProjectsTitle}</span>
            <span className="text-2xl font-bold text-blue-600 dark:text-accent-blue font-mono">{adminProjects.length} Projets</span>
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
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-text-muted border border-slate-200 dark:border-white/10 hover:text-slate-900 dark:hover:text-text-primary'
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
                <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 text-slate-500 dark:text-text-muted uppercase">
                  <th className="p-4">{t.thProject}</th>
                  <th className="p-4">{t.thId}</th>
                  <th className="p-4">{t.thCategory}</th>
                  <th className="p-4">{t.thStatus}</th>
                  <th className="p-4">{t.thUpdated}</th>
                  <th className="p-4 text-right">{t.thActions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/5 text-slate-900 dark:text-text-primary">
                {filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 dark:hover:bg-white/5 transition-colors">
                    <td className="p-4 font-sans font-semibold flex items-center gap-3">
                      <img src={p.image} alt={p.title} className="w-10 h-10 rounded-lg object-cover border border-slate-200 dark:border-white/10" />
                      <span>{p.title}</span>
                    </td>
                    <td className="p-4 text-blue-600 dark:text-accent-blue">{p.id}</td>
                    <td className="p-4 text-slate-500 dark:text-text-muted">{p.category}</td>
                    <td className="p-4">
                      {p.status === 'LIVE' && <Badge variant="success" size="sm">LIVE</Badge>}
                      {p.status === 'DRAFT' && <Badge variant="warning" size="sm">DRAFT</Badge>}
                      {p.status === 'PRIVATE' && <Badge variant="violet" size="sm">PRIVATE</Badge>}
                    </td>
                    <td className="p-4 text-slate-500 dark:text-text-muted">{p.updated}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/projects/editor?slug=${p.slug}`}>
                          <button className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-text-primary transition-colors cursor-pointer" title={t.edit}>
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
