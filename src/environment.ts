/// Use this file to define global environment variables.

/** Url to MercadoLibre's API */
export const meliApiUrl = process.env.MELI_API_URL as string;

/** Vercel url or localhost in development. */
export const baseAppUrl = (process.env.BASE_URL || process.env.VERCEL_URL) as string;

/** Base url for the app. It uses http for local development and https for deploys. */
export const appUrl = `${baseAppUrl.includes('localhost') ? 'http://' : 'https://'}${baseAppUrl}`;
