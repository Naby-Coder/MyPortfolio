import { supabase, isSupabaseConfigured } from './supabase';

export interface SupabaseSkill {
  id: string | number;
  name: string;
  category: string;
  level_percentage: number;
  proficiency_label?: string;
  icon?: string;
  is_featured?: boolean;
}

export interface SupabaseProject {
  id: string | number;
  slug: string;
  title_fr: string;
  title_en: string;
  summary_fr: string;
  summary_en: string;
  featured_image?: string;
  demo_url?: string;
  github_url?: string;
  category_id?: number;
  is_featured?: boolean;
  status?: string;
}

// 1. SKILLS (TECHNICAL ECOSYSTEM) CRUD
export async function fetchSupabaseSkills(): Promise<SupabaseSkill[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }
  try {
    const { data, error } = await supabase.from('skills').select('*').order('id', { ascending: true });
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.warn('Supabase fetchSkills warning (using local fallback):', err);
    return [];
  }
}

export async function addSupabaseSkill(skill: Omit<SupabaseSkill, 'id'>) {
  const { data, error } = await supabase.from('skills').insert([skill]).select();
  if (error) throw error;
  return data;
}

export async function updateSupabaseSkill(id: string | number, skill: Partial<SupabaseSkill>) {
  const { data, error } = await supabase.from('skills').update(skill).eq('id', id).select();
  if (error) throw error;
  return data;
}

export async function deleteSupabaseSkill(id: string | number) {
  const { data, error } = await supabase.from('skills').delete().eq('id', id);
  if (error) throw error;
  return data;
}

// 2. PROJECTS READ & CRUD
export async function fetchSupabaseProjects(): Promise<SupabaseProject[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }
  try {
    const { data, error } = await supabase.from('projects').select('*').order('id', { ascending: true });
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.warn('Supabase fetchProjects warning:', err);
    return [];
  }
}

// 3. CONTACT FORM SUBMISSION
export async function submitContactMessage(payload: {
  sender_name: string;
  sender_email: string;
  subject: string;
  message: string;
  project_type?: string;
  budget_range?: string;
}) {
  const { data, error } = await supabase.from('contact_messages').insert([payload]).select();
  if (error) throw error;
  return data;
}
