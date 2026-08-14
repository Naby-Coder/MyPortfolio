import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        const mapped = data.map((m: any) => ({
          id: m.id,
          name: m.sender_name,
          email: m.sender_email,
          subject: m.subject,
          message: m.message,
          intent: m.project_type || 'project',
          categoryLabel: m.project_type || 'Projet',
          date: m.created_at,
          read: m.is_read || false,
        }));
        return NextResponse.json({ success: true, data: mapped });
      }
    }
    return NextResponse.json({ success: true, data: [] });
  } catch (error) {
    console.error('Error fetching contact messages API:', error);
    return NextResponse.json({ success: true, data: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message, intent } = body;

    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('contact_messages')
        .insert({
          sender_name: name,
          sender_email: email,
          subject: subject || 'Nouveau message de contact',
          message: message,
          project_type: intent || 'project',
          is_read: false,
        })
        .select()
        .single();

      if (error) {
        console.warn('Supabase contact insert notice:', error);
      } else if (data) {
        return NextResponse.json({ success: true, message: 'Message envoyé avec succès !', data });
      }
    }

    return NextResponse.json({ success: true, message: 'Message reçu !' });
  } catch (error) {
    console.error('Error in contact POST API:', error);
    return NextResponse.json({ success: false, message: 'Erreur lors de l’envoi' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (isSupabaseConfigured() && id) {
      await supabase.from('contact_messages').delete().eq('id', id);
    }
    return NextResponse.json({ success: true, message: 'Message supprimé !' });
  } catch (error) {
    console.error('Error deleting contact message:', error);
    return NextResponse.json({ success: false, message: 'Erreur lors de la suppression' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, read } = body;

    if (isSupabaseConfigured() && id) {
      await supabase.from('contact_messages').update({ is_read: read }).eq('id', id);
    }
    return NextResponse.json({ success: true, message: 'Statut mis à jour !' });
  } catch (error) {
    console.error('Error updating contact message:', error);
    return NextResponse.json({ success: false, message: 'Erreur lors de la mise à jour' }, { status: 500 });
  }
}
