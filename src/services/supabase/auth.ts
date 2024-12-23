import { supabase } from './client';
import type { Session } from '@supabase/supabase-js';

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) {
    console.error('❌ Erreur d\'authentification:', error.message);
    throw error;
  }

  console.log('✅ Authentification réussie');
  return data.session;
};

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`
    }
  });

  if (error) {
    console.error('❌ Erreur d\'inscription:', error.message);
    throw error;
  }

  return data.session;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('❌ Erreur de déconnexion:', error.message);
    throw error;
  }
};

export const getCurrentSession = async (): Promise<Session | null> => {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
};

export const onAuthStateChange = (callback: (session: Session | null) => void) => {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session);
  });
};