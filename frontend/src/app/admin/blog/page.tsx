'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/language/LanguageContext';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import {
  BookOpen,
  Plus,
  Search,
  Edit,
  Eye,
  Trash2,
  ChevronLeft,
  FileText,
  Clock,
  Sparkles,
} from 'lucide-react';
import { blogArticles, BlogArticleData } from '@/data/blogData';

const translations = {
  fr: {
    backDashboard: 'Retour au Dashboard',
    badgeAdmin: 'ADMINISTRATION & RÉDACTION',
    title: 'Gestionnaire de Blog',
    subtitle: 'Gestion dynamique, rédaction et publication de vos articles techniques',
    btnCreate: 'Créer un nouvel article',
    totalArticlesTitle: 'ARTICLES TOTAUX',
    totalArticlesCount: 'articles rédigés',
    statusLive: 'En Ligne',
    statusDraft: 'Brouillons',
    filterAll: 'TOUS',
    filterLive: 'EN LIGNE',
    filterDraft: 'BROUILLONS',
    searchPlaceholder: 'Rechercher un article par titre, slug ou catégorie...',
    thArticle: 'Article & Extrait',
    thCategory: 'Catégorie',
    thReadingTime: 'Lecture',
    thStatus: 'Statut',
    thDate: 'Date',
    thActions: 'Actions',
    edit: 'Modifier',
    delete: 'Supprimer',
    viewLive: 'Voir l’article public',
    confirmDelete: 'Êtes-vous sûr de vouloir supprimer cet article du blog ?',
    emptyState: 'Aucun article trouvé avec ces critères de recherche.',
  },
  en: {
    backDashboard: 'Back to Dashboard',
    badgeAdmin: 'ADMINISTRATION & EDITORIAL',
    title: 'Blog Manager',
    subtitle: 'Dynamic creation, editing and publication of your technical deep-dives',
    btnCreate: 'Create new article',
    totalArticlesTitle: 'TOTAL ARTICLES',
    totalArticlesCount: 'published articles',
    statusLive: 'Live',
    statusDraft: 'Drafts',
    filterAll: 'ALL',
    filterLive: 'LIVE',
    filterDraft: 'DRAFTS',
    searchPlaceholder: 'Search articles by title, slug or category...',
    thArticle: 'Article & Excerpt',
    thCategory: 'Category',
    thReadingTime: 'Read Time',
    thStatus: 'Status',
    thDate: 'Date',
    thActions: 'Actions',
    edit: 'Edit',
    delete: 'Delete',
    viewLive: 'View public article',
    confirmDelete: 'Are you sure you want to delete this blog article?',
    emptyState: 'No articles found matching your search criteria.',
  },
};

interface AdminArticleItem {
  id: string | number;
  slug: string;
  title: string;
  titleEn: string;
  category: string;
  excerpt: string;
  excerptEn: string;
  status: 'LIVE' | 'DRAFT';
  date: string;
  readingTime: number;
  image: string;
}

export default function BlogManagerPage() {
  const { locale } = useLanguage();
  const t = translations[locale];

  const [statusFilter, setStatusFilter] = useState<'ALL' | 'LIVE' | 'DRAFT'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState<AdminArticleItem[]>([]);

  const defaultAdminArticles: AdminArticleItem[] = blogArticles.map((b) => ({
    id: b.id,
    slug: b.slug,
    title: b.titleFr,
    titleEn: b.titleEn,
    category: b.categoryFr,
    excerpt: b.excerptFr,
    excerptEn: b.excerptEn,
    status: 'LIVE',
    date: b.dateFr,
    readingTime: b.readingTime,
    image: b.image,
  }));

  const loadArticles = () => {
    try {
      const stored = localStorage.getItem('myfolio_articles');
      let customList: AdminArticleItem[] = [];
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          customList = parsed.map((a: any) => ({
            id: a.id || a.slug,
            slug: a.slug,
            title: a.title_fr || a.title || 'Sans titre',
            titleEn: a.title_en || a.title || 'Untitled',
            category: a.category || 'Développement Full-Stack',
            excerpt: a.excerpt_fr || a.excerpt || '',
            excerptEn: a.excerpt_en || a.excerpt || '',
            status: a.is_published ? 'LIVE' : 'DRAFT',
            date: a.published_at || (locale === 'fr' ? 'Août 2026' : 'August 2026'),
            readingTime: a.reading_time || 5,
            image: a.cover_image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
          }));
        }
      }

      const combined = [
        ...customList,
        ...defaultAdminArticles.filter((d) => !customList.some((c) => c.slug === d.slug)),
      ];

      setArticles(combined);
    } catch (e) {
      console.error('Error loading articles in blog manager:', e);
      setArticles(defaultAdminArticles);
    }
  };

  useEffect(() => {
    loadArticles();
    window.addEventListener('myfolio_articles_updated', loadArticles);
    return () => window.removeEventListener('myfolio_articles_updated', loadArticles);
  }, [locale]);

  const handleDelete = (slugToDelete: string) => {
    if (!confirm(t.confirmDelete)) return;

    try {
      const stored = localStorage.getItem('myfolio_articles');
      const parsed = stored ? JSON.parse(stored) : [];
      const updated = parsed.filter((a: any) => a.slug !== slugToDelete);
      localStorage.setItem('myfolio_articles', JSON.stringify(updated));
      window.dispatchEvent(new Event('myfolio_articles_updated'));
      setArticles((prev) => prev.filter((a) => a.slug !== slugToDelete));
    } catch (e) {
      console.error('Error deleting article:', e);
    }
  };

  const filteredArticles = articles.filter((art) => {
    const titleMatch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase());
    const statusMatch = statusFilter === 'ALL' || art.status === statusFilter;
    return titleMatch && statusMatch;
  });

  const liveCount = articles.filter((a) => a.status === 'LIVE').length;
  const draftCount = articles.filter((a) => a.status === 'DRAFT').length;

  return (
    <div className="min-h-screen text-slate-900 dark:text-white pb-20 font-sans">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Navigation */}
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{t.backDashboard}</span>
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <Badge variant="blue" size="sm" className="mb-2">
              {t.badgeAdmin}
            </Badge>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              {t.title}
            </h1>
            <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">{t.subtitle}</span>
          </div>

          <Link href="/admin/blog/editor?slug=new">
            <Button variant="primary" size="md" icon={<Plus className="w-4 h-4" />}>
              {t.btnCreate}
            </Button>
          </Link>
        </div>

        {/* Overview Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card variant="glass" className="p-6 flex items-center justify-between border-l-4 border-blue-600">
            <div>
              <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 block mb-1 uppercase">
                {t.totalArticlesTitle}
              </span>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                {articles.length} {t.totalArticlesCount}
              </span>
            </div>
            <FileText className="w-8 h-8 text-blue-600/60 dark:text-blue-400/60" />
          </Card>

          <Card variant="glass" className="p-6 flex items-center justify-between border-l-4 border-emerald-500">
            <div>
              <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 block mb-1 uppercase">
                {locale === 'fr' ? 'ARTICLES EN LIGNE' : 'LIVE ARTICLES'}
              </span>
              <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {liveCount} {t.statusLive}
              </span>
            </div>
            <Sparkles className="w-8 h-8 text-emerald-500/60" />
          </Card>

          <Card variant="glass" className="p-6 flex items-center justify-between border-l-4 border-amber-500">
            <div>
              <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 block mb-1 uppercase">
                {locale === 'fr' ? 'BROUILLONS' : 'DRAFTS'}
              </span>
              <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                {draftCount} {t.statusDraft}
              </span>
            </div>
            <Clock className="w-8 h-8 text-amber-500/60" />
          </Card>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-zinc-900/90 p-1 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-mono">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                statusFilter === 'ALL'
                  ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white font-bold shadow-xs'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.filterAll} ({articles.length})
            </button>
            <button
              onClick={() => setStatusFilter('LIVE')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                statusFilter === 'LIVE'
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.filterLive} ({liveCount})
            </button>
            <button
              onClick={() => setStatusFilter('DRAFT')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                statusFilter === 'DRAFT'
                  ? 'bg-amber-500 text-white font-bold shadow-xs'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.filterDraft} ({draftCount})
            </button>
          </div>

          <div className="w-full sm:w-80">
            <Input
              isSearch
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Articles Table Card */}
        <Card variant="glass" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-zinc-900/80 border-b border-slate-200 dark:border-white/10 text-slate-500 dark:text-zinc-400">
                  <th className="py-3 px-4 font-semibold">{t.thArticle}</th>
                  <th className="py-3 px-4 font-semibold">{t.thCategory}</th>
                  <th className="py-3 px-4 font-semibold">{t.thReadingTime}</th>
                  <th className="py-3 px-4 font-semibold">{t.thStatus}</th>
                  <th className="py-3 px-4 font-semibold">{t.thDate}</th>
                  <th className="py-3 px-4 font-semibold text-right">{t.thActions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/10">
                {filteredArticles.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500 dark:text-zinc-400 text-sm">
                      {t.emptyState}
                    </td>
                  </tr>
                ) : (
                  filteredArticles.map((art) => (
                    <tr
                      key={art.slug}
                      className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors group"
                    >
                      {/* Title & Preview */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={art.image}
                            alt={art.title}
                            className="w-12 h-12 rounded-lg object-cover border border-slate-200 dark:border-white/10 flex-shrink-0"
                          />
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white text-sm font-sans block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {locale === 'fr' ? art.title : art.titleEn}
                            </span>
                            <span className="text-[11px] text-slate-500 dark:text-zinc-400 line-clamp-1 max-w-md">
                              {locale === 'fr' ? art.excerpt : art.excerptEn}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4">
                        <Badge variant="blue" size="sm">
                          {art.category}
                        </Badge>
                      </td>

                      {/* Reading Time */}
                      <td className="py-3.5 px-4 text-slate-600 dark:text-zinc-300">
                        {art.readingTime} min
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <Badge variant={art.status === 'LIVE' ? 'success' : 'warning'} size="sm">
                          {art.status === 'LIVE' ? 'EN LIGNE' : 'BROUILLON'}
                        </Badge>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 text-slate-500 dark:text-zinc-400">
                        {art.date}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link href={`/blog/${art.slug}`} target="_blank">
                            <button
                              type="button"
                              title={t.viewLive}
                              className="p-1.5 rounded-lg text-slate-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors cursor-pointer"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </Link>

                          <Link href={`/admin/blog/editor?slug=${art.slug}`}>
                            <button
                              type="button"
                              title={t.edit}
                              className="p-1.5 rounded-lg text-slate-500 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-colors cursor-pointer"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          </Link>

                          <button
                            type="button"
                            title={t.delete}
                            onClick={() => handleDelete(art.slug)}
                            className="p-1.5 rounded-lg text-slate-500 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
