'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/language/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Download, Printer, Globe, ShieldCheck, Mail, MapPin, Phone, Award, Briefcase, GraduationCap, Code2 } from 'lucide-react';

const content = {
  fr: {
    hero: {
      badge: 'CURRICULUM VITAE',
      titleLine1: 'Un aperçu détaillé de',
      titleLine2: 'mon parcours.',
      subtitle: 'Développement Full-Stack (Next.js, TypeScript, PHP/Laravel, CMS), Design UI/UX, Graphisme & Administration Systèmes & Réseaux. Document bilingue consultable et téléchargeable au format PDF.',
      downloadBtn: 'Télécharger le CV (PDF)',
    },
    viewer: {
      versionLabel: 'VERSION :',
      printTitle: 'Imprimer',
      downloadTitle: 'Télécharger',
    },
    sections: {
      titleRole: 'Full-Stack Developer · Graphic Designer · Systems & Network Security',
      summary: 'PROFIL PROFESSIONNEL',
      summaryText:
        'Développeur Full-Stack, Designer UI/UX et Administrateur Systèmes & Réseaux avec une expertise polyvalente dans la conception d’applications web modernes (React, Next.js, TypeScript, PHP/Laravel, CMS), la création d’interfaces soignées (Figma, suite Adobe) et la gestion d’infrastructures informatiques & réseaux (Active Directory, Windows Server, Linux, Sécurité).',
      skills: 'COMPÉTENCES CLÉS',
      exp: 'EXPÉRIENCES PROFESSIONNELLES',
      experiences: [
        {
          role: 'Développeur Web & Mobile · Designer Graphique (Freelance)',
          company: 'Kossy Tech Solutions · Télétravail / Remote',
          period: 'Janvier 2023 — Présent',
          bullets: [
            'Conception et développement sur-mesure de sites web et applications web & mobiles réactives (Next.js, React, WordPress, Laravel, MySQL, Flutter...).',
            'Création complète d’identités visuelles percutantes : logos, chartes graphiques, maquettes et prototypes interactifs UI/UX (Figma, Photoshop, Illustrator).',
            'Administration technique complète du site de l’entreprise et des sites clients : gestion des hébergements, noms de domaine, sauvegardes et déploiements continus (CI/CD, Vercel, Cloud).',
            'Gestion et support informatique : installation et optimisation de systèmes d’exploitation (Windows, Linux), montage de PC et maintenance technique.',
            'Collaboration étroite et conseil technique auprès des clients pour concevoir des solutions numériques clé-en-main.',
          ],
        },
        {
          role: 'Stagiaire en Administration de Sites Web',
          company: 'Université Numérique Cheikh Hamidou Kane – ANDS · Sénégal',
          period: 'Octobre 2024 — Juin 2025',
          bullets: [
            'Administration technique du site web et intégration de pages sous WordPress.',
            'Gestion de contenu et mise à jour régulière des informations.',
            'Optimisation des performances web et gestion des sauvegardes régulières.',
          ],
        },
        {
          role: 'Participant — Hackathon Cezat & Sonatel (Résolution de problèmes)',
          company: 'Tivaouane, Sénégal',
          period: 'Septembre 2023 & Septembre 2024',
          bullets: [
            'Programmation et développement technique au sein d’une équipe pluridisciplinaire.',
            'Présentation de projets, créativité et gestion des délais sous contrainte de temps.',
          ],
        },
      ],
      edu: 'PARCOURS ACADÉMIQUE',
      educations: [
        {
          degree: 'Master en Conception & Développement d’Applications Web, Full-Stack et Gaming',
          school: 'Université Numérique Cheikh Hamidou Kane (UNCHK) · Dakar, Sénégal',
          period: 'Août 2026 — En cours',
        },
        {
          degree: 'Diplôme en Réseaux et Sécurité de l’Information',
          school: 'Collège communautaire du Nouveau-Brunswick (CCNB) – Campus de Dieppe · Dieppe, NB, Canada',
          period: 'Septembre 2025 — En cours',
        },
        {
          degree: 'Licence en Développement d’Applications Web, Mobiles et Jeux Vidéo',
          school: 'Université Numérique Cheikh Hamidou Kane (UNCHK) · Dakar, Sénégal',
          period: 'Janvier 2021 — Juillet 2025',
        },
        {
          degree: 'Baccalauréat en Sciences Sociales et Humaines',
          school: 'Cheikh Anta Diop Académie · Thiès, Sénégal',
          period: 'Octobre 2018 — Juillet 2021',
        },
      ],
      certTitle: 'CERTIFICATIONS & DIPLÔMES SPÉCIALISÉS',
      certs: [
        'CCNA 1 (Cisco Certified Network Associate)',
        'Junior Cybersecurity Analyst',
        'Développement Web Front-End',
        'Certificat de Spécialité Professionnelle en Développement Web & Design Graphique',
        'Création de Contenu et Streaming (OBS Studio)',
        'Commerce et Marketing Digital',
        'Entrepreneuriat',
      ],
      languages: 'LANGUES',
      langFr: '🇫🇷 Français (Courant)',
      langEn: '🇬🇧 English (Professionnel)',
    },
    sidebar: {
      title: 'Actions Document',
      downloadPdf: 'Télécharger PDF',
      printResume: 'Imprimer CV',
    },
    modal: {
      title: 'Télécharger le CV (PDF)',
      loading: 'Préparation du document PDF...',
      ready: 'Votre CV est prêt !',
      prompt: 'Choisissez la langue de votre document au format PDF :',
      frBtn: '🇫🇷 Version Française',
      enBtn: '🇬🇧 Version Anglaise',
    },
  },
  en: {
    hero: {
      badge: 'CURRICULUM VITAE',
      titleLine1: 'A closer look at',
      titleLine2: 'my journey.',
      subtitle: 'Full-Stack Development (Next.js, TypeScript, PHP/Laravel, CMS), UI/UX Design, Graphic Design & Systems/Network Administration. Bilingual viewer and PDF downloadable resume.',
      downloadBtn: 'Download CV (PDF)',
    },
    viewer: {
      versionLabel: 'VERSION :',
      printTitle: 'Print',
      downloadTitle: 'Download',
    },
    sections: {
      titleRole: 'Full-Stack Developer · Graphic Designer · Systems & Network Security',
      summary: 'PROFESSIONAL PROFILE',
      summaryText:
        'Full-Stack Developer, UI/UX Designer, and Systems & Network Administrator with versatile expertise in building modern web applications (React, Next.js, TypeScript, PHP/Laravel, CMS), crafting refined visual interfaces (Figma, Adobe Creative Cloud), and managing IT/network infrastructures (Active Directory, Windows Server, Linux, Security).',
      skills: 'KEY SKILLS',
      exp: 'PROFESSIONAL EXPERIENCE',
      experiences: [
        {
          role: 'Web & Mobile Developer · Graphic Designer (Freelance)',
          company: 'Kossy Tech Solutions · Remote',
          period: 'January 2023 — Present',
          bullets: [
            'Custom engineering and development of responsive websites and web/mobile apps (Next.js, React, WordPress, Laravel, MySQL, Flutter...).',
            'End-to-end visual identity and branding design: logos, brand guidelines, and interactive UI/UX prototypes (Figma, Photoshop, Illustrator).',
            'Complete technical administration of company and client websites: managing hosting servers, domain configurations, automated backups, and continuous deployments (CI/CD, Vercel, Cloud).',
            'IT infrastructure and systems support: OS setup (Windows, Linux), PC hardware assembly, and maintenance.',
            'Close client collaboration and technical consulting to deliver turnkey digital transformation solutions.',
          ],
        },
        {
          role: 'Website Administration Intern',
          company: 'Université Numérique Cheikh Hamidou Kane – ANDS · Senegal',
          period: 'October 2024 — June 2025',
          bullets: [
            'Technical administration of the website and page integration on WordPress.',
            'Content management and regular information updates.',
            'Website optimization and backup management.',
          ],
        },
        {
          role: 'Participant — Cezat & Sonatel Hackathon (Problem Solving)',
          company: 'Tivaouane, Senegal',
          period: 'Sept. 2023 & Sept. 2024',
          bullets: [
            'Programming and technical development in a team setting.',
            'Project presentation, creativity, and time management under pressure.',
          ],
        },
      ],
      edu: 'EDUCATION',
      educations: [
        {
          degree: 'Master’s Degree in Web, Full-Stack & Gaming Application Design & Development',
          school: 'Université Numérique Cheikh Hamidou Kane (UNCHK) · Dakar, Senegal',
          period: 'August 2026 — In progress',
        },
        {
          degree: 'Diploma in Networking and Information Security',
          school: 'Collège communautaire du Nouveau-Brunswick (CCNB) – Dieppe Campus · Dieppe, NB, Canada',
          period: 'September 2025 — In progress',
        },
        {
          degree: 'Bachelor Degree in Web, Mobile and Gaming Application Development',
          school: 'Université Numérique Cheikh Hamidou Kane (UNCHK) · Dakar, Senegal',
          period: 'January 2021 — July 2025',
        },
        {
          degree: 'High School Diploma in Social and Human Sciences',
          school: 'Cheikh Anta Diop Académie · Thiès, Senegal',
          period: 'October 2018 — July 2021',
        },
      ],
      certTitle: 'CERTIFICATIONS & SPECIALIZED CREDENTIALS',
      certs: [
        'CCNA 1 (Cisco Certified Network Associate)',
        'Junior Cybersecurity Analyst',
        'Front-End Web Development',
        'Professional Specialty Certificate in Web Development & Graphic Design',
        'Content Creation and Streaming (OBS Studio)',
        'Digital Marketing & Commerce',
        'Entrepreneurship',
      ],
      languages: 'LANGUAGES',
      langFr: '🇫🇷 French (Fluent)',
      langEn: '🇬🇧 English (Professional)',
    },
    sidebar: {
      title: 'Document Actions',
      downloadPdf: 'Download PDF',
      printResume: 'Print Resume',
    },
    modal: {
      title: 'Download CV (PDF)',
      loading: 'Preparing your PDF CV...',
      ready: 'Your CV is ready!',
      prompt: 'Select the language version for your PDF document:',
      frBtn: '🇫🇷 French Version',
      enBtn: '🇬🇧 English Version',
    },
  },
};

export default function CvPage() {
  const { locale, toggleLocale } = useLanguage();
  const t = content[locale];

  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [downloadState, setDownloadState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [customExperiences, setCustomExperiences] = useState<any[] | null>(null);
  const [customEducations, setCustomEducations] = useState<any[] | null>(null);

  useEffect(() => {
    fetch('/api/experiences')
      .then((res) => res.json())
      .then((res) => {
        if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
          setCustomExperiences(res.data);
        }
      })
      .catch((err) => console.error('Error fetching experiences in CV page:', err));

    fetch('/api/education')
      .then((res) => res.json())
      .then((res) => {
        if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
          setCustomEducations(res.data);
        }
      })
      .catch((err) => console.error('Error fetching education in CV page:', err));
  }, []);

  const displayedExperiences = customExperiences
    ? customExperiences.map((item) => ({
        role: (locale === 'fr' ? item.role_fr : item.role_en) || item.role,
        company: item.company,
        period: (locale === 'fr' ? item.period_fr : item.period_en) || item.period,
        bullets: (locale === 'fr' ? item.bullets_fr : item.bullets_en) || item.bullets || [],
      }))
    : t.sections.experiences;

  const displayedEducations = customEducations
    ? customEducations.map((item) => ({
        degree: (locale === 'fr' ? item.degree_fr : item.degree_en) || item.degree,
        school: item.school,
        period: (locale === 'fr' ? item.period_fr : item.period_en) || item.period,
      }))
    : t.sections.educations;

  const handleDownload = (lang: 'fr' | 'en') => {
    setDownloadState('loading');

    const data = content[lang];
    const expList = customExperiences
      ? customExperiences.map((item) => ({
          role: (lang === 'fr' ? item.role_fr : item.role_en) || item.role,
          company: item.company,
          period: (lang === 'fr' ? item.period_fr : item.period_en) || item.period,
          bullets: (lang === 'fr' ? item.bullets_fr : item.bullets_en) || item.bullets || [],
        }))
      : data.sections.experiences;

    const eduList = customEducations
      ? customEducations.map((item) => ({
          degree: (lang === 'fr' ? item.degree_fr : item.degree_en) || item.degree,
          school: item.school,
          period: (lang === 'fr' ? item.period_fr : item.period_en) || item.period,
        }))
      : data.sections.educations;

    const printHtml = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <title>CV_Mouhamed_Ndione_${lang.toUpperCase()}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 8mm 12mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    html, body {
      margin: 0;
      padding: 0;
      background: #ffffff;
      color: #0f172a;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      font-size: 9.5pt;
      line-height: 1.38;
    }
    .header {
      border-bottom: 2px solid #2563eb;
      padding-bottom: 8px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .name {
      font-size: 22pt;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.5px;
      margin: 0;
      line-height: 1.05;
    }
    .role {
      font-size: 11pt;
      font-weight: 700;
      color: #2563eb;
      margin-top: 3px;
    }
    .location {
      font-size: 9pt;
      color: #64748b;
      margin-top: 2px;
    }
    .contact {
      font-size: 9pt;
      color: #334155;
      text-align: right;
      line-height: 1.45;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    .section-title {
      font-size: 10pt;
      font-weight: 800;
      color: #2563eb;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      border-bottom: 1.5px solid #e2e8f0;
      padding-bottom: 2px;
      margin-top: 10px;
      margin-bottom: 6px;
    }
    .summary {
      font-size: 9.2pt;
      color: #334155;
      line-height: 1.4;
      margin-bottom: 8px;
    }
    .skills-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
      margin-bottom: 8px;
    }
    .skill-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      padding: 5px 8px;
      border-radius: 4px;
    }
    .skill-title {
      font-weight: 700;
      color: #0f172a;
      font-size: 9pt;
      display: block;
      margin-bottom: 2px;
    }
    .skill-desc {
      color: #475569;
      font-size: 8.5pt;
      line-height: 1.3;
    }
    .item {
      margin-bottom: 7px;
      page-break-inside: avoid;
    }
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .item-role {
      font-size: 10pt;
      font-weight: 700;
      color: #0f172a;
    }
    .item-period {
      font-size: 8.5pt;
      color: #64748b;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    .item-company {
      font-size: 8.8pt;
      font-weight: 600;
      color: #7c3aed;
      margin-bottom: 2px;
    }
    ul {
      margin: 2px 0 0 16px;
      padding: 0;
      font-size: 8.8pt;
      color: #334155;
      line-height: 1.36;
    }
    li {
      margin-bottom: 1.5px;
    }
    .edu-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
    }
    .edu-item {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      padding: 5px 8px;
      border-radius: 4px;
      page-break-inside: avoid;
    }
    .edu-degree {
      font-size: 9pt;
      font-weight: 700;
      color: #0f172a;
      line-height: 1.25;
    }
    .edu-school {
      font-size: 8.2pt;
      color: #7c3aed;
      font-weight: 600;
      margin-top: 1px;
    }
    .edu-period {
      font-size: 8pt;
      color: #64748b;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      margin-top: 1px;
    }
    .cert-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-top: 4px;
    }
    .tag {
      font-size: 8.2pt;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      padding: 2px 7px;
      border-radius: 3px;
      color: #334155;
    }
    .lang-row {
      display: flex;
      gap: 10px;
      margin-top: 4px;
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1 class="name">Mouhamed Ndione</h1>
      <div class="role">${data.sections.titleRole}</div>
      <div class="location">17 Kingsmere Ct, Moncton, New Brunswick, Canada</div>
    </div>
    <div class="contact">
      <div>mouhamedndione151@gmail.com</div>
      <div>+1 367 330 8708</div>
      <div>Moncton, NB, Canada</div>
    </div>
  </div>

  <div class="section-title">${data.sections.summary}</div>
  <div class="summary">${data.sections.summaryText}</div>

  <div class="section-title">${data.sections.skills}</div>
  <div class="skills-grid">
    <div class="skill-box">
      <span class="skill-title">${lang === 'fr' ? 'Développement Full-Stack & Web' : 'Full-Stack & Web Development'}</span>
      <span class="skill-desc">Next.js, React, Flutter, React Native, TypeScript, JavaScript, PHP, Laravel, Python, HTML5, CSS3, Tailwind CSS, WordPress, CMS</span>
    </div>
    <div class="skill-box">
      <span class="skill-title">${lang === 'fr' ? 'Systèmes, Réseaux & Sécurité' : 'Systems, Networks & Security'}</span>
      <span class="skill-desc">Windows Server, Active Directory, Linux (Ubuntu/Debian), Cisco CCNA, TCP/IP, DNS, DHCP, VPN, Pare-feu, Sécurité de l'Information</span>
    </div>
    <div class="skill-box">
      <span class="skill-title">${lang === 'fr' ? 'Design Graphique & UI/UX' : 'Graphic & UI/UX Design'}</span>
      <span class="skill-desc">Figma, Adobe Photoshop, Adobe Illustrator, Prototypage interactif, Conception de logos, Chartes graphiques, Affiches</span>
    </div>
    <div class="skill-box">
      <span class="skill-title">${lang === 'fr' ? 'Bases de données & DevOps' : 'Databases & DevOps'}</span>
      <span class="skill-desc">PostgreSQL, MySQL, REST API, Git / GitHub, Docker, Postman, Vercel, Méthodes Agiles / Scrum, UML</span>
    </div>
  </div>

  <div class="section-title">${data.sections.exp}</div>
  ${expList
    .map(
      (exp: any) => `
    <div class="item">
      <div class="item-header">
        <span class="item-role">${exp.role}</span>
        <span class="item-period">${exp.period}</span>
      </div>
      <div class="item-company">${exp.company}</div>
      <ul>
        ${exp.bullets.map((b: string) => `<li>${b}</li>`).join('')}
      </ul>
    </div>
  `
    )
    .join('')}

  <div class="section-title">${data.sections.edu}</div>
  <div class="edu-grid">
    ${eduList
      .map(
        (edu: any) => `
      <div class="edu-item">
        <div class="edu-degree">${edu.degree}</div>
        <div class="edu-school">${edu.school}</div>
        <div class="edu-period">${edu.period}</div>
      </div>
    `
      )
      .join('')}
  </div>

  <div class="section-title">${data.sections.certTitle}</div>
  <div class="cert-tags">
    ${data.sections.certs.map((c: string) => `<span class="tag">${c}</span>`).join('')}
  </div>

  <div class="section-title">${data.sections.languages}</div>
  <div class="lang-row">
    <span class="tag font-bold">${data.sections.langFr}</span>
    <span class="tag font-bold">${data.sections.langEn}</span>
  </div>
</body>
</html>`;

    // Open print window configured for saving as PDF
    const printWindow = window.open('', '_blank', 'width=850,height=1100');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(printHtml);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
      }, 500);
    }

    // Direct download trigger for the document
    const blob = new Blob([printHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CV_Mouhamed_Ndione_${lang.toUpperCase()}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadState('success');
    setTimeout(() => {
      setDownloadState('idle');
      setDownloadModalOpen(false);
    }, 1500);
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-slate-900 dark:text-white">
      {/* Hero */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <Badge variant="blue" size="md" className="mb-4">{t.hero.badge}</Badge>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t.hero.titleLine1} <span className="text-gradient-electric">{t.hero.titleLine2}</span>
          </h1>
          <p className="text-slate-600 dark:text-zinc-300 text-sm max-w-xl mt-3 leading-relaxed">
            {t.hero.subtitle}
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <Button variant="primary" size="md" icon={<Download className="w-4 h-4" />} onClick={() => setDownloadModalOpen(true)}>
            {t.hero.downloadBtn}
          </Button>
        </div>
      </div>

      {/* Viewer Controls Bar */}
      <div className="p-3 mb-8 rounded-xl bg-white dark:bg-zinc-900/80 backdrop-blur-md border border-slate-200 dark:border-white/10 flex items-center justify-between overflow-x-auto text-xs font-mono shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 hover:bg-blue-100 transition-colors font-semibold"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{t.viewer.versionLabel} {locale.toUpperCase()}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => handleDownload(locale as 'fr' | 'en')} className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-zinc-300 transition-colors" title={t.viewer.printTitle}>
            <Printer className="w-4 h-4" />
          </button>
          <button onClick={() => setDownloadModalOpen(true)} className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-zinc-300 transition-colors" title={t.viewer.downloadTitle}>
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Two Column Layout (CV Document Preview & Quick Jump Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Printable CV Document Preview */}
        <div className="lg:col-span-8">
          <div className="p-8 sm:p-12 rounded-2xl bg-white dark:bg-[#0f1013] border border-slate-200 dark:border-white/10 shadow-2xl text-slate-900 dark:text-white font-sans">
            {/* CV Header */}
            <div className="pb-8 border-b border-slate-200 dark:border-white/10 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Mouhamed Ndione</h2>
                <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold block mt-1">
                  {t.sections.titleRole}
                </span>
                <span className="text-xs text-slate-500 dark:text-zinc-300 font-light block mt-1">
                  17 Kingsmere Ct, Moncton, New Brunswick, Canada
                </span>
              </div>
              <div className="text-xs font-mono text-slate-600 dark:text-zinc-300 flex flex-col gap-1 sm:text-right">
                <span className="flex items-center gap-1 sm:justify-end"><Mail className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> mouhamedndione•••@gmail.com</span>
                <span className="flex items-center gap-1 sm:justify-end"><Phone className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> +1 367 330 8708</span>
                <span className="flex items-center gap-1 sm:justify-end"><MapPin className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> Moncton, NB, Canada</span>
              </div>
            </div>

            {/* Profile Summary */}
            <div className="mb-8">
              <h3 className="text-xs font-mono uppercase text-blue-600 dark:text-blue-400 font-bold tracking-widest mb-3">
                {t.sections.summary}
              </h3>
              <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                {t.sections.summaryText}
              </p>
            </div>

            {/* Core Skills */}
            <div className="mb-8">
              <h3 className="text-xs font-mono uppercase text-blue-600 dark:text-blue-400 font-bold tracking-widest mb-3">
                {t.sections.skills}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/5">
                  <strong className="text-slate-900 dark:text-white block mb-1">
                    {locale === 'fr' ? 'Développement Full-Stack & Web' : 'Full-Stack & Web Development'}
                  </strong>
                  <span className="text-slate-600 dark:text-zinc-300 leading-tight block">
                    Next.js, React, React Native, Flutter, TypeScript, JavaScript, PHP, Laravel, Python, Django, HTML5, CSS3, Tailwind CSS, WordPress (Elementor, Divi, Gutenberg), Joomla
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/5">
                  <strong className="text-slate-900 dark:text-white block mb-1">
                    {locale === 'fr' ? 'Design UI/UX & Outils Graphiques' : 'UI/UX & Graphic Design'}
                  </strong>
                  <span className="text-slate-600 dark:text-zinc-300 leading-tight block">
                    Figma, Photoshop, Illustrator, InDesign, UI/UX Research, Prototypage, Charte Graphique, Branding
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/5">
                  <strong className="text-slate-900 dark:text-white block mb-1">
                    {locale === 'fr' ? 'Administration Systèmes & Réseaux' : 'Systems & Networks Administration'}
                  </strong>
                  <span className="text-slate-600 dark:text-zinc-300 leading-tight block">
                    Windows Server, Active Directory, Linux (Ubuntu/Debian), Réseaux Cisco (CCNA 1), DNS, DHCP, VPN, Sécurité des Systèmes
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/5">
                  <strong className="text-slate-900 dark:text-white block mb-1">
                    {locale === 'fr' ? 'Bases de Données, Cloud & Outils' : 'Databases, Cloud & Tools'}
                  </strong>
                  <span className="text-slate-600 dark:text-zinc-300 leading-tight block">
                    PostgreSQL, MySQL, Supabase, REST API, Git / GitHub, Postman, Vercel, Méthodes Agiles / Scrum
                  </span>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="mb-8">
              <h3 className="text-xs font-mono uppercase text-blue-600 dark:text-blue-400 font-bold tracking-widest mb-4">
                {t.sections.exp}
              </h3>
              <div className="flex flex-col gap-6 text-xs">
                {displayedExperiences.map((item, idx) => (
                  <div key={idx} className="pb-4 border-b border-slate-100 dark:border-white/5 last:border-0 last:pb-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                      <strong className="text-slate-900 dark:text-white text-sm">{item.role}</strong>
                      <span className="font-mono text-slate-500 dark:text-zinc-300 text-[11px]">{item.period}</span>
                    </div>
                    <span className="text-purple-600 dark:text-purple-400 font-mono block mb-2">{item.company}</span>
                    <ul className="list-disc list-inside flex flex-col gap-1 text-slate-600 dark:text-zinc-300 leading-relaxed">
                      {item.bullets.map((b: string, bIdx: number) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="mb-8">
              <h3 className="text-xs font-mono uppercase text-blue-600 dark:text-blue-400 font-bold tracking-widest mb-4">
                {t.sections.edu}
              </h3>
              <div className="flex flex-col gap-4 text-xs">
                {displayedEducations.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                      <strong className="text-slate-900 dark:text-white text-sm">{item.degree}</strong>
                      <span className="font-mono text-slate-500 dark:text-zinc-300 text-[11px]">{item.period}</span>
                    </div>
                    <span className="text-purple-600 dark:text-purple-400 font-mono block">{item.school}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="mb-8">
              <h3 className="text-xs font-mono uppercase text-blue-600 dark:text-blue-400 font-bold tracking-widest mb-3">
                {t.sections.certTitle}
              </h3>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {t.sections.certs.map((c, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-zinc-200">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <h3 className="text-xs font-mono uppercase text-blue-600 dark:text-blue-400 font-bold tracking-widest mb-2">
                {t.sections.languages}
              </h3>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-600 dark:text-zinc-300">
                <span>{t.sections.langFr}</span>
                <span>{t.sections.langEn}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Jump & Actions */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Card variant="glass" className="p-6">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-3 uppercase font-mono">{t.sidebar.title}</h3>
            <div className="flex flex-col gap-3">
              <Button variant="primary" size="md" className="w-full" icon={<Download className="w-4 h-4" />} onClick={() => setDownloadModalOpen(true)}>
                {t.sidebar.downloadPdf}
              </Button>
              <Button variant="outlined" size="md" className="w-full" icon={<Printer className="w-4 h-4" />} onClick={() => handleDownload(locale as 'fr' | 'en')}>
                {t.sidebar.printResume}
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Download Modal */}
      <Modal
        isOpen={downloadModalOpen}
        onClose={() => {
          setDownloadModalOpen(false);
          setDownloadState('idle');
        }}
        title={t.modal.title}
      >
        <div className="flex flex-col gap-6">
          {downloadState === 'loading' ? (
            <div className="py-8 text-center flex flex-col items-center">
              <span className="w-8 h-8 rounded-full border-2 border-blue-600 dark:border-blue-400 border-t-transparent animate-spin mb-3" />
              <span className="font-mono text-xs text-slate-600 dark:text-zinc-300">{t.modal.loading}</span>
            </div>
          ) : downloadState === 'success' ? (
            <div className="py-8 text-center flex flex-col items-center">
              <ShieldCheck className="w-10 h-10 text-emerald-500 dark:text-emerald-400 mb-2" />
              <span className="font-bold text-slate-900 dark:text-white text-sm">{t.modal.ready}</span>
            </div>
          ) : (
            <>
              <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                {t.modal.prompt}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="glass" size="md" onClick={() => handleDownload('fr')}>
                  {t.modal.frBtn}
                </Button>
                <Button variant="glass" size="md" onClick={() => handleDownload('en')}>
                  {t.modal.enBtn}
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
