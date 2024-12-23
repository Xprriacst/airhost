import { Handler } from '@netlify/functions';
import { whatsappService } from '../../src/services/whatsapp/service';
import { supabase } from '../../src/services/supabase/client';
import { z } from 'zod';

const webhookSchema = z.object({
  event: z.string(),
  instanceId: z.string(),
  data: z.object({
    message: z.object({
      id: z.string(),
      from: z.string(),
      body: z.string(),
      type: z.string(),
      timestamp: z.number()
    }).optional(),
    id: z.string().optional(),
    status: z.string().optional()
  })
});

export const handler: Handler = async (event) => {
  // Vérifier la méthode HTTP
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parser et valider le payload
    const body = JSON.parse(event.body || '{}');
    const payload = webhookSchema.parse(body);
    const { event: eventName, instanceId, data } = payload;

    // Vérifier l'ID de l'instance
    if (instanceId !== process.env.WHATSAPP_INSTANCE_ID) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid instance ID' })
      };
    }

    // Gérer les messages entrants
    if (eventName === 'message' && data.message?.type === 'chat') {
      const messageData = data.message;
      const senderPhone = messageData.from.replace('@c.us', '');

      await whatsappService.handleIncomingMessage({
        messageId: messageData.id,
        from: senderPhone,
        text: messageData.body,
        timestamp: messageData.timestamp
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      };
    }

    // Gérer les accusés de réception
    if (eventName === 'message_ack' && data.id && data.status) {
      const { error } = await supabase
        .from('messages')
        .update({ whatsapp_status: data.status })
        .eq('whatsapp_message_id', data.id);

      if (error) {
        console.error('Error updating message status:', error);
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      };
    }

    // Ignorer les autres événements
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Event ignored' })
    };

  } catch (error) {
    console.error('Webhook error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Internal server error' 
      })
    };
  }
};