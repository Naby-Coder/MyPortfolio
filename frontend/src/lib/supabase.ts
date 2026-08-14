import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export function isSupabaseConfigured(): boolean {
  if (!supabaseUrl || !supabaseAnonKey) return false;
  if (supabaseUrl.includes('placeholder') || supabaseUrl.includes('your-project')) return false;
  if (supabaseAnonKey.includes('placeholder') || supabaseAnonKey.includes('your-anon-key')) return false;
  return true;
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
