import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { defaultCertificationBadges, CertificationBadge } from '@/components/ui/PartnerLogoMarquee';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('order', { ascending: true });

      if (!error && data && data.length > 0) {
        const mapped: CertificationBadge[] = data.map((d: any) => ({
          id: String(d.id),
          badgeCode: d.title ? d.title.substring(0, 16).toUpperCase() : 'OFFICIAL',
          titleFr: d.title,
          titleEn: d.title,
          issuer: d.issuer,
          date: d.issue_date || '2023',
          category: d.category || 'Certification',
          image: d.badge_image || undefined,
          credentialUrl: d.credential_url || 'https://unchk.edu.sn/',
          colorVariant: 'blue',
        }));
        return NextResponse.json({ success: true, data: mapped });
      }
    }

    return NextResponse.json({ success: true, data: defaultCertificationBadges });
  } catch (error) {
    console.error('Error fetching certifications API:', error);
    return NextResponse.json({ success: true, data: defaultCertificationBadges });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const badges: CertificationBadge[] = body.badges || [body];

    if (isSupabaseConfigured()) {
      const rows = badges.map((b, idx) => ({
        id: isNaN(Number(b.id)) ? idx + 1 : Number(b.id),
        title: b.titleFr || b.titleEn,
        issuer: b.issuer,
        issue_date: b.date && b.date.includes('-') ? b.date : '2023-01-01',
        category: b.category,
        badge_image: b.image,
        credential_url: b.credentialUrl,
        order: idx + 1,
      }));

      const { data, error } = await supabase
        .from('certifications')
        .upsert(rows, { onConflict: 'id' });

      if (error) {
        console.warn('Supabase certifications upsert notice:', error);
      }
    }

    return NextResponse.json({ success: true, message: 'Certifications synchronisées avec succès !' });
  } catch (error) {
    console.error('Error updating certifications API:', error);
    return NextResponse.json({ success: false, message: 'Erreur lors de la mise à jour.' }, { status: 500 });
  }
}
