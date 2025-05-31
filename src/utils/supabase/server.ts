import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from '@/types/database.types';
import { cache } from 'react';

// Create a Supabase client for server-side operations
export const createServerClient = cache(() => {
  const cookieStore = cookies();
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
  return createServerClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name, options) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
});

// Server-side helper functions

/**
 * Get a report by ID (server-side)
 */
export const getReportById = async (reportId: string) => {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .eq('id', reportId)
    .single();
  
  if (error) {
    console.error('Error getting report:', error);
    throw new Error('Failed to retrieve report');
  }
  
  return data;
};

/**
 * Get all reports (admin only)
 */
export const getReports = async () => {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error getting reports:', error);
    throw new Error('Failed to retrieve reports');
  }
  
  return data;
};