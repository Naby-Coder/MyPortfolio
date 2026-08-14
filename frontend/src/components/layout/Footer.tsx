'use client';

import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { useLanguage } from '@/components/language/LanguageContext';
import { Mail, ArrowUpRight, ShieldCheck, BadgeCheck } from 'lucide-react';

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

function LinkedinIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9z" />
    </svg>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { locale } = useLanguage();

  return (
    <footer className="border-t border-slate-200 dark:border-white/10 bg-white/95 dark:bg-zinc-950/90 backdrop-blur-xl pt-16 pb-12 relative overflow-hidden text-slate-900 dark:text-zinc-100">
      {/* Background Accent Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-t from-blue-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-200 dark:border-white/10">
          {/* Column 1: Brand & Tagline */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative">
                <img
                  src="/profile.jpg"
                  alt="Mouhamed Ndione"
                  className="w-8 h-8 rounded-full object-cover border border-blue-500/30 shadow-md shadow-blue-500/20"
                />
                <span className="absolute -bottom-0.5 -right-0.5 rounded-full bg-blue-600 text-white p-[1px] shadow-xs border border-white dark:border-zinc-950 flex items-center justify-center">
                  <BadgeCheck className="w-2.5 h-2.5 text-white fill-blue-600" />
                </span>
              </div>
              <span className="font-semibold text-slate-900 dark:text-white text-lg">
                Mouhamed Ndione
              </span>
            </Link>
            <p className="text-slate-600 dark:text-zinc-400 text-sm max-w-md leading-relaxed font-light">
              &quot;{siteConfig.signature}&quot;
            </p>
            <p className="text-xs font-mono text-slate-500 dark:text-zinc-400">
              Full-Stack Developer · Graphic Designer · Systems & Network Security
            </p>

            {/* Availability Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-mono w-fit mt-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-ping" />
              <span>{locale === 'fr' ? 'DISPONIBLE POUR MISSIONS & EMPLOI' : 'OPEN TO OPPORTUNITIES & FREELANCE'}</span>
            </div>
          </div>

          {/* Column 2: Navigation Sitemap */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">
              Navigation
            </span>
            <ul className="flex flex-col gap-2">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-700 hover:text-blue-600 dark:text-zinc-300 dark:hover:text-white transition-colors inline-flex items-center gap-1 font-medium"
                  >
                    {link.label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect & Social */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">
              {locale === 'fr' ? 'Connexion' : 'Connect'}
            </span>
            <div className="flex flex-col gap-2 text-sm text-slate-700 dark:text-zinc-300">
              <a
                href={siteConfig.author.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 dark:hover:text-white transition-colors flex items-center gap-2 font-medium"
              >
                <GithubIcon className="w-4 h-4 text-slate-500 dark:text-zinc-400" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-slate-400 dark:text-zinc-500" />
              </a>
              <a
                href={siteConfig.author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 dark:hover:text-white transition-colors flex items-center gap-2 font-medium"
              >
                <LinkedinIcon className="w-4 h-4 text-slate-500 dark:text-zinc-400" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-slate-400 dark:text-zinc-500" />
              </a>
              <Link
                href="/contact"
                className="hover:text-blue-600 dark:hover:text-white transition-colors flex items-center gap-2 font-medium"
                title="Formulaire de contact sécurisé"
              >
                <Mail className="w-4 h-4 text-slate-500 dark:text-zinc-400" />
                <span>{siteConfig.author.maskedEmail}</span>
              </Link>
              <Link
                href="/cv"
                className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors flex items-center gap-2 font-mono text-xs text-purple-600 dark:text-purple-400 font-semibold mt-1"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{locale === 'fr' ? 'Visualiser le CV (PDF)' : 'View Resume (PDF)'}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright & system info */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-zinc-400">
          <span>© {currentYear} Mouhamed Ndione. {locale === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}</span>
          <span className="flex items-center gap-2">
            <span>Built with Next.js 15, Tailwind &amp; Laravel API</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
