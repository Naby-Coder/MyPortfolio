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
  Trash2,
  UploadCloud,
  ChevronLeft,
  CheckCircle2,
  FileCode,
  Image as ImageIcon,
  Sparkles,
  Star,
  Film,
  X,
  Globe,
  FileEdit,
  Eye,
  Lock,
  Layers,
  Server,
  Database,
  Layout,
  BarChart3,
} from 'lucide-react';
import { projectsData } from '@/data/projectsData';
import { compressImage } from '@/lib/imageCompressor';

interface MediaItem {
  id: string;
  url: string;
  name: string;
  isHero: boolean;
  type: 'image' | 'video';
  caption_fr?: string;
  caption_en?: string;
}

const translations = {
  fr: {
    back: 'Retour aux projets',
    discard: 'Annuler les modifications',
    saveDraft: 'ENREGISTRER BROUILLON',
    publish: 'PUBLIER EN LIGNE',
    publishing: 'Publication en cours...',
    savingDraft: 'Enregistrement...',
    published: 'Publié et en ligne !',
    draftSaved: 'Enregistré comme Brouillon !',
    saved: 'Toutes les modifications sont enregistrées',
    unsaved: 'Modifications non enregistrées',
    badgeId: 'ID: NX-4029',
    statusLabel: 'STATUT ACTUEL :',
    editorTitle: 'Éditeur de Projet (Bilingue FR / EN)',
    jumpTitle: 'ALLER À :',
    jump1: '01. Infos Générales',
    jump2: '02. Gestion Médias',
    jump3: '03. Spécifications Tech',
    jump4: '04. Étude de Cas Détaillée',
    jump5: '05. Architecture Tech',
    jump6: '06. Métriques & Résultats',
    sec1Title: '01. INFORMATIONS GÉNÉRALES & TRADUCTIONS',
    labelTitleFr: 'Titre du projet (Français) *',
    labelTitleEn: 'Project Title (English) *',
    labelSlug: 'Slug URL (Lien permanent)',
    labelCategory: 'Catégorie du projet (ex: Web / SaaS, Mobile App, Branding)',
    labelTimelineFr: 'Durée / Timeline (Français - ex: Sprint 4 Mois, 3 Semaines)',
    labelTimelineEn: 'Timeline (English - e.g., 4 Months Sprint, 3 Weeks)',
    labelStatusTextFr: 'Libellé du Statut (Français - ex: Produit en Ligne, En Développement)',
    labelStatusTextEn: 'Status Text (English - e.g., Live Product, In Development)',
    labelSummaryFr: 'Résumé du projet (Français)',
    labelSummaryEn: 'Project Summary (English)',
    sec2Title: '02. GESTION MÉDIAS & IMAGE HERO',
    mediaCount: 'média(s) importé(s)',
    dropText: 'Cliquez ou glissez-déposez vos fichiers ici',
    dropSub: 'Compression automatique WebP/JPEG optimisée',
    browseBtn: 'Parcourir les fichiers...',
    heroBtn: 'Définir comme Hero Image',
    heroBadge: 'HERO IMAGE',
    sec3Title: '03. ÉCOSYSTÈME TECHNIQUE & LIENS',
    labelTech: 'Technologies utilisées (séparées par des virgules)',
    labelDemoUrl: 'URL de Démo En Ligne',
    labelGithubUrl: 'URL Dépôt GitHub',
    sec4Title: '04. ÉTUDE DE CAS DÉTAILLÉE (FR / EN)',
    labelProblemFr: 'Problème & Contexte (Français)',
    labelProblemEn: 'Problem & Background (English)',
    labelSolutionFr: 'Solution & Architecture (Français)',
    labelSolutionEn: 'Solution & Architecture (English)',
    labelRoleFr: 'Votre Rôle & Responsabilités (Français)',
    labelRoleEn: 'Your Role & Responsibilities (English)',
    labelFeaturesFr: 'Fonctionnalités Clés (Français - une par ligne)',
    labelFeaturesEn: 'Key Features (English - one per line)',
    sec5Title: '05. ARCHITECTURE TECHNIQUE & PIPELINE DE DONNÉES',
    labelClientTitle: 'Couche Client - Titre (ex: Next.js 15 App Router, Flutter)',
    labelClientSub: 'Couche Client - Sous-titre (ex: TypeScript · Tailwind · State)',
    labelBackendTitle: 'Couche Backend - Titre (ex: Laravel REST API, Node.js)',
    labelBackendSub: 'Couche Backend - Sous-titre (ex: Eloquent · Sanctum · Redis)',
    labelDatabaseTitle: 'Couche Base de données - Titre (ex: Supabase, MySQL 8.0)',
    labelDatabaseSub: 'Couche Base de données - Sous-titre (ex: PostgreSQL · RLS)',
    sec6Title: '06. IMPACT, MÉTRIQUES & RÉSULTATS (OPTIONNEL)',
    metric1Title: 'Métrique 1 (Bleu)',
    metric2Title: 'Métrique 2 (Violet)',
    metric3Title: 'Métrique 3 (Émeraude)',
    labelMetricVal: 'Chiffre Clé (ex: +150%, 98%, 1.2M, <200ms)',
    labelMetricLabelFr: 'Description (Français)',
    labelMetricLabelEn: 'Description (English)',
  },
  en: {
    back: 'Back to Project Manager',
    discard: 'Discard',
    saveDraft: 'SAVE AS DRAFT',
    publish: 'PUBLISH LIVE',
    publishing: 'Publishing live...',
    savingDraft: 'Saving draft...',
    published: 'Published & Live!',
    draftSaved: 'Saved as Draft!',
    saved: 'All changes saved',
    unsaved: 'Unsaved changes',
    badgeId: 'ID: NX-4029',
    statusLabel: 'CURRENT STATUS:',
    editorTitle: 'Project Editor (Bilingual FR / EN)',
    jumpTitle: 'JUMP TO:',
    jump1: '01. General Info',
    jump2: '02. Media Upload',
    jump3: '03. Tech Specs',
    jump4: '04. Case Study Details',
    jump5: '05. Tech Architecture',
    jump6: '06. Metrics & Results',
    sec1Title: '01. GENERAL INFORMATION & TRANSLATIONS',
    labelTitleFr: 'Project Title (French) *',
    labelTitleEn: 'Project Title (English) *',
    labelSlug: 'URL Slug (Permanent link)',
    labelCategory: 'Project Category (e.g., Web / SaaS, Mobile App, Branding)',
    labelTimelineFr: 'Timeline (French - e.g., Sprint 4 Mois, 3 Semaines)',
    labelTimelineEn: 'Timeline (English - e.g., 4 Months Sprint, 3 Weeks)',
    labelStatusTextFr: 'Status Text (French - e.g., Produit en Ligne, En Développement)',
    labelStatusTextEn: 'Status Text (English - e.g., Live Product, In Development)',
    labelSummaryFr: 'Project Summary (French)',
    labelSummaryEn: 'Project Summary (English)',
    sec2Title: '02. MEDIA MANAGEMENT & HERO IMAGE',
    mediaCount: 'media uploaded',
    dropText: 'Click or drag & drop files here',
    dropSub: 'Automatic WebP/JPEG compression enabled',
    browseBtn: 'Browse files...',
    heroBtn: 'Set as Hero Image',
    heroBadge: 'HERO IMAGE',
    sec3Title: '03. TECH SPECS & LINKS',
    labelTech: 'Technologies used (comma separated)',
    labelDemoUrl: 'Live Demo URL',
    labelGithubUrl: 'GitHub Repository URL',
    sec4Title: '04. DETAILED CASE STUDY (FR / EN)',
    labelProblemFr: 'Problem & Context (French)',
    labelProblemEn: 'Problem & Context (English)',
    labelSolutionFr: 'Solution & Architecture (French)',
    labelSolutionEn: 'Solution & Architecture (English)',
    labelRoleFr: 'Your Role & Responsibilities (French)',
    labelRoleEn: 'Your Role & Responsibilities (English)',
    labelFeaturesFr: 'Key Features (French - one per line)',
    labelFeaturesEn: 'Key Features (English - one per line)',
    sec5Title: '05. TECHNICAL ARCHITECTURE & DATA PIPELINE',
    labelClientTitle: 'Client Layer - Title (e.g., Next.js 15 App Router, Flutter)',
    labelClientSub: 'Client Layer - Subtitle (e.g., TypeScript · Tailwind · State)',
    labelBackendTitle: 'Backend Layer - Title (e.g., Laravel REST API, Node.js)',
    labelBackendSub: 'Backend Layer - Subtitle (e.g., Eloquent · Sanctum · Redis)',
    labelDatabaseTitle: 'Database Layer - Title (e.g., Supabase, MySQL 8.0)',
    labelDatabaseSub: 'Database Layer - Subtitle (e.g., PostgreSQL · RLS Security)',
    sec6Title: '06. IMPACT, METRICS & MEASURABLE OUTCOMES (OPTIONAL)',
    metric1Title: 'Metric 1 (Blue)',
    metric2Title: 'Metric 2 (Purple)',
    metric3Title: 'Metric 3 (Emerald)',
    labelMetricVal: 'Key Figure (e.g., +150%, 98%, 1.2M, <200ms)',
    labelMetricLabelFr: 'Metric Description (French)',
    labelMetricLabelEn: 'Metric Description (English)',
  },
};

function ProjectEditorInner() {
  const { locale } = useLanguage();
  const t = translations[locale];
  const searchParams = useSearchParams();
  const querySlug = searchParams?.get('slug');
  const isNewProject = !querySlug || querySlug === 'new';

  const [saveStatus, setSaveStatus] = useState(t.saved);
  const [projectStatus, setProjectStatus] = useState<'LIVE' | 'DRAFT' | 'PRIVATE'>('LIVE');

  // FR & EN Project Fields
  const [titleFr, setTitleFr] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [slug, setSlug] = useState('');

  const [summaryFr, setSummaryFr] = useState('');
  const [summaryEn, setSummaryEn] = useState('');

  const [problemFr, setProblemFr] = useState('');
  const [problemEn, setProblemEn] = useState('');

  const [solutionFr, setSolutionFr] = useState('');
  const [solutionEn, setSolutionEn] = useState('');

  const [roleFr, setRoleFr] = useState('');
  const [roleEn, setRoleEn] = useState('');

  const [featuresFr, setFeaturesFr] = useState('');
  const [featuresEn, setFeaturesEn] = useState('');

  // Technical Architecture Pipeline
  const [archClientTitle, setArchClientTitle] = useState('');
  const [archClientSub, setArchClientSub] = useState('');
  const [archBackendTitle, setArchBackendTitle] = useState('');
  const [archBackendSub, setArchBackendSub] = useState('');
  const [archDatabaseTitle, setArchDatabaseTitle] = useState('');
  const [archDatabaseSub, setArchDatabaseSub] = useState('');

  // Measurable Impact & Metrics
  const [metric1Val, setMetric1Val] = useState('');
  const [metric1LabelFr, setMetric1LabelFr] = useState('');
  const [metric1LabelEn, setMetric1LabelEn] = useState('');

  const [metric2Val, setMetric2Val] = useState('');
  const [metric2LabelFr, setMetric2LabelFr] = useState('');
  const [metric2LabelEn, setMetric2LabelEn] = useState('');

  const [metric3Val, setMetric3Val] = useState('');
  const [metric3LabelFr, setMetric3LabelFr] = useState('');
  const [metric3LabelEn, setMetric3LabelEn] = useState('');

  // Overview Bar Info: Category, Timeline, Status Text
  const [category, setCategory] = useState('Web / SaaS');
  const [timelineFr, setTimelineFr] = useState('');
  const [timelineEn, setTimelineEn] = useState('');
  const [statusTextFr, setStatusTextFr] = useState('Produit en Ligne');
  const [statusTextEn, setStatusTextEn] = useState('Live Product');

  const [technologies, setTechnologies] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [uploadedMedia, setUploadedMedia] = useState<MediaItem[]>([]);

  useEffect(() => {
    if (!querySlug || querySlug === 'new') {
      setTitleFr('');
      setTitleEn('');
      setSlug('');
      setSummaryFr('');
      setSummaryEn('');
      setProblemFr('');
      setProblemEn('');
      setSolutionFr('');
      setSolutionEn('');
      setRoleFr('');
      setRoleEn('');
      setFeaturesFr('');
      setFeaturesEn('');
      setTechnologies('');
      setCategory('Web / SaaS');
      setTimelineFr('');
      setTimelineEn('');
      setStatusTextFr('Produit en Ligne');
      setStatusTextEn('Live Product');
      setArchClientTitle('');
      setArchClientSub('');
      setArchBackendTitle('');
      setArchBackendSub('');
      setArchDatabaseTitle('');
      setArchDatabaseSub('');
      setMetric1Val('');
      setMetric1LabelFr('');
      setMetric1LabelEn('');
      setMetric2Val('');
      setMetric2LabelFr('');
      setMetric2LabelEn('');
      setMetric3Val('');
      setMetric3LabelFr('');
      setMetric3LabelEn('');
      setDemoUrl('');
      setGithubUrl('');
      setUploadedMedia([]);
      setProjectStatus('LIVE');
      return;
    }

    const targetSlug = querySlug;
    async function loadProjectData() {
      try {
        let foundInCloud: any = null;
        try {
          const res = await fetch('/api/projects', { cache: 'no-store' });
          const json = await res.json();
          if (json?.success && Array.isArray(json.data)) {
            foundInCloud = json.data.find((p: any) => p.slug === targetSlug);
          }
        } catch (err) {
          console.warn('Could not fetch project from API:', err);
        }

        const baseProject = projectsData.find((p) => p.slug === targetSlug);

        if (!foundInCloud && !baseProject) {
          return;
        }

        const current = foundInCloud || (baseProject ? {
          slug: baseProject.slug,
          title_fr: baseProject.titleFr,
          title_en: baseProject.titleEn,
          summary_fr: baseProject.summaryFr,
          summary_en: baseProject.summaryEn,
          problem_fr: baseProject.challenge.p1Fr,
          problem_en: baseProject.challenge.p1En,
          solution_fr: baseProject.solution.overviewFr || baseProject.solution.cards[0]?.descFr || '',
          solution_en: baseProject.solution.overviewEn || baseProject.solution.cards[0]?.descEn || '',
          role_fr: baseProject.roleFr,
          role_en: baseProject.roleEn,
          features_fr: baseProject.solution.cards.map((c) => c.titleFr),
          features_en: baseProject.solution.cards.map((c) => c.titleEn),
          architecture_client_title: baseProject.architecture?.client?.title || 'Next.js 15 App Router',
          architecture_client_sub: baseProject.architecture?.client?.sub || 'TypeScript · Tailwind CSS',
          architecture_backend_title: baseProject.architecture?.backend?.title || 'Laravel REST API',
          architecture_backend_sub: baseProject.architecture?.backend?.sub || 'Eloquent · Sanctum Auth · Redis Cache',
          architecture_database_title: baseProject.architecture?.database?.title || 'Supabase PostgreSQL',
          architecture_database_sub: baseProject.architecture?.database?.sub || 'Cloud PostgreSQL · RLS Security',
          technologies: baseProject.tech,
          demo_url: baseProject.demoUrl,
          github_url: baseProject.githubUrl,
          featured_image: baseProject.image,
          gallery: baseProject.gallery,
          status: 'LIVE',
        } : null);

      if (current) {
        setSlug(current.slug || targetSlug);
        setTitleFr(current.title_fr || current.title || '');
        setTitleEn(current.title_en || current.title || '');
        setSummaryFr(current.summary_fr || current.summary || '');
        setSummaryEn(current.summary_en || current.summary || '');
        setProblemFr(current.problem_fr || '');
        setProblemEn(current.problem_en || '');
        setSolutionFr(current.solution_fr || '');
        setSolutionEn(current.solution_en || '');
        setRoleFr(current.role_fr || '');
        setRoleEn(current.role_en || '');
        setProjectStatus(current.status || 'LIVE');

        setArchClientTitle(
          current.architecture_client_title ||
            current.architecture?.client?.title ||
            baseProject?.architecture?.client?.title ||
            'Next.js 15 App Router'
        );
        setArchClientSub(
          current.architecture_client_sub ||
            current.architecture?.client?.sub ||
            baseProject?.architecture?.client?.sub ||
            'TypeScript · Tailwind CSS'
        );
        setArchBackendTitle(
          current.architecture_backend_title ||
            current.architecture?.backend?.title ||
            baseProject?.architecture?.backend?.title ||
            'Laravel REST API'
        );
        setArchBackendSub(
          current.architecture_backend_sub ||
            current.architecture?.backend?.sub ||
            baseProject?.architecture?.backend?.sub ||
            'Eloquent · Sanctum Auth · Redis Cache'
        );
        setArchDatabaseTitle(
          current.architecture_database_title ||
            current.architecture?.database?.title ||
            baseProject?.architecture?.database?.title ||
            'Supabase PostgreSQL'
        );
        setArchDatabaseSub(
          current.architecture_database_sub ||
            current.architecture?.database?.sub ||
            baseProject?.architecture?.database?.sub ||
            'Cloud PostgreSQL · RLS Security'
        );

        setMetric1Val(current.metric1_val ?? (current.results?.metrics?.[0]?.value || '-65%'));
        setMetric1LabelFr(current.metric1_label_fr ?? (current.results?.metrics?.[0]?.labelFr || 'Temps de chargement des bilans comptables'));
        setMetric1LabelEn(current.metric1_label_en ?? (current.results?.metrics?.[0]?.labelEn || 'Reduction in accounting report load times'));

        setMetric2Val(current.metric2_val ?? (current.results?.metrics?.[1]?.value || '1.2M'));
        setMetric2LabelFr(current.metric2_label_fr ?? (current.results?.metrics?.[1]?.labelFr || 'Événements financiers traités / mois'));
        setMetric2LabelEn(current.metric2_label_en ?? (current.results?.metrics?.[1]?.labelEn || 'Financial events processed monthly'));

        setMetric3Val(current.metric3_val ?? (current.results?.metrics?.[2]?.value || '98%'));
        setMetric3LabelFr(current.metric3_label_fr ?? (current.results?.metrics?.[2]?.labelFr || 'Satisfaction des utilisateurs de la plateforme'));
        setMetric3LabelEn(current.metric3_label_en ?? (current.results?.metrics?.[2]?.labelEn || 'User satisfaction score across finance teams'));

        setCategory(current.category || baseProject?.category || 'Web / SaaS');
        setTimelineFr(current.timeline_fr || baseProject?.timelineFr || 'Sprint 4 Mois');
        setTimelineEn(current.timeline_en || baseProject?.timelineEn || '4 Months Sprint');
        setStatusTextFr(current.status_text_fr || baseProject?.statusFr || 'Produit en Ligne');
        setStatusTextEn(current.status_text_en || baseProject?.statusEn || 'Live Product');

        if (Array.isArray(current.features_fr)) {
          setFeaturesFr(current.features_fr.join('\n'));
        } else if (typeof current.features_fr === 'string') {
          setFeaturesFr(current.features_fr);
        }

        if (Array.isArray(current.features_en)) {
          setFeaturesEn(current.features_en.join('\n'));
        } else if (typeof current.features_en === 'string') {
          setFeaturesEn(current.features_en);
        }

        if (Array.isArray(current.technologies)) {
          setTechnologies(current.technologies.join(', '));
        } else if (typeof current.technologies === 'string') {
          setTechnologies(current.technologies);
        }

        setDemoUrl(current.demo_url || '');
        setGithubUrl(current.github_url || '');

        if (current.gallery_items && Array.isArray(current.gallery_items) && current.gallery_items.length > 0) {
          setUploadedMedia(current.gallery_items);
        } else if (current.gallery && Array.isArray(current.gallery) && current.gallery.length > 0) {
          setUploadedMedia(
            current.gallery.map((url: string, idx: number) => ({
              id: `media-${idx}`,
              url,
              name: `screenshot-${idx + 1}.png`,
              isHero: idx === 0,
              type: 'image',
            }))
          );
        } else if (current.featured_image) {
          setUploadedMedia([
            {
              id: 'hero-media-1',
              url: current.featured_image,
              name: 'hero-image.png',
              isHero: true,
              type: 'image',
            },
          ]);
        }
      }
    } catch (e) {
      console.error('Error loading project into editor:', e);
    }
  }

  loadProjectData();
}, [querySlug]);

  const handleTitleFrChange = (val: string) => {
    setTitleFr(val);
    setSaveStatus(t.unsaved);
    if (isNewProject) {
      const generatedSlug = val
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(generatedSlug);
    }
  };

  const handleSave = async (targetStatus: 'LIVE' | 'DRAFT' | 'PRIVATE') => {
    setProjectStatus(targetStatus);
    setSaveStatus(targetStatus === 'LIVE' ? t.publishing : t.savingDraft);

    const heroMedia = uploadedMedia.find((m) => m.isHero) || uploadedMedia[0];
    const heroImageUrl = heroMedia?.url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80';

    const finalSlug = (slug || titleFr.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')) || `projet-${Date.now()}`;

    const projectPayload = {
      id: Date.now(),
      slug: finalSlug,
      title_fr: titleFr || 'Nouveau Projet',
      title_en: titleEn || titleFr || 'New Project',
      summary_fr: summaryFr,
      summary_en: summaryEn || summaryFr,
      problem_fr: problemFr,
      problem_en: problemEn || problemFr,
      solution_fr: solutionFr,
      solution_en: solutionEn || solutionFr,
      role_fr: roleFr,
      role_en: roleEn || roleFr,
      features_fr: featuresFr.split('\n').map((f) => f.trim()).filter(Boolean),
      features_en: featuresEn.split('\n').map((f) => f.trim()).filter(Boolean),
      architecture_client_title: archClientTitle,
      architecture_client_sub: archClientSub,
      architecture_backend_title: archBackendTitle,
      architecture_backend_sub: archBackendSub,
      architecture_database_title: archDatabaseTitle,
      architecture_database_sub: archDatabaseSub,
      metric1_val: metric1Val,
      metric1_label_fr: metric1LabelFr,
      metric1_label_en: metric1LabelEn,
      metric2_val: metric2Val,
      metric2_label_fr: metric2LabelFr,
      metric2_label_en: metric2LabelEn,
      metric3_val: metric3Val,
      metric3_label_fr: metric3LabelFr,
      metric3_label_en: metric3LabelEn,
      featured_image: heroImageUrl,
      gallery: uploadedMedia.map((m) => m.url),
      gallery_items: uploadedMedia,
      demo_url: demoUrl,
      github_url: githubUrl,
      technologies: technologies.split(',').map((tech) => tech.trim()).filter(Boolean),
      status: targetStatus,
      category: category || 'Web / SaaS',
      timeline_fr: timelineFr || 'Sprint 4 Mois',
      timeline_en: timelineEn || '4 Months Sprint',
      status_text_fr: statusTextFr || (targetStatus === 'DRAFT' ? 'En Développement' : 'Produit en Ligne'),
      status_text_en: statusTextEn || (targetStatus === 'DRAFT' ? 'In Development' : 'Live Product'),
      updated: new Date().toISOString().split('T')[0],
    };

    try {
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project: projectPayload }),
      });
    } catch (e: any) {
      console.error('Projects cloud sync error:', e);
    }

    setTimeout(() => {
      setSaveStatus(targetStatus === 'LIVE' ? t.published : t.draftSaved);
      setTimeout(() => setSaveStatus(t.saved), 3000);
    }, 500);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newItems: MediaItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const isFirst = uploadedMedia.length === 0 && i === 0;

      try {
        let mediaUrl = '';
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const json = await res.json();
        if (json?.success && json?.url) {
          mediaUrl = json.url;
        } else {
          mediaUrl = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = (ev) => resolve(ev.target?.result as string);
            reader.readAsDataURL(file);
          });
        }

        newItems.push({
          id: `media-${Date.now()}-${i}`,
          url: mediaUrl,
          name: file.name,
          isHero: isFirst,
          type: file.type.startsWith('video/') ? 'video' : 'image',
        });
      } catch (err) {
        console.error('Error uploading project media file:', err);
      }
    }

    setUploadedMedia((prev) => [...prev, ...newItems]);
    setSaveStatus(t.unsaved);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSetHero = (id: string) => {
    setUploadedMedia((prev) =>
      prev.map((item) => ({
        ...item,
        isHero: item.id === id,
      }))
    );
    setSaveStatus(t.unsaved);
  };

  const handleDeleteMedia = (id: string) => {
    setUploadedMedia((prev) => {
      const filtered = prev.filter((item) => item.id !== id);
      if (filtered.length > 0 && !filtered.some((m) => m.isHero)) {
        filtered[0].isHero = true;
      }
      return filtered;
    });
    setSaveStatus(t.unsaved);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fakeEvent = {
        target: { files: e.dataTransfer.files },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileUpload(fakeEvent);
    }
  };

  return (
    <div className="min-h-screen text-slate-900 dark:text-white pb-24 font-sans">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{t.back}</span>
          </Link>

          {/* Save Status & Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={`text-xs font-mono flex items-center gap-1.5 mr-2 ${
                saveStatus === t.saved || saveStatus === t.published || saveStatus === t.draftSaved
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-amber-600 dark:text-amber-400'
              }`}
            >
              {(saveStatus === t.saved || saveStatus === t.published || saveStatus === t.draftSaved) && (
                <CheckCircle2 className="w-3.5 h-3.5" />
              )}
              {saveStatus}
            </span>

            <Link href="/admin/projects">
              <Button variant="outlined" size="sm">
                {t.discard}
              </Button>
            </Link>

            {/* Button 1: Save as Draft */}
            <Button
              variant="glass"
              size="sm"
              icon={<FileEdit className="w-4 h-4 text-amber-500" />}
              onClick={() => handleSave('DRAFT')}
            >
              {t.saveDraft}
            </Button>

            {/* Button 2: Publish Live */}
            <Button
              variant="primary"
              size="sm"
              icon={<Save className="w-4 h-4" />}
              onClick={() => handleSave('LIVE')}
            >
              {t.publish}
            </Button>
          </div>
        </div>

        {/* Editor Title Banner & Status Selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-slate-50 dark:bg-zinc-900/60 p-5 rounded-2xl border border-slate-200 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="blue">{isNewProject ? (locale === 'fr' ? 'NOUVEAU PROJET' : 'NEW PROJECT') : (slug ? `ID: ${slug}` : t.badgeId)}</Badge>
              {projectStatus === 'LIVE' && <Badge variant="success">LIVE (EN LIGNE)</Badge>}
              {projectStatus === 'DRAFT' && <Badge variant="warning">DRAFT (BROUILLON)</Badge>}
              {projectStatus === 'PRIVATE' && <Badge variant="violet">PRIVATE (PRIVÉ)</Badge>}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {isNewProject
                ? (locale === 'fr' ? 'Création d’un Nouveau Projet (Bilingue FR / EN)' : 'Create New Project (Bilingual FR / EN)')
                : t.editorTitle}
            </h1>
          </div>

          {/* Quick Status Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 hidden sm:inline">{t.statusLabel}</span>
            <div className="flex items-center bg-white dark:bg-zinc-950 p-1 rounded-xl border border-slate-200 dark:border-white/10">
              <button
                type="button"
                onClick={() => setProjectStatus('LIVE')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  projectStatus === 'LIVE'
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                LIVE
              </button>
              <button
                type="button"
                onClick={() => setProjectStatus('DRAFT')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  projectStatus === 'DRAFT'
                    ? 'bg-amber-500 text-white font-bold shadow-xs'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                DRAFT
              </button>
              <button
                type="button"
                onClick={() => setProjectStatus('PRIVATE')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  projectStatus === 'PRIVATE'
                    ? 'bg-purple-600 text-white font-bold shadow-xs'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                PRIVÉ
              </button>
            </div>
          </div>
        </div>

        {/* Sticky Jump Navigation Bar */}
        <div className="sticky top-20 z-30 py-3 mb-8 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-y border-slate-200 dark:border-white/10 flex items-center gap-6 overflow-x-auto text-xs font-mono">
          <span className="text-blue-600 dark:text-blue-400 font-bold">{t.jumpTitle}</span>
          <a href="#general" className="text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white">
            {t.jump1}
          </a>
          <a href="#media" className="text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white">
            {t.jump2}
          </a>
          <a href="#tech" className="text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white">
            {t.jump3}
          </a>
          <a href="#casestudy" className="text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white">
            {t.jump4}
          </a>
          <a href="#architecture" className="text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white">
            {t.jump5}
          </a>
          <a href="#metrics" className="text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white">
            {t.jump6}
          </a>
        </div>

        {/* SECTION 1: GENERAL INFORMATION */}
        <section id="general" className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            {t.sec1Title}
          </h2>
          <Card variant="glass" className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={t.labelTitleFr}
                value={titleFr}
                placeholder="ex: Application Web SaaS ou Dashboard Cloud"
                onChange={(e) => handleTitleFrChange(e.target.value)}
              />
              <Input
                label={t.labelTitleEn}
                value={titleEn}
                placeholder="e.g. SaaS Web Application or Cloud Dashboard"
                onChange={(e) => {
                  setTitleEn(e.target.value);
                  setSaveStatus(t.unsaved);
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label={t.labelSlug}
                value={slug}
                placeholder="ex: mon-super-projet"
                onChange={(e) => {
                  setSlug(e.target.value);
                  setSaveStatus(t.unsaved);
                }}
              />
              <Input
                label={t.labelCategory}
                value={category}
                placeholder="ex: Web / SaaS, Mobile App, Branding..."
                onChange={(e) => {
                  setCategory(e.target.value);
                  setSaveStatus(t.unsaved);
                }}
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  label={t.labelStatusTextFr}
                  value={statusTextFr}
                  placeholder="ex: Produit en Ligne"
                  onChange={(e) => {
                    setStatusTextFr(e.target.value);
                    setSaveStatus(t.unsaved);
                  }}
                />
                <Input
                  label={t.labelStatusTextEn}
                  value={statusTextEn}
                  placeholder="e.g. Live Product"
                  onChange={(e) => {
                    setStatusTextEn(e.target.value);
                    setSaveStatus(t.unsaved);
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={t.labelTimelineFr}
                value={timelineFr}
                placeholder="ex: Sprint 4 Mois, 3 Semaines..."
                onChange={(e) => {
                  setTimelineFr(e.target.value);
                  setSaveStatus(t.unsaved);
                }}
              />
              <Input
                label={t.labelTimelineEn}
                value={timelineEn}
                placeholder="e.g. 4 Months Sprint, 3 Weeks..."
                onChange={(e) => {
                  setTimelineEn(e.target.value);
                  setSaveStatus(t.unsaved);
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextArea
                label={t.labelSummaryFr}
                rows={3}
                value={summaryFr}
                placeholder="Description résumée du projet en français..."
                onChange={(e) => {
                  setSummaryFr(e.target.value);
                  setSaveStatus(t.unsaved);
                }}
              />
              <TextArea
                label={t.labelSummaryEn}
                rows={3}
                value={summaryEn}
                placeholder="Brief summary of the project in English..."
                onChange={(e) => {
                  setSummaryEn(e.target.value);
                  setSaveStatus(t.unsaved);
                }}
              />
            </div>
          </Card>
        </section>

        {/* SECTION 2: MEDIA MANAGEMENT */}
        <section id="media" className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              {t.sec2Title}
            </h2>
            <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">
              {uploadedMedia.length} {t.mediaCount}
            </span>
          </div>

          <Card variant="glass" className="p-6">
            {/* Drag & Drop Upload Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                if (e.dataTransfer.files) {
                  const fakeEvent = { target: { files: e.dataTransfer.files } } as any;
                  handleFileUpload(fakeEvent);
                }
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`p-8 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all mb-8 ${
                isDragging
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-slate-300 dark:border-white/10 hover:border-blue-500/50 bg-slate-50 dark:bg-white/5'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                multiple
                accept="image/*,video/*"
                onChange={handleFileUpload}
              />
              <UploadCloud className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-3 animate-bounce" />
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">{t.dropText}</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 font-mono mb-4">{t.dropSub}</p>
              <Button variant="outlined" size="sm">
                {t.browseBtn}
              </Button>
            </div>

            {/* Uploaded Media Grid with Hero Selector */}
            {uploadedMedia.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {uploadedMedia.map((media) => (
                  <div
                    key={media.id}
                    className={`relative rounded-xl overflow-hidden border p-2 flex flex-col justify-between group transition-all ${
                      media.isHero
                        ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-500/10 ring-2 ring-blue-500/30'
                        : 'border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-900'
                    }`}
                  >
                    <div className="relative h-32 rounded-lg overflow-hidden mb-2 bg-black">
                      {media.type === 'video' ? (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-white">
                          <Film className="w-8 h-8 opacity-70" />
                        </div>
                      ) : (
                        <img src={media.url} alt={media.name} className="w-full h-full object-cover" />
                      )}

                      {media.isHero && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-mono font-bold flex items-center gap-1 shadow-md">
                          <Star className="w-3 h-3 fill-current" />
                          {t.heroBadge}
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDeleteMedia(media.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-2 mt-auto">
                      <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 truncate max-w-[120px]">
                        {media.name}
                      </span>
                      {!media.isHero && (
                        <button
                          type="button"
                          onClick={() => handleSetHero(media.id)}
                          className="text-[10px] font-mono text-blue-600 dark:text-blue-400 hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <Star className="w-3 h-3" />
                          Hero
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </section>

        {/* SECTION 3: TECH SPECS & REPOSITORIES */}
        <section id="tech" className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FileCode className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            {t.sec3Title}
          </h2>
          <Card variant="glass" className="p-6 space-y-6">
            <Input
              label={t.labelTech}
              value={technologies}
              onChange={(e) => {
                setTechnologies(e.target.value);
                setSaveStatus(t.unsaved);
              }}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={t.labelDemoUrl}
                value={demoUrl}
                onChange={(e) => {
                  setDemoUrl(e.target.value);
                  setSaveStatus(t.unsaved);
                }}
              />
              <Input
                label={t.labelGithubUrl}
                value={githubUrl}
                onChange={(e) => {
                  setGithubUrl(e.target.value);
                  setSaveStatus(t.unsaved);
                }}
              />
            </div>
          </Card>
        </section>

        {/* SECTION 4: CASE STUDY DETAILS */}
        <section id="casestudy" className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            {t.sec4Title}
          </h2>
          <Card variant="glass" className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextArea
                label={t.labelProblemFr}
                rows={3}
                value={problemFr}
                onChange={(e) => {
                  setProblemFr(e.target.value);
                  setSaveStatus(t.unsaved);
                }}
              />
              <TextArea
                label={t.labelProblemEn}
                rows={3}
                value={problemEn}
                onChange={(e) => {
                  setProblemEn(e.target.value);
                  setSaveStatus(t.unsaved);
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextArea
                label={t.labelSolutionFr}
                rows={3}
                value={solutionFr}
                onChange={(e) => {
                  setSolutionFr(e.target.value);
                  setSaveStatus(t.unsaved);
                }}
              />
              <TextArea
                label={t.labelSolutionEn}
                rows={3}
                value={solutionEn}
                onChange={(e) => {
                  setSolutionEn(e.target.value);
                  setSaveStatus(t.unsaved);
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={t.labelRoleFr}
                value={roleFr}
                onChange={(e) => {
                  setRoleFr(e.target.value);
                  setSaveStatus(t.unsaved);
                }}
              />
              <Input
                label={t.labelRoleEn}
                value={roleEn}
                onChange={(e) => {
                  setRoleEn(e.target.value);
                  setSaveStatus(t.unsaved);
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextArea
                label={t.labelFeaturesFr}
                rows={4}
                value={featuresFr}
                onChange={(e) => {
                  setFeaturesFr(e.target.value);
                  setSaveStatus(t.unsaved);
                }}
              />
              <TextArea
                label={t.labelFeaturesEn}
                rows={4}
                value={featuresEn}
                onChange={(e) => {
                  setFeaturesEn(e.target.value);
                  setSaveStatus(t.unsaved);
                }}
              />
            </div>
          </Card>
        </section>

        {/* SECTION 5: TECHNICAL ARCHITECTURE & DATA PIPELINE */}
        <section id="architecture" className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
            <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            {t.sec5Title}
          </h2>
          <Card variant="glass" className="p-6 space-y-6">
            {/* 1. Client Layer */}
            <div className="p-5 rounded-xl bg-blue-50/60 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 space-y-4">
              <div className="flex items-center gap-2">
                <Layout className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  01. CLIENT LAYER
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label={t.labelClientTitle}
                  value={archClientTitle}
                  onChange={(e) => {
                    setArchClientTitle(e.target.value);
                    setSaveStatus(t.unsaved);
                  }}
                />
                <Input
                  label={t.labelClientSub}
                  value={archClientSub}
                  onChange={(e) => {
                    setArchClientSub(e.target.value);
                    setSaveStatus(t.unsaved);
                  }}
                />
              </div>
            </div>

            {/* 2. Backend Layer */}
            <div className="p-5 rounded-xl bg-purple-50/60 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/30 space-y-4">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                  02. BACKEND API LAYER
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label={t.labelBackendTitle}
                  value={archBackendTitle}
                  onChange={(e) => {
                    setArchBackendTitle(e.target.value);
                    setSaveStatus(t.unsaved);
                  }}
                />
                <Input
                  label={t.labelBackendSub}
                  value={archBackendSub}
                  onChange={(e) => {
                    setArchBackendSub(e.target.value);
                    setSaveStatus(t.unsaved);
                  }}
                />
              </div>
            </div>

            {/* 3. Database Layer */}
            <div className="p-5 rounded-xl bg-emerald-50/60 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 space-y-4">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  03. DATABASE & CLOUD LAYER
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label={t.labelDatabaseTitle}
                  value={archDatabaseTitle}
                  onChange={(e) => {
                    setArchDatabaseTitle(e.target.value);
                    setSaveStatus(t.unsaved);
                  }}
                />
                <Input
                  label={t.labelDatabaseSub}
                  value={archDatabaseSub}
                  onChange={(e) => {
                    setArchDatabaseSub(e.target.value);
                    setSaveStatus(t.unsaved);
                  }}
                />
              </div>
            </div>
          </Card>
        </section>

        {/* SECTION 6: IMPACT, METRICS & MEASURABLE OUTCOMES */}
        <section id="metrics" className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
            <BarChart3 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            {t.sec6Title}
          </h2>
          <Card variant="glass" className="p-6 space-y-6">
            {/* Metric 1 */}
            <div className="p-5 rounded-xl bg-blue-50/60 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 space-y-4">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                {t.metric1Title}
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label={t.labelMetricVal}
                  value={metric1Val}
                  onChange={(e) => {
                    setMetric1Val(e.target.value);
                    setSaveStatus(t.unsaved);
                  }}
                />
                <Input
                  label={t.labelMetricLabelFr}
                  value={metric1LabelFr}
                  onChange={(e) => {
                    setMetric1LabelFr(e.target.value);
                    setSaveStatus(t.unsaved);
                  }}
                />
                <Input
                  label={t.labelMetricLabelEn}
                  value={metric1LabelEn}
                  onChange={(e) => {
                    setMetric1LabelEn(e.target.value);
                    setSaveStatus(t.unsaved);
                  }}
                />
              </div>
            </div>

            {/* Metric 2 */}
            <div className="p-5 rounded-xl bg-purple-50/60 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/30 space-y-4">
              <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block">
                {t.metric2Title}
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label={t.labelMetricVal}
                  value={metric2Val}
                  onChange={(e) => {
                    setMetric2Val(e.target.value);
                    setSaveStatus(t.unsaved);
                  }}
                />
                <Input
                  label={t.labelMetricLabelFr}
                  value={metric2LabelFr}
                  onChange={(e) => {
                    setMetric2LabelFr(e.target.value);
                    setSaveStatus(t.unsaved);
                  }}
                />
                <Input
                  label={t.labelMetricLabelEn}
                  value={metric2LabelEn}
                  onChange={(e) => {
                    setMetric2LabelEn(e.target.value);
                    setSaveStatus(t.unsaved);
                  }}
                />
              </div>
            </div>

            {/* Metric 3 */}
            <div className="p-5 rounded-xl bg-emerald-50/60 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 space-y-4">
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                {t.metric3Title}
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label={t.labelMetricVal}
                  value={metric3Val}
                  onChange={(e) => {
                    setMetric3Val(e.target.value);
                    setSaveStatus(t.unsaved);
                  }}
                />
                <Input
                  label={t.labelMetricLabelFr}
                  value={metric3LabelFr}
                  onChange={(e) => {
                    setMetric3LabelFr(e.target.value);
                    setSaveStatus(t.unsaved);
                  }}
                />
                <Input
                  label={t.labelMetricLabelEn}
                  value={metric3LabelEn}
                  onChange={(e) => {
                    setMetric3LabelEn(e.target.value);
                    setSaveStatus(t.unsaved);
                  }}
                />
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}

export default function ProjectEditorPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm font-mono">Chargement de l’éditeur...</div>}>
      <ProjectEditorInner />
    </Suspense>
  );
}
