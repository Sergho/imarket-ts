export type ErrorResponse = {
  errorMessage: string;
  errorType: ErrorType;
};

export type ErrorType = 'Raw' | 'General' | 'Forbidden' | 'Unauthorized';
