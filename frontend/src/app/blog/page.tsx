'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/language/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { ArrowUpRight, Clock, Calendar } from 'lucide-react';
import { blogArticles } from '@/data/blogData';

const content = {
  fr: {
    hero: {
      badge: 'BLOG & VEILLE TECHNIQUE',
      titleLine1: 'Idées, architectures et',
      titleLine2: 'retours d’expérience.',
      subtitle: 'Espace d’écriture et d’ingénierie logicielle axé sur le développement Full-Stack, Flutter, la sécurité des réseaux, le design UI/UX et les architectures Cloud modernes.',
    },
    categories: ['Tous', 'Développement', 'Sécurité & Réseaux', 'Mobile & Flutter', 'Design UI/UX', 'CMS & WordPress'],
    searchPlaceholder: 'Rechercher un article...',
    readTime: 'min de lecture',
    readArticle: 'Lire l’article complet',
  },
  en: {
    hero: {
      badge: 'TECH BLOG & INSIGHTS',
      titleLine1: 'Ideas, architectures and',
      titleLine2: 'engineering lessons.',
      subtitle: 'Writing and technical deep-dives on Full-Stack engineering, Flutter mobile apps, network security, UI/UX design systems, and modern Cloud systems.',
    },
    categories: ['All', 'Development', 'Security & Networks', 'Mobile & Flutter', 'UI/UX Design', 'CMS & WordPress'],
    searchPlaceholder: 'Search articles...',
    readTime: 'min read',
    readArticle: 'Read full article',
  },
};

export default function BlogPage() {
  const { locale } = useLanguage();
  const t = content[locale];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(0);

  const defaultArticles = blogArticles.map((a) => ({
    id: a.id,
    slug: a.slug,
    title: locale === 'fr' ? a.titleFr : a.titleEn,
    category: locale === 'fr' ? a.categoryFr : a.categoryEn,
    excerpt: locale === 'fr' ? a.excerptFr : a.excerptEn,
    date: locale === 'fr' ? a.dateFr : a.dateEn,
    readingTime: a.readingTime,
    image: a.image,
  }));

  const [articlesList, setArticlesList] = useState(defaultArticles);

  React.useEffect(() => {
    function loadArticles() {
      try {
        const stored = localStorage.getItem('myfolio_articles');
        const customArticles = stored ? JSON.parse(stored) : [];
        if (Array.isArray(customArticles) && customArticles.length > 0) {
          const formatted = customArticles.map((a: any) => ({
            id: a.id || Date.now(),
            slug: a.slug,
            title: locale === 'fr' ? (a.title_fr || a.title) : (a.title_en || a.title || a.title_fr),
            excerpt: locale === 'fr' ? (a.excerpt_fr || a.excerpt) : (a.excerpt_en || a.excerpt || a.excerpt_fr),
            category: a.category || (locale === 'fr' ? 'Architecture & Full-Stack' : 'Architecture & Full-Stack'),
            date: a.published_at || (locale === 'fr' ? 'Août 2026' : 'August 2026'),
            readingTime: a.reading_time || 5,
            image: a.cover_image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
          }));
          setArticlesList([...formatted, ...defaultArticles.filter((m) => !formatted.some((f) => f.slug === m.slug))]);
        } else {
          setArticlesList(defaultArticles);
        }
      } catch (e) {
        console.error('Error loading articles:', e);
      }
    }

    loadArticles();
    window.addEventListener('myfolio_articles_updated', loadArticles);
    return () => window.removeEventListener('myfolio_articles_updated', loadArticles);
  }, [locale]);

  const currentCategoryName = t.categories[selectedCategory];
  const filteredArticles = articlesList.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 0 ||
      art.category.toLowerCase().includes(currentCategoryName.toLowerCase()) ||
      currentCategoryName.toLowerCase().includes(art.category.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-900 dark:text-white">
      {/* Hero */}
      <div className="mb-12">
        <Badge variant="blue" size="md" className="mb-4">{t.hero.badge}</Badge>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
          {t.hero.titleLine1} <br />
          <span className="text-gradient-electric">{t.hero.titleLine2}</span>
        </h1>
        <p className="text-slate-600 dark:text-zinc-300 text-base max-w-2xl leading-relaxed">
          {t.hero.subtitle}
        </p>
      </div>

      {/* Category Navigation & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-8 border-b border-slate-200 dark:border-white/10">
        <div className="flex flex-wrap gap-2">
          {t.categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(idx)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                selectedCategory === idx
                  ? 'bg-blue-600 text-white shadow-xs font-semibold'
                  : 'bg-white dark:bg-zinc-900/80 text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-white/5 border border-slate-200 dark:border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="w-full md:w-72">
          <Input
            isSearch
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Featured Article */}
      {filteredArticles.length > 0 && (
        <Card variant="glass" className="p-8 mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-purple-500/30">
          <div className="lg:col-span-6 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10">
            <img
              src={filteredArticles[0].image}
              alt={filteredArticles[0].title}
              className="w-full h-72 object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-zinc-300">
              <Badge variant="violet">{filteredArticles[0].category}</Badge>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {filteredArticles[0].date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {filteredArticles[0].readingTime} {t.readTime}</span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {filteredArticles[0].title}
            </h2>

            <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
              {filteredArticles[0].excerpt}
            </p>

            <Link href={`/blog/${filteredArticles[0].slug}`} className="pt-2">
              <Button variant="primary" size="md" icon={<ArrowUpRight className="w-4 h-4" />}>
                {t.readArticle}
              </Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
}
