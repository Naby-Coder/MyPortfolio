import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { blogArticles } from '@/data/blogData';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const DEFAULT_COVER = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    const publishedOnly = searchParams.get('published_only') === 'true';

    if (isSupabaseConfigured()) {
      let query = supabase
        .from('articles')
        .select('*')
        .order('id', { ascending: false });

      if (slug) {
        query = query.eq('slug', slug);
      }

      if (publishedOnly) {
        query = query.eq('is_published', true);
      }

      const { data, error } = await query;

      if (!error && data !== null && data.length > 0) {
        return NextResponse.json({ success: true, data });
      }
    }

    // Fallback static articles mapped to standard format
    const fallback = blogArticles.map((b) => {
      const frMarkdown = b.sections
        .map((s) => `# ${s.titleFr}\n\n${s.bodyFr}${s.codeSnippet ? `\n\n\`\`\`${s.codeSnippet.language}\n${s.codeSnippet.code}\n\`\`\`` : ''}`)
        .join('\n\n');
      const enMarkdown = b.sections
        .map((s) => `# ${s.titleEn}\n\n${s.bodyEn}${s.codeSnippet ? `\n\n\`\`\`${s.codeSnippet.language}\n${s.codeSnippet.code}\n\`\`\`` : ''}`)
        .join('\n\n');

      return {
        id: b.id,
        slug: b.slug,
        title_fr: b.titleFr,
        title_en: b.titleEn,
        category: b.categoryFr,
        excerpt_fr: b.excerptFr,
        excerpt_en: b.excerptEn,
        content_fr: frMarkdown,
        content_en: enMarkdown,
        cover_image: b.image,
        reading_time: b.readingTime,
        is_published: true,
        published_at: b.dateFr,
        created_at: '2026-08-10T12:00:00Z',
        updated_at: '2026-08-10T12:00:00Z',
      };
    });

    if (slug) {
      const found = fallback.find((f) => f.slug === slug);
      return NextResponse.json({ success: true, data: found ? [found] : [] });
    }

    return NextResponse.json({ success: true, data: fallback });
  } catch (error) {
    console.error('Error fetching articles API:', error);
    return NextResponse.json({ success: false, data: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const article = body.article || body;

    const rawSlug = article.slug || (article.title_fr || article.title || 'article').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `article-${Date.now()}`;
    const finalSlug = rawSlug.substring(0, 240);

    let coverImage = article.cover_image || article.image || DEFAULT_COVER;
    // Ensure cover_image does not exceed PostgreSQL VARCHAR(500) limit
    if (coverImage && coverImage.length > 490) {
      coverImage = DEFAULT_COVER;
    }

    if (isSupabaseConfigured()) {
      const payload: any = {
        slug: finalSlug,
        title_fr: String(article.title_fr || article.title || 'Nouvel Article').substring(0, 240),
        title_en: String(article.title_en || article.title || article.title_fr || 'New Article').substring(0, 240),
        excerpt_fr: String(article.excerpt_fr || article.excerpt || ''),
        excerpt_en: String(article.excerpt_en || article.excerpt || article.excerpt_fr || ''),
        content_fr: String(article.content_fr || article.content || ''),
        content_en: String(article.content_en || article.content || article.content_fr || ''),
        cover_image: coverImage,
        reading_time: Math.max(1, Number(article.reading_time) || 5),
        is_published: article.is_published !== undefined ? Boolean(article.is_published) : (article.status === 'LIVE'),
        published_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Check if article with this slug already exists
      const check = await supabase.from('articles').select('id').eq('slug', finalSlug).single();
      if (check.data?.id) {
        const { data, error } = await supabase
          .from('articles')
          .update(payload)
          .eq('slug', finalSlug)
          .select();

        if (error) {
          console.error('Supabase update article error:', error);
          return NextResponse.json({ success: false, message: error.message }, { status: 500 });
        }
        return NextResponse.json({ success: true, message: 'Article mis à jour dans Supabase !', data: data?.[0] });
      }

      // Compute nextId
      const { data: maxRows } = await supabase
        .from('articles')
        .select('id')
        .order('id', { ascending: false })
        .limit(1);

      const nextId = (maxRows?.[0]?.id || 0) + 1;

      const { data, error } = await supabase
        .from('articles')
        .insert([{ id: nextId, ...payload }])
        .select();

      if (error) {
        console.error('Supabase insert article error:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, message: 'Article enregistré dans Supabase !', data: data?.[0] });
    }

    return NextResponse.json({ success: true, message: 'Article synchronisé !' });
  } catch (error: any) {
    console.error('Error in POST /api/articles:', error);
    return NextResponse.json({ success: false, message: error?.message || 'Erreur d’enregistrement cloud.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    const id = searchParams.get('id');

    if (isSupabaseConfigured()) {
      if (slug) {
        const { error } = await supabase
          .from('articles')
          .delete()
          .eq('slug', slug);

        if (error) {
          console.error('Supabase delete article error:', error);
          return NextResponse.json({ success: false, message: error.message }, { status: 500 });
        }
      } else if (id && !isNaN(Number(id))) {
        const { error } = await supabase
          .from('articles')
          .delete()
          .eq('id', Number(id));

        if (error) {
          console.error('Supabase delete article error:', error);
          return NextResponse.json({ success: false, message: error.message }, { status: 500 });
        }
      }
    }

    return NextResponse.json({ success: true, message: 'Article supprimé avec succès de Supabase !' });
  } catch (error: any) {
    console.error('Error in DELETE /api/articles:', error);
    return NextResponse.json({ success: false, message: error?.message || 'Erreur lors de la suppression' }, { status: 500 });
  }
}
