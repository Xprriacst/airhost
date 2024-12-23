import { Handler } from '@netlify/functions';
import { messagingService } from '../../src/services/messaging/service';
import { messageSchema } from '../../src/services/messaging/types';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { channel, payload } = body;

    // Valider le payload
    const validatedPayload = messageSchema.parse(payload);

    // Traiter le message
    const success = await messagingService.handleIncomingMessage(channel, validatedPayload);

    return {
      statusCode: success ? 200 : 500,
      body: JSON.stringify({ success })
    };
  } catch (error) {
    console.error('Webhook error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};