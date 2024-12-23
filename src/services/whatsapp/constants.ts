export const WAAPI = {
  BASE_URL: 'https://waapi.app/api/v1',
  ENDPOINTS: {
    SEND_MESSAGE: `/instances/${import.meta.env.VITE_WHATSAPP_INSTANCE_ID}/client/action/send-message`,
    UPDATE_INSTANCE: `/instances/${import.meta.env.VITE_WHATSAPP_INSTANCE_ID}/update`,
    GET_MESSAGES: `/instances/${import.meta.env.VITE_WHATSAPP_INSTANCE_ID}/messages`
  }
} as const;

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': `Bearer ${import.meta.env.VITE_WHATSAPP_ACCESS_TOKEN}`
} as const;
