import axios from 'axios';
import { WAAPI, DEFAULT_HEADERS } from './constants';
import type { Message } from '../../types';

const api = axios.create({
  baseURL: WAAPI.BASE_URL,
  headers: DEFAULT_HEADERS
});

export const whatsappApi = {
  async sendMessage(phoneNumber: string, message: Message) {
    try {
      console.log(`➡️ Sending WhatsApp message to ${phoneNumber}`);
      
      const response = await api.post(WAAPI.ENDPOINTS.SEND_MESSAGE, {
        chatId: `${phoneNumber}@c.us`,
        message: message.text
      });

      console.log('✅ Message sent successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ WhatsApp API Error:', error);
      throw new Error('Failed to send WhatsApp message');
    }
  },

  async setupWebhook(webhookUrl: string) {
    try {
      console.log('➡️ Setting up WhatsApp webhook...');
      
      const response = await api.post(WAAPI.ENDPOINTS.UPDATE_INSTANCE, {
        webhook: webhookUrl,
        events: ['message', 'message_ack']
      });

      console.log('✅ Webhook configured successfully');
      return response.data;
    } catch (error) {
      console.error('❌ Webhook setup error:', error);
      throw new Error('Failed to setup webhook');
    }
  }
};