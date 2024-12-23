import { supabase } from '../../supabase/client';
import { whatsappService } from '../service';
import { aiService } from '../../ai/aiService';
import { propertyService } from '../../supabase/propertyService';
import type { Message } from '../../../types';
import type { WebhookPayload } from '../types';

export const handleIncomingMessage = async (payload: WebhookPayload) => {
  try {
    const { messageId, from, text, timestamp } = payload;

    // 1. Find conversation by phone number
    const { data: conversation } = await supabase
      .from('conversations')
      .select('*, property:properties(*)')
      .eq('guest_phone', from)
      .single();

    if (!conversation) {
      console.warn(`No conversation found for phone ${from}`);
      return;
    }

    // 2. Create message
    const message: Message = {
      id: messageId,
      text,
      isUser: false,
      timestamp: new Date(timestamp * 1000),
      sender: conversation.guest_name
    };

    // 3. Save message to database
    const { error: messageError } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversation.id,
        text: message.text,
        is_user: message.isUser,
        sender: message.sender,
        whatsapp_message_id: messageId,
        whatsapp_status: 'delivered'
      });

    if (messageError) {
      throw messageError;
    }

    // 4. Handle auto-pilot response if enabled
    if (conversation.property?.auto_pilot) {
      const property = await propertyService.getPropertyById(conversation.property_id);
      if (!property) {
        throw new Error('Property not found');
      }

      const aiResponse = await aiService.generateResponse(message, property);
      if (aiResponse) {
        await whatsappService.sendHostMessage(from, {
          id: Date.now().toString(),
          text: aiResponse,
          isUser: true,
          timestamp: new Date(),
          sender: 'AI Assistant'
        });
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Error handling incoming message:', error);
    throw error;
  }
};