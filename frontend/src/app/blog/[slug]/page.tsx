'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/components/language/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ChevronLeft, Calendar, Clock, Copy, Check, Share2, Code } from 'lucide-react';
import { blogArticles } from '@/data/blogData';

export default function ArticleDetailPage() {
  const { locale } = useLanguage();
  const params = useParams();
  const slugParam = params?.slug;

  const [copied, setCopied] = useState(false);
  const [copiedCodeIdx, setCopiedCodeIdx] = useState<number | null>(null);
  const [customArticle, setCustomArticle] = useState<any>(null);
  const [shareFeedback, setShareFeedback] = useState('');

  // 1. Search in static rich blogArticles
  const staticArticle = blogArticles.find((a) => a.slug === slugParam) || blogArticles[0];

  React.useEffect(() => {
    async function loadArticleDetail() {
      if (!slugParam) return;
      try {
        const res = await fetch(`/api/articles?slug=${encodeURIComponent(slugParam as string)}`, { cache: 'no-store' });
        const json = await res.json();
        if (json?.success && Array.isArray(json.data) && json.data.length > 0) {
          setCustomArticle(json.data[0]);
        }
      } catch (e) {
        console.error('Error loading article detail from API:', e);
      }
    }

    loadArticleDetail();
  }, [slugParam]);

  const articleTitle = customArticle
    ? (locale === 'fr' ? (customArticle.title_fr || customArticle.title) : (customArticle.title_en || customArticle.title || customArticle.title_fr))
    : (locale === 'fr' ? staticArticle.titleFr : staticArticle.titleEn);

  const articleCategory = customArticle
    ? (customArticle.category || 'Architecture & Full-Stack')
    : (locale === 'fr' ? staticArticle.categoryFr : staticArticle.categoryEn);

  const articleAuthor = staticArticle.author || 'Mouhamed Ndione';
  const articleDate = customArticle
    ? (customArticle.published_at || (locale === 'fr' ? 'Août 2026' : 'August 2026'))
    : (locale === 'fr' ? staticArticle.dateFr : staticArticle.dateEn);

  const articleReadTime = customArticle
    ? `${customArticle.reading_time || 6} min`
    : `${staticArticle.readingTime} min ${locale === 'fr' ? 'de lecture' : 'read'}`;

  const articleImage = customArticle?.cover_image || staticArticle.image;

  const articleExcerpt = customArticle
    ? (locale === 'fr' ? (customArticle.excerpt_fr || customArticle.excerpt) : (customArticle.excerpt_en || customArticle.excerpt || customArticle.excerpt_fr))
    : (locale === 'fr' ? staticArticle.excerptFr : staticArticle.excerptEn);

  const articleTOC = staticArticle ? (locale === 'fr' ? staticArticle.tocFr : staticArticle.tocEn) : [];

  const handleShare = async () => {
    if (typeof window === 'undefined') return;
    const url = window.location.href;
    const title = articleTitle;
    const text = articleExcerpt || articleTitle;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, text, url });
        setShareFeedback(locale === 'fr' ? 'Partagé !' : 'Shared!');
        setTimeout(() => setShareFeedback(''), 2500);
        return;
      } catch (err: any) {
        if (err.name === 'AbortError') return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setShareFeedback(locale === 'fr' ? 'Lien copié !' : 'Link copied!');
      setTimeout(() => setShareFeedback(''), 2500);
    } catch {
      setShareFeedback(locale === 'fr' ? 'Lien copié !' : 'Link copied!');
      setTimeout(() => setShareFeedback(''), 2500);
    }
  };

  const handleCopyCode = (codeText: string, idx: number) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(codeText);
      setCopiedCodeIdx(idx);
      setTimeout(() => setCopiedCodeIdx(null), 2000);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-slate-900 dark:text-white">
      {/* Reading Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 z-50" />

      {/* Back Link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>{locale === 'fr' ? 'Retour à tous les articles' : 'Back to all articles'}</span>
      </Link>

      {/* Article Header */}
      <div className="mb-10">
        <Badge variant="violet" size="md" className="mb-4">
          {articleCategory}
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight text-slate-900 dark:text-white">
          {articleTitle}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-600 dark:text-zinc-300 pb-6 border-b border-slate-200 dark:border-white/10">
          <span>
            {locale === 'fr' ? 'Par ' : 'By '}
            <strong className="text-slate-900 dark:text-white">{articleAuthor}</strong>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> {articleDate}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {articleReadTime}
          </span>
        </div>
      </div>

      {/* Cover Image */}
      <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 mb-12 shadow-2xl">
        <img src={articleImage} alt={articleTitle} className="w-full h-[420px] object-cover" />
      </div>

      {/* Two Column Content (TOC + Article Text) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Table of Contents Sticky */}
        {articleTOC.length > 0 && (
          <div className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-28 p-5 rounded-xl bg-white dark:bg-zinc-900/70 border border-slate-200 dark:border-white/10 text-xs font-mono shadow-xs">
              <span className="text-blue-600 dark:text-blue-400 font-bold block mb-3 uppercase">
                {locale === 'fr' ? 'SUR CETTE PAGE' : 'ON THIS PAGE'}
              </span>
              <ul className="flex flex-col gap-2.5 text-slate-600 dark:text-zinc-300">
                {articleTOC.map((item, idx) => (
                  <li key={idx} className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Article Body */}
        <div className={articleTOC.length > 0 ? 'lg:col-span-8 flex flex-col gap-6' : 'lg:col-span-12 flex flex-col gap-6'}>
          {/* Excerpt Lead Paragraph */}
          {articleExcerpt && (
            <p className="text-base sm:text-lg font-semibold text-slate-900 dark:text-zinc-100 leading-relaxed border-l-4 border-blue-600 pl-4 py-1 italic bg-blue-50/50 dark:bg-blue-500/5 rounded-r-lg">
              {articleExcerpt}
            </p>
          )}

          {/* Custom Article Body (if added via admin) */}
          {customArticle ? (
            <div className="whitespace-pre-wrap font-sans text-sm sm:text-base leading-relaxed text-slate-700 dark:text-zinc-300 space-y-4">
              <p>{locale === 'fr' ? (customArticle.content_fr || customArticle.content) : (customArticle.content_en || customArticle.content || customArticle.content_fr)}</p>
            </div>
          ) : (
            /* Static Rich Sections */
            staticArticle.sections.map((sec, secIdx) => (
              <div key={secIdx} className="space-y-3 pt-2">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {locale === 'fr' ? sec.titleFr : sec.titleEn}
                </h2>
                <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-zinc-300">
                  {locale === 'fr' ? sec.bodyFr : sec.bodyEn}
                </p>

                {/* Code Snippet if present */}
                {sec.codeSnippet && (
                  <div className="my-4 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-950 shadow-lg">
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-white/10 text-xs font-mono text-slate-400">
                      <div className="flex items-center gap-2">
                        <Code className="w-3.5 h-3.5 text-blue-400" />
                        <span>{sec.codeSnippet.language}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyCode(sec.codeSnippet!.code, secIdx)}
                        className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-[11px]"
                      >
                        {copiedCodeIdx === secIdx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">{locale === 'fr' ? 'Copié !' : 'Copied!'}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>{locale === 'fr' ? 'Copier' : 'Copy'}</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 text-xs font-mono text-zinc-100 overflow-x-auto leading-relaxed">
                      <code>{sec.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))
          )}

          {/* Author Card & Share Footer */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center font-bold text-white font-mono shadow-md text-sm">
                MN
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{articleAuthor}</h4>
                <span className="text-xs text-slate-500 dark:text-zinc-400 font-mono">
                  Full-Stack Developer · Systems &amp; Network Security · UI/UX
                </span>
              </div>
            </div>

            <Button
              variant="glass"
              size="sm"
              icon={shareFeedback ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
              onClick={handleShare}
              className={shareFeedback ? 'text-emerald-600 dark:text-emerald-400 border-emerald-500/50' : ''}
            >
              {shareFeedback || (locale === 'fr' ? 'Partager cet article' : 'Share article')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
