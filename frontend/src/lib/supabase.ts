import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qjnsmdtnututsdrvbmei.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqbnNtZHRudXR1dHNkcnZibWVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1MDk3NjQsImV4cCI6MjEwMjA4NTc2NH0.s6GWv9DCoebdbtUYreeCl4Qkc160CSxteb7d1vcDlqE';

export function isSupabaseConfigured(): boolean {
  if (!supabaseUrl || !supabaseAnonKey) return false;
  if (supabaseUrl.includes('placeholder') || supabaseUrl.includes('your-project')) return false;
  if (supabaseAnonKey.includes('placeholder') || supabaseAnonKey.includes('your-anon-key')) return false;
  return true;
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

