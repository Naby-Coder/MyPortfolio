import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'solid' | 'glow';
  children: React.ReactNode;
  className?: string;
}

export function Card({ variant = 'glass', children, className = '', ...props }: CardProps) {
  const variantStyles = {
    glass:
      'bg-white dark:bg-zinc-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-xs dark:shadow-none hover:border-slate-300 dark:hover:border-white/20',
    solid:
      'bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shadow-xs',
    glow:
      'bg-white dark:bg-zinc-900/80 backdrop-blur-xl border border-blue-500/40 shadow-md shadow-blue-500/10 dark:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]',
  };

  return (
    <div
      className={`rounded-2xl transition-all duration-300 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
