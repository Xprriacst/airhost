export class WhatsAppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 400
  ) {
    super(message);
    this.name = 'WhatsAppError';
  }
}

export const WhatsAppErrors = {
  INVALID_PHONE: new WhatsAppError(
    'Invalid phone number format',
    'INVALID_PHONE',
    400
  ),
  MESSAGE_TOO_LONG: new WhatsAppError(
    'Message exceeds maximum length',
    'MESSAGE_TOO_LONG',
    400
  ),
  SEND_FAILED: new WhatsAppError(
    'Failed to send message',
    'SEND_FAILED',
    500
  ),
  TEMPLATE_NOT_FOUND: new WhatsAppError(
    'Template not found',
    'TEMPLATE_NOT_FOUND',
    404
  )
} as const;