import { PostgrestError } from '@supabase/supabase-js';

export const handleDatabaseError = (error: PostgrestError | null, context: string) => {
  if (!error) return;

  console.error(`Database error in ${context}:`, error);

  // Return empty data instead of throwing to prevent app crashes
  return [];
};

export const logError = (error: unknown, context: string) => {
  console.error(`Error in ${context}:`, error);
  return [];
};