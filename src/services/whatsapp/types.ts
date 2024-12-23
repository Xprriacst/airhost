import { z } from 'zod';

export const messageSchema = z.object({
  messaging_product: z.literal('whatsapp'),
  recipient_type: z.literal('individual'),
  to: z.string(),
  type: z.enum(['text', 'template', 'interactive']),
  text: z.object({
    body: z.string()
  }).optional(),
  template: z.object({
    name: z.string(),
    language: z.object({
      code: z.string()
    }),
    components: z.array(z.object({
      type: z.string(),
      parameters: z.array(z.object({
        type: z.string(),
        text: z.string()
      }))
    }))
  }).optional()
});

export interface SendMessageParams {
  to: string;
  text: string;
}

export interface WebhookPayload {
  messageId: string;
  from: string;
  text: string;
  timestamp: number;
}

export type WhatsAppMessageStatus = 'sent' | 'delivered' | 'read' | 'failed';