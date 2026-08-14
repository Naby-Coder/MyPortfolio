'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/language/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { ArrowUpRight, Clock, Calendar, BookOpen } from 'lucide-react';

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
    allArticlesTitle: 'Tous les Articles',
    noArticlesFound: 'Aucun article ne correspond à votre recherche ou catégorie.',
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
    allArticlesTitle: 'All Articles',
    noArticlesFound: 'No articles match your search query or category filter.',
  },
};

export default function BlogPage() {
  const { locale } = useLanguage();
  const t = content[locale];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(0);

  const [articlesList, setArticlesList] = useState<any[]>([]);

  React.useEffect(() => {
    async function loadArticles() {
      try {
        const res = await fetch('/api/articles?published_only=true', { cache: 'no-store' });
        const json = await res.json();
        if (json?.success && Array.isArray(json.data)) {
          const formatted = json.data
            .filter((a: any) => a.is_published !== false)
            .map((a: any) => ({
              id: a.id || a.slug,
              slug: a.slug,
              title: locale === 'fr' ? (a.title_fr || a.title) : (a.title_en || a.title || a.title_fr),
              excerpt: locale === 'fr' ? (a.excerpt_fr || a.excerpt) : (a.excerpt_en || a.excerpt || a.excerpt_fr),
              category: locale === 'fr' ? (a.category_fr || a.category || 'Développement Full-Stack') : (a.category_en || a.category || 'Full-Stack Development'),
              date: a.published_at ? (a.published_at.includes('T') ? a.published_at.split('T')[0] : a.published_at) : (locale === 'fr' ? 'Août 2026' : 'August 2026'),
              readingTime: Number(a.reading_time) || 5,
              image: a.cover_image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
            }));
          setArticlesList(formatted);
        }
      } catch (e) {
        console.error('Error loading published articles:', e);
      }
    }

    loadArticles();
  }, [locale]);

  const currentCategoryName = t.categories[selectedCategory];
  const filteredArticles = articlesList.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === 0) {
      return matchesSearch;
    }

    const catKey = currentCategoryName.toLowerCase();
    const artCat = (art.category || '').toLowerCase();

    const matchesCategory =
      artCat.includes(catKey) ||
      catKey.includes(artCat) ||
      (catKey.includes('dév') && artCat.includes('dév')) ||
      (catKey.includes('sec') && artCat.includes('sec')) ||
      (catKey.includes('mob') && artCat.includes('mob')) ||
      (catKey.includes('design') && artCat.includes('design')) ||
      (catKey.includes('word') && artCat.includes('word'));

    return matchesSearch && matchesCategory;
  });

  const featuredArticle = filteredArticles[0];
  const remainingArticles = filteredArticles.slice(1);

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

      {/* Empty State */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-16 bg-white/40 dark:bg-zinc-900/40 rounded-2xl border border-slate-200 dark:border-white/10">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <p className="text-sm font-mono text-slate-600 dark:text-zinc-400">
            {t.noArticlesFound}
          </p>
        </div>
      )}

      {/* Featured Article */}
      {featuredArticle && (
        <Card variant="glass" className="p-8 mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-purple-500/30 shadow-xl">
          <div className="lg:col-span-6 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10">
            <img
              src={featuredArticle.image}
              alt={featuredArticle.title}
              className="w-full h-72 object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-zinc-300">
              <Badge variant="violet">{featuredArticle.category}</Badge>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {featuredArticle.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featuredArticle.readingTime} {t.readTime}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {featuredArticle.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed line-clamp-3">
              {featuredArticle.excerpt}
            </p>

            <Link href={`/blog/${featuredArticle.slug}`} className="pt-2">
              <Button variant="primary" size="md" icon={<ArrowUpRight className="w-4 h-4" />}>
                {t.readArticle}
              </Button>
            </Link>
          </div>
        </Card>
      )}

      {/* Grid of Other Articles */}
      {remainingArticles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {remainingArticles.map((article) => (
            <Card
              key={article.id || article.slug}
              variant="glass"
              className="group flex flex-col justify-between overflow-hidden border border-slate-200 dark:border-white/10 hover:border-blue-500/40 transition-all shadow-md"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3 text-[11px] font-mono text-slate-500 dark:text-zinc-400">
                    <Badge variant="blue" size="sm">{article.category}</Badge>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {article.readingTime} min
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-zinc-300 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">
                    {article.date}
                  </span>
                  <Link href={`/blog/${article.slug}`}>
                    <Button variant="secondary" size="sm" icon={<ArrowUpRight className="w-3.5 h-3.5" />}>
                      {t.readArticle}
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
