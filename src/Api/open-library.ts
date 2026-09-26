import { env } from "@/lib/env";

/**
 * Open Library REST client.
 *
 * Mirrors the endpoints in the "Open Library API" Postman collection:
 * search, works, subjects, ratings and covers. The API is free and keyless —
 * it only asks that every client identifies itself with a User-Agent that
 * carries a contact address (`OPEN_LIBRARY_USER_AGENT`).
 */

export type CoverSize = "S" | "M" | "L";
export type CoverKey = "id" | "isbn" | "olid";

export type SearchDoc = {
  key: string;
  title?: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  ratings_average?: number;
  ratings_count?: number;
  ebook_access?: "no_ebook" | "printdisabled" | "borrowable" | "public";
};

export type SearchResponse = {
  numFound: number;
  start: number;
  docs: SearchDoc[];
};

export type WorkDetails = {
  key: string;
  title: string;
  description?: string | { type: string; value: string };
  covers?: number[];
  subjects?: string[];
  first_publish_date?: string;
};

export type AuthorSearchDoc = {
  key: string;
  name: string;
  work_count?: number;
  top_work?: string;
  birth_date?: string;
};

export type AuthorSearchResponse = {
  numFound: number;
  docs: AuthorSearchDoc[];
};

export type EditionsResponse = {
  size: number;
  entries: { key: string; title?: string }[];
};

export type WorkRatings = {
  summary: { average: number | null; count: number; sortable: number | null };
  counts: Record<string, number>;
};

export type SubjectWork = {
  key: string;
  title: string;
  cover_id?: number;
  first_publish_year?: number;
  authors?: { key: string; name: string }[];
  availability?: { status?: string };
};

export type SubjectResponse = {
  name: string;
  work_count: number;
  works: SubjectWork[];
};

const SEARCH_FIELDS = [
  "key",
  "title",
  "author_name",
  "cover_i",
  "first_publish_year",
  "ratings_average",
  "ratings_count",
  "ebook_access",
].join(",");

class OpenLibraryError extends Error {
  constructor(
    readonly path: string,
    readonly status: number,
  ) {
    super(`Open Library request failed: ${path} responded ${status}`);
    this.name = "OpenLibraryError";
  }
}

async function request<T>(path: string, params?: Record<string, string | number>): Promise<T> {
  const url = new URL(path, `${env.openLibraryApiUrl}/`);

  for (const [key, value] of Object.entries(params ?? {})) {
    url.searchParams.set(key, String(value));
  }

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": env.openLibraryUserAgent,
    },
    next: { revalidate: env.openLibraryRevalidateSeconds },
  });

  if (!response.ok) {
    throw new OpenLibraryError(url.pathname, response.status);
  }

  return (await response.json()) as T;
}

/** `GET /search.json` — search works by title, author or free text. */
export function searchBooks(query: string, limit = 12) {
  return request<SearchResponse>("search.json", { q: query, limit, fields: SEARCH_FIELDS });
}

/** `GET /search/authors.json` — search authors by name. */
export function searchAuthors(query: string, limit = 6) {
  return request<AuthorSearchResponse>("search/authors.json", { q: query, limit });
}

/** `GET /works/{work_olid}/editions.json` — editions of a work (`size` is the total). */
export function getWorkEditions(workOlid: string, limit = 1) {
  return request<EditionsResponse>(`works/${workOlid}/editions.json`, { limit });
}

/** `GET /works/{work_olid}.json` — full record for a single work. */
export function getWork(workOlid: string) {
  return request<WorkDetails>(`works/${workOlid}.json`);
}

/** `GET /works/{work_olid}/ratings.json` — aggregated reader ratings. */
export function getWorkRatings(workOlid: string) {
  return request<WorkRatings>(`works/${workOlid}/ratings.json`);
}

/** `GET /subjects/{subject}.json` — works filed under a subject. */
export function getSubjectWorks(subject: string, limit = 12) {
  return request<SubjectResponse>(`subjects/${subject}.json`, { limit, details: "false" });
}

/** Cover image URL, e.g. `coverUrl(14627509)` or `coverUrl("0547928227", "L", "isbn")`. */
export function coverUrl(value: string | number, size: CoverSize = "M", key: CoverKey = "id") {
  return `${env.openLibraryCoversUrl}/b/${key}/${value}-${size}.jpg`;
}

/** Author portrait URL from an author OLID, returning 404 when no photo exists. */
export function authorPhotoUrl(authorOlid: string, size: CoverSize = "M") {
  const olid = authorOlid.replace("/authors/", "");
  return `${env.openLibraryCoversUrl}/a/olid/${olid}-${size}.jpg?default=false`;
}

export { OpenLibraryError };
