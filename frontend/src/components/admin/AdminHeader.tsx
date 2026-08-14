'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/components/language/LanguageContext';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Button } from '@/components/ui/Button';
import {
  LayoutDashboard,
  Layers,
  Cpu,
  FolderKanban,
  FileEdit,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Globe,
} from 'lucide-react';

export function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { locale, toggleLocale } = useLanguage();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (e) {
      console.error('Logout error:', e);
    }
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user_email');
    sessionStorage.removeItem('admin_authenticated');
    router.replace('/admin/login');
  };

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/journey', label: locale === 'fr' ? 'Parcours' : 'Journey', icon: Layers },
    { href: '/admin/skills', label: locale === 'fr' ? 'Compétences' : 'Skills', icon: Cpu },
    { href: '/admin/projects', label: locale === 'fr' ? 'Projets' : 'Projects', icon: FolderKanban },
    { href: '/admin/blog', label: locale === 'fr' ? 'Blog' : 'Blog', icon: FileEdit },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-zinc-950/85 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 shadow-xs mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="flex items-center gap-2.5 group">
            <div className="relative">
              <img
                src="/profile.jpg"
                alt="Mouhamed Ndione"
                className="w-9 h-9 rounded-full object-cover border border-blue-500/40 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform"
              />
              <span className="absolute -bottom-0.5 -right-0.5 rounded-full bg-blue-600 text-white p-[1.5px] shadow-xs border border-white dark:border-zinc-950 flex items-center justify-center">
                <ShieldCheck className="w-2.5 h-2.5 text-white" />
              </span>
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white text-sm tracking-tight block leading-none">
                Console Admin
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400">
                Mouhamed Ndione
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-zinc-900 p-1 rounded-2xl border border-slate-200 dark:border-white/10">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5">
          {/* FR / EN Switcher */}
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-900/80 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-zinc-300 transition-colors shadow-xs cursor-pointer"
            title="Changer de langue / Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>{locale.toUpperCase()}</span>
          </button>

          {/* Dark / Light Theme Toggle */}
          <ThemeToggle />

          {/* Return to Public Portfolio in New Tab */}
          <Link href="/" target="_blank" rel="noopener noreferrer">
            <Button
              variant="glass"
              size="sm"
              className="hidden lg:inline-flex"
              icon={<ExternalLink className="w-3.5 h-3.5" />}
              iconPosition="right"
            >
              {locale === 'fr' ? 'Voir le Site' : 'View Site'}
            </Button>
          </Link>

          {/* Logout */}
          <Button
            variant="glass"
            size="sm"
            onClick={handleLogout}
            icon={<LogOut className="w-3.5 h-3.5 text-red-500" />}
          >
            <span className="hidden sm:inline">{locale === 'fr' ? 'Déconnexion' : 'Logout'}</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
