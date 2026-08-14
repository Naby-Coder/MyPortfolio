'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/components/language/LanguageContext';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input, TextArea } from '@/components/ui/Input';
import {
  Save,
  ChevronLeft,
  CheckCircle2,
  FileText,
  Sparkles,
  BarChart2,
  Clock,
  Eye,
  Send,
  Globe,
  UploadCloud,
  Image as ImageIcon,
  Trash2,
  Plus,
  ExternalLink,
  Tag,
  BookOpen,
} from 'lucide-react';
import { compressImage } from '@/lib/imageCompressor';

const translations = {
  fr: {
    back: 'Retour au Dashboard',
    autosaved: 'Toutes les modifications sont enregistrées',
    publishing: 'Publication de l’article...',
    savingDraft: 'Enregistrement en brouillon...',
    published: 'Article publié avec succès !',
    draftSaved: 'Brouillon enregistré !',
    unsaved: 'Modifications non enregistrées',
    publishBtn: 'PUBLIER L’ARTICLE',
    draftBtn: 'ENREGISTRER EN BROUILLON',
    newArticleBtn: 'Nouvel Article Vierge',
    viewLiveBtn: 'Voir l’article public',
    tabFr: 'Édition Français (FR)',
    tabEn: 'Édition Anglais (EN)',
    titleFrLabel: 'Titre de l’article (Français) *',
    titleEnLabel: 'Article Title (English) *',
    slugLabel: 'Slug URL (ex: mon-premier-article)',
    categoryLabel: 'Catégorie de l’article',
    coverTitle: 'IMAGE DE COUVERTURE DU BLOG',
    coverSub: 'Glissez une image HD ou collez une URL. Compression automatique WebP.',
    coverUrlPlaceholder: 'https://images.unsplash.com/... ou uploadez un fichier',
    uploadBtn: 'Importer une photo depuis l’appareil',
    excerptFrLabel: 'Extrait / Résumé pour les aperçus (Français)',
    excerptEnLabel: 'Excerpt / Summary for previews (English)',
    contentFrLabel: 'Contenu Markdown complet (Français)',
    contentEnLabel: 'Full Markdown Content (English)',
    words: 'mots',
    chars: 'caractères',
    readTime: 'Temps de lecture estimé',
    min: 'min',
    seoTitle: 'MÉTRIQUES DE PUBLICATION & SEO',
    statusBadge: 'STATUT :',
  },
  en: {
    back: 'Back to Dashboard',
    autosaved: 'All changes saved',
    publishing: 'Publishing article...',
    savingDraft: 'Saving draft...',
    published: 'Article published successfully!',
    draftSaved: 'Draft saved!',
    unsaved: 'Unsaved changes',
    publishBtn: 'PUBLISH ARTICLE',
    draftBtn: 'SAVE AS DRAFT',
    newArticleBtn: 'New Blank Article',
    viewLiveBtn: 'View Public Article',
    tabFr: 'French Edition (FR)',
    tabEn: 'English Edition (EN)',
    titleFrLabel: 'Article Title (French) *',
    titleEnLabel: 'Article Title (English) *',
    slugLabel: 'URL Slug (e.g. my-first-article)',
    categoryLabel: 'Article Category',
    coverTitle: 'BLOG COVER IMAGE',
    coverSub: 'Drop an HD image or paste a URL. Auto WebP compression enabled.',
    coverUrlPlaceholder: 'https://images.unsplash.com/... or upload a file',
    uploadBtn: 'Upload from device',
    excerptFrLabel: 'Excerpt / Summary for previews (French)',
    excerptEnLabel: 'Excerpt / Summary for previews (English)',
    contentFrLabel: 'Full Markdown Content (French)',
    contentEnLabel: 'Full Markdown Content (English)',
    words: 'words',
    chars: 'characters',
    readTime: 'Estimated read time',
    min: 'min',
    seoTitle: 'PUBLICATION & SEO METRICS',
    statusBadge: 'STATUS:',
  },
};

import { blogArticles } from '@/data/blogData';

const CATEGORIES = [
  'Développement Full-Stack',
  'Sécurité & Réseaux',
  'Mobile & Flutter',
  'Design UI/UX',
  'CMS & WordPress',
  'DevOps & Cloud',
];

function BlogEditorInner() {
  const { locale } = useLanguage();
  const t = translations[locale];
  const searchParams = useSearchParams();
  const querySlug = searchParams?.get('slug');

  const [activeLangTab, setActiveLangTab] = useState<'fr' | 'en'>('fr');
  const [saveStatus, setSaveStatus] = useState(t.autosaved);
  const [articleStatus, setArticleStatus] = useState<'LIVE' | 'DRAFT'>('LIVE');

  // Fields
  const [titleFr, setTitleFr] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);

  const [coverImage, setCoverImage] = useState(
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
  );

  const [excerptFr, setExcerptFr] = useState('');
  const [excerptEn, setExcerptEn] = useState('');

  const [contentFr, setContentFr] = useState('# 01. Introduction\n\nÉcrivez votre article ici...');
  const [contentEn, setContentEn] = useState('# 01. Introduction\n\nWrite your article here...');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load existing article if slug query param exists
  useEffect(() => {
    if (!querySlug || querySlug === 'new') {
      handleResetBlank();
      return;
    }

    async function loadArticle() {
      try {
        const res = await fetch(`/api/articles?slug=${encodeURIComponent(querySlug!)}`, { cache: 'no-store' });
        const json = await res.json();
        let found = null;
        if (json?.success && Array.isArray(json.data) && json.data.length > 0) {
          found = json.data[0];
        }

        if (found) {
          setTitleFr(found.title_fr || found.title || '');
          setTitleEn(found.title_en || found.title || '');
          setSlug(found.slug || querySlug!);
          setCategory(found.category || CATEGORIES[0]);
          setCoverImage(found.cover_image || found.image || coverImage);
          setExcerptFr(found.excerpt_fr || found.excerpt || '');
          setExcerptEn(found.excerpt_en || found.excerpt || '');
          setContentFr(found.content_fr || found.content || '');
          setContentEn(found.content_en || found.content || '');
          setArticleStatus(found.is_published ? 'LIVE' : 'DRAFT');
        }
      } catch (e) {
        console.error('Error loading article in editor:', e);
      }
    }

    loadArticle();
  }, [querySlug]);

  const currentContent = activeLangTab === 'fr' ? contentFr : contentEn;
  const wordCount = currentContent.trim().split(/\s+/).filter(Boolean).length;
  const charCount = currentContent.length;
  const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 180));

  const handleResetBlank = () => {
    setTitleFr('');
    setTitleEn('');
    setSlug('');
    setExcerptFr('');
    setExcerptEn('');
    setContentFr('# Titre de section\n\nÉcrivez votre contenu markdown ici...');
    setContentEn('# Section Title\n\nWrite your markdown content here...');
    setCoverImage('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80');
    setArticleStatus('DRAFT');
    setSaveStatus(t.unsaved);
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();
      if (json?.success && json.url && !json.url.startsWith('data:')) {
        setCoverImage(json.url);
      } else {
        setCoverImage('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80');
      }
      setSaveStatus(t.unsaved);
    } catch (err) {
      console.error('Error uploading cover image:', err);
    }
  };

  const handleSaveArticle = async (targetStatus: 'LIVE' | 'DRAFT') => {
    setArticleStatus(targetStatus);
    setSaveStatus(targetStatus === 'LIVE' ? t.publishing : t.savingDraft);

    const generatedSlug = slug.trim() || titleFr.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `article-${Date.now()}`;

    const articlePayload = {
      slug: generatedSlug,
      title_fr: titleFr || 'Nouvel Article',
      title_en: titleEn || titleFr || 'New Article',
      category,
      excerpt_fr: excerptFr,
      excerpt_en: excerptEn || excerptFr,
      content_fr: contentFr,
      content_en: contentEn || contentFr,
      cover_image: coverImage,
      reading_time: estimatedReadTime,
      is_published: targetStatus === 'LIVE',
      published_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ article: articlePayload }),
      });
      const json = await res.json();
      if (!json.success) {
        alert(json.message || 'Erreur lors de l’enregistrement de l’article');
        setSaveStatus(t.unsaved);
        return;
      }
      setSlug(generatedSlug);
      setSaveStatus(targetStatus === 'LIVE' ? t.published : t.draftSaved);
      setTimeout(() => setSaveStatus(t.autosaved), 3000);
    } catch (e) {
      console.error('Failed to save article via API:', e);
      alert('Erreur de connexion lors de la sauvegarde cloud');
      setSaveStatus(t.unsaved);
    }
  };

  return (
    <div className="min-h-screen text-slate-900 dark:text-white pb-24 font-sans">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200 dark:border-white/10">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{t.back}</span>
          </Link>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={`text-xs font-mono flex items-center gap-1.5 mr-2 ${
                saveStatus === t.autosaved || saveStatus === t.published || saveStatus === t.draftSaved
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-amber-600 dark:text-amber-400'
              }`}
            >
              {(saveStatus === t.autosaved || saveStatus === t.published || saveStatus === t.draftSaved) && (
                <CheckCircle2 className="w-3.5 h-3.5" />
              )}
              {saveStatus}
            </span>

            <Button variant="outlined" size="sm" icon={<Plus className="w-4 h-4" />} onClick={handleResetBlank}>
              {t.newArticleBtn}
            </Button>

            {slug && (
              <Link href={`/blog/${slug}`} target="_blank">
                <Button variant="glass" size="sm" icon={<Eye className="w-4 h-4" />}>
                  {t.viewLiveBtn}
                </Button>
              </Link>
            )}

            <Button
              variant="glass"
              size="sm"
              icon={<Save className="w-4 h-4 text-amber-500" />}
              onClick={() => handleSaveArticle('DRAFT')}
            >
              {t.draftBtn}
            </Button>

            <Button
              variant="primary"
              size="sm"
              icon={<Send className="w-4 h-4" />}
              onClick={() => handleSaveArticle('LIVE')}
            >
              {t.publishBtn}
            </Button>
          </div>
        </div>

        {/* Title Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-slate-50 dark:bg-zinc-900/60 p-5 rounded-2xl border border-slate-200 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="blue">ÉDITEUR BLOG</Badge>
              {articleStatus === 'LIVE' ? (
                <Badge variant="success">EN LIGNE (PUBLIÉ)</Badge>
              ) : (
                <Badge variant="warning">BROUILLON</Badge>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {titleFr || (locale === 'fr' ? 'Nouvel Article de Blog' : 'New Blog Article')}
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono bg-white dark:bg-zinc-950 p-2 rounded-xl border border-slate-200 dark:border-white/10">
            <Clock className="w-4 h-4 text-blue-500" />
            <span>
              ~{estimatedReadTime} {t.min} · {wordCount} {t.words}
            </span>
          </div>
        </div>

        {/* Main Grid: Editor & Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Markdown & Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Bilingual Tabs */}
            <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-zinc-900 rounded-xl w-fit border border-slate-200 dark:border-white/10">
              <button
                type="button"
                onClick={() => setActiveLangTab('fr')}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeLangTab === 'fr'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                🇫🇷 {t.tabFr}
              </button>
              <button
                type="button"
                onClick={() => setActiveLangTab('en')}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeLangTab === 'en'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                🇬🇧 {t.tabEn}
              </button>
            </div>

            {/* FR Tab Content */}
            {activeLangTab === 'fr' ? (
              <Card variant="glass" className="p-6 space-y-5 border border-slate-200 dark:border-white/10">
                <Input
                  label={t.titleFrLabel}
                  value={titleFr}
                  onChange={(e) => {
                    setTitleFr(e.target.value);
                    setSaveStatus(t.unsaved);
                    if (!slug || slug.startsWith('nouvel') || slug.startsWith('article-')) {
                      setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
                    }
                  }}
                  placeholder="ex: Architecturer une application SaaS avec Next.js 15"
                />

                <TextArea
                  label={t.excerptFrLabel}
                  rows={2}
                  value={excerptFr}
                  onChange={(e) => {
                    setExcerptFr(e.target.value);
                    setSaveStatus(t.unsaved);
                  }}
                  placeholder="Court résumé introductif qui donne envie de lire l'article..."
                />

                <TextArea
                  label={t.contentFrLabel}
                  rows={14}
                  value={contentFr}
                  onChange={(e) => {
                    setContentFr(e.target.value);
                    setSaveStatus(t.unsaved);
                  }}
                  placeholder="# 01. Introduction&#10;&#10;Votre contenu en Markdown..."
                />
              </Card>
            ) : (
              /* EN Tab Content */
              <Card variant="glass" className="p-6 space-y-5 border border-slate-200 dark:border-white/10">
                <Input
                  label={t.titleEnLabel}
                  value={titleEn}
                  onChange={(e) => {
                    setTitleEn(e.target.value);
                    setSaveStatus(t.unsaved);
                  }}
                  placeholder="e.g. Architecting a SaaS Application with Next.js 15"
                />

                <TextArea
                  label={t.excerptEnLabel}
                  rows={2}
                  value={excerptEn}
                  onChange={(e) => {
                    setExcerptEn(e.target.value);
                    setSaveStatus(t.unsaved);
                  }}
                  placeholder="Short introductory summary for English readers..."
                />

                <TextArea
                  label={t.contentEnLabel}
                  rows={14}
                  value={contentEn}
                  onChange={(e) => {
                    setContentEn(e.target.value);
                    setSaveStatus(t.unsaved);
                  }}
                  placeholder="# 01. Introduction&#10;&#10;Your markdown content in English..."
                />
              </Card>
            )}
          </div>

          {/* Right Column: Meta, Cover Image & SEO */}
          <div className="lg:col-span-4 space-y-6">
            {/* Cover Image Uploader */}
            <Card variant="glass" className="p-5 border border-slate-200 dark:border-white/10">
              <span className="font-mono text-xs text-purple-600 dark:text-purple-400 font-bold block mb-1">
                {t.coverTitle}
              </span>
              <p className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 mb-3">{t.coverSub}</p>

              {coverImage ? (
                <div className="relative rounded-xl overflow-hidden mb-3 border border-slate-200 dark:border-white/10 group">
                  <img src={coverImage} alt="Cover preview" className="w-full h-40 object-cover" />
                  <button
                    type="button"
                    onClick={() => setCoverImage('')}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    title="Supprimer l'image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : null}

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleCoverUpload}
              />

              <div className="flex flex-col gap-2">
                <Button
                  variant="glass"
                  size="sm"
                  icon={<UploadCloud className="w-4 h-4 text-blue-500" />}
                  className="w-full justify-center"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {t.uploadBtn}
                </Button>

                <Input
                  placeholder={t.coverUrlPlaceholder}
                  value={coverImage}
                  onChange={(e) => {
                    setCoverImage(e.target.value);
                    setSaveStatus(t.unsaved);
                  }}
                />
              </div>
            </Card>

            {/* Publication Settings */}
            <Card variant="glass" className="p-5 space-y-4 border border-slate-200 dark:border-white/10">
              <span className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold block">
                PARAMÈTRES & TAXONOMIE
              </span>

              {/* Slug */}
              <Input
                label={t.slugLabel}
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setSaveStatus(t.unsaved);
                }}
              />

              {/* Category */}
              <div>
                <label className="text-xs font-mono text-slate-500 dark:text-zinc-400 block mb-1.5">
                  {t.categoryLabel}
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setSaveStatus(t.unsaved);
                  }}
                  className="w-full bg-white dark:bg-zinc-900 border border-slate-300 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </Card>

            {/* Live Metrics Card */}
            <Card variant="glass" className="p-5 border border-slate-200 dark:border-white/10">
              <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold block mb-3">
                {t.seoTitle}
              </span>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-white/5">
                  <span className="text-slate-600 dark:text-zinc-400">Longueur :</span>
                  <span className="font-bold text-slate-900 dark:text-white">{wordCount} mots</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-white/5">
                  <span className="text-slate-600 dark:text-zinc-400">Temps lecture :</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">~{estimatedReadTime} min</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-white/5">
                  <span className="text-slate-600 dark:text-zinc-400">Statut :</span>
                  <span className={`font-bold ${articleStatus === 'LIVE' ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {articleStatus}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogEditorPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm font-mono">Chargement de l’éditeur...</div>}>
      <BlogEditorInner />
    </Suspense>
  );
}
