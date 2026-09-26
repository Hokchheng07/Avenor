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
  title: "Discover",
  description:
    "Search the Open Library catalog and browse books by genre.",
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
  } catch {
    initialResults = [];
  }

  return (
    <main className="flex-1 bg-secondary min-h-screen overflow-x-clip">
      <DiscoveryContent
        initialTrending={FEATURED_CAROUSEL_BOOKS}
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
