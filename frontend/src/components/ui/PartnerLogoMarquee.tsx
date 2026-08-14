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
    id: 'ccna',
    badgeCode: 'CCNA 1',
    titleFr: 'Cisco Certified Network Associate',
    titleEn: 'Cisco Certified Network Associate',
    issuer: 'Cisco Networking Academy',
    date: '2024',
    category: 'Réseaux & Protocoles',
    image: 'https://images.credly.com/size/340x340/images/68172ee9-9740-42f0-a178-9585e828d578/CCNA_ITN.png',
    credentialUrl: 'https://www.netacad.com/',
    colorVariant: 'blue',
  },
  {
    id: 'cyber',
    badgeCode: 'CYBERSECURITY',
    titleFr: 'Junior Cybersecurity Analyst',
    titleEn: 'Junior Cybersecurity Analyst',
    issuer: 'Cisco / Coursera',
    date: '2024',
    category: 'Sécurité des Systèmes',
    image: 'https://images.credly.com/size/340x340/images/af8c6b4e-fc31-47c4-8d57-a0063595eb1a/image.png',
    credentialUrl: 'https://www.coursera.org/',
    colorVariant: 'purple',
  },
  {
    id: 'frontend',
    badgeCode: 'FRONT-END DEV',
    titleFr: 'Développement Web Front-End',
    titleEn: 'Front-End Web Development',
    issuer: 'freeCodeCamp / ANDS',
    date: '2023',
    category: 'Ingénierie Web',
    image: 'https://images.credly.com/size/340x340/images/b22ec686-3023-455b-b9f1-331bdc69efae/Responsive_Web_Design.png',
    credentialUrl: 'https://www.freecodecamp.org/',
    colorVariant: 'emerald',
  },
  {
    id: 'webgraphic',
    badgeCode: 'WEB & GRAPHIC PRO',
    titleFr: 'Développement Web & Design Graphique',
    titleEn: 'Web Development & Graphic Design',
    issuer: 'Certificat Spécialité Pro',
    date: '2023',
    category: 'UI/UX & Design',
    image: 'https://images.credly.com/size/340x340/images/d37803b9-1d22-4841-b2ec-2d338be357e6/Graphic_Design_Foundations.png',
    credentialUrl: 'https://unchk.edu.sn/',
    colorVariant: 'blue',
  },
  {
    id: 'google',
    badgeCode: 'GOOGLE COMMERCE',
    titleFr: 'Commerce & Marketing Digital',
    titleEn: 'Digital Marketing & E-Commerce',
    issuer: 'Google Career Certificates',
    date: '2023',
    category: 'Marketing & Stratégie',
    image: 'https://images.credly.com/size/340x340/images/241d0092-2315-4610-8f96-384be4ff7363/image.png',
    credentialUrl: 'https://grow.google/certificates/',
    colorVariant: 'amber',
  },
  {
    id: 'streaming',
    badgeCode: 'OBS STUDIO PRO',
    titleFr: 'Création Contenu & Streaming',
    titleEn: 'Content Creation & Streaming',
    issuer: 'OBS Studio Certified',
    date: '2023',
    category: 'Média & Diffusion',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/OBS_Studio_Logo.svg/512px-OBS_Studio_Logo.svg.png',
    credentialUrl: 'https://obsproject.com/',
    colorVariant: 'purple',
  },
  {
    id: 'entrepreneurship',
    badgeCode: 'BUSINESS & LEAD',
    titleFr: 'Entrepreneuriat & Gestion Projet',
    titleEn: 'Entrepreneurship & Management',
    issuer: 'Programme Académique',
    date: '2022',
    category: 'Gestion & Méthodologie',
    image: 'https://images.credly.com/size/340x340/images/30309995-1718-479a-a8fc-a59e9bf9b0ee/Entrepreneurship.png',
    credentialUrl: 'https://unchk.edu.sn/',
    colorVariant: 'emerald',
  },
];

export function PartnerLogoMarquee() {
  const { locale } = useLanguage();
  const [badges, setBadges] = useState<CertificationBadge[]>(defaultCertificationBadges);
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    function loadBadges() {
      try {
        const stored = localStorage.getItem('myfolio_badges');
        if (stored) {
          const list: CertificationBadge[] = JSON.parse(stored);
          if (Array.isArray(list) && list.length > 0) {
            // Auto-enrich badges with default images if they don't have one
            const enriched = list.map((b) => {
              if (!b.image) {
                const foundDefault = defaultCertificationBadges.find(
                  (d) => d.id === b.id || d.badgeCode === b.badgeCode
                );
                if (foundDefault?.image) {
                  return { ...b, image: foundDefault.image };
                }
              }
              return b;
            });
            setBadges(enriched);
            localStorage.setItem('myfolio_badges', JSON.stringify(enriched));
            return;
          }
        }
        localStorage.setItem('myfolio_badges', JSON.stringify(defaultCertificationBadges));
        setBadges(defaultCertificationBadges);
      } catch (e) {
        console.error('Error loading badges in marquee:', e);
      }
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
