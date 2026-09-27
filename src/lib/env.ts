import { publicEnv } from "./public-env";

/** Server-only environment values combined with the shared public config. */

function required(name: string, value: string | undefined, fallback: string) {
  const resolved = value?.trim() || fallback;

  if (!resolved) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return resolved.replace(/\/+$/, "");
}

function positiveNumber(
  name: string,
  value: string | undefined,
  fallback: number,
) {
  if (value === undefined || value.trim() === "") {
    return fallback;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new Error(
      `Environment variable ${name} must be a positive number, received "${value}"`,
    );
  }

  return parsed;
}

export const env = {
  ...publicEnv,
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
