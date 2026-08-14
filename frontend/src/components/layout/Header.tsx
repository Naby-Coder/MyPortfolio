'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useLanguage } from '@/components/language/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Menu, X, ArrowUpRight, Globe, BadgeCheck } from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { locale, toggleLocale } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-white/90 dark:bg-zinc-950/85 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 shadow-sm dark:shadow-2xl'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo / Personal Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <img
              src="/profile.jpg"
              alt="Mouhamed Ndione"
              className="w-9 h-9 rounded-full object-cover border border-blue-500/30 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform"
            />
            <span className="absolute -bottom-0.5 -right-0.5 rounded-full bg-blue-600 text-white p-[1px] shadow-xs border border-white dark:border-zinc-950 flex items-center justify-center">
              <BadgeCheck className="w-3 h-3 text-white fill-blue-600" />
            </span>
          </div>
          <span className="font-semibold text-slate-900 dark:text-white text-base tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            Mouhamed Ndione
          </span>
        </Link>

        {/* Desktop Navigation — STRICT 7 LINKS ONLY */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/90 dark:bg-zinc-900/80 backdrop-blur-md border border-slate-200 dark:border-white/10 px-3.5 py-1.5 rounded-full shadow-xs dark:shadow-none">
          {siteConfig.navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'text-blue-600 bg-blue-50 border border-blue-200 font-semibold dark:text-white dark:bg-blue-600/30 dark:border-blue-500/40 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/5'
                }`}
              >
                {link.label[locale]}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right Action Area */}
        <div className="hidden lg:flex items-center gap-3">
          {/* FR / EN Switcher */}
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-900/80 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-zinc-300 transition-colors shadow-xs"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>{locale.toUpperCase()}</span>
          </button>

          {/* Theme Switcher */}
          <ThemeToggle />

          {/* Let's talk CTA */}
          <Link href="/contact">
            <Button variant="primary" size="sm" icon={<ArrowUpRight className="w-4 h-4" />}>
              {locale === 'fr' ? 'Discutons' : "Let's talk"}
            </Button>
          </Link>
        </div>

        {/* Mobile Actions: Language Switcher + Theme Toggle + Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-xs font-mono font-bold shadow-xs cursor-pointer"
            title="Changer de langue / Switch Language"
            aria-label="Toggle language"
          >
            <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>{locale.toUpperCase()}</span>
          </button>
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors shadow-xs cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Full Screen Overlay) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-white dark:bg-zinc-950 p-6 flex flex-col justify-between h-[100dvh] w-screen overflow-y-auto shadow-2xl">
          {/* Top Bar Inside Drawer */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10 shrink-0">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5">
              <div className="relative">
                <img
                  src="/profile.jpg"
                  alt="Mouhamed Ndione"
                  className="w-9 h-9 rounded-full object-cover border border-blue-500/30 shadow-md"
                />
                <span className="absolute -bottom-0.5 -right-0.5 rounded-full bg-blue-600 text-white p-[1px] shadow-xs border border-white dark:border-zinc-950 flex items-center justify-center">
                  <BadgeCheck className="w-3 h-3 text-white fill-blue-600" />
                </span>
              </div>
              <span className="font-semibold text-slate-900 dark:text-white text-base tracking-tight">
                Mouhamed Ndione
              </span>
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleLocale}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-zinc-300 text-xs font-mono font-bold"
                aria-label="Toggle language"
              >
                <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>{locale.toUpperCase()}</span>
              </button>
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-2 my-auto py-4">
            <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 uppercase tracking-widest px-2 mb-1">
              Navigation
            </span>
            {siteConfig.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-2xl text-base sm:text-lg font-medium transition-all flex items-center justify-between ${
                    isActive
                      ? 'text-blue-600 bg-blue-50 border border-blue-200 dark:text-white dark:bg-blue-600/30 dark:border-blue-500/40 font-semibold shadow-xs'
                      : 'text-slate-900 dark:text-white bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200/60 dark:border-white/5'
                  }`}
                >
                  <span>{link.label[locale]}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 dark:text-zinc-500" />
                </Link>
              );
            })}
          </div>

          {/* Footer Actions Inside Drawer */}
          <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col gap-4 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">Langue / Language</span>
              <button
                onClick={toggleLocale}
                className="px-4 py-1.5 rounded-full text-xs font-mono border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-white"
              >
                {locale === 'fr' ? '🇫🇷 Français' : '🇬🇧 English'}
              </button>
            </div>

            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="lg" className="w-full">
                {locale === 'fr' ? "Discutons d'un projet" : "Let's talk about a project"}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
