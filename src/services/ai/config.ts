import OpenAI from 'openai';
import { env } from '../../config/env';

export const initializeOpenAI = () => {
  const apiKey = env.openai.apiKey;
  
  if (!apiKey) {
    console.warn('⚠️ OpenAI API key not found. AI features will use mock responses.');
    return null;
  }

  try {
    return new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });
  } catch (error) {
    console.error('❌ Failed to initialize OpenAI:', error);
    return null;
  }
};

export const openai = initializeOpenAI();