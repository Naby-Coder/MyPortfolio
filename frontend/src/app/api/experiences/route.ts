import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export interface ExperienceItem {
  id: number | string;
  role_fr: string;
  role_en: string;
  company: string;
  period_fr: string;
  period_en: string;
  bullets_fr: string[];
  bullets_en: string[];
  tags: string[];
}

const safeParseBullets = (val: any): string[] => {
  if (Array.isArray(val)) return val;
  if (!val || typeof val !== 'string') return [];
  const trimmed = val.trim();
  if (trimmed.startsWith('[')) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) return parsed;
    } catch {}
  }
  return trimmed.split('\n').map((s) => s.trim()).filter(Boolean);
};

export async function GET() {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('id', { ascending: true });

      if (!error && data !== null) {
        const mapped: ExperienceItem[] = data.map((row: any) => ({
          id: row.id,
          company: row.company || '',
          role_fr: row.position_fr || row.role_fr || '',
          role_en: row.position_en || row.role_en || '',
          period_fr: row.location || row.period_fr || '',
          period_en: row.location || row.period_en || '',
          bullets_fr: safeParseBullets(row.description_fr),
          bullets_en: safeParseBullets(row.description_en),
          tags: Array.isArray(row.technologies) ? row.technologies : [],
        }));

        return NextResponse.json({ success: true, data: mapped });
      }
    }

    return NextResponse.json({ success: true, data: [] });
  } catch (error) {
    console.error('Error in GET /api/experiences:', error);
    return NextResponse.json({ success: false, data: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const item: ExperienceItem = body.experience || body;

    if (isSupabaseConfigured()) {
      const payload: any = {
        position_fr: item.role_fr || '',
        position_en: item.role_en || item.role_fr || '',
        company: item.company || '',
        location: item.period_fr || '',
        description_fr: JSON.stringify(item.bullets_fr || []),
        description_en: JSON.stringify(item.bullets_en || item.bullets_fr || []),
        technologies: item.tags || [],
        start_date: new Date().toISOString().split('T')[0],
        updated_at: new Date().toISOString(),
      };

      if (item.id && !isNaN(Number(item.id)) && Number(item.id) < 1000000000000) {
        const { data, error } = await supabase
          .from('experiences')
          .upsert({ id: Number(item.id), ...payload })
          .select();

        if (error) {
          console.error('Supabase upsert experience error:', error);
          return NextResponse.json({ success: false, message: error.message }, { status: 500 });
        }
        return NextResponse.json({ success: true, message: 'Expérience mise à jour !', data: data?.[0] });
      } else {
        const { data, error } = await supabase
          .from('experiences')
          .insert([payload])
          .select();

        if (error) {
          console.error('Supabase insert experience error:', error);
          return NextResponse.json({ success: false, message: error.message }, { status: 500 });
        }
        return NextResponse.json({ success: true, message: 'Expérience ajoutée !', data: data?.[0] });
      }
    }

    return NextResponse.json({ success: true, message: 'Enregistré avec succès !' });
  } catch (error: any) {
    console.error('Error in POST /api/experiences:', error);
    return NextResponse.json({ success: false, message: error?.message || 'Erreur d’enregistrement cloud.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id && isSupabaseConfigured()) {
      const { error } = await supabase
        .from('experiences')
        .delete()
        .eq('id', Number(id));

      if (error) {
        console.error('Supabase delete experience error:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true, message: 'Expérience supprimée avec succès !' });
  } catch (error: any) {
    console.error('Error in DELETE /api/experiences:', error);
    return NextResponse.json({ success: false, message: error?.message || 'Erreur lors de la suppression' }, { status: 500 });
  }
}
