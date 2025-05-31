import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';

// Create a Supabase client for browser-side operations
export const createBrowserClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
};

// Helper functions for common Supabase operations

/**
 * Save a report to the database
 */
export const saveReport = async (report: any) => {
  const supabase = createBrowserClient();
  const { data, error } = await supabase
    .from('reports')
    .insert(report)
    .select('id')
    .single();
  
  if (error) {
    console.error('Error saving report:', error);
    throw new Error('Failed to save report');
  }
  
  return data;
};

/**
 * Get a report by ID
 */
export const getReportById = async (reportId: string) => {
  const supabase = createBrowserClient();
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
 * Get reports for a user
 */
export const getUserReports = async (userId: string) => {
  const supabase = createBrowserClient();
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error getting user reports:', error);
    throw new Error('Failed to retrieve reports');
  }
  
  return data;
};

/**
 * Delete a report
 */
export const deleteReport = async (reportId: string) => {
  const supabase = createBrowserClient();
  const { error } = await supabase
    .from('reports')
    .delete()
    .eq('id', reportId);
  
  if (error) {
    console.error('Error deleting report:', error);
    throw new Error('Failed to delete report');
  }
  
  return true;
};