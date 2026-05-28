import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  console.warn("WARNING: RESEND_API_KEY environment variable is missing.");
}

export const resend = apiKey ? new Resend(apiKey) : null;

/**
 * Gets the Resend client instance or throws a clear server-side error if the API key is missing.
 */
export function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY environment variable is missing. Please configure it in your environment variables before sending emails.");
  }
  return resend || new Resend(process.env.RESEND_API_KEY);
}
