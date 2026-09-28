"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { BookItem } from "@/lib/types";
import { useSavedBooks } from "@/lib/useSavedBooks";
import { BookDetailView } from "@/Components/Books/book-detail-view";
import {
  StarIcon,
  SearchIcon,
  CloseIcon,
  BookOpenIcon,
} from "@/Components/Shared/icons";
import {
  Bookmark,
  LayoutGrid,
  List,
  Trash2,
  ExternalLink,
  ArrowRight,
  Sparkles,
} from "lucide-react";

type SortOption = "recent" | "title-asc" | "title-desc" | "rating-desc" | "year-desc";
type ViewMode = "grid" | "table";

export function SavedPageContent() {
  const { books, removeBook, clearAll } = useSavedBooks();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);

  // Filter and sort saved books
  const filteredBooks = useMemo(() => {
    let result = [...books];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.subjects?.some((s) => s.toLowerCase().includes(q))
      );
    }

    switch (sortBy) {
      case "title-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "rating-desc":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "year-desc":
        result.sort((a, b) => {
          const ya = typeof a.publishYear === "number" ? a.publishYear : parseInt(String(a.publishYear || 0), 10) || 0;
          const yb = typeof b.publishYear === "number" ? b.publishYear : parseInt(String(b.publishYear || 0), 10) || 0;
          return yb - ya;
        });
        break;
      case "recent":
      default:
        // Already in reverse addition order
        break;
    }

    return result;
  }, [books, searchQuery, sortBy]);

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to remove all saved books from your library?")) {
      clearAll();
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 border-b border-primary/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wider">
            <Bookmark className="size-3.5 text-accent" />
            Personal Collection
          </div>
          <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Saved Books
          </h1>
          <p className="mt-2 text-sm text-primary/70 sm:text-base">
            Your curated personal library. Access your saved books, track editions, and explore your reading list anytime.
          </p>
        </div>

        {books.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary">
              {books.length} {books.length === 1 ? "Book" : "Books"}
            </span>
            <button
              onClick={handleClearAll}
              type="button"
              className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/20 px-3.5 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-500/10 dark:text-red-400"
            >
              <Trash2 className="size-3.5" />
              Clear All
            </button>
          </div>
        )}
      </div>

      {books.length === 0 ? (
        /* Empty State */
        <div className="my-16 flex flex-col items-center justify-center rounded-3xl border border-primary/10 bg-primary/[0.02] px-6 py-20 text-center shadow-xs">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-accent">
            <Bookmark className="size-8" />
          </div>
          <h2 className="mt-6 font-serif text-2xl font-bold text-primary sm:text-3xl">
            Your Library is Waiting
          </h2>
          <p className="mt-2 max-w-md text-sm text-primary/70 sm:text-base">
            You haven&apos;t saved any books yet. Discover timeless classics, trending releases, and curate your personal collection.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/discover"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 dark:text-secondary"
            >
              <Sparkles className="size-4 text-accent" />
              Explore Books
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Controls Bar */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Input */}
            <div className="relative flex-1 sm:max-w-md">
              <SearchIcon className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-primary/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter saved books by title, author..."
                className="w-full rounded-xl border border-primary/15 bg-background/60 py-2.5 pl-10 pr-9 text-sm text-primary outline-none transition placeholder:text-primary/40 focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary"
                >
                  <CloseIcon className="size-4" />
                </button>
              )}
            </div>

            {/* Sort & View Mode Controls */}
            <div className="flex items-center justify-between gap-3 sm:justify-end">
              <div className="flex items-center gap-2">
                <label htmlFor="sort-saved" className="text-xs font-medium text-primary/70">
                  Sort:
                </label>
                <select
                  id="sort-saved"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="rounded-xl border border-primary/15 bg-background/60 px-3 py-2 text-xs font-medium text-primary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                >
                  <option value="recent">Recently Saved</option>
                  <option value="title-asc">Title (A-Z)</option>
                  <option value="title-desc">Title (Z-A)</option>
                  <option value="rating-desc">Highest Rated</option>
                  <option value="year-desc">Newest Year</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center rounded-xl border border-primary/15 bg-background/50 p-1">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                  className={`rounded-lg p-1.5 transition-colors ${
                    viewMode === "grid"
                      ? "bg-primary text-white shadow-xs dark:text-secondary"
                      : "text-primary/60 hover:text-primary"
                  }`}
                >
                  <LayoutGrid className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("table")}
                  aria-label="Table view"
                  className={`rounded-lg p-1.5 transition-colors ${
                    viewMode === "table"
                      ? "bg-primary text-white shadow-xs dark:text-secondary"
                      : "text-primary/60 hover:text-primary"
                  }`}
                >
                  <List className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Status */}
          {searchQuery && (
            <div className="mt-4 flex items-center justify-between text-xs text-primary/70">
              <p>
                Showing {filteredBooks.length} of {books.length} saved books matching &ldquo;{searchQuery}&rdquo;
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="font-medium text-accent hover:underline"
              >
                Clear filter
              </button>
            </div>
          )}

          {/* No matches for search */}
          {filteredBooks.length === 0 ? (
            <div className="my-12 rounded-2xl border border-dashed border-primary/20 p-12 text-center">
              <SearchIcon className="mx-auto size-8 text-primary/30" />
              <p className="mt-3 font-medium text-primary">No saved books match your search.</p>
              <p className="mt-1 text-xs text-primary/60">Try searching for a different title or author.</p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-4 rounded-xl border border-primary/20 px-4 py-2 text-xs font-semibold text-primary hover:bg-primary/5"
              >
                Clear Search
              </button>
            </div>
          ) : viewMode === "grid" ? (
            /* Cards View */
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-6">
              {filteredBooks.map((book) => {
                const bookId = book.id || book.key.replace("/works/", "").replace("/books/", "");
                return (
                  <div
                    key={bookId}
                    className="group relative flex flex-col justify-between rounded-2xl border border-primary/10 bg-background/50 p-3 shadow-xs transition duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-md"
                  >
                    {/* Delete action button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeBook(book.id || book.key);
                      }}
                      title="Remove from saved books"
                      aria-label={`Remove ${book.title}`}
                      className="absolute right-4 top-4 z-10 flex size-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-all hover:bg-red-600 hover:scale-110"
                    >
                      <Trash2 className="size-3.5" />
                    </button>

                    {/* Book Card Clickable Area */}
                    <div
                      onClick={() => setSelectedBook(book)}
                      className="cursor-pointer"
                    >
                      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-primary/5 shadow-xs">
                        {book.coverUrl ? (
                          <Image
                            src={book.coverUrl}
                            alt={`Cover of ${book.title}`}
                            fill
                            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 180px"
                            className="object-cover transition duration-300 group-hover:scale-105"
                            unoptimized={book.coverUrl.includes("openlibrary.org")}
                          />
                        ) : (
                          <div className="flex h-full flex-col justify-between bg-gradient-to-br from-[#2a3c2b] to-[#162117] p-3 text-white">
                            <span className="text-[0.6rem] font-bold tracking-wider text-accent uppercase">
                              Avenor
                            </span>
                            <div>
                              <p className="line-clamp-3 font-serif text-xs font-semibold leading-tight">
                                {book.title}
                              </p>
                              <p className="mt-1 text-[0.65rem] text-white/70 line-clamp-1">
                                {book.author}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="pt-3">
                        <h3 className="line-clamp-2 font-serif text-sm font-semibold text-primary transition-colors group-hover:text-accent">
                          {book.title}
                        </h3>
                        <p className="mt-1 line-clamp-1 text-xs text-primary/70">
                          {book.author}
                        </p>
                      </div>
                    </div>

                    {/* Metadata & Actions footer */}
                    <div className="mt-3 flex items-center justify-between border-t border-primary/10 pt-2 text-[0.7rem] text-primary/60">
                      {book.rating ? (
                        <span className="inline-flex items-center gap-1 font-medium text-amber-500">
                          <StarIcon className="size-3 fill-amber-500 text-amber-500" />
                          {book.rating.toFixed(1)}
                        </span>
                      ) : (
                        <span>{book.publishYear ? String(book.publishYear) : "Book"}</span>
                      )}

                      <Link
                        href={`/book/${bookId}`}
                        title="Open book details page"
                        className="inline-flex items-center gap-1 font-medium text-primary/70 hover:text-accent"
                      >
                        Details
                        <ExternalLink className="size-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Table View */
            <div className="mt-8 overflow-hidden rounded-2xl border border-primary/10 bg-background/50 shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-primary">
                  <thead className="border-b border-primary/10 bg-primary/[0.03] text-xs font-semibold uppercase tracking-wider text-primary/70">
                    <tr>
                      <th scope="col" className="px-6 py-4">Cover</th>
                      <th scope="col" className="px-6 py-4">Title & Author</th>
                      <th scope="col" className="hidden px-6 py-4 md:table-cell">Year</th>
                      <th scope="col" className="hidden px-6 py-4 sm:table-cell">Rating</th>
                      <th scope="col" className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/5">
                    {filteredBooks.map((book) => {
                      const bookId = book.id || book.key.replace("/works/", "").replace("/books/", "");
                      return (
                        <tr
                          key={bookId}
                          onClick={() => setSelectedBook(book)}
                          className="cursor-pointer transition-colors hover:bg-primary/[0.02]"
                        >
                          <td className="px-6 py-3">
                            <div className="relative h-14 w-10 overflow-hidden rounded-md bg-primary/10 shadow-xs">
                              {book.coverUrl ? (
                                <Image
                                  src={book.coverUrl}
                                  alt={book.title}
                                  fill
                                  sizes="40px"
                                  className="object-cover"
                                  unoptimized={book.coverUrl.includes("openlibrary.org")}
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center bg-primary/20 text-primary/40">
                                  <BookOpenIcon className="size-4" />
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-3">
                            <div className="font-serif font-semibold text-primary hover:text-accent">
                              {book.title}
                            </div>
                            <div className="text-xs text-primary/70">{book.author}</div>
                          </td>
                          <td className="hidden px-6 py-3 text-xs text-primary/70 md:table-cell">
                            {book.publishYear ? String(book.publishYear) : "—"}
                          </td>
                          <td className="hidden px-6 py-3 sm:table-cell">
                            {book.rating ? (
                              <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-500">
                                <StarIcon className="size-3.5 fill-amber-500 text-amber-500" />
                                {book.rating.toFixed(1)}
                              </span>
                            ) : (
                              <span className="text-xs text-primary/40">—</span>
                            )}
                          </td>
                          <td className="px-6 py-3 text-right">
                            <div className="inline-flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                              <Link
                                href={`/book/${bookId}`}
                                className="inline-flex size-8 items-center justify-center rounded-lg border border-primary/15 text-primary/70 transition-colors hover:border-accent hover:text-accent"
                                title="Open full book page"
                              >
                                <ExternalLink className="size-3.5" />
                              </Link>
                              <button
                                type="button"
                                onClick={() => removeBook(book.id || book.key)}
                                className="inline-flex size-8 items-center justify-center rounded-lg border border-red-500/20 text-red-500 transition-colors hover:bg-red-500/10"
                                title="Remove from saved books"
                              >
                                <Trash2 className="size-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* Book Detail Modal */}
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
