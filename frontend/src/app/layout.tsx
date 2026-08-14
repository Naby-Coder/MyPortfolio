import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme/ThemeContext';
import { LanguageProvider } from '@/components/language/LanguageContext';
import { ShaderCanvas } from '@/components/canvas/ShaderCanvas';
import { AppShell } from '@/components/layout/AppShell';
import { Analytics } from '@vercel/analytics/react';
import { siteConfig } from '@/config/site';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Mouhamed Ndione',
    'Full-Stack Developer',
    'UI/UX Designer',
    'Graphic Designer',
    'Next.js',
    'TypeScript',
    'Laravel',
    'Portfolio',
    'SaaS Architecture',
  ],
  authors: [{ name: siteConfig.author.name }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col text-slate-900 dark:text-text-primary relative">
        <ThemeProvider>
          <LanguageProvider>
            {/* Global WebGL Shader Background */}
            <ShaderCanvas />

            <AppShell>{children}</AppShell>
            <Analytics />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
