import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, message: 'Aucun fichier fourni' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileExt = file.name.split('.').pop() || 'png';
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.storage
        .from('portfolio_media')
        .upload(fileName, buffer, {
          contentType: file.type || 'image/png',
          upsert: true,
        });

      if (!error && data) {
        const { data: publicUrlData } = supabase.storage
          .from('portfolio_media')
          .getPublicUrl(fileName);

        return NextResponse.json({
          success: true,
          url: publicUrlData.publicUrl,
        });
      } else {
        console.warn('Supabase storage upload notice:', error);
      }
    }

    // Fallback: Convert to optimized base64 string if bucket not ready yet
    const base64 = `data:${file.type || 'image/png'};base64,${buffer.toString('base64')}`;
    return NextResponse.json({
      success: true,
      url: base64,
    });
  } catch (error) {
    console.error('Error in upload API:', error);
    return NextResponse.json({ success: false, message: 'Erreur lors du téléversement' }, { status: 500 });
  }
}
