'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/language/LanguageContext';
import { Button } from '@/components/ui/Button';
import {
  Home,
  ArrowLeft,
  Search,
  FolderKanban,
  User,
  Wrench,
  FileText,
  Mail,
  Sparkles,
  Compass,
  FileCode2,
} from 'lucide-react';

const content = {
  fr: {
    badge: 'ERREUR 404 • PAGE INTROUVABLE',
    code: '404',
    title: 'Oups ! Vous vous êtes perdu dans le cyberespace.',
    description:
      "La page que vous recherchez n'existe pas, a été déplacée ou est temporairement indisponible. Ne vous inquiétez pas, voici quelques moyens de retrouver votre chemin.",
    searchPlaceholder: 'Rechercher une section (ex: projets, services, contact)...',
    homeBtn: "Retour à l'accueil",
    backBtn: 'Page précédente',
    quickLinksTitle: 'Destinations populaires',
    noResults: 'Aucune destination ne correspond à votre recherche.',
    navItems: [
      {
        title: 'Accueil',
        desc: 'Page principale du portfolio',
        href: '/',
        icon: Home,
      },
      {
        title: 'Projets',
        desc: 'Découvrez mes réalisations web & SaaS',
        href: '/projects',
        icon: FolderKanban,
      },
      {
        title: 'À propos',
        desc: 'Mon parcours, compétences & philosophie',
        href: '/about',
        icon: User,
      },
      {
        title: 'Services',
        desc: 'Développement, Design & Réseau',
        href: '/services',
        icon: Wrench,
      },
      {
        title: 'Blog',
        desc: 'Articles tech & tutoriels',
        href: '/blog',
        icon: FileText,
      },
      {
        title: 'Contact',
        desc: 'Discutons de votre projet',
        href: '/contact',
        icon: Mail,
      },
      {
        title: 'Mon CV',
        desc: 'Mon profil professionnel complet',
        href: '/cv',
        icon: Sparkles,
      },
    ],
  },
  en: {
    badge: 'ERROR 404 • PAGE NOT FOUND',
    code: '404',
    title: 'Oops! You got lost in cyberspace.',
    description:
      "The page you are looking for doesn't exist, has been moved, or is temporarily unavailable. Don't worry, here are ways to find your path back.",
    searchPlaceholder: 'Search a section (e.g. projects, services, contact)...',
    homeBtn: 'Return to Home',
    backBtn: 'Go Back',
    quickLinksTitle: 'Popular Destinations',
    noResults: 'No destination matches your search.',
    navItems: [
      {
        title: 'Home',
        desc: 'Portfolio landing page',
        href: '/',
        icon: Home,
      },
      {
        title: 'Projects',
        desc: 'Explore web & SaaS creations',
        href: '/projects',
        icon: FolderKanban,
      },
      {
        title: 'About',
        desc: 'Background, skills & philosophy',
        href: '/about',
        icon: User,
      },
      {
        title: 'Services',
        desc: 'Development, Design & Network',
        href: '/services',
        icon: Wrench,
      },
      {
        title: 'Blog',
        desc: 'Tech articles & guides',
        href: '/blog',
        icon: FileText,
      },
      {
        title: 'Contact',
        desc: 'Let us talk about your project',
        href: '/contact',
        icon: Mail,
      },
      {
        title: 'Resume / CV',
        desc: 'Full professional profile',
        href: '/cv',
        icon: Sparkles,
      },
    ],
  },
};

export default function NotFound() {
  const { locale } = useLanguage();
  const t = content[locale] || content.fr;
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLinks = t.navItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.href.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGoBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Dynamic Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-purple-500/10 dark:bg-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl w-full text-center z-10">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 dark:border-blue-400/20 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wider uppercase mb-6 shadow-xs backdrop-blur-md"
        >
          <FileCode2 className="w-4 h-4 animate-spin-slow" />
          <span>{t.badge}</span>
        </motion.div>

        {/* 404 Glitch Number Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative my-2 select-none"
        >
          <h1 className="text-8xl sm:text-9xl font-extrabold tracking-widest text-gradient-electric drop-shadow-2xl">
            {t.code}
          </h1>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 dark:opacity-30 blur-lg">
            <span className="text-9xl font-extrabold text-blue-600 dark:text-purple-500">
              {t.code}
            </span>
          </div>
        </motion.div>

        {/* Title & Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4 tracking-tight">
            {t.title}
          </h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            {t.description}
          </p>
        </motion.div>

        {/* Primary CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <Link href="/">
            <Button variant="primary" size="lg" icon={<Home className="w-5 h-5" />}>
              {t.homeBtn}
            </Button>
          </Link>
          <Button
            variant="outlined"
            size="lg"
            onClick={handleGoBack}
            icon={<ArrowLeft className="w-5 h-5" />}
            iconPosition="left"
          >
            {t.backBtn}
          </Button>
        </motion.div>

        {/* Search & Navigation Helper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-panel p-6 sm:p-8 rounded-3xl text-left border border-slate-200/80 dark:border-white/10 shadow-xl"
        >
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-semibold text-lg">
              <Compass className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>{t.quickLinksTitle}</span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
              MyFolio Navigation System
            </span>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-12 pr-4 py-3 bg-white/80 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 rounded-2xl text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
          </div>

          {/* Quick Links Grid */}
          {filteredLinks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLinks.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Link key={index} href={item.href} className="group block">
                    <div className="glass-card p-4 rounded-2xl border border-slate-200/60 dark:border-white/5 hover:border-blue-500/40 dark:hover:border-blue-400/40 transition-all duration-300 flex items-start gap-3.5 h-full">
                      <div className="p-2.5 rounded-xl bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400 text-sm">
              {t.noResults}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
