import type { Book } from "@/Components/Books/book-card";
import type { AuthorPathway } from "@/Components/HomePage/author-pathways";
import {
  authorPhotoUrl,
  coverUrl,
  searchAuthors,
  searchBooks,
  type SearchDoc,
} from "./open-library";

/**
 * View-model layer for the home page: turns raw Open Library payloads into the
 * shapes the section components render. Every loader degrades to a curated
 * fallback so a slow or failing upstream never takes the page down.
 */

const SHELF_QUERY = "subject:fiction";

const FEATURED_AUTHORS = [
  { key: "OL31120A", name: "Toni Morrison", workCount: 101, topWork: "Beloved" },
  { key: "OL391839A", name: "James Baldwin", workCount: 82, topWork: "Go Tell It on the Mountain" },
  { key: "OL31353A", name: "Ursula K. Le Guin", workCount: 253, topWork: "The Left Hand of Darkness" },
  { key: "OL19450A", name: "Virginia Woolf", workCount: 2011, topWork: "To the Lighthouse" },
  { key: "OL30802A", name: "Octavia E. Butler", workCount: 34, topWork: "Kindred" },
  { key: "OL28493A", name: "Kazuo Ishiguro", workCount: 21, topWork: "The Remains of the Day" },
] as const;

export const subjects = [
  "Fiction",
  "History",
  "Science",
  "Poetry",
  "Biography",
  "Children’s",
  "Travel",
  "Art",
] as const;

/**
 * Stable hero picks with Avenor-owned artwork. Keeping this separate from the
 * API-driven shelf prevents small remote thumbnails from being stretched in
 * the large hero treatment and makes every cover link deterministic.
 */
export const heroBooks: readonly Book[] = [
  { key: "/works/OL27482W", title: "The Hobbit", author: "J.R.R. Tolkien", coverUrl: "/Images/hero-covers/the-hobbit.jpg", year: 1937, rating: 4.29, availability: "borrowable" },
  { key: "/works/OL59800W", title: "The Left Hand of Darkness", author: "Ursula K. Le Guin", coverUrl: "/Images/hero-covers/the-left-hand-of-darkness.jpg", year: 1969, rating: 4.27, availability: "accessible" },
  { key: "/works/OL50548W", title: "Beloved", author: "Toni Morrison", coverUrl: "/Images/hero-covers/beloved.jpg", year: 1987, rating: 3.91, availability: "borrowable" },
  { key: "/works/OL39316W", title: "The Waves", author: "Virginia Woolf", coverUrl: "/Images/hero-covers/the-waves.jpg", year: 1931, rating: 4.38, availability: "borrowable" },
  { key: "/works/OL18012166W", title: "Circe", author: "Madeline Miller", coverUrl: "/Images/hero-covers/circe.jpg", year: 2018, rating: 4.16, availability: "preview" },
];

/** Covers bundled in `public/Images/books`, used when the API is unreachable. */
const fallbackBooks: readonly Book[] = [
  { key: "/works/OL27482W", title: "The Hobbit", author: "J.R.R. Tolkien", coverUrl: "/Images/books/14627509.jpg", year: 1937, rating: 4.29, availability: "borrowable" },
  { key: "/works/OL59800W", title: "The Left Hand of Darkness", author: "Ursula K. Le Guin", coverUrl: "/Images/books/10618463.jpg", year: 1969, rating: 4.27, availability: "accessible" },
  { key: "/works/OL50548W", title: "Beloved", author: "Toni Morrison", coverUrl: "/Images/books/8261367.jpg", year: 1987, rating: 3.91, availability: "borrowable" },
  { key: "/works/OL39316W", title: "The Waves", author: "Virginia Woolf", coverUrl: "/Images/books/119517.jpg", year: 1931, rating: 4.38, availability: "borrowable" },
  { key: "/works/OL18012166W", title: "Circe", author: "Madeline Miller", coverUrl: "/Images/books/8739376.jpg", year: 2018, rating: 4.16, availability: "preview" },
  { key: "/works/OL16819897W", title: "Braiding Sweetgrass", author: "Robin Wall Kimmerer", coverUrl: "/Images/books/7281575.jpg", year: 2013, rating: 4.62, availability: "accessible" },
  { key: "/works/OL59798W", title: "A Wizard of Earthsea", author: "Ursula K. Le Guin", coverUrl: "/Images/books/13617691.jpg", year: 1968, rating: 3.94, availability: "borrowable" },
  { key: "/works/OL4321141W", title: "The Secret History", author: "Donna Tartt", coverUrl: "/Images/books/744854.jpg", year: 1992, rating: 4.03, availability: "accessible" },
];

const fallbackAuthors: readonly AuthorPathway[] = FEATURED_AUTHORS.map((author) => ({
  ...author,
  initials: initialsOf(author.name),
  photoUrl: authorPhotoUrl(author.key, "L"),
}));

function availabilityOf(access: SearchDoc["ebook_access"]): Book["availability"] {
  if (access === "borrowable") return "borrowable";
  if (access === "public") return "accessible";
  return "preview";
}

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter((part) => /[A-Za-z]/.test(part))
    .map((part) => part[0]!.toUpperCase())
    .slice(0, 2)
    .join("");
}

function toBook(doc: SearchDoc): Book | null {
  if (!doc.title || doc.cover_i === undefined) return null;

  return {
    key: doc.key,
    title: doc.title,
    author: doc.author_name?.[0] ?? "Unknown author",
    coverUrl: coverUrl(doc.cover_i, "L"),
    year: doc.first_publish_year ?? 0,
    rating: doc.ratings_average ? Number(doc.ratings_average.toFixed(2)) : 0,
    availability: availabilityOf(doc.ebook_access),
  };
}

/** Shelf rail: real search results, curated covers if the API is unavailable. */
export async function getShelfBooks(limit = 8): Promise<readonly Book[]> {
  try {
    const { docs } = await searchBooks(SHELF_QUERY, limit * 2);
    const books = docs.map(toBook).filter((book): book is Book => book !== null).slice(0, limit);

    return books.length > 0 ? books : fallbackBooks;
  } catch {
    return fallbackBooks;
  }
}

/** Books that can be read or borrowed now, with curated fallbacks. */
export async function getAvailableBooks(limit = 4): Promise<readonly Book[]> {
  try {
    const { docs } = await searchBooks(SHELF_QUERY, limit * 6);
    const available = docs
      .map(toBook)
      .filter((book): book is Book => book !== null && book.availability !== "preview");
    const fallbacks = fallbackBooks.filter((book) => book.availability !== "preview");
    const uniqueBooks = new Map([...available, ...fallbacks].map((book) => [book.key, book]));

    return [...uniqueBooks.values()].slice(0, limit);
  } catch {
    return fallbackBooks.filter((book) => book.availability !== "preview").slice(0, limit);
  }
}

/** Author pathways: catalog breadth plus a strong first work for each voice. */
export async function getAuthorPathways(): Promise<readonly AuthorPathway[]> {
  const authors = await Promise.all(
    FEATURED_AUTHORS.map(async (author, index) => {
      try {
        const { docs } = await searchAuthors(author.name, 10);
        const doc = docs.find((candidate) => candidate.key.replace("/authors/", "") === author.key);

        if (!doc) return fallbackAuthors[index]!;

        return {
          key: author.key,
          name: doc.name,
          initials: initialsOf(doc.name),
          workCount: doc.work_count ?? fallbackAuthors[index]!.workCount,
          topWork: doc.top_work ?? fallbackAuthors[index]!.topWork,
          photoUrl: authorPhotoUrl(author.key, "L"),
        } satisfies AuthorPathway;
      } catch {
        return fallbackAuthors[index]!;
      }
    }),
  );

  return authors;
}
