'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/components/language/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { ShieldAlert, KeyRound, Loader2 } from 'lucide-react';

const translations = {
  fr: {
    badge: 'ACCÈS ADMINISTRATEUR SÉCURISÉ',
    title: 'Console Administrateur',
    subtitle: 'Accès réservé à la gestion du portfolio de Mouhamed Ndione',
    labelEmail: 'Adresse Email Admin',
    labelPassword: 'Mot de passe',
    errorInvalid: 'Identifiants d’administration invalides.',
    btnLoading: 'Authentification...',
    btnSubmit: 'Se connecter au Back-Office',
  },
  en: {
    badge: 'SECURE ADMIN ACCESS',
    title: 'Admin Console',
    subtitle: 'Restricted access for Mouhamed Ndione portfolio management',
    labelEmail: 'Admin Email Address',
    labelPassword: 'Password',
    errorInvalid: 'Invalid admin credentials.',
    btnLoading: 'Authenticating...',
    btnSubmit: 'Sign In to Back-Office',
  },
};

export default function AdminLoginPage() {
  const router = useRouter();
  const { locale, toggleLocale } = useLanguage();
  const t = translations[locale];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const inputEmail = email.trim();
    const inputPass = password.trim();

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inputEmail, password: inputPass }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('admin_token', data.token || 'mouhamed_ndione_auth_token_2026');
        localStorage.setItem('admin_user_email', inputEmail);
        sessionStorage.setItem('admin_authenticated', 'true');
        router.push('/admin/dashboard');
      } else {
        setError(data.message || t.errorInvalid);
        setLoading(false);
      }
    } catch {
      setError(t.errorInvalid);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 text-slate-900 dark:text-text-primary relative font-sans">
      <Card variant="glass" className="w-full max-w-md p-8 border border-blue-500/30 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col items-center text-center mb-8">
          <img
            src="/profile.jpg"
            alt="Mouhamed Ndione"
            className="w-12 h-12 rounded-full object-cover border border-blue-500/30 mb-4 shadow-md"
          />
          <Badge variant="blue" size="sm" className="mb-2">{t.badge}</Badge>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t.title}</h1>
          <p className="text-xs text-slate-600 dark:text-text-muted mt-1">{t.subtitle}</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Input
            label={t.labelEmail}
            type="email"
            placeholder="nom@exemple.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <Input
              label={t.labelPassword}
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-xs text-slate-400 hover:text-blue-500 font-mono cursor-pointer transition-colors"
            >
              {showPassword ? 'Cacher' : 'Afficher'}
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-mono flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-2"
            disabled={loading}
            icon={loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <KeyRound className="w-5 h-5" />}
          >
            {loading ? t.btnLoading : t.btnSubmit}
          </Button>
        </form>
      </Card>
    </div>
  );
}
