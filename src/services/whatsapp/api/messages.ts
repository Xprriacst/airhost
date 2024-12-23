import { whatsappClient } from './client';
import { whatsappConfig } from '../config';
import { formatPhoneNumber, validateMessage } from '../utils';
import type { SendMessageParams } from '../types';

export const messageApi = {
  async sendText({ to, text }: SendMessageParams) {
    if (!validateMessage(text)) {
      throw new Error('Invalid message content');
    }

    const formattedNumber = formatPhoneNumber(to);
    console.log(`➡️ Sending WhatsApp message to ${formattedNumber}`);
    
    const response = await whatsappClient.post(whatsappConfig.endpoints.SEND_MESSAGE, {
      instance_id: whatsappConfig.instanceId,
      to: formattedNumber,
      message: text,
      type: 'text'
    });

    return response.data;
  },

  async sendTemplate({ to, templateName, languageCode, components }: {
    to: string;
    templateName: string;
    languageCode: string;
    components: any[];
  }) {
    const formattedNumber = formatPhoneNumber(to);
    console.log(`➡️ Sending WhatsApp template to ${formattedNumber}`);
    
    const response = await whatsappClient.post(whatsappConfig.endpoints.SEND_MESSAGE, {
      instance_id: whatsappConfig.instanceId,
      to: formattedNumber,
      template: {
        name: templateName,
        language: { code: languageCode },
        components
      },
      type: 'template'
    });

    return response.data;
  }
};