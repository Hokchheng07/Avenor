import type { Book } from "@/Components/Books/book-card";
import type { FeaturedWork } from "@/Components/HomePage/featured-work";
import type { FeaturedAuthor } from "@/Components/HomePage/authors-section";
import {
  coverUrl,
  getWork,
  getWorkEditions,
  getWorkRatings,
  searchAuthors,
  searchBooks,
  type SearchDoc,
} from "./open-library";

/**
 * View-model layer for the home page: turns raw Open Library payloads into the
 * shapes the section components render. Every loader degrades to a curated
 * fallback so a slow or failing upstream never takes the page down.
 */

const FEATURED_WORK_OLID = "OL27482W";

const SHELF_QUERY = "subject:fiction";

const AUTHOR_NAMES = [
  "Toni Morrison",
  "James Baldwin",
  "Ursula K. Le Guin",
  "Virginia Woolf",
  "Octavia Butler",
  "Kazuo Ishiguro",
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

const fallbackFeatured: FeaturedWork = {
  workUrl: "https://openlibrary.org/works/OL27482W",
  title: "The Hobbit",
  author: "J.R.R. Tolkien",
  firstPublished: "1937",
  description:
    "A home-loving hobbit is pulled beyond the familiar and into a journey that keeps widening. Explore the work first, then choose the edition that fits how you want to read.",
  coverUrl: "/Images/books/14627509.jpg",
  rating: "4.3",
  editionCount: "481",
};

const fallbackAuthors: readonly FeaturedAuthor[] = [
  { name: "Toni Morrison", initials: "TM", note: "11 works" },
  { name: "James Baldwin", initials: "JB", note: "34 works" },
  { name: "Ursula K. Le Guin", initials: "UL", note: "92 works" },
  { name: "Virginia Woolf", initials: "VW", note: "79 works" },
  { name: "Octavia Butler", initials: "OB", note: "29 works" },
  { name: "Kazuo Ishiguro", initials: "KI", note: "18 works" },
];

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
    coverUrl: coverUrl(doc.cover_i, "M"),
    year: doc.first_publish_year ?? 0,
    rating: doc.ratings_average ? Number(doc.ratings_average.toFixed(2)) : 0,
    availability: availabilityOf(doc.ebook_access),
  };
}

function descriptionOf(description: Awaited<ReturnType<typeof getWork>>["description"]) {
  if (!description) return fallbackFeatured.description;
  return typeof description === "string" ? description : description.value;
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

/** Featured card: work record + ratings + edition count for one work. */
export async function getFeaturedWork(): Promise<FeaturedWork> {
  try {
    const [work, ratings, editions] = await Promise.all([
      getWork(FEATURED_WORK_OLID),
      getWorkRatings(FEATURED_WORK_OLID).catch(() => null),
      getWorkEditions(FEATURED_WORK_OLID).catch(() => null),
    ]);

    return {
      workUrl: `https://openlibrary.org/works/${FEATURED_WORK_OLID}`,
      title: work.title,
      author: fallbackFeatured.author,
      firstPublished: work.first_publish_date ?? fallbackFeatured.firstPublished,
      description: descriptionOf(work.description),
      coverUrl: work.covers?.[0] ? coverUrl(work.covers[0], "L") : fallbackFeatured.coverUrl,
      rating: ratings?.summary.average ? ratings.summary.average.toFixed(1) : fallbackFeatured.rating,
      editionCount: editions?.size ? String(editions.size) : fallbackFeatured.editionCount,
    };
  } catch {
    return fallbackFeatured;
  }
}

/** Author row: one author search per name, resolved in parallel. */
export async function getFeaturedAuthors(): Promise<readonly FeaturedAuthor[]> {
  const authors = await Promise.all(
    AUTHOR_NAMES.map(async (name, index) => {
      try {
        const { docs } = await searchAuthors(name, 1);
        const doc = docs[0];

        if (!doc) return fallbackAuthors[index]!;

        return {
          name: doc.name,
          initials: initialsOf(doc.name),
          note: `${doc.work_count ?? 0} works`,
        } satisfies FeaturedAuthor;
      } catch {
        return fallbackAuthors[index]!;
      }
    }),
  );

  return authors;
}
