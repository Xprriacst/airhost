import { whatsappApi } from './api';
import type { Message } from '../../types';

export const whatsappService = {
  async sendMessage(phoneNumber: string, message: Message) {
    try {
      return await whatsappApi.sendMessage(phoneNumber, message);
    } catch (error) {
      console.error('Failed to send WhatsApp message:', error);
      return false;
    }
  },

  async setupWebhook() {
    const webhookUrl = `${window.location.origin}/.netlify/functions/whatsapp-webhook`;
    try {
      return await whatsappApi.setupWebhook(webhookUrl);
    } catch (error) {
      console.error('Failed to setup webhook:', error);
      return false;
    }
  }
};