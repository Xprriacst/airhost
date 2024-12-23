export const WAAPI = {
  BASE_URL: 'https://waapi.app/api/v1',
  ENDPOINTS: {
    SEND_MESSAGE: `/instances/${process.env.VITE_WHATSAPP_INSTANCE_ID}/client/action/send-message`,
    UPDATE_INSTANCE: `/instances/${process.env.VITE_WHATSAPP_INSTANCE_ID}/update`,
    GET_MESSAGES: `/instances/${process.env.VITE_WHATSAPP_INSTANCE_ID}/messages`
  }
} as const;

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': `Bearer ${process.env.VITE_WHATSAPP_ACCESS_TOKEN}`
} as const;