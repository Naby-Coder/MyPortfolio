import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { projectsData, ProjectDetailData } from '@/data/projectsData';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('id', { ascending: true });

      if (!error && data !== null) {
        const mapped: ProjectDetailData[] = data.map((p: any, idx: number) => {
          const base = projectsData.find((m) => m.slug === p.slug);
          const gallery = Array.isArray(p.features_fr) && p.features_fr.length > 0
            ? p.features_fr
            : (base?.gallery || (p.featured_image ? [p.featured_image] : []));

          const techList: string[] = Array.isArray(p.technologies)
            ? p.technologies
            : (typeof p.technologies === 'string'
              ? p.technologies.split(',').map((s: string) => s.trim()).filter(Boolean)
              : (base?.tech || []));

          return {
            id: p.id || 100 + idx,
            slug: p.slug || `projet-${p.id || idx}`,
            titleFr: p.title_fr || base?.titleFr || 'Projet',
            titleEn: p.title_en || base?.titleEn || 'Project',
            summaryFr: p.summary_fr || base?.summaryFr || '',
            summaryEn: p.summary_en || base?.summaryEn || '',
            category: p.category_name || p.category || base?.category || 'Web / SaaS',
            categoryFilter: (p.category_filter as any) || base?.categoryFilter || 'web',
            badges: base?.badges || [p.category || 'Production', 'Full-Stack'],
            roleFr: p.role_fr || base?.roleFr || 'Développeur Full-Stack',
            roleEn: p.role_en || base?.roleEn || 'Full-Stack Developer',
            timelineFr: p.timeline_fr || base?.timelineFr || 'En continu',
            timelineEn: p.timeline_en || base?.timelineEn || 'Ongoing',
            status: p.status || 'LIVE',
            statusFr: p.status_text_fr || (p.status === 'DRAFT' ? 'En Développement' : 'Produit en Ligne') || base?.statusFr || 'Produit en Ligne',
            statusEn: p.status_text_en || (p.status === 'DRAFT' ? 'In Development' : 'Live Product') || base?.statusEn || 'Live Product',
            is_featured: Boolean(p.is_featured),
            isFeatured: Boolean(p.is_featured),
            tech: techList,
            image: p.featured_image || base?.image || (gallery[0] || ''),
            gallery: gallery,
            demoUrl: p.demo_url || base?.demoUrl || '',
            githubUrl: p.github_url || base?.githubUrl || '',
            challenge: {
              badgeFr: base?.challenge?.badgeFr || 'DÉFI TECHNIQUE',
              badgeEn: base?.challenge?.badgeEn || 'TECHNICAL CHALLENGE',
              titleFr: base?.challenge?.titleFr || 'Problématique & Enjeux Métiers',
              titleEn: base?.challenge?.titleEn || 'Problem Statement & Business Stakes',
              p1Fr: p.problem_fr || base?.challenge?.p1Fr || '',
              p1En: p.problem_en || base?.challenge?.p1En || '',
              p2Fr: base?.challenge?.p2Fr || '',
              p2En: base?.challenge?.p2En || '',
            },
            solution: {
              badgeFr: base?.solution?.badgeFr || 'APPROCHE TECHNIQUE',
              badgeEn: base?.solution?.badgeEn || 'TECHNICAL APPROACH',
              titleFr: base?.solution?.titleFr || 'Solution & Innovations Apportées',
              titleEn: base?.solution?.titleEn || 'Solution & Innovations Delivered',
              overviewFr: p.solution_fr || base?.solution?.overviewFr || '',
              overviewEn: p.solution_en || base?.solution?.overviewEn || '',
              cards: base?.solution?.cards || [],
            },
            architecture: base?.architecture || {
              badgeFr: 'ARCHITECTURE SYSTÈME',
              badgeEn: 'SYSTEM ARCHITECTURE',
              titleFr: 'Stack Technique & Flux de Données',
              titleEn: 'Technical Stack & Data Flow',
              client: { layer: 'FRONTEND', title: 'Modern UI / Next.js', sub: techList.slice(0, 3).join(' · ') || 'Responsive UI' },
              backend: { layer: 'BACKEND', title: 'Supabase & API', sub: 'REST & Database' },
              database: { layer: 'DATABASE', title: 'PostgreSQL Cloud', sub: 'Cloud DB & Storage' },
            },
            results: base?.results || {
              badgeFr: 'RÉSULTATS & IMPACT',
              badgeEn: 'RESULTS & IMPACT',
              titleFr: 'Indicateurs de Performance & Métriques Clés',
              titleEn: 'Performance Indicators & Key Metrics',
              metrics: [],
            },
          };
        });

        return NextResponse.json({ success: true, data: mapped });
      }
    }

    return NextResponse.json({ success: true, data: projectsData });
  } catch (error) {
    console.error('Error fetching projects API:', error);
    return NextResponse.json({ success: true, data: projectsData });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const project = body.project || body;

    const galleryArray = project.gallery || (project.gallery_items ? project.gallery_items.map((g: any) => typeof g === 'string' ? g : g.url) : [project.featured_image || project.image].filter(Boolean));

    const finalSlug = project.slug || (project.title_fr || project.titleFr || project.title || 'projet').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || `projet-${Date.now()}`;

    if (isSupabaseConfigured()) {
      if (project.is_featured) {
        await supabase.from('projects').update({ is_featured: false }).neq('slug', finalSlug);
      }

      const payload: any = {
        slug: finalSlug,
        title_fr: project.title_fr || project.titleFr || project.title || 'Nouveau Projet',
        title_en: project.title_en || project.titleEn || project.title || 'New Project',
        summary_fr: project.summary_fr || project.summaryFr || project.summary || '',
        summary_en: project.summary_en || project.summaryEn || project.summary || '',
        featured_image: project.featured_image || project.image || (galleryArray[0] || ''),
        features_fr: galleryArray,
        demo_url: project.demo_url || project.demoUrl || '',
        github_url: project.github_url || project.githubUrl || '',
        problem_fr: project.problem_fr || '',
        problem_en: project.problem_en || '',
        solution_fr: project.solution_fr || '',
        solution_en: project.solution_en || '',
        role_fr: project.role_fr || project.roleFr || '',
        role_en: project.role_en || project.roleEn || '',
        status: project.status || 'LIVE',
        is_featured: Boolean(project.is_featured),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('projects')
        .upsert(payload, { onConflict: 'slug' })
        .select();

      if (error) {
        console.error('Supabase projects upsert error:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, message: 'Projet enregistré dans Supabase !', data });
    }

    return NextResponse.json({ success: true, message: 'Projet synchronisé avec succès !' });
  } catch (error: any) {
    console.error('Error updating projects API:', error);
    return NextResponse.json({ success: false, message: error?.message || 'Erreur de synchronisation cloud.' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, id, is_featured } = body;

    if (isSupabaseConfigured()) {
      if (is_featured) {
        // Reset all other projects featured state
        await supabase.from('projects').update({ is_featured: false }).neq('slug', slug || '');
      }

      let query = supabase.from('projects').update({
        is_featured: Boolean(is_featured),
        updated_at: new Date().toISOString(),
      });

      if (slug) {
        query = query.eq('slug', slug);
      } else if (id) {
        query = query.eq('id', Number(id));
      }

      const { error } = await query;
      if (error) {
        console.error('Supabase patch project error:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true, message: 'Projet vedette mis à jour avec succès !' });
  } catch (error: any) {
    console.error('Error in PATCH /api/projects:', error);
    return NextResponse.json({ success: false, message: error?.message || 'Erreur lors de la mise à jour' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    const id = searchParams.get('id');

    if (isSupabaseConfigured()) {
      if (slug) {
        const { error } = await supabase.from('projects').delete().eq('slug', slug);
        if (error) {
          console.error('Supabase delete by slug error:', error);
          return NextResponse.json({ success: false, message: error.message }, { status: 500 });
        }
      } else if (id && !isNaN(Number(id))) {
        const { error } = await supabase.from('projects').delete().eq('id', Number(id));
        if (error) {
          console.error('Supabase delete by id error:', error);
          return NextResponse.json({ success: false, message: error.message }, { status: 500 });
        }
      }
    }

    return NextResponse.json({ success: true, message: 'Projet supprimé avec succès de Supabase !' });
  } catch (error: any) {
    console.error('Error deleting project API:', error);
    return NextResponse.json({ success: false, message: error?.message || 'Erreur lors de la suppression' }, { status: 500 });
  }
}
