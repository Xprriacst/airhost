import { whatsappService } from '../whatsapp/service';
import type { MessagePayload } from './types';

export const messagingService = {
  async sendMessage(payload: MessagePayload): Promise<boolean> {
    try {
      switch (payload.channel) {
        case 'whatsapp':
          return await whatsappService.sendMessage(payload.to, {
            id: Date.now().toString(),
            text: payload.text,
            isUser: true,
            timestamp: new Date(),
            sender: 'Host'
          });

        case 'sms':
        case 'email':
          console.warn(`Channel ${payload.channel} not implemented yet`);
          return false;

        default:
          throw new Error(`Unsupported channel: ${payload.channel}`);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      return false;
    }
  },

  async handleIncomingMessage(channel: MessageChannel, payload: any): Promise<boolean> {
    try {
      switch (channel) {
        case 'whatsapp':
          return await whatsappService.handleIncomingMessage(payload);

        case 'sms':
        case 'email':
          console.warn(`Channel ${channel} not implemented yet`);
          return false;

        default:
          throw new Error(`Unsupported channel: ${channel}`);
      }
    } catch (error) {
      console.error('Error handling incoming message:', error);
      return false;
    }
  }
};