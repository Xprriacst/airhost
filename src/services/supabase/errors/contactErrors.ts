export class ContactError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 400
  ) {
    super(message);
    this.name = 'ContactError';
  }
}

export const ContactErrors = {
  NOT_FOUND: new ContactError('Contact not found', 'CONTACT_NOT_FOUND', 404),
  DUPLICATE_EMAIL: new ContactError('Email already exists', 'DUPLICATE_EMAIL', 409),
  INVALID_DATA: new ContactError('Invalid contact data', 'INVALID_DATA', 400),
  CREATE_FAILED: new ContactError('Failed to create contact', 'CREATE_FAILED', 500),
  UPDATE_FAILED: new ContactError('Failed to update contact', 'UPDATE_FAILED', 500),
  DELETE_FAILED: new ContactError('Failed to delete contact', 'DELETE_FAILED', 500),
} as const;