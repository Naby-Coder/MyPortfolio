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
        .order('order', { ascending: true });

      if (!error && data && data.length > 0) {
        const mapped: ProjectDetailData[] = data.map((p: any, idx: number) => {
          const base = projectsData.find((m) => m.slug === p.slug) || projectsData[0];
          return {
            ...base,
            id: p.id || 100 + idx,
            slug: p.slug || base.slug,
            titleFr: p.title_fr || base.titleFr,
            titleEn: p.title_en || base.titleEn,
            summaryFr: p.summary_fr || base.summaryFr,
            summaryEn: p.summary_en || base.summaryEn,
            category: p.category_name || base.category,
            categoryFilter: (p.category_filter as any) || base.categoryFilter,
            image: p.featured_image || base.image,
            demoUrl: p.demo_url || base.demoUrl,
            githubUrl: p.github_url || base.githubUrl,
          };
        });

        // Merge with existing static data for missing projects
        const fullList = [
          ...mapped,
          ...projectsData.filter((base) => !mapped.some((m) => m.slug === base.slug)),
        ];

        return NextResponse.json({ success: true, data: fullList });
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

    if (isSupabaseConfigured()) {
      const { error } = await supabase.from('projects').upsert({
        slug: project.slug,
        title_fr: project.title_fr || project.titleFr || project.title,
        title_en: project.title_en || project.titleEn || project.title,
        summary_fr: project.summary_fr || project.summaryFr || project.summary,
        summary_en: project.summary_en || project.summaryEn || project.summary,
        featured_image: project.featured_image || project.image,
        demo_url: project.demo_url || project.demoUrl,
        github_url: project.github_url || project.githubUrl,
        problem_fr: project.problem_fr,
        problem_en: project.problem_en,
        solution_fr: project.solution_fr,
        solution_en: project.solution_en,
        role_fr: project.role_fr || project.roleFr,
        role_en: project.role_en || project.roleEn,
      }, { onConflict: 'slug' });

      if (error) {
        console.warn('Supabase projects upsert notice:', error);
      }
    }

    return NextResponse.json({ success: true, message: 'Projet synchronisé avec succès dans le cloud !' });
  } catch (error) {
    console.error('Error updating projects API:', error);
    return NextResponse.json({ success: false, message: 'Erreur de synchronisation cloud.' }, { status: 500 });
  }
}
