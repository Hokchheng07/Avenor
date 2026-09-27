function publicUrl(name: string, value: string | undefined, fallback: string) {
  const resolved = value?.trim() || fallback;

  if (!/^https?:\/\//i.test(resolved)) {
    throw new Error(
      `Environment variable ${name} must be an absolute HTTP(S) URL`,
    );
  }

  return resolved.replace(/\/+$/, "");
}

export const publicEnv = {
  siteUrl: publicUrl(
    "NEXT_PUBLIC_SITE_URL",
    process.env.NEXT_PUBLIC_SITE_URL,
    "https://avenor-woad.vercel.app",
  ),
  authApiUrl: publicUrl(
    "NEXT_PUBLIC_AUTH_API_URL",
    process.env.NEXT_PUBLIC_AUTH_API_URL,
    "https://sombobaeb.cheat.casa",
  ),
  openLibraryApiUrl: publicUrl(
    "NEXT_PUBLIC_OPEN_LIBRARY_API_URL",
    process.env.NEXT_PUBLIC_OPEN_LIBRARY_API_URL,
    "https://openlibrary.org",
  ),
  openLibraryCoversUrl: publicUrl(
    "NEXT_PUBLIC_OPEN_LIBRARY_COVERS_URL",
    process.env.NEXT_PUBLIC_OPEN_LIBRARY_COVERS_URL,
    "https://covers.openlibrary.org",
  ),
} as const;
