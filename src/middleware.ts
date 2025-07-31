import { defineMiddleware } from 'astro:middleware';
import { getCurrentLanguage } from './i18n/astro-utils';

export const onRequest = defineMiddleware(async (context, next) => {
  // Get the current locale from the URL
  const url = new URL(context.request.url);
  const locale = url.pathname.startsWith('/es') ? 'es' : 'en';
  
  // Set the locale in the context for use in components
  context.locals.locale = locale;
  
  // Continue with the request
  return next();
});