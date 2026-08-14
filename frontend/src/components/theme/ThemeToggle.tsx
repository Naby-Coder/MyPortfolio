'use client';

import React from 'react';
import { useTheme } from './ThemeContext';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Changer de thème"
      className={`p-2 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-900/80 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-zinc-300 transition-colors shadow-xs ${className}`}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400" />
      ) : (
        <Moon className="w-4 h-4 text-blue-600" />
      )}
    </button>
  );
}
