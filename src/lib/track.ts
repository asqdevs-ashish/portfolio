import { track } from "@vercel/analytics";

/** Fire a named conversion event; safe no-op if analytics is unavailable. */
export function trackCta(name: string) {
  try {
    track(name);
  } catch {
    /* noop */
  }
}