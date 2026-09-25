"use client";

import React, { useState, useCallback } from "react";
import useSWR from "swr";
import { BookItem, GenreItem, SearchMode } from "@/lib/types";
import { BookHeroCarousel } from "./book-hero-carousel";
import { BookCard } from "./book-card";
import { GenreGrid } from "./genre-grid";
import { GenreDataTable } from "./genre-data-table";
import { SearchBarFilter } from "./search-bar-filter";
import { BookDetailView } from "./book-detail-view";
import { searchOpenLibrary, getWorksBySubject } from "@/lib/openlibrary";
import { SparklesIcon, CloseIcon } from "@/Components/Shared/icons";

interface DiscoveryContentProps {
  initialTrending: BookItem[];
  genres: GenreItem[];
  initialQuery?: string;
  initialMode?: SearchMode;
  initialSubject?: string;
  initialResults?: BookItem[];
}

export function DiscoveryContent({
  initialTrending,
  genres,
  initialQuery = "",
  initialMode = "all",
  initialSubject = "",
  initialResults = [],
}: DiscoveryContentProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchMode, setSearchMode] = useState<SearchMode>(initialMode);
  const [selectedGenre, setSelectedGenre] = useState<string>(initialSubject);
  const [hasSearched, setHasSearched] = useState(
    Boolean(initialQuery && initialResults.length > 0),
  );
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
  const [sortBy, setSortBy] = useState<"relevance" | "rating" | "readers">(
    "relevance",
  );
  const [genreViewMode, setGenreViewMode] = useState<"table" | "grid">("table");

  // Fetch genre books using SWR with automatic caching and deduplication
  const { data: fetchedGenreBooks, isLoading: isGenreLoading } = useSWR<
    BookItem[]
  >(
    selectedGenre ? ["genre", selectedGenre] : null,
    ([, slug]) => getWorksBySubject(slug as string, 24),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    },
  );

  const genreBooks =
    fetchedGenreBooks ||
    (selectedGenre === initialSubject ? initialResults : []);

  // Fetch search results using SWR with caching
  const { data: searchData, isLoading } = useSWR<{
    books: BookItem[];
    total: number;
  }>(
    hasSearched && searchQuery.trim()
      ? ["search", searchQuery.trim(), searchMode]
      : null,
    ([, query, mode]) =>
      searchOpenLibrary({
        query: query as string,
        mode: mode as SearchMode,
        limit: 24,
      }),
    {
      fallbackData:
        initialQuery && initialResults.length > 0
          ? { books: initialResults, total: initialResults.length }
          : undefined,
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    },
  );

  const searchResults =
    searchData?.books || (hasSearched ? [] : initialResults);

  const handleSearch = useCallback((query: string, mode: SearchMode) => {
    setSearchQuery(query);
    setSearchMode(mode);

    if (!query.trim()) {
      setHasSearched(false);
      return;
    }

    setHasSearched(true);
  }, []);

  const handleSelectGenre = useCallback((genreSlug: string) => {
    setSelectedGenre((prev) => (prev === genreSlug ? "" : genreSlug));
  }, []);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedGenre("");
    setHasSearched(false);
  };

  // Sort displayed results
  const displayedResults = [...searchResults].sort((a, b) => {
    if (sortBy === "rating") {
      return (b.rating || 0) - (a.rating || 0);
    }
    if (sortBy === "readers") {
      return (b.readerCount || 0) - (a.readerCount || 0);
    }
    return 0;
  });

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 sm:py-12 lg:px-10">
      {/* 1. Header & Prominent Search Input (Mockup 1 search bar) */}
      <div className="mb-10 text-center sm:text-left">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
            Open Library Discovery
          </p>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-primary sm:text-5xl">
            Explore Literature
          </h1>
          <p className="max-w-2xl text-sm sm:text-base text-primary/60">
            Search millions of works, explore genres with preview covers, and
            delve into trending stories.
          </p>
        </div>

        {/* Search Bar with Mode Toggles */}
        <div className="mt-8 max-w-3xl">
          <SearchBarFilter
            query={searchQuery}
            mode={searchMode}
            onSearch={handleSearch}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* 2. Search Results Section (conditionally shown when searching or genre filtered) */}
      {hasSearched ? (
        <section className="mb-16">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-primary/10 pb-4">
            <div className="flex items-center gap-3">
              <h2 className="font-serif text-2xl font-bold text-primary">
                {selectedGenre
                  ? `Genre: ${selectedGenre.replace("_", " ").toUpperCase()}`
                  : `Results for "${searchQuery}"`}
              </h2>
              <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
                {displayedResults.length} books found
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Sort selector */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-primary/50 font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value as "relevance" | "rating" | "readers",
                    )
                  }
                  className="rounded-lg border border-primary/15 bg-white px-2.5 py-1.5 text-xs font-semibold text-primary focus:outline-none dark:bg-secondary"
                >
                  <option value="relevance">Relevance</option>
                  <option value="rating">Highest Rated</option>
                  <option value="readers">Most Readers</option>
                </select>
              </div>

              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1 rounded-lg border border-primary/15 bg-white px-3 py-1.5 text-xs font-semibold text-primary/70 hover:border-accent hover:text-accent dark:bg-white/[0.04]"
              >
                <CloseIcon className="size-3.5" />
                <span>Clear</span>
              </button>
            </div>
          </div>

          {/* Loading Skeletons */}
          {isLoading ? (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse space-y-3">
                  <div className="aspect-[2/3] w-full rounded-md bg-primary/10" />
                  <div className="h-4 w-3/4 rounded bg-primary/10" />
                  <div className="h-3 w-1/2 rounded bg-primary/10" />
                </div>
              ))}
            </div>
          ) : displayedResults.length > 0 ? (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {displayedResults.map((book) => (
                <BookCard
                  key={book.id || book.key}
                  book={book}
                  onSelect={setSelectedBook}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-primary/20 p-12 text-center">
              <p className="font-serif text-lg font-bold text-primary">
                No matching books found
              </p>
              <p className="mt-1 text-xs text-primary/60">
                Try searching with a broader title, author name, or click on a
                genre below.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 rounded-full bg-accent px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-accent/90"
              >
                View all recommendations
              </button>
            </div>
          )}
        </section>
      ) : null}

      {/* 3. Hero Showcase (Mockup 1: "Keep the story going..") */}
      <section className="mb-16">
        <BookHeroCarousel
          books={initialTrending}
          onSelectBook={setSelectedBook}
        />
      </section>

      {/* 4. Popular & Trending Books (Ratings & Readers) */}
      <section className="mb-16">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent">
              <SparklesIcon className="size-3.5" />
              <span>Reader Favorites</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-primary">
              Popular &amp; Trending Books
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-primary/60">
              Books with the highest reader counts and ratings on Open Library.
            </p>
          </div>

          <button
            onClick={() => handleSearch("Fantasy", "subject")}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
          >
            <span>View full rankings</span>
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
          {initialTrending.map((book) => (
            <BookCard key={book.id} book={book} onSelect={setSelectedBook} />
          ))}
        </div>
      </section>

      {/* 5. Browse by Genre/Subject (Mockup & Prompt requirement) */}
      <section className="mb-16">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-accent">
            Curated Categories
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-primary">
            Browse by Genre
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-primary/60">
            Tap into a genre to reveal works with instant preview covers.
          </p>
        </div>

        <GenreGrid
          genres={genres}
          selectedGenre={selectedGenre}
          onSelectGenre={handleSelectGenre}
        />

        {/* Selected Genre Data Table Section */}
        {selectedGenre && (
          <div
            className="mt-8 space-y-4 animate-fade-in"
            id="genre-data-section"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-primary/50 uppercase tracking-wider">
                  View Style:
                </span>
                <div className="inline-flex rounded-lg border border-primary/15 bg-white p-0.5 dark:bg-secondary">
                  <button
                    onClick={() => setGenreViewMode("table")}
                    className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${
                      genreViewMode === "table"
                        ? "bg-primary text-secondary dark:bg-accent dark:text-primary"
                        : "text-primary/70 hover:text-primary"
                    }`}
                  >
                    ☰ Data Table
                  </button>
                  <button
                    onClick={() => setGenreViewMode("grid")}
                    className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${
                      genreViewMode === "grid"
                        ? "bg-primary text-secondary dark:bg-accent dark:text-primary"
                        : "text-primary/70 hover:text-primary"
                    }`}
                  >
                    ⊞ 3D Cards
                  </button>
                </div>
              </div>

              <button
                onClick={() => setSelectedGenre("")}
                className="text-xs font-semibold text-accent hover:underline"
              >
                Close genre catalog ×
              </button>
            </div>

            {genreViewMode === "table" ? (
              <GenreDataTable
                genreName={
                  genres.find((g) => g.slug === selectedGenre)?.name ||
                  selectedGenre.replace("_", " ").toUpperCase()
                }
                genreSlug={selectedGenre}
                books={genreBooks}
                isLoading={isGenreLoading}
                onSelectBook={setSelectedBook}
                onCloseTable={() => setSelectedGenre("")}
              />
            ) : (
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {genreBooks.map((book) => (
                  <BookCard
                    key={book.id || book.key}
                    book={book}
                    onSelect={setSelectedBook}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Detail Modal (Mockup 2 split design) */}
      {selectedBook && (
        <BookDetailView
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          isModal={true}
        />
      )}
    </div>
  );
}
