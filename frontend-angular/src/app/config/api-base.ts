/**
 * Portfolio API (Render in production; local proxy in dev).
 */
const RENDER_ORIGIN = 'https://portfolio-awnu.onrender.com';
const RENDER_API_BASE = `${RENDER_ORIGIN}/api`;

export function getPortfolioApiBase(): string {
  if (typeof window === 'undefined' || !window.location) {
    return '/api';
  }
  const host = window.location.hostname;
  if (host === 'localhost' || host === '127.0.0.1') {
    return '/api';
  }
  if (host.endsWith('github.io')) {
    return RENDER_API_BASE;
  }
  return '/api';
}

/** Static JSON served by the same host as the API (about.json on Render). */
export function getPortfolioDataBaseUrl(): string {
  if (typeof window === 'undefined' || !window.location) {
    return '';
  }
  const host = window.location.hostname;
  if (host === 'localhost' || host === '127.0.0.1') {
    return '';
  }
  if (host.endsWith('github.io')) {
    return RENDER_ORIGIN;
  }
  return '';
}

/** Image or file path from JSON (e.g. images/foo.png, ./images/foo.png) → URL under Angular base href. */
export function resolvePortfolioAssetUrl(path: string): string {
  const trimmed = (path ?? '').trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return trimmed.replace(/^\.\//, '').replace(/^\/+/, '');
}
