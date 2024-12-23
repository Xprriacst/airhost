import { z } from 'zod';

const envSchema = z.object({
  supabase: z.object({
    url: z.string().min(1, 'Supabase URL is required'),
    anonKey: z.string().min(1, 'Supabase anon key is required'),
  }),
  openai: z.object({
    apiKey: z.string().min(1, 'OpenAI API key is required'),
  }),
  whatsapp: z.object({
    accessToken: z.string().min(1, 'WhatsApp access token is required'),
    instanceId: z.string().min(1, 'WhatsApp instance ID is required'),
  }),
});

const getEnvVar = (key: string): string => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      return import.meta.env[key] || '';
    }
  } catch {
    // Ignore if import.meta.env isn't available
  }

  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || '';
  }

  return '';
};

export const env = {
  supabase: {
    url: getEnvVar('VITE_SUPABASE_URL'),
    anonKey: getEnvVar('VITE_SUPABASE_ANON_KEY'),
  },
  openai: {
    apiKey: getEnvVar('OPENAI_API_KEY') || getEnvVar('VITE_OPENAI_API_KEY'),
  },
  whatsapp: {
    accessToken: getEnvVar('WHATSAPP_ACCESS_TOKEN') || getEnvVar('VITE_WHATSAPP_ACCESS_TOKEN'),
    instanceId: getEnvVar('WHATSAPP_INSTANCE_ID') || getEnvVar('VITE_WHATSAPP_INSTANCE_ID'),
  },
};

const validateEnv = () => {
  try {
    envSchema.parse(env);
    console.log('✅ Environment variables validated successfully');
    return true;
  } catch (error) {
    console.warn('⚠️ Environment validation failed. Using fallback configuration.');
    return false;
  }
};

export const isConfigValid = validateEnv();