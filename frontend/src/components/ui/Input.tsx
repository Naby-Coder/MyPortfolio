import React from 'react';
import { Search } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isSearch?: boolean;
}

export function Input({ label, isSearch = false, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-xs font-mono text-slate-700 dark:text-text-muted font-medium">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {isSearch && (
          <Search className="w-4 h-4 text-slate-400 dark:text-text-muted absolute left-3.5 pointer-events-none" />
        )}
        <input
          className={`w-full bg-white dark:bg-surface-container/60 border border-slate-300 dark:border-white/10 rounded-xl py-2.5 text-xs text-slate-900 dark:text-text-primary placeholder:text-slate-400 dark:placeholder:text-text-muted/60 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30 transition-all ${
            isSearch ? 'pl-10 pr-4' : 'px-4'
          } ${className}`}
          {...props}
        />
      </div>
    </div>
  );
}

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function TextArea({ label, className = '', ...props }: TextAreaProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-xs font-mono text-slate-700 dark:text-text-muted font-medium">
          {label}
        </label>
      )}
      <textarea
        className={`w-full bg-white dark:bg-surface-container/60 border border-slate-300 dark:border-white/10 rounded-xl p-4 text-xs text-slate-900 dark:text-text-primary placeholder:text-slate-400 dark:placeholder:text-text-muted/60 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30 transition-all ${className}`}
        {...props}
      />
    </div>
  );
}
