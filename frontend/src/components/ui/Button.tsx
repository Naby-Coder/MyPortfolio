import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'inverted' | 'outlined' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const sizeStyles = {
    sm: 'px-4 py-1.5 text-xs gap-1.5',
    md: 'px-6 py-2.5 text-sm gap-2',
    lg: 'px-8 py-3.5 text-base gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary:
      'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 dark:shadow-[0_0_20px_-3px_rgba(59,130,246,0.5)]',
    secondary:
      'bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-500/20 dark:shadow-[0_0_20px_-3px_rgba(139,92,246,0.5)]',
    inverted:
      'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 shadow-md',
    outlined:
      'bg-transparent border border-slate-300 dark:border-white/20 text-slate-800 dark:text-zinc-200 hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-500/10',
    glass:
      'bg-white dark:bg-zinc-900/80 backdrop-blur-md border border-slate-200 dark:border-white/10 text-slate-800 dark:text-zinc-200 hover:border-slate-300 dark:hover:border-white/30 hover:bg-slate-100 dark:hover:bg-zinc-800/80 shadow-xs dark:shadow-none',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
    </button>
  );
}
