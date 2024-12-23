import { supabase } from '../supabase/client';
import { whatsappService } from './service';
import type { Message } from '../../types';

export const handleMessageWebhook = async (payload: any) => {
  try {
    const {
      messageId,
      from,
      text,
      timestamp
    } = payload;

    // 1. Find conversation by phone number
    const { data: conversation } = await supabase
      .from('conversations')
      .select('*')
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

    // 4. If auto-pilot is enabled, generate and send AI response
    if (conversation.auto_pilot) {
      const response = await whatsappService.handleAutoPilotResponse(conversation.id, message);
      if (!response) {
        console.warn('Failed to generate auto-pilot response');
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Error handling WhatsApp webhook:', error);
    throw error;
  }
};