import { Handler } from '@netlify/functions';
import { z } from 'zod';
import { propertyService } from '../../src/services/supabase/propertyService';
import { conversationService } from '../../src/services/supabase/conversationService';
import { whatsappService } from '../../src/services/whatsapp/service';

const messageSchema = z.object({
  propertyId: z.string().min(1, 'Property ID is required'),
  guestName: z.string().min(1, 'Guest Name is required'),
  guestEmail: z.string().email('A valid email is required'),
  message: z.string().min(1, 'Message cannot be empty'),
  platform: z.enum(['whatsapp', 'sms', 'email']).default('whatsapp'),
  timestamp: z.string().datetime().optional(),
  checkInDate: z.string().optional(),
  checkOutDate: z.string().optional(),
});

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    console.log('➡️ Request body:', event.body);
    const body = JSON.parse(event.body || '{}');
    const data = messageSchema.parse(body);

    // Recherche de la propriété
    const property = await propertyService.getPropertyById(data.propertyId);
    if (!property) {
      console.error('❌ Property not found for ID:', data.propertyId);
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Property not found' }),
      };
    }

    // Recherche d'une conversation existante
    const existingConversation = await conversationService.findConversationByEmail(
      data.propertyId,
      data.guestEmail
    );

    let conversationId;

    if (existingConversation) {
      // Ajouter le message à la conversation existante
      console.log('✅ Adding message to existing conversation:', existingConversation.id);
      await conversationService.addMessage(existingConversation.id, {
        text: data.message,
        isUser: false,
        sender: data.guestName
      });
      conversationId = existingConversation.id;
    } else {
      // Créer une nouvelle conversation
      console.log('⚠️ No existing conversation found. Creating new one...');
      const newConversation = await conversationService.createConversation({
        property_id: data.propertyId,
        guest_name: data.guestName,
        guest_email: data.guestEmail,
        status: 'active',
        platform: data.platform,
        check_in_date: data.checkInDate,
        check_out_date: data.checkOutDate
      });
      
      if (!newConversation) {
        throw new Error('Failed to create conversation');
      }

      await conversationService.addMessage(newConversation.id, {
        text: data.message,
        isUser: false,
        sender: data.guestName
      });

      conversationId = newConversation.id;
    }

    // Si la plateforme est WhatsApp, envoyer via WhatsApp
    if (data.platform === 'whatsapp') {
      await whatsappService.handleIncomingMessage({
        messageId: Date.now().toString(),
        from: data.guestEmail, // Utiliser l'email comme identifiant temporaire
        text: data.message,
        timestamp: Date.now()
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        conversationId
      }),
    };
  } catch (error) {
    console.error('❌ Error processing message:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : 'Invalid request',
      }),
    };
  }
};
