export class SupabaseError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'SupabaseError';
  }
}

export const DatabaseErrors = {
  CONNECTION_ERROR: new SupabaseError(
    'Database connection error',
    'DB_CONNECTION_ERROR',
    503
  ),
  QUERY_ERROR: new SupabaseError(
    'Database query error',
    'DB_QUERY_ERROR',
    500
  ),
  NOT_FOUND: new SupabaseError(
    'Resource not found',
    'NOT_FOUND',
    404
  ),
} as const;