import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export interface ContactMessageItem {
  id: string | number;
  name: string;
  email: string;
  subject: string;
  message: string;
  intent?: string;
  categoryLabel?: string;
  date: string;
  read: boolean;
}

// In-memory fallback cache for high reliability
let inMemoryMessages: ContactMessageItem[] = [];

const getFallbackFilePath = () => {
  return path.join(process.cwd(), 'src', 'data', 'inbox_messages.json');
};

const readFallbackMessages = (): ContactMessageItem[] => {
  try {
    const filePath = getFallbackFilePath();
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    // Ignore fallback read error
  }
  return inMemoryMessages;
};

const writeFallbackMessages = (messages: ContactMessageItem[]) => {
  inMemoryMessages = messages;
  try {
    const filePath = getFallbackFilePath();
    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2), 'utf-8');
  } catch (e) {
    // Ignore fallback write error on read-only environments
  }
};

export async function GET() {
  try {
    const fallbackList = readFallbackMessages();
    let cloudList: ContactMessageItem[] = [];

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('contact_messages')
          .select('*')
          .order('id', { ascending: false });

        if (!error && data !== null && Array.isArray(data)) {
          cloudList = data.map((m: any) => ({
            id: m.id,
            name: m.sender_name || m.name || 'Visiteur',
            email: m.sender_email || m.email || '',
            subject: m.subject || 'Prise de contact',
            message: m.message || '',
            intent: m.intent || 'project',
            categoryLabel: m.subject || 'Opportunité',
            date: m.created_at || new Date().toISOString(),
            read: Boolean(m.is_read),
          }));
        }
      } catch (err) {
        console.warn('Supabase contact messages fetch notice:', err);
      }
    }

    // Merge cloud messages and fallback messages without duplicates
    const combinedMap = new Map<string, ContactMessageItem>();
    
    // Add fallback messages first
    fallbackList.forEach((msg) => {
      combinedMap.set(String(msg.id), msg);
    });

    // Add / overwrite with cloud messages
    cloudList.forEach((msg) => {
      combinedMap.set(String(msg.id), msg);
    });

    const merged = Array.from(combinedMap.values()).sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return NextResponse.json({ success: true, data: merged });
  } catch (error) {
    console.error('Error fetching contact messages API:', error);
    return NextResponse.json({ success: true, data: readFallbackMessages() });
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

    const newMessage: ContactMessageItem = {
      id: Date.now(),
      name: String(name).trim(),
      email: String(email).trim(),
      subject: String(subject || 'Prise de contact').trim(),
      message: String(message).trim(),
      intent: String(intent || 'project').trim(),
      categoryLabel: String(intent || 'Opportunité').trim(),
      date: new Date().toISOString(),
      read: false,
    };

    // 1. Immediately store in server fallback list
    const currentList = readFallbackMessages();
    writeFallbackMessages([newMessage, ...currentList]);

    // 2. Insert into Supabase table (matching real columns: sender_name, sender_email, subject, message, is_read)
    if (isSupabaseConfigured()) {
      try {
        const payload = {
          sender_name: newMessage.name,
          sender_email: newMessage.email,
          subject: newMessage.subject,
          message: newMessage.message,
          is_read: false,
        };

        const { error } = await supabase
          .from('contact_messages')
          .insert([payload]);

        if (error) {
          console.warn('Supabase contact insert notice (stored in server fallback):', error.message);
        }
      } catch (cloudErr) {
        console.warn('Cloud contact message insert notice:', cloudErr);
      }
    }

    return NextResponse.json({ success: true, message: 'Message envoyé avec succès !', data: newMessage });
  } catch (error: any) {
    console.error('Error in contact POST API:', error);
    return NextResponse.json({ success: false, message: error?.message || 'Erreur lors de l’envoi' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      // 1. Delete from local fallback
      const currentList = readFallbackMessages();
      writeFallbackMessages(currentList.filter((m) => String(m.id) !== String(id)));

      // 2. Delete from Supabase
      if (isSupabaseConfigured()) {
        try {
          await supabase
            .from('contact_messages')
            .delete()
            .eq('id', isNaN(Number(id)) ? id : Number(id));
        } catch (e) {
          console.warn('Supabase delete message notice:', e);
        }
      }
    }
    return NextResponse.json({ success: true, message: 'Message supprimé avec succès !' });
  } catch (error: any) {
    console.error('Error deleting contact message:', error);
    return NextResponse.json({ success: false, message: error?.message || 'Erreur lors de la suppression' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, read } = body;

    if (id) {
      // 1. Update in local fallback
      const currentList = readFallbackMessages();
      writeFallbackMessages(
        currentList.map((m) => (String(m.id) === String(id) ? { ...m, read: Boolean(read) } : m))
      );

      // 2. Update in Supabase
      if (isSupabaseConfigured()) {
        try {
          await supabase
            .from('contact_messages')
            .update({ is_read: Boolean(read) })
            .eq('id', isNaN(Number(id)) ? id : Number(id));
        } catch (e) {
          console.warn('Supabase patch message notice:', e);
        }
      }
    }
    return NextResponse.json({ success: true, message: 'Statut du message mis à jour !' });
  } catch (error: any) {
    console.error('Error updating contact message:', error);
    return NextResponse.json({ success: false, message: error?.message || 'Erreur lors de la mise à jour' }, { status: 500 });
  }
}
