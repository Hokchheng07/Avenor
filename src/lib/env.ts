/**
 * Server-side environment variables.
 *
 * These are read on the server only — none of them are prefixed with
 * `NEXT_PUBLIC_`, so they never reach the browser bundle.
 */

function required(name: string, value: string | undefined, fallback: string) {
  const resolved = value?.trim() || fallback;

  if (!resolved) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return resolved.replace(/\/+$/, "");
}

function positiveNumber(name: string, value: string | undefined, fallback: number) {
  if (value === undefined || value.trim() === "") {
    return fallback;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new Error(`Environment variable ${name} must be a positive number, received "${value}"`);
  }

  return parsed;
}

export const env = {
  openLibraryApiUrl: required(
    "OPEN_LIBRARY_API_URL",
    process.env.OPEN_LIBRARY_API_URL,
    "https://openlibrary.org",
  ),
  openLibraryCoversUrl: required(
    "OPEN_LIBRARY_COVERS_URL",
    process.env.OPEN_LIBRARY_COVERS_URL,
    "https://covers.openlibrary.org",
  ),
  openLibraryUserAgent: required(
    "OPEN_LIBRARY_USER_AGENT",
    process.env.OPEN_LIBRARY_USER_AGENT,
    "Avenor/1.0 (contact@avenor.app)",
  ),
  openLibraryRevalidateSeconds: positiveNumber(
    "OPEN_LIBRARY_REVALIDATE_SECONDS",
    process.env.OPEN_LIBRARY_REVALIDATE_SECONDS,
    3600,
  ),
} as const;
