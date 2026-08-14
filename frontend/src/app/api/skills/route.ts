import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { fallbackSkills } from '@/app/admin/skills/page';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('id', { ascending: true });

      if (!error && data && data.length > 0) {
        return NextResponse.json({ success: true, data });
      }
    }

    return NextResponse.json({ success: true, data: fallbackSkills });
  } catch (error) {
    console.error('Error in GET /api/skills:', error);
    return NextResponse.json({ success: true, data: fallbackSkills });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const skillsList = Array.isArray(body)
      ? body
      : (body.skills || (body.skill ? [body.skill] : [body]));

    if (isSupabaseConfigured()) {
      for (const skill of skillsList) {
        const payload = {
          name: skill.name,
          category: skill.category,
          level_percentage: skill.level_percentage || skill.level || 85,
          proficiency_label: skill.proficiency_label || 'Advanced',
          icon: skill.icon || '',
          is_featured: skill.is_featured !== undefined ? skill.is_featured : true,
          updated_at: new Date().toISOString(),
        };

        if (skill.id && !isNaN(Number(skill.id)) && Number(skill.id) < 1000000000000) {
          const { error } = await supabase
            .from('skills')
            .upsert({ id: Number(skill.id), ...payload });
          if (error) console.warn('Supabase upsert skill error:', error);
        } else {
          const { error } = await supabase
            .from('skills')
            .insert([payload]);
          if (error) console.warn('Supabase insert skill error:', error);
        }
      }
    }

    return NextResponse.json({ success: true, message: 'Compétences enregistrées dans Supabase !' });
  } catch (error) {
    console.error('Error in POST /api/skills:', error);
    return NextResponse.json({ success: false, message: 'Erreur d’enregistrement cloud.' }, { status: 500 });
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

      if (error) console.warn('Supabase delete skill error:', error);
    }

    return NextResponse.json({ success: true, message: 'Compétence supprimée avec succès !' });
  } catch (error) {
    console.error('Error in DELETE /api/skills:', error);
    return NextResponse.json({ success: false, message: 'Erreur lors de la suppression' }, { status: 500 });
  }
}
