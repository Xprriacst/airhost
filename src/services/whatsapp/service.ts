import { messageApi } from './api/messages';
import { handleIncomingMessage } from './handlers/messageHandler';
import type { Message } from '../../types';
import type { WebhookPayload } from './types';

export const whatsappService = {
  async sendMessage(phoneNumber: string, message: Message): Promise<boolean> {
    try {
      await messageApi.sendText({
        to: phoneNumber,
        text: message.text
      });
      return true;
    } catch (error) {
      console.error('Failed to send WhatsApp message:', error);
      return false;
    }
  },

  async handleIncomingMessage(payload: WebhookPayload): Promise<boolean> {
    try {
      await handleIncomingMessage(payload);
      return true;
    } catch (error) {
      console.error('Failed to handle incoming message:', error);
      return false;
    }
  }
};
