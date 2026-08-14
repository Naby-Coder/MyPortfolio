import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export interface SkillItem {
  id: string | number;
  name: string;
  category: string;
  level_percentage: number;
  proficiency_label?: string;
  icon?: string;
  is_featured?: boolean;
}

export async function GET() {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('id', { ascending: true });

      if (!error && data !== null) {
        return NextResponse.json({ success: true, data });
      }
    }

    return NextResponse.json({ success: true, data: [] });
  } catch (error) {
    console.error('Error in GET /api/skills:', error);
    return NextResponse.json({ success: false, data: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const skill: SkillItem = body.skill || body;

    if (isSupabaseConfigured()) {
      const payload: any = {
        name: skill.name || '',
        category: skill.category || 'Languages & OOP',
        level_percentage: skill.level_percentage || 85,
        proficiency_label: skill.proficiency_label || (skill.level_percentage >= 90 ? 'Master' : 'Advanced'),
        icon: skill.icon || '',
        is_featured: skill.is_featured !== undefined ? skill.is_featured : true,
        updated_at: new Date().toISOString(),
      };

      if (skill.id && !isNaN(Number(skill.id)) && Number(skill.id) < 1000000000000) {
        const { data, error } = await supabase
          .from('skills')
          .upsert({ id: Number(skill.id), ...payload })
          .select();

        if (error) {
          console.error('Supabase upsert skill error:', error);
          return NextResponse.json({ success: false, message: error.message }, { status: 500 });
        }
        return NextResponse.json({ success: true, message: 'Compétence mise à jour !', data: data?.[0] });
      } else {
        const { data, error } = await supabase
          .from('skills')
          .insert([payload])
          .select();

        if (error) {
          console.error('Supabase insert skill error:', error);
          return NextResponse.json({ success: false, message: error.message }, { status: 500 });
        }
        return NextResponse.json({ success: true, message: 'Compétence ajoutée !', data: data?.[0] });
      }
    }

    return NextResponse.json({ success: true, message: 'Compétence synchronisée !' });
  } catch (error: any) {
    console.error('Error in POST /api/skills:', error);
    return NextResponse.json({ success: false, message: error?.message || 'Erreur d’enregistrement cloud.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id && isSupabaseConfigured()) {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', Number(id));

      if (error) {
        console.error('Supabase delete skill error:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true, message: 'Compétence supprimée avec succès !' });
  } catch (error: any) {
    console.error('Error in DELETE /api/skills:', error);
    return NextResponse.json({ success: false, message: error?.message || 'Erreur lors de la suppression' }, { status: 500 });
  }
}
