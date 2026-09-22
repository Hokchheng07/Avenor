import { Metadata } from "next";
import { DiscoveryContent } from "@/Components/Books/discovery-content";
import { Footer } from "@/Components/Shared/footer";
import {
  FEATURED_CAROUSEL_BOOKS,
  POPULAR_GENRES,
  getWorksBySubject,
  searchOpenLibrary,
} from "@/lib/openlibrary";
import { BookItem, SearchMode } from "@/lib/types";

export const metadata: Metadata = {
  title: "Discover Books · Avenor",
  description:
    "Explore popular books, search the Open Library catalog, and browse literature by genre with realistic 3D book previews.",
};

interface DiscoverPageProps {
  searchParams?: Promise<{
    q?: string;
    mode?: SearchMode;
    subject?: string;
  }>;
}

export default async function DiscoverPage({ searchParams }: DiscoverPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const query = resolvedParams.q || "";
  const mode = resolvedParams.mode || "all";
  const subject = resolvedParams.subject || "";

  let trendingBooks = FEATURED_CAROUSEL_BOOKS;
  let initialResults: BookItem[] = [];

  try {
    if (query.trim()) {
      const searchRes = await searchOpenLibrary({
        query: query.trim(),
        mode,
        limit: 24,
      });
      initialResults = searchRes.books;
    } else if (subject.trim()) {
      initialResults = await getWorksBySubject(subject.trim(), 18);
    }

    const liveWorks = await getWorksBySubject("fantasy", 10);
    if (liveWorks && liveWorks.length >= 5) {
      trendingBooks = [
        ...FEATURED_CAROUSEL_BOOKS.slice(0, 3),
        ...liveWorks.filter(
          (w) => !FEATURED_CAROUSEL_BOOKS.some((f) => f.id === w.id)
        ),
      ].slice(0, 10);
    }
  } catch {
    trendingBooks = FEATURED_CAROUSEL_BOOKS;
  }

  return (
    <main className="flex-1 bg-secondary min-h-screen">
      <DiscoveryContent
        initialTrending={trendingBooks}
        genres={POPULAR_GENRES}
        initialQuery={query}
        initialMode={mode}
        initialSubject={subject}
        initialResults={initialResults}
      />
      <Footer />
    </main>
  );
}
