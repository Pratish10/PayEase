export interface ErrorResponse {
  success: false;
  error: string;
  details?: string[]; // Optional field to provide more detailed error info
}
