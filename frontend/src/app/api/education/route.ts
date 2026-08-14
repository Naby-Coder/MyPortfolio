import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export interface EducationItem {
  id: number | string;
  degree_fr: string;
  degree_en: string;
  school: string;
  period_fr: string;
  period_en: string;
  badge_fr: string;
  badge_en: string;
  badgeVariant: 'success' | 'violet' | 'blue' | 'warning';
}

const defaultEducations: EducationItem[] = [
  {
    id: 1,
    degree_fr: 'Master en Conception & Développement d’Applications Web, Full-Stack et Gaming',
    degree_en: 'Master’s Degree in Web, Full-Stack & Gaming Application Design & Development',
    school: 'Université Numérique Cheikh Hamidou Kane (UNCHK) · Dakar, Sénégal',
    period_fr: 'Août 2026 — En cours',
    period_en: 'August 2026 — In progress',
    badge_fr: 'En cours',
    badge_en: 'In progress',
    badgeVariant: 'success',
  },
  {
    id: 2,
    degree_fr: 'Diplôme en Réseaux et Sécurité de l’Information',
    degree_en: 'Diploma in Networking and Information Security',
    school: 'Collège communautaire du Nouveau-Brunswick (CCNB) – Campus de Dieppe · Dieppe, NB, Canada',
    period_fr: 'Septembre 2025 — En cours',
    period_en: 'September 2025 — In progress',
    badge_fr: 'En cours',
    badge_en: 'In progress',
    badgeVariant: 'success',
  },
  {
    id: 3,
    degree_fr: 'Licence en Développement d’Applications Web, Mobiles et Jeux Vidéo',
    degree_en: 'Bachelor Degree in Web, Mobile and Gaming Application Development',
    school: 'Université Numérique Cheikh Hamidou Kane (UNCHK) · Dakar, Sénégal',
    period_fr: 'Janvier 2021 — Juillet 2025',
    period_en: 'January 2021 — July 2025',
    badge_fr: 'Obtenu',
    badge_en: 'Obtained',
    badgeVariant: 'violet',
  },
  {
    id: 4,
    degree_fr: 'Baccalauréat en Sciences Sociales et Humaines',
    degree_en: 'High School Diploma in Social and Human Sciences',
    school: 'Cheikh Anta Diop Académie · Thiès, Sénégal',
    period_fr: 'Octobre 2018 — Juillet 2021',
    period_en: 'October 2018 — July 2021',
    badge_fr: 'Obtenu',
    badge_en: 'Obtained',
    badgeVariant: 'violet',
  },
];

export async function GET() {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .order('id', { ascending: true });

      if (!error && data && data.length > 0) {
        const mapped: EducationItem[] = data.map((row: any) => ({
          id: row.id,
          degree_fr: row.degree_fr || row.degree || '',
          degree_en: row.degree_en || row.degree || '',
          school: row.institution || row.school || '',
          period_fr: row.period_fr || row.location || '',
          period_en: row.period_en || row.location || '',
          badge_fr: row.badge_fr || (row.is_current ? 'En cours' : 'Obtenu'),
          badge_en: row.badge_en || (row.is_current ? 'In progress' : 'Obtained'),
          badgeVariant: row.badgeVariant || (row.is_current ? 'success' : 'violet'),
        }));

        return NextResponse.json({ success: true, data: mapped });
      }
    }

    return NextResponse.json({ success: true, data: defaultEducations });
  } catch (error) {
    console.error('Error in GET /api/education:', error);
    return NextResponse.json({ success: true, data: defaultEducations });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const educationList: EducationItem[] = Array.isArray(body)
      ? body
      : (body.educations || (body.education ? [body.education] : [body]));

    if (isSupabaseConfigured()) {
      for (const item of educationList) {
        const payload = {
          degree_fr: item.degree_fr,
          degree_en: item.degree_en,
          field_fr: item.degree_fr,
          field_en: item.degree_en,
          institution: item.school,
          location: item.period_fr,
          description_fr: JSON.stringify({
            period_fr: item.period_fr,
            period_en: item.period_en,
            badge_fr: item.badge_fr,
            badge_en: item.badge_en,
            badgeVariant: item.badgeVariant,
          }),
          start_date: new Date().toISOString().split('T')[0],
          updated_at: new Date().toISOString(),
        };

        if (typeof item.id === 'number' || (typeof item.id === 'string' && !isNaN(Number(item.id)) && Number(item.id) < 1000000000000)) {
          const { error } = await supabase
            .from('education')
            .upsert({ id: Number(item.id), ...payload });
          if (error) console.warn('Supabase upsert education error:', error);
        } else {
          const { error } = await supabase
            .from('education')
            .insert([payload]);
          if (error) console.warn('Supabase insert education error:', error);
        }
      }
    }

    return NextResponse.json({ success: true, message: 'Formations enregistrées dans Supabase !' });
  } catch (error) {
    console.error('Error in POST /api/education:', error);
    return NextResponse.json({ success: false, message: 'Erreur d’enregistrement cloud.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id && isSupabaseConfigured()) {
      const { error } = await supabase
        .from('education')
        .delete()
        .eq('id', Number(id));

      if (error) console.warn('Supabase delete education error:', error);
    }

    return NextResponse.json({ success: true, message: 'Formation supprimée avec succès !' });
  } catch (error) {
    console.error('Error in DELETE /api/education:', error);
    return NextResponse.json({ success: false, message: 'Erreur lors de la suppression' }, { status: 500 });
  }
}
