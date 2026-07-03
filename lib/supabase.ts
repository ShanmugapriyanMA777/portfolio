import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = 
  typeof window !== 'undefined'
    ? !!(window.location?.hostname === 'localhost' || process.env.NEXT_PUBLIC_SUPABASE_URL) && !!supabaseUrl && !!supabaseAnonKey
    : !!supabaseUrl && !!supabaseAnonKey;

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
