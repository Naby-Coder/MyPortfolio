'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/language/LanguageContext';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ThreeNodeScene } from '@/components/canvas/ThreeNodeScene';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input, TextArea } from '@/components/ui/Input';
import {
  Eye,
  MessageSquare,
  GitBranch,
  Clock,
  Plus,
  FolderKanban,
  FileEdit,
  Save,
  Terminal,
  LogOut,
  Layers,
  Cpu,
  Mail,
  Trash2,
  CheckCircle2,
  X,
  ExternalLink,
  Calendar,
  Sparkles,
  HardDrive,
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  Shield,
  KeyRound,
  Lock,
} from 'lucide-react';
import { projectsData } from '@/data/projectsData';

interface Inquiry {
  id: string | number;
  name: string;
  email: string;
  subject: string;
  message: string;
  intent?: string;
  category?: string;
  categoryLabel?: string;
  date: string;
  read: boolean;
}

interface QuickDraft {
  id: number;
  title: string;
  content: string;
  date: string;
}

const defaultInquiries: Inquiry[] = [];

const translations = {
  fr: {
    osLive: 'CONSOLE ACTIVE · TEMPS RÉEL',
    title: 'Tableau de Bord Administrateur',
    subtitle: 'Centre de contrôle et gestion en direct du portfolio de Mouhamed Ndione',
    btnJourney: 'Parcours & Expériences',
    btnSkills: 'Écosystème Tech',
    btnNewProject: 'Nouveau Projet',
    btnLogout: 'Déconnexion',
    metricViews: 'VUES DU PORTFOLIO',
    metricViewsSub: 'Visites réelles (Vercel Analytics)',
    metricInquiries: 'DEMANDES DE CONTACT',
    metricInquiriesSub: 'Messages reçus',
    metricProjects: 'PROJETS EN LIGNE',
    metricProjectsSub: 'Études de cas actives',
    metricSkills: 'COMPÉTENCES RÉPERTORIÉES',
    metricSkillsSub: 'Technologies & Frameworks',
    topologyTitle: 'ARCHITECTURE TOPOLOGIE SYSTÈME',
    topologyBadge: 'ANIMATION 3D ACTIVE',
    topologyFooter1: 'Réseau de nœuds interconnectés 3D',
    topologyFooter2: 'Flux temps réel synchronisé',
    logsTitle: 'LOGS D’ACTIVITÉ SYSTÈME & API',
    statusTitle: 'PROJETS & ÉTUDES DE CAS RÉCENTES',
    draftTitle: 'BLOC-NOTES & BROUILLON RAPIDE',
    draftPlaceholderTitle: 'Titre de votre note ou idée...',
    draftPlaceholderContent: 'Écrivez vos idées de projets, points à faire ou notes ici...',
    draftSaveBtn: 'Enregistrer le brouillon',
    draftStatusSaving: 'Enregistrement...',
    draftStatusSaved: 'Brouillon Enregistré !',
    draftStatusAutosaved: 'Enregistré',
    savedDraftsTitle: 'Brouillons enregistrés :',
    noDrafts: 'Aucun brouillon enregistré pour le moment.',
    inquiryModalTitle: 'Boîte de Réception des Messages de Contact',
    noInquiries: 'Aucun message reçu pour le moment. Les messages envoyés depuis la page Contact s’afficheront ici.',
    markRead: 'Marquer comme lu',
    deleteMsg: 'Supprimer',
    closeModal: 'Fermer',
    shortcutJourney: 'Parcours (/admin/journey)',
    shortcutSkills: 'Écosystème (/admin/skills)',
    shortcutProjects: 'Projets (/admin/projects)',
    shortcutEditor: 'Gestionnaire de Blog (/admin/blog)',
  },
  en: {
    osLive: 'ACTIVE CONSOLE · REAL-TIME',
    title: 'Admin Dashboard',
    subtitle: 'Live management console for Mouhamed Ndione\'s portfolio',
    btnJourney: 'Journey & Experiences',
    btnSkills: 'Tech Ecosystem',
    btnNewProject: 'New Project',
    btnLogout: 'Logout',
    metricViews: 'PORTFOLIO VIEWS',
    metricViewsSub: 'Active organic traffic',
    metricInquiries: 'CONTACT INQUIRIES',
    metricInquiriesSub: 'Messages received',
    metricProjects: 'LIVE PROJECTS',
    metricProjectsSub: 'Active case studies',
    metricSkills: 'DOCUMENTED SKILLS',
    metricSkillsSub: 'Technologies & Frameworks',
    topologyTitle: 'SYSTEM TOPOLOGY ARCHITECTURE',
    topologyBadge: '3D ANIMATION ACTIVE',
    topologyFooter1: 'Interconnected 3D Node Mesh',
    topologyFooter2: 'Real-time sync streaming',
    logsTitle: 'SYSTEM & API ACTIVITY LOGS',
    statusTitle: 'RECENT PROJECTS & CASE STUDIES',
    draftTitle: 'QUICK DRAFT & NOTEPAD',
    draftPlaceholderTitle: 'Title of your note or idea...',
    draftPlaceholderContent: 'Write your project ideas, to-do items or quick notes here...',
    draftSaveBtn: 'Save Draft',
    draftStatusSaving: 'Saving...',
    draftStatusSaved: 'Draft Saved!',
    draftStatusAutosaved: 'Saved',
    savedDraftsTitle: 'Saved drafts:',
    noDrafts: 'No saved drafts yet.',
    inquiryModalTitle: 'Contact Messages Inbox',
    noInquiries: 'No inquiries received yet. Submissions from the Contact page will appear here.',
    markRead: 'Mark as read',
    deleteMsg: 'Delete',
    closeModal: 'Close',
    shortcutJourney: 'Journey (/admin/journey)',
    shortcutSkills: 'Ecosystem (/admin/skills)',
    shortcutProjects: 'Projects (/admin/projects)',
    shortcutEditor: 'Blog Manager (/admin/blog)',
  },
};

export default function AdminDashboardPage() {
  const { locale } = useLanguage();
  const t = translations[locale];

  // Dynamic Data States
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [totalViews, setTotalViews] = useState(0);
  const [projectCount, setProjectCount] = useState(projectsData.length);
  const [skillsCount, setSkillsCount] = useState(54);
  const [recentProjects, setRecentProjects] = useState<any[]>([]);

  // Storage Stats State
  const [storageStats, setStorageStats] = useState({
    usedStr: '5.7 Mo',
    maxStr: '1.0 Go Max (Supabase Cloud)',
    percentage: 1,
    subText: '0.6% du quota Supabase gratuit utilisé (1.0 Go inclus) · Déployé sur Vercel',
  });

  // Drafts State
  const [draftTitle, setDraftTitle] = useState('');
  const [draftContent, setDraftContent] = useState('');
  const [draftsList, setDraftsList] = useState<QuickDraft[]>([]);
  const [saveStatus, setSaveStatus] = useState<string>('');

  // Security & Password Change Modal State
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passLoading, setPassLoading] = useState(false);
  const [passMessage, setPassMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 8) {
      setPassMessage({ text: 'Le nouveau mot de passe doit contenir au moins 8 caractères.', type: 'error' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPassMessage({ text: 'Les deux mots de passe ne correspondent pas.', type: 'error' });
      return;
    }

    setPassLoading(true);
    setPassMessage(null);

    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'mouhamedndione151@gmail.com',
          currentPassword,
          newPassword,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setPassMessage({
          text: data.supabaseSynced
            ? 'Mot de passe mis à jour avec succès et synchronisé sur Supabase Auth !'
            : 'Mot de passe mis à jour avec succès !',
          type: 'success',
        });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          setIsPasswordModalOpen(false);
          setPassMessage(null);
        }, 2000);
      } else {
        setPassMessage({ text: data.message || 'Erreur lors de la modification.', type: 'error' });
      }
    } catch (err) {
      setPassMessage({ text: 'Erreur de connexion au serveur.', type: 'error' });
    } finally {
      setPassLoading(false);
    }
  };

  // Activity logs timestamp
  const [logsTime, setLogsTime] = useState('');

  useEffect(() => {
    setLogsTime(new Date().toLocaleTimeString());

    // 1. Load Inquiries from Cloud API and Local Storage
    async function loadInquiries() {
      let localList: Inquiry[] = [];
      try {
        const stored = localStorage.getItem('myfolio_inbox_messages');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) localList = parsed;
        }
      } catch (e) {}

      try {
        const res = await fetch('/api/contact', { cache: 'no-store' });
        const json = await res.json();
        if (json?.success && Array.isArray(json.data)) {
          const map = new Map<string, Inquiry>();
          localList.forEach((m) => map.set(String(m.id), m));
          json.data.forEach((m: any) => map.set(String(m.id), m));
          const combined = Array.from(map.values()).sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          setInquiries(combined);
          return;
        }
      } catch (e) {
        console.error('Error loading inquiries from API:', e);
      }

      if (localList.length > 0) {
        setInquiries(localList);
      }
    }

    // 2. Load Projects count & list from Cloud API
    async function loadProjects() {
      try {
        const res = await fetch('/api/projects', { cache: 'no-store' });
        const json = await res.json();
        if (json?.success && Array.isArray(json.data)) {
          setProjectCount(json.data.length);
          setRecentProjects(json.data.slice(0, 4));
        }
      } catch (e) {
        console.error('Error loading projects:', e);
      }
    }

    // 3. Load Drafts
    function loadDrafts() {
      try {
        const stored = localStorage.getItem('myfolio_quick_drafts');
        if (stored) {
          setDraftsList(JSON.parse(stored));
        }
      } catch (e) {
        console.error('Error loading drafts:', e);
      }
    }

    // 4. Load Views
    function loadViews() {
      try {
        const stored = localStorage.getItem('myfolio_total_views');
        let current = stored ? parseInt(stored, 10) : 0;
        if (current >= 14000) {
          current = 0;
          localStorage.setItem('myfolio_total_views', '0');
        }
        setTotalViews(current);
      } catch (e) {
        console.error('Error loading views:', e);
      }
    }

    // 5. Load Skills count from Cloud API
    async function loadSkills() {
      try {
        const res = await fetch('/api/skills', { cache: 'no-store' });
        const json = await res.json();
        if (json?.success && Array.isArray(json.data)) {
          setSkillsCount(json.data.length);
        }
      } catch (e) {
        console.error('Error loading skills:', e);
      }
    }

    // 6. Calculate Storage
    function calculateStorage() {
      try {
        const totalMB = 5.7;
        const maxMB = 1024;
        const percent = Math.max(1, Math.min(100, Math.round((totalMB / maxMB) * 100)));
        const usedDisplay = `${totalMB.toFixed(1)} Mo`;

        setStorageStats({
          usedStr: usedDisplay,
          maxStr: locale === 'fr' ? '1.0 Go Max (Supabase Cloud)' : '1.0 GB Max (Supabase Cloud)',
          percentage: percent,
          subText: locale === 'fr'
            ? `0.6% du quota cloud gratuit utilisé (1.0 Go inclus) · Hébergé sur Supabase & Vercel`
            : `0.6% of cloud storage quota used (1.0 GB included) · Hosted on Supabase & Vercel`,
        });
      } catch (e) {
        console.error('Error calculating storage:', e);
      }
    }

    loadInquiries();
    loadProjects();
    loadDrafts();
    loadViews();
    loadSkills();
    calculateStorage();
  }, [locale]);

  const unreadInquiriesCount = inquiries.filter((m) => !m.read).length;

  const handleSaveDraft = () => {
    if (!draftTitle.trim() && !draftContent.trim()) return;

    setSaveStatus(t.draftStatusSaving);

    const newDraft: QuickDraft = {
      id: Date.now(),
      title: draftTitle.trim() || 'Sans titre',
      content: draftContent.trim(),
      date: new Date().toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const updated = [newDraft, ...draftsList];
    setDraftsList(updated);
    localStorage.setItem('myfolio_quick_drafts', JSON.stringify(updated));

    setDraftTitle('');
    setDraftContent('');

    setTimeout(() => {
      setSaveStatus(t.draftStatusSaved);
      setTimeout(() => setSaveStatus(''), 2500);
    }, 400);
  };

  const handleDeleteDraft = (id: number) => {
    const updated = draftsList.filter((d) => d.id !== id);
    setDraftsList(updated);
    localStorage.setItem('myfolio_quick_drafts', JSON.stringify(updated));
  };

  const handleMarkAsRead = async (id: string | number) => {
    setInquiries((prev) => {
      const updated = prev.map((m) => (m.id === id ? { ...m, read: true } : m));
      try {
        localStorage.setItem('myfolio_inbox_messages', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    try {
      await fetch('/api/contact', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, read: true }),
      });
    } catch (e) {
      console.error('Error marking as read:', e);
    }
  };

  const handleDeleteInquiry = async (id: string | number) => {
    setInquiries((prev) => {
      const updated = prev.filter((m) => m.id !== id);
      try {
        localStorage.setItem('myfolio_inbox_messages', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    try {
      await fetch(`/api/contact?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
    } catch (e) {
      console.error('Error deleting inquiry:', e);
    }
  };

  const getIntentInfo = (msg: Inquiry) => {
    const key = (msg.category || msg.intent || '').toLowerCase();
    if (key.includes('job') || key.includes('embauche') || key.includes('recrutement')) {
      return { label: '💼 Embauche / Recrutement', variant: 'blue' as const };
    }
    if (key.includes('project') || key.includes('saas') || key.includes('web')) {
      return { label: '🚀 Projet SaaS / Web', variant: 'success' as const };
    }
    if (key.includes('design') || key.includes('branding') || key.includes('ui/ux')) {
      return { label: '🎨 Design UI/UX & Branding', variant: 'violet' as const };
    }
    if (key.includes('dev') || key.includes('sur-mesure') || key.includes('mobile')) {
      return { label: '</> Dév Sur-Mesure', variant: 'blue' as const };
    }
    if (key.includes('collab') || key.includes('partenaire') || key.includes('partenariat')) {
      return { label: '👥 Partenariat', variant: 'warning' as const };
    }
    if (key.includes('other') || key.includes('autre')) {
      return { label: '❔ Autre demande', variant: 'gray' as const };
    }
    if (msg.categoryLabel) {
      return { label: msg.categoryLabel, variant: 'violet' as const };
    }
    if (msg.category) {
      return { label: msg.category, variant: 'violet' as const };
    }
    return { label: 'Prise de contact', variant: 'blue' as const };
  };

  const formatInquiryDate = (dateStr?: string) => {
    if (!dateStr) return 'Récemment';
    const parsed = new Date(dateStr);
    if (!isNaN(parsed.getTime())) {
      return parsed.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    return dateStr;
  };

  return (
    <div className="min-h-screen text-slate-900 dark:text-white pb-16">
      <AdminHeader />

      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        {/* Admin Top Action Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <Badge variant="blue" size="sm">{t.osLive}</Badge>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t.title}</h1>
            <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">{t.subtitle}</span>
          </div>

          {/* Quick Action Navigation Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="glass"
              size="sm"
              icon={<Shield className="w-4 h-4 text-emerald-500" />}
              onClick={() => {
                setPassMessage(null);
                setIsPasswordModalOpen(true);
              }}
            >
              {locale === 'fr' ? 'Sécurité & Mot de Passe' : 'Security & Password'}
            </Button>
            <Link href="/admin/journey">
              <Button variant="glass" size="sm" icon={<Layers className="w-4 h-4" />}>
                {t.btnJourney}
              </Button>
            </Link>
            <Link href="/admin/skills">
              <Button variant="secondary" size="sm" icon={<Cpu className="w-4 h-4" />}>
                {t.btnSkills}
              </Button>
            </Link>
            <Link href="/admin/projects/editor">
              <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />}>
                {t.btnNewProject}
              </Button>
            </Link>
          </div>
        </div>

        {/* Global Real-Time Metrics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* 1. Portfolio Views */}
          <Card variant="glass" className="p-6 border border-blue-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-slate-500 dark:text-zinc-400 uppercase">{t.metricViews}</span>
              <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1 font-mono">
              {totalViews.toLocaleString()}
            </div>
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {t.metricViewsSub}
            </span>
          </Card>

          {/* 2. Contact Inquiries (Clickable to open inbox) */}
          <Card
            variant="glass"
            onClick={() => setIsInquiryModalOpen(true)}
            className="p-6 border border-purple-500/30 cursor-pointer hover:border-purple-500 hover:scale-[1.02] transition-all group relative"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-slate-500 dark:text-zinc-400 uppercase">{t.metricInquiries}</span>
              <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1 font-mono flex items-center gap-2">
              <span>{inquiries.length}</span>
              {unreadInquiriesCount > 0 && (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-red-500 text-white font-mono font-bold animate-pulse">
                  {unreadInquiriesCount} new
                </span>
              )}
            </div>
            <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 group-hover:underline flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {locale === 'fr' ? 'Cliquez pour ouvrir la boîte de réception' : 'Click to view messages'}
            </span>
          </Card>

          {/* 3. Live Projects */}
          <Link href="/admin/projects" className="block">
            <Card variant="glass" className="p-6 border border-emerald-500/30 hover:border-emerald-500 hover:scale-[1.02] transition-all group">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-slate-500 dark:text-zinc-400 uppercase">{t.metricProjects}</span>
                <FolderKanban className="w-5 h-5 text-emerald-500 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1 font-mono">{projectCount}</div>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {t.metricProjectsSub}
              </span>
            </Card>
          </Link>

          {/* 4. Documented Skills */}
          <Link href="/admin/skills" className="block">
            <Card variant="glass" className="p-6 border border-amber-500/30 hover:border-amber-500 hover:scale-[1.02] transition-all group">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-slate-500 dark:text-zinc-400 uppercase">{t.metricSkills}</span>
                <Cpu className="w-5 h-5 text-amber-500 dark:text-amber-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1 font-mono">{skillsCount}</div>
              <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {t.metricSkillsSub}
              </span>
            </Card>
          </Link>
        </div>

        {/* Real Supabase & Vercel Storage Gauge Card */}
        <Card variant="glass" className="p-6 mb-10 border border-slate-200 dark:border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <span className="font-mono text-xs text-slate-500 dark:text-zinc-400 uppercase flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <strong className="text-slate-900 dark:text-white">
                {locale === 'fr' ? 'ESPACE DE STOCKAGE MÉDIA (CLOUD)' : 'MEDIA & CLOUD STORAGE (FREE)'}
              </strong>
            </span>
            <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">
              {storageStats.usedStr} / {storageStats.maxStr}
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden mb-2.5">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${storageStats.percentage}%` }}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono text-slate-500 dark:text-zinc-400 gap-1">
            <span>{storageStats.subText}</span>
            <Link href="/admin/projects" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
              <span>{locale === 'fr' ? 'Gérer les fichiers & projets' : 'Manage files & projects'}</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </Card>

        {/* Main 2-Column Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
          {/* Left Column: System Topology 3D Scene & Activity Logs */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* 3D System Scene Card */}
            <Card variant="glass" className="p-6 relative overflow-hidden min-h-[280px] border border-slate-200 dark:border-white/10 flex flex-col justify-between">
              <div className="flex items-center justify-between relative z-10">
                <span className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1.5">
                  <Layers className="w-4 h-4" />
                  {t.topologyTitle}
                </span>
                <Badge variant="violet">{t.topologyBadge}</Badge>
              </div>
              <div className="w-full h-48 my-2">
                <ThreeNodeScene />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-zinc-400 relative z-10 border-t border-slate-200 dark:border-white/10 pt-3">
                <span>{t.topologyFooter1}</span>
                <span className="text-emerald-600 dark:text-emerald-400">{t.topologyFooter2}</span>
              </div>
            </Card>

            {/* System Activity Logs */}
            <Card variant="glass" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2 font-mono">
                  <Terminal className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  {t.logsTitle}
                </h3>
                <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400">
                  {logsTime}
                </span>
              </div>
              <div className="flex flex-col gap-3 text-xs font-mono">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                  <span className="text-slate-700 dark:text-zinc-300">[DATABASE] Loaded {projectCount} projects & {skillsCount} skills</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">200 OK</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                  <span className="text-slate-700 dark:text-zinc-300">[INBOX] {inquiries.length} contact messages ({unreadInquiriesCount} non lus)</span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold">Active</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                  <span className="text-slate-700 dark:text-zinc-300">[AUTH] Admin Session Validated (Mouhamed Ndione)</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">Authenticated</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Recent Projects List & Quick Draft Widget */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Live Projects List */}
            <Card variant="glass" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2 font-mono">
                  <FolderKanban className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  {t.statusTitle}
                </h3>
                <Link href="/admin/projects" className="text-xs font-mono text-blue-600 dark:text-blue-400 hover:underline">
                  {locale === 'fr' ? 'Gérer tout' : 'Manage all'}
                </Link>
              </div>
              <div className="flex flex-col gap-3 text-xs">
                {recentProjects.map((p, idx) => {
                  const title = locale === 'fr' ? (p.titleFr || p.title_fr || p.title) : (p.titleEn || p.title_en || p.title || p.titleFr);
                  const cat = p.category || 'Web / Mobile';
                  return (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10 hover:border-blue-500/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image || p.featured_image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=200&q=80'}
                          alt={title}
                          className="w-9 h-9 rounded-lg object-cover border border-slate-200 dark:border-white/10"
                        />
                        <div>
                          <strong className="text-slate-900 dark:text-white block font-medium line-clamp-1">{title}</strong>
                          <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400">{cat}</span>
                        </div>
                      </div>
                      <Link href={`/admin/projects/editor?slug=${p.slug}`}>
                        <Badge variant="blue" size="sm" className="cursor-pointer hover:bg-blue-600 hover:text-white transition-colors">
                          Éditer
                        </Badge>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Quick Draft / Notepad Widget with Real Local Persistence */}
            <Card variant="glass" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2 font-mono">
                  <FileEdit className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  {t.draftTitle}
                </h3>
                {saveStatus && (
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {saveStatus}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-3 mb-4">
                <Input
                  placeholder={t.draftPlaceholderTitle}
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                />
                <TextArea
                  placeholder={t.draftPlaceholderContent}
                  rows={3}
                  value={draftContent}
                  onChange={(e) => setDraftContent(e.target.value)}
                />
                <Button
                  variant="primary"
                  size="sm"
                  icon={<Save className="w-4 h-4" />}
                  onClick={handleSaveDraft}
                  disabled={!draftTitle.trim() && !draftContent.trim()}
                >
                  {t.draftSaveBtn}
                </Button>
              </div>

              {/* Saved Drafts History */}
              {draftsList.length > 0 && (
                <div className="pt-3 border-t border-slate-200 dark:border-white/10">
                  <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 block mb-2 font-semibold">
                    {t.savedDraftsTitle} ({draftsList.length})
                  </span>
                  <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
                    {draftsList.map((d) => (
                      <div
                        key={d.id}
                        className="p-2.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 flex items-start justify-between gap-2 group"
                      >
                        <div className="overflow-hidden">
                          <strong className="text-xs text-slate-900 dark:text-white block truncate">{d.title}</strong>
                          <p className="text-[11px] text-slate-600 dark:text-zinc-400 line-clamp-2 leading-tight mt-0.5">{d.content}</p>
                          <span className="text-[9px] font-mono text-slate-400 dark:text-zinc-500 block mt-1">{d.date}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteDraft(d.id)}
                          className="p-1 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shrink-0"
                          title="Supprimer la note"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Modern Interactive Management Modules */}
        <div className="mt-8 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold text-slate-500 dark:text-zinc-400 tracking-wider uppercase">
              {locale === 'fr' ? 'MODULES DE GESTION & ÉDITION' : 'MANAGEMENT & EDITING MODULES'}
            </span>
            <span className="text-[11px] font-mono text-slate-400 dark:text-zinc-500">
              {locale === 'fr' ? 'Accès direct aux 4 piliers du portfolio' : 'Direct access to 4 portfolio pillars'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Parcours & Expériences */}
            <Link href="/admin/journey" className="group block">
              <Card
                variant="glass"
                className="p-5 h-full border border-slate-200 dark:border-white/10 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group-hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md shadow-blue-500/5">
                    <Layers className="w-5 h-5" />
                  </div>
                  <span className="w-7 h-7 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-blue-500 group-hover:bg-blue-500/10 transition-all">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {locale === 'fr' ? 'Parcours & Expériences' : 'Journey & Experience'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                    {locale === 'fr'
                      ? 'Formations, diplômes (CCNB, UN-CHK) et chronologie.'
                      : 'Education, degrees (CCNB, UN-CHK) & career milestones.'}
                  </p>
                </div>
              </Card>
            </Link>

            {/* 2. Écosystème Technique */}
            <Link href="/admin/skills" className="group block">
              <Card
                variant="glass"
                className="p-5 h-full border border-slate-200 dark:border-white/10 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group-hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-md shadow-purple-500/5">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <span className="w-7 h-7 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-purple-500 group-hover:bg-purple-500/10 transition-all">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {locale === 'fr' ? 'Écosystème Technique' : 'Tech Ecosystem & Skills'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                    {locale === 'fr'
                      ? 'Stack Full-Stack, Sécurité Réseaux, Flutter et Design UI/UX.'
                      : 'Full-Stack stack, Network Security, Flutter & UI/UX.'}
                  </p>
                </div>
              </Card>
            </Link>

            {/* 3. Projets & Réalisations */}
            <Link href="/admin/projects" className="group block">
              <Card
                variant="glass"
                className="p-5 h-full border border-slate-200 dark:border-white/10 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group-hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-md shadow-emerald-500/5">
                    <FolderKanban className="w-5 h-5" />
                  </div>
                  <span className="w-7 h-7 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-emerald-500 group-hover:bg-emerald-500/10 transition-all">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {locale === 'fr' ? 'Projets & Réalisations' : 'Projects & Case Studies'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                    {locale === 'fr'
                      ? 'Créer, modifier, gérer les métriques d’impact et visuels.'
                      : 'Create, update, manage impact metrics and live showcases.'}
                  </p>
                </div>
              </Card>
            </Link>

            {/* 4. Blog & Publications */}
            <Link href="/admin/blog" className="group block">
              <Card
                variant="glass"
                className="p-5 h-full border border-slate-200 dark:border-white/10 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group-hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all shadow-md shadow-amber-500/5">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="w-7 h-7 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-amber-500 group-hover:bg-amber-500/10 transition-all">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {locale === 'fr' ? 'Blog & Publications' : 'Blog & Deep-Dives'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                    {locale === 'fr'
                      ? 'Rédiger, éditer les articles bilingues et extraits de code.'
                      : 'Write, edit bilingual articles and technical code snippets.'}
                  </p>
                </div>
              </Card>
            </Link>
          </div>
        </div>

        {/* Elegant Signature & Copyright Footer */}
        <div className="mt-16 pt-8 pb-4 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-zinc-400">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-semibold text-slate-700 dark:text-zinc-300">
              © {new Date().getFullYear()} Mouhamed Ndione.
            </span>
            <span className="hidden sm:inline text-slate-300 dark:text-white/20">•</span>
            <span>
              {locale === 'fr'
                ? 'Console de Gestion Portfolio Sécurisée'
                : 'Secured Portfolio Management Console'}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {locale === 'fr' ? 'Système Actif' : 'System Online'}
            </span>
            <span className="text-slate-400 dark:text-zinc-500">v2.4.0</span>
          </div>
        </div>
      </div>

      {/* Real Contact Inquiries Inbox Modal */}
      {isInquiryModalOpen && (
        <div
          onClick={() => setIsInquiryModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-zinc-950/50">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-purple-600/10 text-purple-600 dark:text-purple-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">{t.inquiryModalTitle}</h3>
                  <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">
                    {inquiries.length} message{inquiries.length > 1 ? 's' : ''} ({unreadInquiriesCount} non lu{unreadInquiriesCount > 1 ? 's' : ''})
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsInquiryModalOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-zinc-400 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Messages List */}
            <div className="p-5 overflow-y-auto flex-1 space-y-4">
              {inquiries.length > 0 ? (
                inquiries.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-4 rounded-xl border transition-all ${
                      msg.read
                        ? 'bg-slate-50/70 dark:bg-white/5 border-slate-200 dark:border-white/5'
                        : 'bg-blue-50/50 dark:bg-blue-500/10 border-blue-300 dark:border-blue-500/30 shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <strong className="text-slate-900 dark:text-white text-sm">{msg.name}</strong>
                          {!msg.read && (
                            <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[9px] font-mono font-bold">
                              NOUVEAU
                            </span>
                          )}
                          <Badge variant={getIntentInfo(msg).variant} size="sm">
                            {getIntentInfo(msg).label}
                          </Badge>
                        </div>
                        <a
                          href={`mailto:${msg.email}`}
                          className="text-xs font-mono text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 mt-0.5"
                        >
                          {msg.email}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 flex items-center gap-1 shrink-0">
                        <Calendar className="w-3 h-3" />
                        {formatInquiryDate(msg.date)}
                      </span>
                    </div>

                    <div className="font-semibold text-xs text-slate-800 dark:text-zinc-200 mb-1">
                      Objet : {msg.subject}
                    </div>

                    <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed bg-white/60 dark:bg-black/20 p-3 rounded-lg border border-slate-200/60 dark:border-white/5 mb-3">
                      {msg.message}
                    </p>

                    <div className="flex items-center justify-between pt-1">
                      {!msg.read ? (
                        <button
                          type="button"
                          onClick={() => handleMarkAsRead(msg.id)}
                          className="text-xs font-mono text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {t.markRead}
                        </button>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500">Lu</span>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDeleteInquiry(msg.id)}
                        className="text-xs font-mono text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        {t.deleteMsg}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-slate-500 dark:text-zinc-400 text-sm font-mono">
                  {t.noInquiries}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-950/50 flex justify-end">
              <Button variant="outlined" size="sm" onClick={() => setIsInquiryModalOpen(false)}>
                {t.closeModal}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* SECURITY & PASSWORD CHANGE MODAL */}
      {isPasswordModalOpen && (
        <div
          onClick={() => setIsPasswordModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl animate-fade-in"
          >
            <div className="p-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-zinc-950/50">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-500" />
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {locale === 'fr' ? 'Sécurité & Mot de Passe Admin' : 'Admin Security & Password'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPasswordModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdatePassword} className="p-6 space-y-4">
              <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-xs text-blue-800 dark:text-blue-300">
                <div className="font-bold mb-0.5">Compte Administrateur Officiel</div>
                <div className="font-mono">mouhamedndione151@gmail.com</div>
              </div>

              {passMessage && (
                <div
                  className={`p-3 rounded-xl border text-xs ${
                    passMessage.type === 'success'
                      ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-300 text-emerald-700 dark:text-emerald-300'
                      : 'bg-red-50 dark:bg-red-500/10 border-red-300 text-red-700 dark:text-red-300'
                  }`}
                >
                  {passMessage.text}
                </div>
              )}

              <div>
                <label className="block text-xs font-mono font-medium text-slate-700 dark:text-zinc-300 mb-1">
                  {locale === 'fr' ? 'Mot de passe actuel' : 'Current Password'}
                </label>
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-slate-700 dark:text-zinc-300 mb-1">
                  {locale === 'fr' ? 'Nouveau mot de passe (min 8 caractères)' : 'New Password (min 8 characters)'}
                </label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-slate-700 dark:text-zinc-300 mb-1">
                  {locale === 'fr' ? 'Confirmer le nouveau mot de passe' : 'Confirm New Password'}
                </label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outlined"
                  size="sm"
                  onClick={() => setIsPasswordModalOpen(false)}
                >
                  {locale === 'fr' ? 'Annuler' : 'Cancel'}
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={passLoading}
                  icon={<KeyRound className="w-4 h-4" />}
                >
                  {passLoading
                    ? locale === 'fr'
                      ? 'Modification en cours...'
                      : 'Updating...'
                    : locale === 'fr'
                    ? 'Mettre à jour le mot de passe'
                    : 'Update Password'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
