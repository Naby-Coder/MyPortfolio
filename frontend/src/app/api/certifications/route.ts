import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { CertificationBadge } from '@/components/ui/PartnerLogoMarquee';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('order', { ascending: true });

      if (!error && data !== null) {
        const mapped: CertificationBadge[] = data.map((d: any) => ({
          id: String(d.id),
          badgeCode: d.title ? d.title.substring(0, 16).toUpperCase() : 'OFFICIAL',
          titleFr: d.title || '',
          titleEn: d.title || '',
          issuer: d.issuer || '',
          date: d.issue_date || '2024',
          category: d.category || 'Certification',
          image: d.badge_image || undefined,
          credentialUrl: d.credential_url || 'https://unchk.edu.sn/',
          colorVariant: 'blue',
        }));
        return NextResponse.json({ success: true, data: mapped });
      }
    }

    return NextResponse.json({ success: true, data: [] });
  } catch (error) {
    console.error('Error fetching certifications API:', error);
    return NextResponse.json({ success: false, data: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const badge = body.badge || (body.badges ? body.badges[0] : body);

    if (isSupabaseConfigured()) {
      const payload: any = {
        title: badge.titleFr || badge.titleEn || badge.title || '',
        issuer: badge.issuer || '',
        issue_date: badge.date && badge.date.includes('-') ? badge.date : `${badge.date || '2024'}-01-01`,
        category: badge.category || 'Certification',
        badge_image: badge.image || null,
        credential_url: badge.credentialUrl || null,
      };

      if (badge.id && !isNaN(Number(badge.id))) {
        const check = await supabase.from('certifications').select('id').eq('id', Number(badge.id)).single();
        if (check.data?.id) {
          const { data, error } = await supabase
            .from('certifications')
            .update(payload)
            .eq('id', Number(badge.id))
            .select();

          if (error) {
            console.error('Supabase update certification error:', error);
            return NextResponse.json({ success: false, message: error.message }, { status: 500 });
          }
          return NextResponse.json({ success: true, message: 'Certification mise à jour !', data: data?.[0] });
        }
      }

      const { data: maxRows } = await supabase
        .from('certifications')
        .select('id')
        .order('id', { ascending: false })
        .limit(1);

      const nextId = (maxRows?.[0]?.id || 0) + 1;

      const { data, error } = await supabase
        .from('certifications')
        .insert([{ id: nextId, order: nextId, ...payload }])
        .select();

      if (error) {
        console.error('Supabase insert certification error:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, message: 'Certification ajoutée !', data: data?.[0] });
    }

    return NextResponse.json({ success: true, message: 'Certifications synchronisées avec succès !' });
  } catch (error: any) {
    console.error('Error updating certifications API:', error);
    return NextResponse.json({ success: false, message: error?.message || 'Erreur lors de la mise à jour.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id && isSupabaseConfigured()) {
      const { error } = await supabase
        .from('certifications')
        .delete()
        .eq('id', isNaN(Number(id)) ? id : Number(id));

      if (error) {
        console.error('Supabase delete certification error:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true, message: 'Certification supprimée avec succès !' });
  } catch (error: any) {
    console.error('Error in DELETE /api/certifications:', error);
    return NextResponse.json({ success: false, message: error?.message || 'Erreur lors de la suppression' }, { status: 500 });
  }
}
