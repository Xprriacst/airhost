import { z } from 'zod';

export type MessageChannel = 'whatsapp' | 'sms' | 'email';

export interface MessagePayload {
  to: string;
  text: string;
  channel: MessageChannel;
  metadata?: Record<string, any>;
}

export const messageSchema = z.object({
  to: z.string(),
  text: z.string(),
  channel: z.enum(['whatsapp', 'sms', 'email']),
  metadata: z.record(z.any()).optional()
});