'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Loader2, ShieldAlert } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // If we're already on /admin/login, allow access without checking
    if (pathname === '/admin/login') {
      setIsAuthorized(true);
      return;
    }

    // Check client-side authentication token
    try {
      const token = localStorage.getItem('admin_token');
      const authSession = sessionStorage.getItem('admin_authenticated');

      if (token && (authSession === 'true' || token.includes('mouhamed_ndione'))) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
        router.replace('/admin/login');
      }
    } catch {
      setIsAuthorized(false);
      router.replace('/admin/login');
    }
  }, [pathname, router]);

  // While checking auth status, show a clean, branded loading screen (prevent layout flash)
  if (isAuthorized === null && pathname !== '/admin/login') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-white font-mono">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
          </div>
          <span className="text-xs text-slate-400 tracking-wider">VÉRIFICATION DES ACCÈS ADMIN...</span>
        </div>
      </div>
    );
  }

  // If unauthorized and not on login, don't render protected children
  if (isAuthorized === false && pathname !== '/admin/login') {
    return null;
  }

  return <>{children}</>;
}
