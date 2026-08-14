'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/language/LanguageContext';
import { ShieldCheck, Award, Sparkles } from 'lucide-react';

export interface CertificationBadge {
  id: string;
  badgeCode: string;
  titleFr: string;
  titleEn: string;
  issuer: string;
  date: string;
  category: string;
  image?: string;
  credentialUrl?: string;
  colorVariant: 'blue' | 'purple' | 'emerald' | 'amber';
}

export const defaultCertificationBadges: CertificationBadge[] = [
  {
    id: 'cyber',
    badgeCode: 'CYBERSECURITY',
    titleFr: 'Analyste Junior en Cybersécurité',
    titleEn: 'Junior Cybersecurity Analyst',
    issuer: 'FORCE-N · UNCHK · Mastercard Foundation',
    date: 'Décembre 2023',
    category: 'Sécurité des Systèmes',
    image: '/certificates/cert-analyste-cybersecurite.png',
    credentialUrl: 'https://unchk.edu.sn/',
    colorVariant: 'purple',
  },
  {
    id: 'frontend',
    badgeCode: 'FRONT-END DEV',
    titleFr: 'Développement Front-End',
    titleEn: 'Front-End Web Development',
    issuer: 'FORCE-N · UNCHK · Mastercard Foundation',
    date: 'Janvier 2024',
    category: 'Ingénierie Web',
    image: '/certificates/cert-dev-frontend.png',
    credentialUrl: 'https://unchk.edu.sn/',
    colorVariant: 'emerald',
  },
  {
    id: 'google',
    badgeCode: 'MARKETING DIGITAL',
    titleFr: 'Certificat en Marketing Digital',
    titleEn: 'Digital Marketing Certificate',
    issuer: 'FORCE-N · UNCHK · Mastercard Foundation',
    date: 'Juin 2023',
    category: 'Marketing & Stratégie',
    image: '/certificates/cert-marketing-digital.png',
    credentialUrl: 'https://unchk.edu.sn/',
    colorVariant: 'amber',
  },
  {
    id: 'streaming',
    badgeCode: 'OBS STUDIO PRO',
    titleFr: 'Création de Contenus & Streaming (OBS)',
    titleEn: 'Content Creation & Streaming (OBS)',
    issuer: 'FORCE-N · UNCHK · Mastercard Foundation',
    date: 'Décembre 2022',
    category: 'Média & Diffusion',
    image: '/certificates/cert-obs-streaming.png',
    credentialUrl: 'https://obsproject.com/',
    colorVariant: 'purple',
  },
  {
    id: 'entrepreneurship',
    badgeCode: 'TECH@WORK MICROSOFT',
    titleFr: 'Compétences Numériques & Entrepreneuriat',
    titleEn: 'Digital & Entrepreneurship Skills',
    issuer: 'TECH@WORK · IOE · Microsoft',
    date: 'Octobre 2023',
    category: 'Gestion & Entrepreneuriat',
    image: '/certificates/cert-tech-at-work-microsoft.png',
    credentialUrl: 'https://unchk.edu.sn/',
    colorVariant: 'emerald',
  },
  {
    id: 'ccna',
    badgeCode: 'CCNA 1',
    titleFr: 'Cisco Certified Network Associate (CCNA 1)',
    titleEn: 'Cisco Certified Network Associate (CCNA 1)',
    issuer: 'Cisco Networking Academy',
    date: '2024',
    category: 'Réseaux & Protocoles',
    image: '/certificates/cisco-ccna-verified.png',
    credentialUrl: 'https://www.netacad.com/',
    colorVariant: 'blue',
  },
  {
    id: 'webgraphic',
    badgeCode: 'WEB & GRAPHIC PRO',
    titleFr: 'Développement Web & Design Graphique',
    titleEn: 'Web Development & Graphic Design',
    issuer: 'Certificat Spécialité Professionnelle',
    date: '2023',
    category: 'UI/UX & Design',
    image: 'https://images.credly.com/size/340x340/images/d37803b9-1d22-4841-b2ec-2d338be357e6/Graphic_Design_Foundations.png',
    credentialUrl: 'https://unchk.edu.sn/',
    colorVariant: 'blue',
  },
];

export function PartnerLogoMarquee() {
  const { locale } = useLanguage();
  const [badges, setBadges] = useState<CertificationBadge[]>(defaultCertificationBadges);
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    async function loadBadges() {
      // 1. Instant local preview
      try {
        const stored = localStorage.getItem('myfolio_badges');
        if (stored) {
          const list = JSON.parse(stored);
          if (Array.isArray(list) && list.length > 0) setBadges(list);
        }
      } catch (e) {
        console.warn('Local badge check:', e);
      }

      // 2. Fresh cloud fetch without cache
      try {
        const res = await fetch('/api/certifications', { cache: 'no-store' });
        const json = await res.json();
        if (json?.success && Array.isArray(json.data) && json.data.length > 0) {
          setBadges(json.data);
          localStorage.setItem('myfolio_badges', JSON.stringify(json.data));
          return;
        }
      } catch (err) {
        console.warn('Using default certifications:', err);
      }
      setBadges(defaultCertificationBadges);
    }

    loadBadges();
    window.addEventListener('myfolio_badges_updated', loadBadges);
    return () => window.removeEventListener('myfolio_badges_updated', loadBadges);
  }, []);

  useEffect(() => {
    if (badges.length === 0) return;
    const interval = setInterval(() => {
      setActiveDot((prev) => (prev + 1) % badges.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [badges.length]);

  if (badges.length === 0) return null;

  return (
    <div className="mt-14 pt-10 border-t border-slate-200/80 dark:border-white/10 relative overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="text-[11px] font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold block mb-1">
          {locale === 'fr'
            ? 'BADGES OFFICIELS & ACCRÉDITATIONS VÉRIFIÉES'
            : 'OFFICIAL BADGES & VERIFIED ACCREDITATIONS'}
        </span>
        <p className="text-xs text-slate-600 dark:text-zinc-400">
          {locale === 'fr'
            ? 'Certifications délivrées par Cisco, Google, freeCodeCamp et institutions spécialisées'
            : 'Certifications issued by Cisco, Google, freeCodeCamp and specialized institutions'}
        </p>
      </div>

      {/* Infinite Animated Badges Strip */}
      <div className="relative w-full overflow-hidden mask-linear-fade py-4">
        {/* Soft edge blur gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-slate-50 dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-slate-50 dark:from-zinc-950 to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center gap-5 sm:gap-8">
          {/* Duplicated list for seamless infinite loop */}
          {[...badges, ...badges].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3.5 p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/70 border border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-xs min-w-[260px] sm:min-w-[300px] hover:border-blue-500 hover:scale-[1.03] transition-all duration-300 group cursor-default"
            >
              {/* Badge Icon Emblem or Custom Uploaded Image */}
              {item.image ? (
                <div className="w-11 h-11 rounded-xl bg-white dark:bg-zinc-800 p-1.5 flex items-center justify-center border border-slate-200 dark:border-white/10 shadow-xs shrink-0 group-hover:scale-110 transition-transform overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.badgeCode}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-xs transition-transform group-hover:scale-110 ${
                    item.colorVariant === 'blue'
                      ? 'bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                      : item.colorVariant === 'purple'
                      ? 'bg-purple-600/10 text-purple-600 dark:text-purple-400 border border-purple-500/20'
                      : item.colorVariant === 'emerald'
                      ? 'bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-600/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                  }`}
                >
                  <ShieldCheck className="w-5 h-5" />
                </div>
              )}

              {/* Badge Details */}
              <div className="overflow-hidden">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="font-mono text-[10px] font-bold text-blue-600 dark:text-blue-400 tracking-wider">
                    {item.badgeCode}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-zinc-500">· {item.date}</span>
                </div>
                <strong className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm block truncate leading-tight">
                  {locale === 'fr' ? item.titleFr : item.titleEn}
                </strong>
                <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400 block truncate mt-0.5">
                  {item.issuer}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
