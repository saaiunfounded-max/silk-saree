import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isDemoMode = !supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('example.com') || supabaseUrl === '';

export const supabase = !isDemoMode
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
