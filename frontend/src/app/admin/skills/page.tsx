'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/language/LanguageContext';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  fetchSupabaseSkills,
  addSupabaseSkill,
  updateSupabaseSkill,
  deleteSupabaseSkill,
  SupabaseSkill,
} from '@/lib/supabase-api';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Check,
  ArrowLeft,
  X,
  Sparkles,
  Save,
  Database,
} from 'lucide-react';

export const fallbackSkills: SupabaseSkill[] = [
  // Languages & OOP
  { id: '1', name: 'Java', category: 'Languages & OOP', level_percentage: 90 },
  { id: '2', name: 'Python', category: 'Languages & OOP', level_percentage: 88 },
  { id: '3', name: 'C', category: 'Languages & OOP', level_percentage: 82 },
  { id: '4', name: 'PHP', category: 'Languages & OOP', level_percentage: 92 },
  { id: '5', name: 'JavaScript', category: 'Languages & OOP', level_percentage: 95 },
  { id: '6', name: 'TypeScript', category: 'Languages & OOP', level_percentage: 92 },
  { id: '7', name: 'Dart', category: 'Languages & OOP', level_percentage: 85 },
  { id: '8', name: 'Kotlin', category: 'Languages & OOP', level_percentage: 84 },
  { id: '9', name: 'XML', category: 'Languages & OOP', level_percentage: 90 },
  { id: '10', name: 'JSON', category: 'Languages & OOP', level_percentage: 98 },

  // Front-end & Web Solutions (CMS)
  { id: '11', name: 'Next.js', category: 'Front-end & Web Solutions (CMS)', level_percentage: 95 },
  { id: '12', name: 'React', category: 'Front-end & Web Solutions (CMS)', level_percentage: 95 },
  { id: '13', name: 'Angular', category: 'Front-end & Web Solutions (CMS)', level_percentage: 84 },
  { id: '14', name: 'Vue.js', category: 'Front-end & Web Solutions (CMS)', level_percentage: 82 },
  { id: '15', name: 'HTML5', category: 'Front-end & Web Solutions (CMS)', level_percentage: 98 },
  { id: '16', name: 'CSS3', category: 'Front-end & Web Solutions (CMS)', level_percentage: 95 },
  { id: '17', name: 'Tailwind CSS', category: 'Front-end & Web Solutions (CMS)', level_percentage: 96 },
  { id: '18', name: 'WordPress', category: 'Front-end & Web Solutions (CMS)', level_percentage: 90 },
  { id: '19', name: 'Moodle', category: 'Front-end & Web Solutions (CMS)', level_percentage: 85 },
  { id: '20', name: 'Drupal', category: 'Front-end & Web Solutions (CMS)', level_percentage: 80 },
  { id: '21', name: 'Joomla', category: 'Front-end & Web Solutions (CMS)', level_percentage: 78 },
  { id: '22', name: 'Shopify', category: 'Front-end & Web Solutions (CMS)', level_percentage: 88 },

  // Back-end & Databases
  { id: '23', name: 'Laravel', category: 'Back-end & Databases', level_percentage: 94 },
  { id: '24', name: 'Spring Boot', category: 'Back-end & Databases', level_percentage: 88 },
  { id: '25', name: 'Node.js', category: 'Back-end & Databases', level_percentage: 90 },
  { id: '26', name: 'Django', category: 'Back-end & Databases', level_percentage: 82 },
  { id: '27', name: 'PostgreSQL & API', category: 'Back-end & Databases', level_percentage: 92 },
  { id: '28', name: 'MySQL', category: 'Back-end & Databases', level_percentage: 92 },
  { id: '29', name: 'REST & GraphQL', category: 'Back-end & Databases', level_percentage: 90 },
  { id: '30', name: 'Oracle', category: 'Back-end & Databases', level_percentage: 80 },
  { id: '31', name: 'SQLite', category: 'Back-end & Databases', level_percentage: 88 },

  // Mobile Apps
  { id: '32', name: 'Flutter', category: 'Mobile Apps', level_percentage: 90 },
  { id: '33', name: 'React Native', category: 'Mobile Apps', level_percentage: 88 },
  { id: '34', name: 'Ionic', category: 'Mobile Apps', level_percentage: 82 },
  { id: '35', name: 'Android Studio', category: 'Mobile Apps', level_percentage: 85 },

  // Design & Visual Identity
  { id: '36', name: 'Figma', category: 'Design & Visual Identity', level_percentage: 96 },
  { id: '37', name: 'Photoshop', category: 'Design & Visual Identity', level_percentage: 92 },
  { id: '38', name: 'Illustrator', category: 'Design & Visual Identity', level_percentage: 90 },
  { id: '39', name: 'UI/UX Design', category: 'Design & Visual Identity', level_percentage: 94 },
  { id: '40', name: 'Logos', category: 'Design & Visual Identity', level_percentage: 92 },
  { id: '41', name: 'Affiches', category: 'Design & Visual Identity', level_percentage: 90 },
  { id: '42', name: 'Chartes Graphiques', category: 'Design & Visual Identity', level_percentage: 94 },

  // CI/CD, DevOps & Methodologies
  { id: '43', name: 'Docker', category: 'CI/CD, DevOps & Methodologies', level_percentage: 86 },
  { id: '44', name: 'GitHub', category: 'CI/CD, DevOps & Methodologies', level_percentage: 95 },
  { id: '45', name: 'GitLab', category: 'CI/CD, DevOps & Methodologies', level_percentage: 90 },
  { id: '46', name: 'Jira', category: 'CI/CD, DevOps & Methodologies', level_percentage: 88 },
  { id: '47', name: 'Trello', category: 'CI/CD, DevOps & Methodologies', level_percentage: 92 },
  { id: '48', name: 'Yoast SEO', category: 'CI/CD, DevOps & Methodologies', level_percentage: 88 },
  { id: '49', name: 'Google Analytics', category: 'CI/CD, DevOps & Methodologies', level_percentage: 85 },
  { id: '50', name: 'Linux', category: 'CI/CD, DevOps & Methodologies', level_percentage: 88 },
  { id: '51', name: 'Windows', category: 'CI/CD, DevOps & Methodologies', level_percentage: 95 },
  { id: '52', name: 'MacOS', category: 'CI/CD, DevOps & Methodologies', level_percentage: 90 },
  { id: '53', name: 'UML', category: 'CI/CD, DevOps & Methodologies', level_percentage: 88 },
  { id: '54', name: 'MERISE', category: 'CI/CD, DevOps & Methodologies', level_percentage: 85 },

  // Systems, Networks & Security
  { id: '55', name: 'Windows Server', category: 'Systems, Networks & Security', level_percentage: 94 },
  { id: '56', name: 'Active Directory', category: 'Systems, Networks & Security', level_percentage: 92 },
  { id: '57', name: 'Linux (Ubuntu/Debian)', category: 'Systems, Networks & Security', level_percentage: 90 },
  { id: '58', name: 'Cisco CCNA (Réseaux)', category: 'Systems, Networks & Security', level_percentage: 88 },
  { id: '59', name: 'TCP/IP & DNS/DHCP', category: 'Systems, Networks & Security', level_percentage: 92 },
  { id: '60', name: 'VPN & Tunneling', category: 'Systems, Networks & Security', level_percentage: 90 },
  { id: '61', name: 'Sécurité Réseau & Pare-feu', category: 'Systems, Networks & Security', level_percentage: 92 },
  { id: '62', name: 'Sauvegardes & PRA', category: 'Systems, Networks & Security', level_percentage: 88 },
  { id: '63', name: 'SSH & Accès Distant', category: 'Systems, Networks & Security', level_percentage: 94 },
  { id: '64', name: 'Wireshark', category: 'Systems, Networks & Security', level_percentage: 86 },
  { id: '65', name: 'Virtualisation (VMware)', category: 'Systems, Networks & Security', level_percentage: 90 },
];

export const categoryLabels: Record<string, { fr: string; en: string }> = {
  All: { fr: 'Toutes', en: 'All' },
  'Languages & OOP': { fr: 'Langages & POO', en: 'Languages & OOP' },
  'Front-end & Web Solutions (CMS)': { fr: 'Front-end & CMS', en: 'Front-end & CMS' },
  'Back-end & Databases': { fr: 'Back-end & BDD', en: 'Back-end & Databases' },
  'Mobile Apps': { fr: 'Apps Mobiles', en: 'Mobile Apps' },
  'Design & Visual Identity': { fr: 'Design & Identité Visuelle', en: 'Design & Visual Identity' },
  'CI/CD, DevOps & Methodologies': { fr: 'DevOps & Méthodologies', en: 'DevOps & Methodologies' },
  'Systems, Networks & Security': { fr: 'Systèmes, Réseaux & Sécurité', en: 'Systems, Networks & Security' },
};

const categories = Object.keys(categoryLabels);

const translations = {
  fr: {
    backDashboard: 'Dashboard Admin',
    title: 'Gestionnaire de l’Écosystème Technique',
    subtitle: 'Ajoutez, modifiez ou personnalisez vos compétences techniques, frameworks et outils en direct.',
    btnAddTech: 'Ajouter une technologie',
    metricTotal: 'TOTAL TECHNOLOGIES',
    metricCategories: 'CATÉGORIES ACTIVES',
    metricStatus: 'STATUT DU SYSTÈME',
    metricStatusOk: 'Base de Données Opérationnelle',
    searchPlaceholder: 'Rechercher une techno (ex: React, Java)...',
    confirmDelete: 'Voulez-vous vraiment supprimer cette technologie ?',
    modalAddTitle: 'Ajouter une Technologie',
    modalEditTitle: 'Modifier la Technologie',
    modalSub: 'Mettez à jour les informations enregistrées dans votre portfolio.',
    labelName: 'Nom de la Technologie *',
    labelCategory: 'Catégorie *',
    labelLevel: 'Niveau de Maîtrise',
    btnCancel: 'Annuler',
    btnSaveEdit: 'Enregistrer les modifications',
    btnSaveCreate: 'Ajouter la compétence',
  },
  en: {
    backDashboard: 'Admin Dashboard',
    title: 'Technical Ecosystem Manager',
    subtitle: 'Add, edit, or customize your technical skills, frameworks, and tools in real time.',
    btnAddTech: 'Add Technology',
    metricTotal: 'TOTAL TECHNOLOGIES',
    metricCategories: 'ACTIVE CATEGORIES',
    metricStatus: 'SYSTEM STATUS',
    metricStatusOk: 'Database Operational',
    searchPlaceholder: 'Search technology (e.g. React, Java)...',
    confirmDelete: 'Are you sure you want to delete this technology?',
    modalAddTitle: 'Add Technology',
    modalEditTitle: 'Edit Technology',
    modalSub: 'Update technical skill records in your portfolio database.',
    labelName: 'Technology Name *',
    labelCategory: 'Category *',
    labelLevel: 'Proficiency Level',
    btnCancel: 'Cancel',
    btnSaveEdit: 'Save Changes',
    btnSaveCreate: 'Add Skill',
  },
};

export default function AdminSkillsPage() {
  const { locale } = useLanguage();
  const t = translations[locale];

  const [techList, setTechList] = useState<SupabaseSkill[]>(fallbackSkills);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SupabaseSkill | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('Languages & OOP');
  const [formProficiency, setFormProficiency] = useState(85);

  useEffect(() => {
    async function loadSkills() {
      try {
        const stored = localStorage.getItem('myfolio_skills');
        if (stored) {
          const list: SupabaseSkill[] = JSON.parse(stored);
          if (Array.isArray(list)) {
            const hasSystems = list.some((item) => item.category === 'Systems, Networks & Security');
            if (!hasSystems) {
              const systemsSkills = fallbackSkills.filter((s) => s.category === 'Systems, Networks & Security');
              const merged = [...list, ...systemsSkills];
              setTechList(merged);
              localStorage.setItem('myfolio_skills', JSON.stringify(merged));
              window.dispatchEvent(new Event('myfolio_skills_updated'));
            } else {
              setTechList(list);
            }
          }
        } else {
          localStorage.setItem('myfolio_skills', JSON.stringify(fallbackSkills));
          setTechList(fallbackSkills);
        }

        const data = await fetchSupabaseSkills();
        if (data && data.length > 0) {
          setTechList(data);
          localStorage.setItem('myfolio_skills', JSON.stringify(data));
        }
      } catch (e) {
        console.error('Error loading skills:', e);
      }
    }
    loadSkills();
  }, []);

  const filteredItems = techList.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormName('');
    setFormCategory('Languages & OOP');
    setFormProficiency(85);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: SupabaseSkill) => {
    setEditingItem(item);
    setFormName(item.name);
    setFormCategory(item.category);
    setFormProficiency(item.level_percentage);
    setIsModalOpen(true);
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const payload = {
      name: formName.trim(),
      category: formCategory,
      level_percentage: formProficiency,
    };

    let updatedList: SupabaseSkill[] = [];

    if (editingItem) {
      updatedList = techList.map((item) =>
        item.id === editingItem.id ? { ...item, ...payload } : item
      );
      try {
        await updateSupabaseSkill(editingItem.id, payload);
      } catch (err) {
        console.warn('Supabase offline/local update fallback:', err);
      }
    } else {
      const newItem: SupabaseSkill = {
        id: Date.now().toString(),
        ...payload,
      };
      try {
        const created = await addSupabaseSkill(payload);
        if (created && created[0]) {
          newItem.id = created[0].id;
        }
      } catch (err) {
        console.warn('Supabase offline/local create fallback:', err);
      }
      updatedList = [newItem, ...techList];
    }

    setTechList(updatedList);
    localStorage.setItem('myfolio_skills', JSON.stringify(updatedList));
    window.dispatchEvent(new Event('myfolio_skills_updated'));
    setIsModalOpen(false);
  };

  const handleDeleteItem = async (id: string | number) => {
    if (confirm(t.confirmDelete)) {
      const updated = techList.filter((item) => String(item.id) !== String(id));
      setTechList(updated);
      localStorage.setItem('myfolio_skills', JSON.stringify(updated));
      window.dispatchEvent(new Event('myfolio_skills_updated'));

      try {
        await deleteSupabaseSkill(id);
      } catch (err) {
        console.warn('Supabase offline/local delete fallback:', err);
      }
    }
  };

  return (
    <div className="min-h-screen text-slate-900 dark:text-white pb-16 font-sans">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Bar */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link href="/admin/dashboard" className="text-xs font-mono text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> {t.backDashboard}
              </Link>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
              <Database className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              {t.title}
            </h1>
            <p className="text-xs font-mono text-slate-500 dark:text-zinc-400 mt-1">
              {t.subtitle}
            </p>
          </div>

          <Button variant="primary" size="md" icon={<Plus className="w-4 h-4" />} onClick={handleOpenAddModal}>
            {t.btnAddTech}
          </Button>
        </div>

        {/* Metrics & Search Filter Bar */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card variant="glass" className="p-5">
              <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 uppercase">{t.metricTotal}</span>
              <span className="text-3xl font-bold text-slate-900 dark:text-white font-mono block mt-1">{techList.length}</span>
            </Card>
            <Card variant="glass" className="p-5">
              <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 uppercase">{t.metricCategories}</span>
              <span className="text-3xl font-bold text-blue-600 dark:text-blue-400 font-mono block mt-1">6</span>
            </Card>
            <Card variant="glass" className="p-5">
              <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 uppercase">{t.metricStatus}</span>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 block mt-2 flex items-center gap-1">
                <Check className="w-4 h-4" /> {t.metricStatusOk}
              </span>
            </Card>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 shadow-xs">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-400" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 overflow-x-auto w-full md:w-auto">
              {categories.map((catKey) => {
                const labelObj = categoryLabels[catKey] || { fr: catKey, en: catKey };
                const label = labelObj[locale];
                return (
                  <button
                    key={catKey}
                    onClick={() => setSelectedCategory(catKey)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      selectedCategory === catKey
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'bg-slate-100 dark:bg-zinc-950 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-zinc-800'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Items Data Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((item) => {
              const catLabel = (categoryLabels[item.category] || { fr: item.category, en: item.category })[locale];
              return (
                <Card key={item.id} variant="glass" className="p-4 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-900 dark:text-white text-base">{item.name}</span>
                      <Badge variant="blue" size="sm">{item.level_percentage}%</Badge>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400 block mb-3">{catLabel}</span>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-zinc-800">
                    <button
                      onClick={() => handleOpenEditModal(item)}
                      className="p-1.5 rounded-lg bg-slate-100 dark:bg-zinc-950 hover:bg-slate-200 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 transition-colors cursor-pointer"
                      title="Modifier"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 transition-colors cursor-pointer"
                      title="Supprimer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Add / Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-1 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                {editingItem ? t.modalEditTitle : t.modalAddTitle}
              </h3>
              <p className="text-xs font-mono text-slate-500 dark:text-zinc-400 mb-6">
                {t.modalSub}
              </p>

              <form onSubmit={handleSaveItem} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-700 dark:text-zinc-400 mb-1">{t.labelName}</label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Supabase, Kotlin, Flutter..."
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 dark:text-zinc-400 mb-1">{t.labelCategory}</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-mono"
                  >
                    {categories.filter((c) => c !== 'All').map((catKey) => {
                      const label = (categoryLabels[catKey] || { fr: catKey, en: catKey })[locale];
                      return <option key={catKey} value={catKey}>{label}</option>;
                    })}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 dark:text-zinc-400 mb-1">{t.labelLevel} ({formProficiency}%)</label>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={formProficiency}
                    onChange={(e) => setFormProficiency(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <Button type="button" variant="glass" size="md" onClick={() => setIsModalOpen(false)}>
                    {t.btnCancel}
                  </Button>
                  <Button type="submit" variant="primary" size="md" icon={<Save className="w-4 h-4" />}>
                    {editingItem ? t.btnSaveEdit : t.btnSaveCreate}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
