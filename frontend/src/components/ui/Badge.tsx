import React from 'react';

export interface BadgeProps {
  variant?: 'blue' | 'violet' | 'gray' | 'success' | 'warning' | 'outline';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'blue', size = 'sm', children, className = '' }: BadgeProps) {
  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-[10px]',
    md: 'px-3.5 py-1 text-xs',
  };

  const variantStyles = {
    blue: 'bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 font-mono font-semibold',
    violet: 'bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 font-mono font-semibold',
    gray: 'bg-slate-500/10 border border-slate-500/30 text-slate-700 dark:text-slate-300 font-mono',
    success: 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono font-semibold',
    warning: 'bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-mono font-semibold',
    outline: 'bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-text-muted font-mono',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full tracking-wider uppercase ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
