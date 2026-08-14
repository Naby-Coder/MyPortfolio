'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/language/LanguageContext';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input, TextArea } from '@/components/ui/Input';
import {
  Briefcase,
  GraduationCap,
  Plus,
  Edit2,
  Trash2,
  ChevronLeft,
  X,
  Save,
  CheckCircle2,
  Calendar,
  MapPin,
  Sparkles,
  Layers,
  Globe,
  Award,
  ShieldCheck,
  UploadCloud,
  Image as ImageIcon,
} from 'lucide-react';
import {
  CertificationBadge,
  defaultCertificationBadges,
} from '@/components/ui/PartnerLogoMarquee';
import { compressImage } from '@/lib/imageCompressor';

export interface AdminExperience {
  id: number | string;
  role_fr: string;
  role_en: string;
  company: string;
  period_fr: string;
  period_en: string;
  bullets_fr: string[];
  bullets_en: string[];
  tags: string[];
}

export interface AdminEducation {
  id: number | string;
  degree_fr: string;
  degree_en: string;
  school: string;
  period_fr: string;
  period_en: string;
  badge_fr: string;
  badge_en: string;
  badgeVariant: 'success' | 'violet' | 'blue' | 'warning';
}

const defaultExperiences: AdminExperience[] = [
  {
    id: 1,
    role_fr: 'Développeur Web & Mobile · Designer Graphique (Freelance)',
    role_en: 'Web & Mobile Developer · Graphic Designer (Freelance)',
    company: 'Kossy Tech Solutions · Télétravail / Remote',
    period_fr: 'Janvier 2023 — Présent',
    period_en: 'January 2023 — Present',
    bullets_fr: [
      'Conception et développement sur-mesure de sites web et applications web & mobiles réactives (Next.js, React, WordPress, Laravel, MySQL, Flutter...).',
      'Création complète d’identités visuelles percutantes : logos, chartes graphiques, maquettes et prototypes interactifs UI/UX (Figma, Photoshop, Illustrator).',
      'Administration technique complète du site de l’entreprise et des sites clients : gestion des hébergements, noms de domaine, sauvegardes régulières et déploiements continus (CI/CD, Vercel, Cloud).',
      'Gestion et support informatique : installation et optimisation de systèmes d’exploitation (Windows, Linux), montage de PC et maintenance technique.',
      'Collaboration étroite et conseil technique auprès des clients pour identifier leurs besoins et concevoir des solutions numériques clé-en-main.',
    ],
    bullets_en: [
      'Custom engineering and development of responsive websites and web/mobile apps (Next.js, React, WordPress, Laravel, MySQL, Flutter...).',
      'End-to-end visual identity and branding design: logos, brand guidelines, and interactive UI/UX prototypes (Figma, Photoshop, Illustrator).',
      'Complete technical administration of company and client websites: managing hosting servers, domain configurations, automated backups, and continuous deployments (CI/CD, Vercel, Cloud).',
      'IT infrastructure and systems support: OS setup (Windows, Linux), PC hardware assembly, and maintenance.',
      'Close client collaboration and technical consulting to deliver turnkey digital transformation solutions.',
    ],
    tags: ['WordPress', 'Next.js', 'React', 'Flutter', 'Laravel', 'PHP / MySQL', 'Figma', 'Identité Visuelle', 'CI/CD & Cloud'],
  },
  {
    id: 2,
    role_fr: 'Stagiaire en Administration de Sites Web',
    role_en: 'Web Administration Intern',
    company: 'Université Numérique Cheikh Hamidou Kane – ANDS · Sénégal',
    period_fr: 'Octobre 2024 — Juin 2025',
    period_en: 'October 2024 — June 2025',
    bullets_fr: [
      'Administration technique du site web et intégration de pages sous WordPress.',
      'Gestion de contenu et mise à jour régulière des informations.',
      'Optimisation des performances web et gestion des sauvegardes régulières.',
    ],
    bullets_en: [
      'Technical site administration and content creation on WordPress.',
      'Content management and continuous updates.',
      'Performance optimization and regular automated backup strategy.',
    ],
    tags: ['WordPress', 'Contenu', 'Optimisation'],
  },
  {
    id: 3,
    role_fr: 'Participant — Hackathon Cezat & Sonatel',
    role_en: 'Participant — Cezat & Sonatel Hackathon',
    company: 'Tivaouane, Sénégal',
    period_fr: 'Septembre 2023 & Septembre 2024',
    period_en: 'September 2023 & September 2024',
    bullets_fr: [
      'Programmation et développement technique au sein d’une équipe pluridisciplinaire.',
      'Présentation de projets, créativité et gestion des délais sous contrainte de temps.',
    ],
    bullets_en: [
      'Programming and technical development in a multidisciplinary team.',
      'Project pitching, creative problem solving, and strict deadline execution.',
    ],
    tags: ['Hackathon', 'Travail d’équipe', 'Créativité'],
  },
];

const defaultEducations: AdminEducation[] = [
  {
    id: 0,
    degree_fr: 'Master en Conception & Développement d’Applications Web, Full-Stack et Gaming',
    degree_en: 'Master’s Degree in Web, Full-Stack & Gaming Application Design & Development',
    school: 'Université Numérique Cheikh Hamidou Kane (UNCHK) · Dakar, Sénégal',
    period_fr: 'Août 2026 — En cours',
    period_en: 'August 2026 — In progress',
    badge_fr: 'En cours',
    badge_en: 'In progress',
    badgeVariant: 'success',
  },
  {
    id: 1,
    degree_fr: 'Diplôme en Réseaux et Sécurité de l’Information',
    degree_en: 'Diploma in Networking and Information Security',
    school: 'Collège communautaire du Nouveau-Brunswick (CCNB) – Campus de Dieppe · Dieppe, NB, Canada',
    period_fr: 'Septembre 2025 — En cours',
    period_en: 'September 2025 — In progress',
    badge_fr: 'En cours',
    badge_en: 'In progress',
    badgeVariant: 'success',
  },
  {
    id: 2,
    degree_fr: 'Licence en Développement d’Applications Web, Mobiles et Jeux Vidéo',
    degree_en: 'Bachelor Degree in Web, Mobile and Gaming Application Development',
    school: 'Université Numérique Cheikh Hamidou Kane (UNCHK) · Dakar, Sénégal',
    period_fr: 'Janvier 2021 — Juillet 2025',
    period_en: 'January 2021 — July 2025',
    badge_fr: 'Obtenu',
    badge_en: 'Obtained',
    badgeVariant: 'violet',
  },
  {
    id: 3,
    degree_fr: 'Baccalauréat en Sciences Sociales et Humaines',
    degree_en: 'High School Diploma in Social and Human Sciences',
    school: 'Cheikh Anta Diop Académie · Thiès, Sénégal',
    period_fr: 'Octobre 2018 — Juillet 2021',
    period_en: 'October 2018 — July 2021',
    badge_fr: 'Obtenu',
    badge_en: 'Obtained',
    badgeVariant: 'violet',
  },
];

const translations = {
  fr: {
    backDashboard: 'Dashboard Admin',
    title: 'Gestion du Parcours, Diplômes & Badges',
    subtitle: 'Gérez vos expériences professionnelles, formations académiques et badges de certification en temps réel (FR / EN).',
    tabExp: 'Expériences Professionnelles',
    tabEdu: 'Formations Académiques',
    tabBadges: 'Badges & Certifications',
    btnAddExp: 'Ajouter une expérience',
    btnAddEdu: 'Ajouter une formation',
    btnAddBadge: 'Ajouter un badge de certification',
    emptyExp: 'Aucune expérience enregistrée.',
    emptyEdu: 'Aucune formation enregistrée.',
    emptyBadges: 'Aucun badge de certification enregistré.',
    edit: 'Modifier',
    delete: 'Supprimer',
    confirmDeleteExp: 'Voulez-vous vraiment supprimer cette expérience professionnelle ?',
    confirmDeleteEdu: 'Voulez-vous vraiment supprimer cette formation académique ?',
    confirmDeleteBadge: 'Voulez-vous vraiment supprimer ce badge de certification ?',
    modalExpAdd: 'Ajouter une Expérience (Bilingue FR / EN)',
    modalExpEdit: 'Modifier l’Expérience (Bilingue FR / EN)',
    modalEduAdd: 'Ajouter une Formation (Bilingue FR / EN)',
    modalEduEdit: 'Modifier la Formation (Bilingue FR / EN)',
    modalBadgeAdd: 'Ajouter un Badge de Certification',
    modalBadgeEdit: 'Modifier le Badge de Certification',
    modalBadgeSub: 'Configurez le code du badge, l’intitulé, l’image et l’organisme émetteur.',
    labelBadgeCode: 'Code / Acronym du Badge (ex: CCNA 1, AWS, CYBERSECURITY) *',
    labelBadgeTitleFr: 'Titre de la Certification (Français) *',
    labelBadgeTitleEn: 'Certification Title (English) *',
    labelBadgeIssuer: 'Organisme Émetteur (ex: Cisco, Google, Coursera) *',
    labelBadgeDate: 'Année / Date (ex: 2024) *',
    labelBadgeCategory: 'Catégorie (ex: Réseaux, Sécurité, Web) *',
    labelBadgeCredentialUrl: 'Lien officiel de vérification (URL Credly, Cisco, Coursera, etc.)',
    labelBadgeImage: 'Image / Logo du Badge (Upload ou URL)',
    labelBadgeColor: 'Couleur de mise en valeur',
    labelRoleFr: 'Intitulé du Poste / Rôle (Français) *',
    labelRoleEn: 'Role / Job Title (English) *',
    labelCompany: 'Entreprise / Organisation & Lieu *',
    labelPeriodFr: 'Période (Français) *',
    labelPeriodEn: 'Period (English) *',
    labelBulletsFr: 'Missions / Réalisations (Français - une par ligne)',
    labelBulletsEn: 'Missions / Key Accomplishments (English - one per line)',
    labelTags: 'Technologies / Tags (séparés par des virgules)',
    labelDegreeFr: 'Intitulé du Diplôme (Français) *',
    labelDegreeEn: 'Degree Title (English) *',
    labelSchool: 'Établissement & Ville *',
    labelBadgeFr: 'Texte du Badge (Français) *',
    labelBadgeEn: 'Badge Text (English) *',
    labelBadgeVariant: 'Couleur du Badge',
    cancel: 'Annuler',
    save: 'Enregistrer',
  },
  en: {
    backDashboard: 'Admin Dashboard',
    title: 'Journey, Education & Badges Manager',
    subtitle: 'Manage your professional experiences, education records and certification badges in real-time (FR & EN).',
    tabExp: 'Professional Experiences',
    tabEdu: 'Academic Education',
    tabBadges: 'Badges & Certifications',
    btnAddExp: 'Add Experience',
    btnAddEdu: 'Add Education',
    btnAddBadge: 'Add Certification Badge',
    emptyExp: 'No experiences recorded.',
    emptyEdu: 'No education records.',
    emptyBadges: 'No certification badges recorded.',
    edit: 'Edit',
    delete: 'Delete',
    confirmDeleteExp: 'Are you sure you want to delete this experience?',
    confirmDeleteEdu: 'Are you sure you want to delete this education entry?',
    confirmDeleteBadge: 'Are you sure you want to delete this certification badge?',
    modalExpAdd: 'Add Experience (Bilingual FR / EN)',
    modalExpEdit: 'Edit Experience (Bilingual FR / EN)',
    modalEduAdd: 'Add Education (Bilingual FR / EN)',
    modalEduEdit: 'Edit Education (Bilingual FR / EN)',
    modalBadgeAdd: 'Add Certification Badge',
    modalBadgeEdit: 'Edit Certification Badge',
    modalBadgeSub: 'Configure badge code, title, logo image, and issuing organization.',
    labelBadgeCode: 'Badge Code / Acronym (e.g. CCNA 1, AWS, CYBERSECURITY) *',
    labelBadgeTitleFr: 'Certification Title (French) *',
    labelBadgeTitleEn: 'Certification Title (English) *',
    labelBadgeIssuer: 'Issuing Organization (e.g. Cisco, Google, Coursera) *',
    labelBadgeDate: 'Year / Date (e.g. 2024) *',
    labelBadgeCategory: 'Category (e.g. Networking, Security, Web) *',
    labelBadgeCredentialUrl: 'Official Credential URL (Credly, Cisco, Coursera, etc.)',
    labelBadgeImage: 'Badge Logo / Image (Upload or URL)',
    labelBadgeColor: 'Highlight Color',
    labelRoleFr: 'Job Title (French) *',
    labelRoleEn: 'Job Title (English) *',
    labelCompany: 'Company / Organization & Location *',
    labelPeriodFr: 'Period (French) *',
    labelPeriodEn: 'Period (English) *',
    labelBulletsFr: 'Key Accomplishments (French - one per line)',
    labelBulletsEn: 'Key Accomplishments (English - one per line)',
    labelTags: 'Technologies / Tags (comma separated)',
    labelDegreeFr: 'Degree Title (French) *',
    labelDegreeEn: 'Degree Title (English) *',
    labelSchool: 'Institution & Location *',
    labelBadgeFr: 'Badge Text (French) *',
    labelBadgeEn: 'Badge Text (English) *',
    labelBadgeVariant: 'Badge Color',
    cancel: 'Cancel',
    save: 'Save Changes',
  },
};

export default function AdminJourneyPage() {
  const { locale } = useLanguage();
  const t = translations[locale];

  const [activeTab, setActiveTab] = useState<'experiences' | 'educations' | 'badges'>('experiences');

  // Lists
  const [experiences, setExperiences] = useState<AdminExperience[]>(defaultExperiences);
  const [educations, setEducations] = useState<AdminEducation[]>(defaultEducations);
  const [badges, setBadges] = useState<CertificationBadge[]>(defaultCertificationBadges);

  // Modals
  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<AdminExperience | null>(null);

  const [isEduModalOpen, setIsEduModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState<AdminEducation | null>(null);

  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);
  const [editingBadge, setEditingBadge] = useState<CertificationBadge | null>(null);

  // Form State - Experience
  const [expRoleFr, setExpRoleFr] = useState('');
  const [expRoleEn, setExpRoleEn] = useState('');
  const [expCompany, setExpCompany] = useState('');
  const [expPeriodFr, setExpPeriodFr] = useState('');
  const [expPeriodEn, setExpPeriodEn] = useState('');
  const [expBulletsFr, setExpBulletsFr] = useState('');
  const [expBulletsEn, setExpBulletsEn] = useState('');
  const [expTags, setExpTags] = useState('');

  // Form State - Education
  const [eduDegreeFr, setEduDegreeFr] = useState('');
  const [eduDegreeEn, setEduDegreeEn] = useState('');
  const [eduSchool, setEduSchool] = useState('');
  const [eduPeriodFr, setEduPeriodFr] = useState('');
  const [eduPeriodEn, setEduPeriodEn] = useState('');
  const [eduBadgeFr, setEduBadgeFr] = useState('En cours');
  const [eduBadgeEn, setEduBadgeEn] = useState('In progress');
  const [eduBadgeVariant, setEduBadgeVariant] = useState<'success' | 'violet' | 'blue' | 'warning'>('success');

  // Form State - Badge
  const [badgeCode, setBadgeCode] = useState('');
  const [badgeTitleFr, setBadgeTitleFr] = useState('');
  const [badgeTitleEn, setBadgeTitleEn] = useState('');
  const [badgeIssuer, setBadgeIssuer] = useState('');
  const [badgeDate, setBadgeDate] = useState('2024');
  const [badgeCategory, setBadgeCategory] = useState('Réseaux & Sécurité');
  const [badgeCredentialUrl, setBadgeCredentialUrl] = useState('');
  const [badgeImage, setBadgeImage] = useState('');
  const [badgeColor, setBadgeColor] = useState<'blue' | 'purple' | 'emerald' | 'amber'>('blue');

  const badgeFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load experiences from Supabase API
    fetch('/api/experiences')
      .then((res) => res.json())
      .then((res) => {
        if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
          setExperiences(res.data);
        }
      })
      .catch((err) => console.error('Error loading experiences API:', err));

    // Load education records from Supabase API
    fetch('/api/education')
      .then((res) => res.json())
      .then((res) => {
        if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
          setEducations(res.data);
        }
      })
      .catch((err) => console.error('Error loading education API:', err));

    // Load badges from live cloud API
    fetch('/api/certifications')
      .then((r) => r.json())
      .then((res) => {
        if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
          setBadges(res.data);
        }
      })
      .catch((err) => console.error('Error loading badges API:', err));
  }, []);

  // Badge Handlers
  const handleOpenAddBadge = () => {
    setEditingBadge(null);
    setBadgeCode('');
    setBadgeTitleFr('');
    setBadgeTitleEn('');
    setBadgeIssuer('');
    setBadgeDate(new Date().getFullYear().toString());
    setBadgeCategory('Réseaux & IT');
    setBadgeCredentialUrl('');
    setBadgeImage('');
    setBadgeColor('blue');
    setIsBadgeModalOpen(true);
  };

  const handleOpenEditBadge = (item: CertificationBadge) => {
    setEditingBadge(item);
    setBadgeCode(item.badgeCode);
    setBadgeTitleFr(item.titleFr);
    setBadgeTitleEn(item.titleEn);
    setBadgeIssuer(item.issuer);
    setBadgeDate(item.date);
    setBadgeCategory(item.category);
    setBadgeCredentialUrl(item.credentialUrl || '');
    setBadgeImage(item.image || '');
    setBadgeColor(item.colorVariant || 'blue');
    setIsBadgeModalOpen(true);
  };

  const handleBadgeImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      if (json?.success && json?.url) {
        setBadgeImage(json.url);
      } else {
        const compressed = await compressImage(file, 400, 400, 0.85);
        setBadgeImage(compressed);
      }
    } catch (err) {
      console.error('Error uploading badge image:', err);
      const compressed = await compressImage(file, 400, 400, 0.85);
      setBadgeImage(compressed);
    }
  };

  const handleSaveBadge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!badgeCode.trim() || !badgeTitleFr.trim() || !badgeIssuer.trim()) return;

    const payload: CertificationBadge = {
      id: editingBadge ? editingBadge.id : `badge-${Date.now()}`,
      badgeCode: badgeCode.trim(),
      titleFr: badgeTitleFr.trim(),
      titleEn: badgeTitleEn.trim() || badgeTitleFr.trim(),
      issuer: badgeIssuer.trim(),
      date: badgeDate.trim(),
      category: badgeCategory.trim(),
      credentialUrl: badgeCredentialUrl.trim() || undefined,
      image: badgeImage.trim() || undefined,
      colorVariant: badgeColor,
    };

    let updated: CertificationBadge[] = [];
    if (editingBadge) {
      updated = badges.map((b) => (b.id === editingBadge.id ? payload : b));
    } else {
      updated = [payload, ...badges];
    }

    setBadges(updated);

    try {
      await fetch('/api/certifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ badges: updated }),
      });
    } catch (err) {
      console.error('Cloud sync error (certifications):', err);
    }

    setIsBadgeModalOpen(false);
  };

  const handleDeleteBadge = async (id: string) => {
    if (confirm(t.confirmDeleteBadge)) {
      const updated = badges.filter((b) => b.id !== id);
      setBadges(updated);

      try {
        await fetch(`/api/certifications?id=${encodeURIComponent(id)}`, {
          method: 'DELETE',
        });
      } catch (err) {
        console.error('Delete error (certifications):', err);
      }
    }
  };

  // Experience Handlers
  const handleOpenAddExp = () => {
    setEditingExp(null);
    setExpRoleFr('');
    setExpRoleEn('');
    setExpCompany('');
    setExpPeriodFr('');
    setExpPeriodEn('');
    setExpBulletsFr('');
    setExpBulletsEn('');
    setExpTags('');
    setIsExpModalOpen(true);
  };

  const handleOpenEditExp = (exp: AdminExperience) => {
    setEditingExp(exp);
    setExpRoleFr(exp.role_fr);
    setExpRoleEn(exp.role_en);
    setExpCompany(exp.company);
    setExpPeriodFr(exp.period_fr);
    setExpPeriodEn(exp.period_en);
    setExpBulletsFr(exp.bullets_fr.join('\n'));
    setExpBulletsEn(exp.bullets_en.join('\n'));
    setExpTags(exp.tags.join(', '));
    setIsExpModalOpen(true);
  };

  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expRoleFr.trim() || !expCompany.trim()) return;

    const payload: AdminExperience = {
      id: editingExp ? editingExp.id : Date.now(),
      role_fr: expRoleFr.trim(),
      role_en: expRoleEn.trim() || expRoleFr.trim(),
      company: expCompany.trim(),
      period_fr: expPeriodFr.trim(),
      period_en: expPeriodEn.trim() || expPeriodFr.trim(),
      bullets_fr: expBulletsFr.split('\n').map((b) => b.trim()).filter(Boolean),
      bullets_en: expBulletsEn.split('\n').map((b) => b.trim()).filter(Boolean),
      tags: expTags.split(',').map((t) => t.trim()).filter(Boolean),
    };

    let updated: AdminExperience[] = [];
    if (editingExp) {
      updated = experiences.map((item) => (item.id === editingExp.id ? payload : item));
    } else {
      updated = [payload, ...experiences];
    }

    setExperiences(updated);

    try {
      await fetch('/api/experiences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error('Cloud save error (experiences):', err);
    }

    setIsExpModalOpen(false);
  };

  const handleDeleteExp = async (id: number | string) => {
    if (confirm(t.confirmDeleteExp)) {
      const updated = experiences.filter((item) => item.id !== id);
      setExperiences(updated);

      try {
        await fetch(`/api/experiences?id=${encodeURIComponent(id)}`, {
          method: 'DELETE',
        });
      } catch (err) {
        console.error('Delete error (experiences):', err);
      }
    }
  };

  // Education Handlers
  const handleOpenAddEdu = () => {
    setEditingEdu(null);
    setEduDegreeFr('');
    setEduDegreeEn('');
    setEduSchool('');
    setEduPeriodFr('');
    setEduPeriodEn('');
    setEduBadgeFr('En cours');
    setEduBadgeEn('In progress');
    setEduBadgeVariant('success');
    setIsEduModalOpen(true);
  };

  const handleOpenEditEdu = (edu: AdminEducation) => {
    setEditingEdu(edu);
    setEduDegreeFr(edu.degree_fr);
    setEduDegreeEn(edu.degree_en);
    setEduSchool(edu.school);
    setEduPeriodFr(edu.period_fr);
    setEduPeriodEn(edu.period_en);
    setEduBadgeFr(edu.badge_fr);
    setEduBadgeEn(edu.badge_en);
    setEduBadgeVariant(edu.badgeVariant);
    setIsEduModalOpen(true);
  };

  const handleSaveEdu = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eduDegreeFr.trim() || !eduSchool.trim()) return;

    const payload: AdminEducation = {
      id: editingEdu ? editingEdu.id : Date.now(),
      degree_fr: eduDegreeFr.trim(),
      degree_en: eduDegreeEn.trim() || eduDegreeFr.trim(),
      school: eduSchool.trim(),
      period_fr: eduPeriodFr.trim(),
      period_en: eduPeriodEn.trim() || eduPeriodFr.trim(),
      badge_fr: eduBadgeFr.trim(),
      badge_en: eduBadgeEn.trim() || eduBadgeFr.trim(),
      badgeVariant: eduBadgeVariant,
    };

    let updated: AdminEducation[] = [];
    if (editingEdu) {
      updated = educations.map((item) => (item.id === editingEdu.id ? payload : item));
    } else {
      updated = [payload, ...educations];
    }

    setEducations(updated);

    try {
      await fetch('/api/education', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error('Cloud save error (education):', err);
    }

    setIsEduModalOpen(false);
  };

  const handleDeleteEdu = async (id: number | string) => {
    if (confirm(t.confirmDeleteEdu)) {
      const updated = educations.filter((item) => item.id !== id);
      setEducations(updated);

      try {
        await fetch(`/api/education?id=${encodeURIComponent(id)}`, {
          method: 'DELETE',
        });
      } catch (err) {
        console.error('Delete error (education):', err);
      }
    }
  };

  return (
    <div className="min-h-screen text-slate-900 dark:text-white pb-20 font-sans">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Breadcrumb */}
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{t.backDashboard}</span>
        </Link>

        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="blue" size="sm">GESTION CARRIÈRE & ACCRÉDITATIONS</Badge>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t.title}</h1>
            <p className="text-xs font-mono text-slate-500 dark:text-zinc-400 mt-1">{t.subtitle}</p>
          </div>

          <div className="flex items-center gap-2">
            {activeTab === 'experiences' && (
              <Button variant="primary" size="md" icon={<Plus className="w-4 h-4" />} onClick={handleOpenAddExp}>
                {t.btnAddExp}
              </Button>
            )}
            {activeTab === 'educations' && (
              <Button variant="primary" size="md" icon={<Plus className="w-4 h-4" />} onClick={handleOpenAddEdu}>
                {t.btnAddEdu}
              </Button>
            )}
            {activeTab === 'badges' && (
              <Button variant="primary" size="md" icon={<Plus className="w-4 h-4" />} onClick={handleOpenAddBadge}>
                {t.btnAddBadge}
              </Button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mb-8 p-1.5 rounded-2xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-white/10 w-fit">
          <button
            type="button"
            onClick={() => setActiveTab('experiences')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'experiences'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>{t.tabExp} ({experiences.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('educations')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'educations'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>{t.tabEdu} ({educations.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('badges')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'badges'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>{t.tabBadges} ({badges.length})</span>
          </button>
        </div>

        {/* TAB 1: EXPERIENCES */}
        {activeTab === 'experiences' && (
          <div className="space-y-4">
            {experiences.length > 0 ? (
              experiences.map((exp) => (
                <Card key={exp.id} variant="glass" className="p-6 border border-slate-200 dark:border-white/10 hover:border-blue-500/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <strong className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                          {locale === 'fr' ? exp.role_fr : exp.role_en}
                        </strong>
                      </div>
                      <p className="text-xs font-mono text-blue-600 dark:text-blue-400 mb-2">{exp.company}</p>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-md inline-block mb-3">
                        {locale === 'fr' ? exp.period_fr : exp.period_en}
                      </span>

                      <ul className="space-y-1 mb-3">
                        {(locale === 'fr' ? exp.bullets_fr : exp.bullets_en).map((b, idx) => (
                          <li key={idx} className="text-xs text-slate-600 dark:text-zinc-300 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      {exp.tags && exp.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {exp.tags.map((tg, i) => (
                            <Badge key={i} variant="blue" size="sm">{tg}</Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Button variant="glass" size="sm" icon={<Edit2 className="w-3.5 h-3.5" />} onClick={() => handleOpenEditExp(exp)}>
                        {t.edit}
                      </Button>
                      <Button variant="outlined" size="sm" icon={<Trash2 className="w-3.5 h-3.5 text-red-500" />} onClick={() => handleDeleteExp(exp.id)}>
                        {t.delete}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="py-16 text-center text-slate-500 font-mono text-sm">{t.emptyExp}</div>
            )}
          </div>
        )}

        {/* TAB 2: EDUCATIONS */}
        {activeTab === 'educations' && (
          <div className="space-y-4">
            {educations.length > 0 ? (
              educations.map((edu) => (
                <Card key={edu.id} variant="glass" className="p-6 border border-slate-200 dark:border-white/10 hover:border-purple-500/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <strong className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                          {locale === 'fr' ? edu.degree_fr : edu.degree_en}
                        </strong>
                        <Badge variant={edu.badgeVariant} size="sm">
                          {locale === 'fr' ? edu.badge_fr : edu.badge_en}
                        </Badge>
                      </div>
                      <p className="text-xs font-mono text-purple-600 dark:text-purple-400">{edu.school}</p>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 mt-1 block">
                        {locale === 'fr' ? edu.period_fr : edu.period_en}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Button variant="glass" size="sm" icon={<Edit2 className="w-3.5 h-3.5" />} onClick={() => handleOpenEditEdu(edu)}>
                        {t.edit}
                      </Button>
                      <Button variant="outlined" size="sm" icon={<Trash2 className="w-3.5 h-3.5 text-red-500" />} onClick={() => handleDeleteEdu(edu.id)}>
                        {t.delete}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="py-16 text-center text-slate-500 font-mono text-sm">{t.emptyEdu}</div>
            )}
          </div>
        )}

        {/* TAB 3: BADGES & CERTIFICATIONS (WITH CUSTOM LOGO UPLOAD & EDIT) */}
        {activeTab === 'badges' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.length > 0 ? (
              badges.map((b) => (
                <Card
                  key={b.id}
                  variant="glass"
                  className="p-5 border border-slate-200 dark:border-white/10 hover:border-blue-500/50 transition-all flex flex-col justify-between group"
                >
                  <div className="flex items-start gap-3.5 mb-4">
                    {/* Badge Emblem or Image */}
                    {b.image ? (
                      <div className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-800 p-1.5 flex items-center justify-center border border-slate-200 dark:border-white/10 shadow-xs shrink-0 overflow-hidden">
                        <img
                          src={b.image}
                          alt={b.badgeCode}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-xs ${
                          b.colorVariant === 'blue'
                            ? 'bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                            : b.colorVariant === 'purple'
                            ? 'bg-purple-600/10 text-purple-600 dark:text-purple-400 border border-purple-500/20'
                            : b.colorVariant === 'emerald'
                            ? 'bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-600/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                    )}

                    <div className="overflow-hidden flex-1">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 truncate">
                          {b.badgeCode}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 shrink-0">{b.date}</span>
                      </div>
                      <strong className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white block line-clamp-1">
                        {locale === 'fr' ? b.titleFr : b.titleEn}
                      </strong>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 block truncate mt-0.5">
                        {b.issuer}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 dark:border-white/5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-zinc-400">
                      {b.category}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEditBadge(b)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                        title={t.edit}
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteBadge(b.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer"
                        title={t.delete}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-3 py-16 text-center text-slate-500 font-mono text-sm">{t.emptyBadges}</div>
            )}
          </div>
        )}
      </div>

      {/* MODAL: ADD / EDIT BADGE */}
      {isBadgeModalOpen && (
        <div
          onClick={() => setIsBadgeModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl"
          >
            <div className="p-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-zinc-950/50">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {editingBadge ? t.modalBadgeEdit : t.modalBadgeAdd}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsBadgeModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBadge} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
              <Input
                label={t.labelBadgeCode}
                value={badgeCode}
                onChange={(e) => setBadgeCode(e.target.value)}
                placeholder="ex: CCNA 1, AWS, CYBERSECURITY"
                required
              />

              <Input
                label={t.labelBadgeTitleFr}
                value={badgeTitleFr}
                onChange={(e) => setBadgeTitleFr(e.target.value)}
                placeholder="ex: Cisco Certified Network Associate"
                required
              />

              <Input
                label={t.labelBadgeTitleEn}
                value={badgeTitleEn}
                onChange={(e) => setBadgeTitleEn(e.target.value)}
                placeholder="ex: Cisco Certified Network Associate"
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label={t.labelBadgeIssuer}
                  value={badgeIssuer}
                  onChange={(e) => setBadgeIssuer(e.target.value)}
                  placeholder="ex: Cisco, Google, Coursera"
                  required
                />
                <Input
                  label={t.labelBadgeDate}
                  value={badgeDate}
                  onChange={(e) => setBadgeDate(e.target.value)}
                  placeholder="ex: 2024"
                  required
                />
              </div>

              <Input
                label={t.labelBadgeCategory}
                value={badgeCategory}
                onChange={(e) => setBadgeCategory(e.target.value)}
                placeholder="ex: Réseaux, Sécurité, Web"
              />

              <Input
                label={t.labelBadgeCredentialUrl}
                value={badgeCredentialUrl}
                onChange={(e) => setBadgeCredentialUrl(e.target.value)}
                placeholder="ex: https://www.credly.com/badges/... ou https://www.netacad.com"
              />

              {/* Logo Upload or URL */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-500 dark:text-zinc-400 block">
                  {t.labelBadgeImage}
                </label>

                {/* Direct URL Input */}
                <div className="flex items-center gap-2">
                  <Input
                    value={badgeImage}
                    onChange={(e) => setBadgeImage(e.target.value)}
                    placeholder="Coller l'URL de l'image (ex: https://.../badge.png)"
                    className="flex-1"
                  />
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <span className="text-[11px] font-mono text-slate-400 dark:text-zinc-500">ou importer un fichier :</span>

                  <input
                    type="file"
                    ref={badgeFileRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleBadgeImageUpload}
                  />

                  <Button
                    type="button"
                    variant="glass"
                    size="sm"
                    icon={<UploadCloud className="w-4 h-4 text-blue-500" />}
                    onClick={() => badgeFileRef.current?.click()}
                  >
                    Choisir un fichier
                  </Button>

                  {badgeImage && (
                    <div className="flex items-center gap-2 ml-auto">
                      <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-slate-200 dark:border-white/10 shrink-0">
                        <img src={badgeImage} alt="Aperçu" className="w-full h-full object-cover" />
                      </div>
                      <button
                        type="button"
                        onClick={() => setBadgeImage('')}
                        className="text-xs text-red-500 hover:text-red-600 font-mono flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Effacer</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Color Selector */}
              <div>
                <label className="text-xs font-mono text-slate-500 dark:text-zinc-400 block mb-1.5">
                  {t.labelBadgeColor}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'blue', label: 'Bleu', class: 'bg-blue-600' },
                    { id: 'purple', label: 'Violet', class: 'bg-purple-600' },
                    { id: 'emerald', label: 'Émeraude', class: 'bg-emerald-600' },
                    { id: 'amber', label: 'Ambre', class: 'bg-amber-500' },
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setBadgeColor(c.id as any)}
                      className={`p-2 rounded-xl border text-xs font-mono flex items-center justify-center gap-1.5 cursor-pointer ${
                        badgeColor === c.id
                          ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-500/20 font-bold'
                          : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400'
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${c.class}`} />
                      <span>{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex justify-end gap-2">
                <Button type="button" variant="outlined" size="sm" onClick={() => setIsBadgeModalOpen(false)}>
                  {t.cancel}
                </Button>
                <Button type="submit" variant="primary" size="sm" icon={<Save className="w-4 h-4" />}>
                  {t.save}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT EXP */}
      {isExpModalOpen && (
        <div
          onClick={() => setIsExpModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl"
          >
            <div className="p-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-zinc-950/50">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {editingExp ? t.modalExpEdit : t.modalExpAdd}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsExpModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveExp} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  label={t.labelRoleFr}
                  value={expRoleFr}
                  onChange={(e) => setExpRoleFr(e.target.value)}
                  required
                />
                <Input
                  label={t.labelRoleEn}
                  value={expRoleEn}
                  onChange={(e) => setExpRoleEn(e.target.value)}
                />
              </div>

              <Input
                label={t.labelCompany}
                value={expCompany}
                onChange={(e) => setExpCompany(e.target.value)}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  label={t.labelPeriodFr}
                  value={expPeriodFr}
                  onChange={(e) => setExpPeriodFr(e.target.value)}
                  required
                />
                <Input
                  label={t.labelPeriodEn}
                  value={expPeriodEn}
                  onChange={(e) => setExpPeriodEn(e.target.value)}
                />
              </div>

              <TextArea
                label={t.labelBulletsFr}
                rows={3}
                value={expBulletsFr}
                onChange={(e) => setExpBulletsFr(e.target.value)}
              />

              <TextArea
                label={t.labelBulletsEn}
                rows={3}
                value={expBulletsEn}
                onChange={(e) => setExpBulletsEn(e.target.value)}
              />

              <Input
                label={t.labelTags}
                value={expTags}
                onChange={(e) => setExpTags(e.target.value)}
                placeholder="ex: WordPress, PHP, Laravel"
              />

              <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex justify-end gap-2">
                <Button type="button" variant="outlined" size="sm" onClick={() => setIsExpModalOpen(false)}>
                  {t.cancel}
                </Button>
                <Button type="submit" variant="primary" size="sm" icon={<Save className="w-4 h-4" />}>
                  {t.save}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT EDU */}
      {isEduModalOpen && (
        <div
          onClick={() => setIsEduModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl"
          >
            <div className="p-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-zinc-950/50">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {editingEdu ? t.modalEduEdit : t.modalEduAdd}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEduModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdu} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  label={t.labelDegreeFr}
                  value={eduDegreeFr}
                  onChange={(e) => setEduDegreeFr(e.target.value)}
                  required
                />
                <Input
                  label={t.labelDegreeEn}
                  value={eduDegreeEn}
                  onChange={(e) => setEduDegreeEn(e.target.value)}
                />
              </div>

              <Input
                label={t.labelSchool}
                value={eduSchool}
                onChange={(e) => setEduSchool(e.target.value)}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  label={t.labelPeriodFr}
                  value={eduPeriodFr}
                  onChange={(e) => setEduPeriodFr(e.target.value)}
                  required
                />
                <Input
                  label={t.labelPeriodEn}
                  value={eduPeriodEn}
                  onChange={(e) => setEduPeriodEn(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  label={t.labelBadgeFr}
                  value={eduBadgeFr}
                  onChange={(e) => setEduBadgeFr(e.target.value)}
                  required
                />
                <Input
                  label={t.labelBadgeEn}
                  value={eduBadgeEn}
                  onChange={(e) => setEduBadgeEn(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-500 dark:text-zinc-400 block mb-1.5">
                  {t.labelBadgeVariant}
                </label>
                <select
                  value={eduBadgeVariant}
                  onChange={(e) => setEduBadgeVariant(e.target.value as any)}
                  className="w-full bg-white dark:bg-zinc-900 border border-slate-300 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 dark:text-white"
                >
                  <option value="success">Vert / Succès (En cours)</option>
                  <option value="violet">Violet (Obtenu)</option>
                  <option value="blue">Bleu</option>
                  <option value="warning">Jaune / Avertissement</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex justify-end gap-2">
                <Button type="button" variant="outlined" size="sm" onClick={() => setIsEduModalOpen(false)}>
                  {t.cancel}
                </Button>
                <Button type="submit" variant="primary" size="sm" icon={<Save className="w-4 h-4" />}>
                  {t.save}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
