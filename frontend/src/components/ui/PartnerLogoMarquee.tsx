'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/language/LanguageContext';
import { ShieldCheck, Award, Sparkles, ExternalLink, Eye, X, CheckCircle2 } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { toLocalImage } from '@/lib/localImages';

export interface CertificationBadge {
  id: string | number;
  badgeCode?: string;
  titleFr: string;
  titleEn: string;
  issuer: string;
  date: string;
  category: string;
  image?: string;
  credentialUrl?: string;
  colorVariant?: 'blue' | 'purple' | 'emerald' | 'amber';
}

export const defaultCertificationBadges: CertificationBadge[] = [
  {
    id: 1,
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
    id: 7,
    badgeCode: 'FRONT-END DEV',
    titleFr: 'Développement Front-End',
    titleEn: 'Front-End Web Development',
    issuer: 'FORCE-N · UNCHK · Mastercard Foundation',
    date: 'Janvier 2024',
    category: 'Web',
    image: '/certificates/cert-frontend-dev.png',
    credentialUrl: 'https://formation.force-n.sn/mod/customcert/verify_certificate.php?contextid=248505&code=Vaa37EoD0S&qrcode=1',
    colorVariant: 'emerald',
  },
  {
    id: 8,
    badgeCode: 'MARKETING DIGITAL',
    titleFr: 'Certificat en Marketing Digital',
    titleEn: 'Digital Marketing Certificate',
    issuer: 'FORCE-N · UNCHK · Mastercard Foundation',
    date: 'Juin 2023',
    category: 'Marketing Digital',
    image: '/certificates/cert-marketing-digital.png',
    credentialUrl: 'https://formation.force-n.sn/mod/customcert/verify_certificate.php?contextid=94296&code=6VNev42uge&qrcode=1',
    colorVariant: 'amber',
  },
  {
    id: 4,
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
    id: 5,
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
    id: 6,
    badgeCode: 'CCNA 1',
    titleFr: 'Cisco Certified Network Associate (CCNA 1)',
    titleEn: 'Cisco Certified Network Associate (CCNA 1)',
    issuer: 'Cisco Networking Academy',
    date: 'Janvier 2024',
    category: 'Réseaux & Protocoles',
    image: '/certificates/cert-ccna1.png',
    credentialUrl: 'https://www.netacad.com/',
    colorVariant: 'blue',
  },
];

export function PartnerLogoMarquee() {
  const { locale } = useLanguage();
  const [badges, setBadges] = useState<CertificationBadge[]>(defaultCertificationBadges);
  const [selectedCert, setSelectedCert] = useState<CertificationBadge | null>(null);

  useEffect(() => {
    async function loadBadges() {
      try {
        const res = await fetch('/api/certifications', { cache: 'no-store' });
        const json = await res.json();
        if (json?.success && Array.isArray(json.data) && json.data.length > 0) {
          const mapped: CertificationBadge[] = json.data.map((c: any) => ({
            id: c.id,
            badgeCode: c.badgeCode || c.category || 'CERTIFIED',
            titleFr: c.titleFr || c.title || 'Certification',
            titleEn: c.titleEn || c.title || 'Certification',
            issuer: c.issuer || '',
            date: c.date || c.issue_date || '',
            category: c.category || 'Accréditation',
            image: toLocalImage(c.image || c.badge_image, '/certificates/cert-analyste-cybersecurite.png'),
            credentialUrl: c.credentialUrl || c.credential_url || 'https://unchk.edu.sn/',
            colorVariant: c.colorVariant || 'blue',
          }));
          setBadges(mapped);
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

  if (badges.length === 0) return null;

  return (
    <div className="mt-14 pt-10 border-t border-slate-200/80 dark:border-white/10 relative overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 font-mono text-[11px] font-bold uppercase tracking-widest mb-2">
          <Award className="w-3.5 h-3.5" />
          <span>
            {locale === 'fr'
              ? 'DIPLÔMES, CERTIFICATS & ACCRÉDITATIONS'
              : 'OFFICIAL CERTIFICATES & ACCREDITATIONS'}
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-zinc-400 font-mono max-w-md mx-auto">
          {locale === 'fr'
            ? 'Cliquez sur un certificat pour l’agrandir ou vérifier son authenticité'
            : 'Click on any certificate to view high-res preview or verify online'}
        </p>
      </div>

      {/* Infinite Animated Visual Certificates Strip */}
      <div className="relative w-full overflow-hidden mask-linear-fade py-4">
        {/* Soft edge blur gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-slate-50 dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-slate-50 dark:from-zinc-950 to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center gap-6 sm:gap-8 py-2">
          {/* Duplicated list for seamless infinite loop */}
          {[...badges, ...badges].map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="group relative flex flex-col items-center justify-center w-52 sm:w-64 h-36 sm:h-44 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 p-2.5 shadow-md hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500 dark:hover:border-blue-400 hover:scale-105 transition-all duration-300 overflow-hidden text-left"
            >
              {/* Inner Certificate Image Container */}
              <div
                onClick={() => setSelectedCert(item)}
                className="w-full h-full rounded-xl bg-slate-50 dark:bg-zinc-950 flex items-center justify-center p-1.5 overflow-hidden relative cursor-pointer"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={locale === 'fr' ? item.titleFr : item.titleEn}
                    className="w-full h-full object-contain rounded-lg drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 text-blue-500">
                    <ShieldCheck className="w-10 h-10" />
                    <span className="text-[10px] font-mono font-bold text-center px-2">
                      {locale === 'fr' ? item.titleFr : item.titleEn}
                    </span>
                  </div>
                )}

                {/* Hover Action Overlay with Agrandir & Vérifier Buttons */}
                <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-3 text-white">
                  <span className="text-[10px] font-bold text-center line-clamp-1 text-zinc-200">
                    {locale === 'fr' ? item.titleFr : item.titleEn}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCert(item);
                      }}
                      className="px-2.5 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-[10px] font-mono font-bold flex items-center gap-1 transition-colors cursor-pointer"
                      title={locale === 'fr' ? 'Agrandir l’image' : 'View full size'}
                    >
                      <Eye className="w-3 h-3" />
                      <span>{locale === 'fr' ? 'Aperçu' : 'Preview'}</span>
                    </button>

                    {item.credentialUrl && (
                      <a
                        href={item.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-2.5 py-1 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-mono font-bold flex items-center gap-1 transition-colors shadow-md cursor-pointer"
                        title={locale === 'fr' ? 'Ouvrir le lien de vérification officiel' : 'Open official verification link'}
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>{locale === 'fr' ? 'Vérifier' : 'Verify'}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal when clicking a certificate */}
      <Modal
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        title={selectedCert ? (locale === 'fr' ? selectedCert.titleFr : selectedCert.titleEn) : ''}
      >
        {selectedCert && (
          <div className="space-y-6">
            {/* High-Resolution Certificate Preview */}
            <div className="relative rounded-2xl bg-slate-100 dark:bg-zinc-950 border border-slate-200 dark:border-white/10 p-3 sm:p-4 overflow-hidden flex items-center justify-center shadow-inner max-h-[65vh]">
              {selectedCert.image ? (
                <img
                  src={selectedCert.image}
                  alt={locale === 'fr' ? selectedCert.titleFr : selectedCert.titleEn}
                  className="w-full h-auto max-h-[58vh] object-contain rounded-xl shadow-md"
                />
              ) : (
                <div className="py-20 text-center text-slate-400">
                  <ShieldCheck className="w-16 h-16 mx-auto mb-3 text-blue-500" />
                  <p className="text-sm font-mono">{selectedCert.titleFr}</p>
                </div>
              )}
            </div>

            {/* Certificate Details & Direct Verification Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="blue" size="sm">{selectedCert.category}</Badge>
                  <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">{selectedCert.date}</span>
                </div>
                <p className="text-xs font-mono text-slate-600 dark:text-zinc-300">
                  <strong className="text-slate-900 dark:text-white">{locale === 'fr' ? 'Émis par : ' : 'Issued by: '}</strong>
                  {selectedCert.issuer}
                </p>
              </div>

              {selectedCert.credentialUrl ? (
                <a
                  href={selectedCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0"
                >
                  <Button variant="primary" size="sm" icon={<ExternalLink className="w-4 h-4" />}>
                    {locale === 'fr' ? 'Vérifier la certification' : 'Verify Credential'}
                  </Button>
                </a>
              ) : (
                <span className="text-xs font-mono text-slate-400">Accréditation vérifiée</span>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
