"use client";

import React, { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { BookItem, GenreItem, SearchMode } from "@/lib/types";
import { RecommendedShelf } from "./recommended-shelf";
import { BookCard } from "./book-card";
import { GenreGrid } from "./genre-grid";
import { GenreDataTable } from "./genre-data-table";
import { SearchBarFilter } from "./search-bar-filter";
import { BookDetailView } from "./book-detail-view";
import { searchOpenLibrary, getWorksBySubject } from "@/lib/openlibrary";
import { CloseIcon } from "@/Components/Shared/icons";

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
  const [searchResults, setSearchResults] =
    useState<BookItem[]>(initialResults);
  const [genreBooks, setGenreBooks] = useState<BookItem[]>(
    initialSubject ? initialResults : [],
  );
  const [hasSearched, setHasSearched] = useState(
    Boolean(initialQuery && initialResults.length > 0),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isGenreLoading, setIsGenreLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
  const [sortBy, setSortBy] = useState<"relevance" | "rating" | "readers">(
    "relevance",
  );
  const [genreViewMode, setGenreViewMode] = useState<"table" | "grid">("table");

  const handleSearch = useCallback(async (query: string, mode: SearchMode) => {
    setSearchQuery(query);
    setSearchMode(mode);

    if (!query.trim()) {
      setHasSearched(false);
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const res = await searchOpenLibrary({
        query: query.trim(),
        mode,
        limit: 24,
      });
      setSearchResults(res.books);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSelectGenre = useCallback(
    async (genreSlug: string) => {
      if (selectedGenre === genreSlug) {
        setSelectedGenre("");
        setGenreBooks([]);
        return;
      }

      setSelectedGenre(genreSlug);
      setIsGenreLoading(true);

      try {
        const books = await getWorksBySubject(genreSlug, 24);
        setGenreBooks(books);
      } catch (err) {
        console.error("Failed to load subject works:", err);
      } finally {
        setIsGenreLoading(false);
      }
    },
    [selectedGenre],
  );

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedGenre("");
    setHasSearched(false);
    setSearchResults([]);
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
      <div className="mb-12">
        <h1 className="font-serif text-4xl leading-tight tracking-[-0.025em] text-primary sm:text-5xl">
          Find your next book
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-primary/55 sm:text-base">
          Search the Open Library catalog by title, author, or subject.
        </p>

        <div className="mt-8 max-w-3xl">
          <SearchBarFilter
            query={searchQuery}
            mode={searchMode}
            onSearch={handleSearch}
            isLoading={isLoading}
          />
        </div>
      </div>

      {hasSearched ? (
        <section className="mb-16">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-primary/10 pb-4">
            <div className="flex items-baseline gap-3">
              <h2 className="font-serif text-2xl text-primary">
                Results for &ldquo;{searchQuery}&rdquo;
              </h2>
              <span className="text-sm text-primary/50">
                {displayedResults.length}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-xs">
                <span className="text-primary/50">Sort</span>
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
                  <option value="readers">Most readers</option>
                </select>
              </label>

              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1 rounded-lg border border-primary/15 bg-white px-3 py-1.5 text-xs font-semibold text-primary/70 hover:border-accent hover:text-accent dark:bg-white/[0.04]"
              >
                <CloseIcon className="size-3.5" />
                <span>Clear</span>
              </button>
            </div>
          </div>

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
              <p className="font-serif text-lg text-primary">No books found</p>
              <p className="mt-1 text-sm text-primary/55">
                Try a shorter title, an author&rsquo;s last name, or a genre
                below.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 rounded-full bg-accent px-5 py-2 text-xs font-bold text-white hover:bg-accent/90"
              >
                Clear search
              </button>
            </div>
          )}
        </section>
      ) : null}

      <section className="mb-16">
        <RecommendedShelf
          books={initialTrending}
          onSelectBook={setSelectedBook}
        />
      </section>

      <section className="mb-16">
        <h2 className="mb-6 font-serif text-2xl tracking-tight text-primary sm:text-3xl">
          Popular &amp; Trending Books
        </h2>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {initialTrending.map((book) => (
            <BookCard key={book.id} book={book} onSelect={setSelectedBook} />
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-6 font-serif text-2xl tracking-tight text-primary sm:text-3xl">
          Browse by genre
        </h2>

        <GenreGrid
          genres={genres}
          selectedGenre={selectedGenre}
          onSelectGenre={handleSelectGenre}
        />

        {selectedGenre && (
          <div
            className="genre-panel mt-8 space-y-4"
            id="genre-data-section"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary/10 pb-3">
              <div className="inline-flex rounded-lg border border-primary/15 bg-white p-0.5 dark:bg-secondary">
                <button
                  onClick={() => setGenreViewMode("table")}
                  className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${
                    genreViewMode === "table"
                      ? "bg-primary text-secondary dark:bg-accent dark:text-primary"
                      : "text-primary/70 hover:text-primary"
                  }`}
                >
                  Table
                </button>
                <button
                  onClick={() => setGenreViewMode("grid")}
                  className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${
                    genreViewMode === "grid"
                      ? "bg-primary text-secondary dark:bg-accent dark:text-primary"
                      : "text-primary/70 hover:text-primary"
                  }`}
                >
                  Covers
                </button>
              </div>

              <button
                onClick={() => setSelectedGenre("")}
                className="text-xs font-semibold text-accent hover:underline"
              >
                Close
              </button>
            </div>

            {genreViewMode === "table" ? (
              <GenreDataTable
                genreName={
                  genres.find((g) => g.slug === selectedGenre)?.name ||
                  selectedGenre.replaceAll("_", " ")
                }
                genreSlug={selectedGenre}
                books={genreBooks}
                isLoading={isGenreLoading}
                onSelectBook={setSelectedBook}
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

      <AnimatePresence>
        {selectedBook && (
          <BookDetailView
            key={selectedBook.id || selectedBook.key}
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
            isModal={true}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
