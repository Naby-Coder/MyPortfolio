import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

// Server-side Master Credentials for Mouhamed Ndione
const VALID_EMAIL = (process.env.ADMIN_EMAIL || 'mouhamedndione151@gmail.com').toLowerCase().trim();
const ACCEPTED_PASSWORDS = [
  (process.env.ADMIN_PASSWORD || '').trim(),
].filter(Boolean);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Veuillez saisir votre email et votre mot de passe.' },
        { status: 400 }
      );
    }

    const inputEmail = String(email).trim().toLowerCase();
    const inputPassword = String(password).trim();

    // 1. If Supabase is configured, attempt Supabase Auth
    let supabaseSuccess = false;
    if (isSupabaseConfigured()) {
      try {
        const { data: sbData, error: sbError } = await supabase.auth.signInWithPassword({
          email: inputEmail,
          password: inputPassword,
        });

        if (!sbError && sbData?.user) {
          supabaseSuccess = true;
        } else if (sbError) {
          if (sbError.message.includes('Email not confirmed') || sbError.status === 400) {
            // User exists in Supabase
          }
        }
      } catch (err) {
        console.warn('Supabase auth sign-in notice:', err);
      }
    }

    // 2. Check credentials (either Supabase verified or Environment verified)
    const emailMatch = inputEmail === VALID_EMAIL || inputEmail.includes('mouhamedndione') || supabaseSuccess;
    const passwordMatch =
      supabaseSuccess ||
      ACCEPTED_PASSWORDS.includes(inputPassword);

    if (!emailMatch || !passwordMatch) {
      return NextResponse.json(
        {
          success: false,
          message: 'Identifiants invalides. Vérifiez l’adresse email ou le mot de passe.',
        },
        { status: 401 }
      );
    }

    // Generate cryptographic session token
    const token = 'mouhamed_auth_' + crypto.randomBytes(24).toString('hex');

    const response = NextResponse.json({
      success: true,
      user: {
        email: VALID_EMAIL,
        name: 'Mouhamed Ndione',
        role: 'SUPER_ADMIN',
      },
      token,
      supabaseConnected: isSupabaseConfigured(),
    });

    // Set secure cookie
    response.cookies.set('admin_session_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Admin Auth API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur lors de l’authentification.' },
      { status: 500 }
    );
  }
}
