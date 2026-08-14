import React from 'react';

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-surface-container-high/60 border border-white/5 ${className}`}
    />
  );
}
