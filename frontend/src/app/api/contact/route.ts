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
        .order('id', { ascending: false });

      if (!error && data !== null) {
        const mapped = data.map((m: any) => ({
          id: m.id,
          name: m.sender_name || 'Visiteur',
          email: m.sender_email || '',
          subject: m.subject || 'Prise de contact',
          message: m.message || '',
          intent: m.project_type || 'project',
          categoryLabel: m.project_type || 'Projet',
          date: m.created_at || new Date().toISOString(),
          read: Boolean(m.is_read),
        }));
        return NextResponse.json({ success: true, data: mapped });
      }
    }
    return NextResponse.json({ success: true, data: [] });
  } catch (error) {
    console.error('Error fetching contact messages API:', error);
    return NextResponse.json({ success: false, data: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message, intent } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Veuillez remplir tous les champs obligatoires.' },
        { status: 400 }
      );
    }

    if (isSupabaseConfigured()) {
      const payload: any = {
        sender_name: String(name).trim(),
        sender_email: String(email).trim(),
        subject: String(subject || 'Prise de contact').trim(),
        message: String(message).trim(),
        project_type: String(intent || 'project').trim(),
        is_read: false,
      };

      const { error } = await supabase
        .from('contact_messages')
        .insert([payload]);

      if (error) {
        console.error('Supabase contact insert error:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, message: 'Message envoyé avec succès !' });
    }

    return NextResponse.json({ success: true, message: 'Message reçu !' });
  } catch (error: any) {
    console.error('Error in contact POST API:', error);
    return NextResponse.json({ success: false, message: error?.message || 'Erreur lors de l’envoi' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (isSupabaseConfigured() && id) {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', isNaN(Number(id)) ? id : Number(id));

      if (error) {
        console.error('Supabase delete contact message error:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
      }
    }
    return NextResponse.json({ success: true, message: 'Message supprimé avec succès de Supabase !' });
  } catch (error: any) {
    console.error('Error deleting contact message:', error);
    return NextResponse.json({ success: false, message: error?.message || 'Erreur lors de la suppression' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, read } = body;

    if (isSupabaseConfigured() && id) {
      const { error } = await supabase
        .from('contact_messages')
        .update({ is_read: Boolean(read) })
        .eq('id', isNaN(Number(id)) ? id : Number(id));

      if (error) {
        console.error('Supabase update contact message error:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
      }
    }
    return NextResponse.json({ success: true, message: 'Statut du message mis à jour !' });
  } catch (error: any) {
    console.error('Error updating contact message:', error);
    return NextResponse.json({ success: false, message: error?.message || 'Erreur lors de la mise à jour' }, { status: 500 });
  }
}
