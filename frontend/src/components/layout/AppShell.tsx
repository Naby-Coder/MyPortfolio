'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  // Track real public page visits only once per page view
  useEffect(() => {
    if (isAdmin || typeof window === 'undefined') return;

    try {
      const sessionKey = `view_${pathname}`;
      if (!sessionStorage.getItem(sessionKey)) {
        sessionStorage.setItem(sessionKey, '1');
        const stored = localStorage.getItem('myfolio_total_views');
        const current = stored && parseInt(stored, 10) < 14000 ? parseInt(stored, 10) : 0;
        localStorage.setItem('myfolio_total_views', (current + 1).toString());
      }
    } catch (e) {
      console.error('Error recording view:', e);
    }
  }, [pathname, isAdmin]);

  return (
    <>
      {!isAdmin && <Header />}
      <main className={`flex-grow relative z-10 ${!isAdmin ? 'pt-20' : ''}`}>
        {children}
      </main>
      {!isAdmin && <Footer />}
    </>
  );
}
