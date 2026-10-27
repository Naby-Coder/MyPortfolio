import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export interface EducationItem {
  id?: number | string;
  degree_fr: string;
  degree_en: string;
  school: string;
  period_fr: string;
  period_en: string;
  badge_fr: string;
  badge_en: string;
  badgeVariant: 'success' | 'violet' | 'blue' | 'warning';
}

const safeParseDescription = (val: any) => {
  if (!val) return {};
  if (typeof val === 'object') return val;
  try {
    return JSON.parse(val);
  } catch {
    return {};
  }
};

export async function GET() {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .order('id', { ascending: true });

      if (!error && data !== null) {
        const mapped: EducationItem[] = data.map((row: any) => {
          const meta = safeParseDescription(row.description_fr);
          return {
            id: row.id,
            degree_fr: row.degree_fr || row.degree || row.field_fr || '',
            degree_en: row.degree_en || row.degree || row.field_en || '',
            school: row.institution || row.school || '',
            period_fr: meta.period_fr || row.period_fr || row.location || '',
            period_en: meta.period_en || row.period_en || row.location || '',
            badge_fr: meta.badge_fr || row.badge_fr || (row.is_current ? 'En cours' : 'Obtenu'),
            badge_en: meta.badge_en || row.badge_en || (row.is_current ? 'In progress' : 'Obtained'),
            badgeVariant: meta.badgeVariant || row.badgeVariant || (row.is_current ? 'success' : 'violet'),
          };
        });

        if (mapped.length > 0) {
          return NextResponse.json({ success: true, data: mapped });
        }
      }
    }

    // Fallback local hors-ligne permanent
    const { fallbackEducation } = await import('@/data/portfolioData');
    return NextResponse.json({ success: true, data: fallbackEducation });
  } catch (error) {
    console.error('Error in GET /api/education:', error);
    try {
      const { fallbackEducation } = await import('@/data/portfolioData');
      return NextResponse.json({ success: true, data: fallbackEducation });
    } catch {
      return NextResponse.json({ success: false, data: [] });
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const item: EducationItem = body.education || body;

    if (isSupabaseConfigured()) {
      const payload: any = {
        degree_fr: item.degree_fr || '',
        degree_en: item.degree_en || item.degree_fr || '',
        field_fr: item.degree_fr || '',
        field_en: item.degree_en || item.degree_fr || '',
        institution: item.school || '',
        location: item.period_fr || '',
        description_fr: JSON.stringify({
          period_fr: item.period_fr || '',
          period_en: item.period_en || item.period_fr || '',
          badge_fr: item.badge_fr || 'En cours',
          badge_en: item.badge_en || 'In progress',
          badgeVariant: item.badgeVariant || 'success',
        }),
        is_current: (item.badge_fr || '').toLowerCase().includes('cours') || (item.badge_en || '').toLowerCase().includes('progress'),
        start_date: new Date().toISOString().split('T')[0],
        updated_at: new Date().toISOString(),
      };

      if (item.id && !isNaN(Number(item.id))) {
        const check = await supabase.from('education').select('id').eq('id', Number(item.id)).single();
        if (check.data?.id) {
          const { data, error } = await supabase
            .from('education')
            .update(payload)
            .eq('id', Number(item.id))
            .select();

          if (error) {
            console.error('Supabase update education error:', error);
            return NextResponse.json({ success: false, message: error.message }, { status: 500 });
          }
          return NextResponse.json({ success: true, message: 'Formation mise à jour !', data: data?.[0] });
        }
      }

      const { data: maxRows } = await supabase
        .from('education')
        .select('id')
        .order('id', { ascending: false })
        .limit(1);

      const nextId = (maxRows?.[0]?.id || 0) + 1;

      const { data, error } = await supabase
        .from('education')
        .insert([{ id: nextId, ...payload }])
        .select();

      if (error) {
        console.error('Supabase insert education error:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
      }
      return NextResponse.json({ success: true, message: 'Formation enregistrée !', data: data?.[0] });
    }

    return NextResponse.json({ success: true, message: 'Formation synchronisée !' });
  } catch (error: any) {
    console.error('Error in POST /api/education:', error);
    return NextResponse.json({ success: false, message: error?.message || 'Erreur d’enregistrement cloud.' }, { status: 500 });
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

      if (error) {
        console.error('Supabase delete education error:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true, message: 'Formation supprimée avec succès !' });
  } catch (error: any) {
    console.error('Error in DELETE /api/education:', error);
    return NextResponse.json({ success: false, message: error?.message || 'Erreur lors de la suppression' }, { status: 500 });
  }
}
