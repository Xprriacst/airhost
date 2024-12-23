import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Variables d\'environnement Supabase manquantes. Vérifiez votre fichier .env');
}

export const supabase = createClient<Database>(
  supabaseUrl || '',
  supabaseKey || ''
);

// Test de connexion
supabase.from('properties').select('count', { count: 'exact' })
  .then(({ error }) => {
    if (error) {
      console.error('❌ Erreur de connexion à Supabase:', error.message);
    } else {
      console.log('✅ Connexion à Supabase établie');
    }
  })
  .catch(error => {
    console.error('❌ Erreur inattendue:', error);
  });