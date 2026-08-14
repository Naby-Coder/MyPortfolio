import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, currentPassword, newPassword } = body;

    if (!newPassword || newPassword.length < 8) {
      return NextResponse.json(
        { success: false, message: 'Le nouveau mot de passe doit contenir au moins 8 caractères.' },
        { status: 400 }
      );
    }

    const targetEmail = (email || 'mouhamedndione151@gmail.com').trim().toLowerCase();

    // 1. Try Supabase Auth password update if configured
    let supabaseUpdated = false;
    if (isSupabaseConfigured()) {
      try {
        const { error: signInErr } = await supabase.auth.signInWithPassword({
          email: targetEmail,
          password: currentPassword,
        });

        if (!signInErr) {
          const { error: updateErr } = await supabase.auth.updateUser({
            password: newPassword,
          });
          if (!updateErr) {
            supabaseUpdated = true;
          }
        }
      } catch (sbErr) {
        console.warn('Supabase Auth change password attempt:', sbErr);
      }
    }

    // 2. Update local server environment password in .env.local
    try {
      const envPath = path.join(process.cwd(), '.env.local');
      if (fs.existsSync(envPath)) {
        let envContent = fs.readFileSync(envPath, 'utf8');
        if (envContent.includes('ADMIN_PASSWORD=')) {
          envContent = envContent.replace(/ADMIN_PASSWORD=.*(\r?\n|$)/, `ADMIN_PASSWORD=${newPassword}$1`);
        } else {
          envContent += `\nADMIN_PASSWORD=${newPassword}\n`;
        }
        fs.writeFileSync(envPath, envContent, 'utf8');
      }
    } catch (fsErr) {
      console.warn('Could not write to .env.local:', fsErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Mot de passe modifié avec succès !',
      supabaseSynced: supabaseUpdated,
    });
  } catch (error) {
    console.error('Change Password Error:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la modification du mot de passe.' },
      { status: 500 }
    );
  }
}
