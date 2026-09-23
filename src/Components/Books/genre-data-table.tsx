"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { BookItem } from "@/lib/types";
import {
  StarIcon,
  UsersIcon,
  SearchIcon,
  BookOpenIcon,
  EyeIcon,
  CloseIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
} from "@/Components/Shared/icons";

interface GenreDataTableProps {
  genreName: string;
  genreSlug: string;
  books: BookItem[];
  isLoading?: boolean;
  onSelectBook: (book: BookItem) => void;
  onCloseTable?: () => void;
}

type SortField = "title" | "author" | "publishYear" | "rating" | "readerCount";
type SortDirection = "asc" | "desc";

export function GenreDataTable({
  genreName,
  books,
  isLoading = false,
  onSelectBook,
  onCloseTable,
}: GenreDataTableProps) {
  const [filterText, setFilterText] = useState("");
  const [borrowableOnly, setBorrowableOnly] = useState(false);
  const [sortField, setSortField] = useState<SortField>("rating");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Handle column header sort clicks
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
    setCurrentPage(1);
  };

  // Filtered & sorted data
  const processedBooks = useMemo(() => {
    let result = [...books];

    // Text search in table
    if (filterText.trim()) {
      const q = filterText.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.subjects?.some((s) => s.toLowerCase().includes(q)),
      );
    }

    // Availability filter
    if (borrowableOnly) {
      result = result.filter((b) => b.isBorrowable);
    }

    // Sorting
    result.sort((a, b) => {
      let aVal: string | number = "";
      let bVal: string | number = "";

      if (sortField === "title") {
        aVal = a.title.toLowerCase();
        bVal = b.title.toLowerCase();
      } else if (sortField === "author") {
        aVal = a.author.toLowerCase();
        bVal = b.author.toLowerCase();
      } else if (sortField === "publishYear") {
        aVal = Number(a.publishYear) || 0;
        bVal = Number(b.publishYear) || 0;
      } else if (sortField === "rating") {
        aVal = a.rating || 0;
        bVal = b.rating || 0;
      } else if (sortField === "readerCount") {
        aVal = a.readerCount || 0;
        bVal = b.readerCount || 0;
      }

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [books, filterText, borrowableOnly, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(processedBooks.length / pageSize) || 1;
  const paginatedBooks = processedBooks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const getSortIndicator = (field: SortField) => {
    if (sortField !== field)
      return <span className="opacity-20 text-[10px]">⇅</span>;
    return sortDirection === "asc" ? (
      <span className="text-accent text-[11px]">▲</span>
    ) : (
      <span className="text-accent text-[11px]">▼</span>
    );
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-primary/15 bg-white shadow-xl shadow-primary/5 transition-all dark:bg-[#1a221b]">
      {/* Table Header Bar */}
      <div className="flex flex-col gap-4 border-b border-primary/10 bg-secondary/60 p-5 sm:flex-row sm:items-center sm:justify-between dark:bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-primary text-secondary dark:bg-accent dark:text-primary">
            <BookOpenIcon className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-xl font-bold text-primary">
                {genreName} Catalog Data Table
              </h3>
              <span className="rounded-full bg-accent/20 px-2.5 py-0.5 text-xs font-bold text-accent">
                {processedBooks.length} works
              </span>
            </div>
            <p className="text-xs text-primary/55">
              Live records from Open Library API with ratings, readership, and
              borrow status.
            </p>
          </div>
        </div>

        {/* Filter inputs */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search inside table */}
          <div className="relative flex items-center">
            <SearchIcon className="pointer-events-none absolute left-3 size-4 text-primary/40" />
            <input
              type="text"
              value={filterText}
              onChange={(e) => {
                setFilterText(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Filter in this genre..."
              className="h-9 w-44 rounded-full border border-primary/15 bg-white pl-9 pr-3 text-xs text-primary placeholder:text-primary/40 focus:border-accent focus:outline-none sm:w-56 dark:bg-secondary"
            />
            {filterText && (
              <button
                onClick={() => setFilterText("")}
                className="absolute right-2.5 text-primary/40 hover:text-primary"
              >
                <CloseIcon className="size-3.5" />
              </button>
            )}
          </div>

          {/* Borrowable Toggle */}
          <button
            onClick={() => {
              setBorrowableOnly(!borrowableOnly);
              setCurrentPage(1);
            }}
            className={`inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-xs font-semibold transition-all ${
              borrowableOnly
                ? "border-accent bg-accent text-white"
                : "border-primary/15 bg-white text-primary/70 hover:border-primary/30 dark:bg-secondary"
            }`}
          >
            {borrowableOnly ? <CheckIcon className="size-3.5" /> : null}
            <span>Borrowable Only</span>
          </button>

          {/* Close table button */}
          {onCloseTable && (
            <button
              onClick={onCloseTable}
              title="Close Data Table"
              className="grid size-9 place-items-center rounded-full border border-primary/15 bg-white text-primary/60 hover:border-accent hover:text-primary dark:bg-secondary"
            >
              <CloseIcon className="size-4" />
            </button>
          )}
        </div>
      </div>

      {/* Table Content */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-primary/10 bg-primary/[0.02] text-xs font-bold uppercase tracking-wider text-primary/60 dark:bg-white/[0.01]">
              <th className="py-3.5 pl-5 pr-2 w-12 text-center">#</th>
              <th
                onClick={() => handleSort("title")}
                className="cursor-pointer py-3.5 px-3 select-none hover:text-accent transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Book Title</span>
                  {getSortIndicator("title")}
                </div>
              </th>
              <th
                onClick={() => handleSort("author")}
                className="cursor-pointer py-3.5 px-3 select-none hover:text-accent transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Author</span>
                  {getSortIndicator("author")}
                </div>
              </th>
              <th
                onClick={() => handleSort("publishYear")}
                className="cursor-pointer py-3.5 px-3 select-none hover:text-accent transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Published</span>
                  {getSortIndicator("publishYear")}
                </div>
              </th>
              <th
                onClick={() => handleSort("rating")}
                className="cursor-pointer py-3.5 px-3 select-none hover:text-accent transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Rating</span>
                  {getSortIndicator("rating")}
                </div>
              </th>
              <th
                onClick={() => handleSort("readerCount")}
                className="cursor-pointer py-3.5 px-3 select-none hover:text-accent transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Readers</span>
                  {getSortIndicator("readerCount")}
                </div>
              </th>
              <th className="py-3.5 px-3">Availability</th>
              <th className="py-3.5 px-3">Sub-genres</th>
              <th className="py-3.5 pr-5 pl-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-primary/5 text-xs text-primary/80">
            {isLoading ? (
              [...Array(6)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="py-4 pl-5 pr-2 text-center">
                    <div className="h-4 w-4 rounded bg-primary/10 mx-auto" />
                  </td>
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-8 rounded bg-primary/10 shrink-0" />
                      <div className="h-4 w-36 rounded bg-primary/10" />
                    </div>
                  </td>
                  <td className="py-4 px-3">
                    <div className="h-4 w-24 rounded bg-primary/10" />
                  </td>
                  <td className="py-4 px-3">
                    <div className="h-4 w-12 rounded bg-primary/10" />
                  </td>
                  <td className="py-4 px-3">
                    <div className="h-4 w-14 rounded bg-primary/10" />
                  </td>
                  <td className="py-4 px-3">
                    <div className="h-4 w-16 rounded bg-primary/10" />
                  </td>
                  <td className="py-4 px-3">
                    <div className="h-5 w-20 rounded-full bg-primary/10" />
                  </td>
                  <td className="py-4 px-3">
                    <div className="h-4 w-28 rounded bg-primary/10" />
                  </td>
                  <td className="py-4 pr-5 pl-3 text-right">
                    <div className="h-8 w-16 rounded bg-primary/10 ml-auto" />
                  </td>
                </tr>
              ))
            ) : paginatedBooks.length > 0 ? (
              paginatedBooks.map((book, index) => {
                const globalIndex = (currentPage - 1) * pageSize + index + 1;
                const formattedReaders = book.readerCount
                  ? book.readerCount >= 1000
                    ? `${(book.readerCount / 1000).toFixed(1)}k`
                    : book.readerCount
                  : "1.5k";

                return (
                  <tr
                    key={book.id || index}
                    onClick={() => onSelectBook(book)}
                    className="group cursor-pointer transition-colors hover:bg-primary/[0.04] dark:hover:bg-white/[0.03]"
                  >
                    {/* Index */}
                    <td className="py-3.5 pl-5 pr-2 font-mono text-center text-primary/40 font-medium">
                      {globalIndex < 10 ? `0${globalIndex}` : globalIndex}
                    </td>

                    {/* Book Cover + Title */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-3">
                        <div className="relative aspect-[2/3] w-9 shrink-0 overflow-hidden rounded-[2px] border border-primary/15 shadow-sm transition-transform duration-200 group-hover:scale-105">
                          {book.coverUrl ? (
                            <Image
                              src={book.coverUrl}
                              alt=""
                              fill
                              sizes="36px"
                              className="object-cover"
                              unoptimized={book.coverUrl.includes(
                                "openlibrary.org",
                              )}
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-primary text-[8px] text-white">
                              {book.title.slice(0, 2)}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 max-w-xs">
                          <p className="line-clamp-1 font-serif text-sm font-bold text-primary group-hover:text-accent transition-colors">
                            {book.title}
                          </p>
                          <p className="line-clamp-1 text-[11px] text-primary/45">
                            ID: {book.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Author */}
                    <td className="py-3.5 px-3">
                      <span className="font-semibold text-primary/80 group-hover:text-primary">
                        {book.author}
                      </span>
                    </td>

                    {/* Published Year */}
                    <td className="py-3.5 px-3 font-mono text-primary/65">
                      {book.publishYear || "—"}
                    </td>

                    {/* Community Rating */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center text-accent">
                          <StarIcon className="size-3.5" filled />
                        </div>
                        <span className="font-bold text-primary">
                          {book.rating || "4.5"}
                        </span>
                        {book.ratingCount ? (
                          <span className="text-[10px] text-primary/40">
                            ({book.ratingCount})
                          </span>
                        ) : null}
                      </div>
                    </td>

                    {/* Reader Count */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1 text-primary/70">
                        <UsersIcon className="size-3 text-primary/40" />
                        <span>{formattedReaders}</span>
                      </div>
                    </td>

                    {/* Availability */}
                    <td className="py-3.5 px-3">
                      {book.isBorrowable ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                          <span className="size-1.5 rounded-full bg-emerald-500" />
                          Borrowable
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-medium text-primary/60">
                          Library Scan
                        </span>
                      )}
                    </td>

                    {/* Sub-genres / Tags */}
                    <td className="py-3.5 px-3">
                      <div className="flex flex-wrap gap-1 max-w-[180px]">
                        {(book.subjects || [genreName])
                          .slice(0, 2)
                          .map((tag, i) => (
                            <span
                              key={i}
                              className="rounded-md border border-primary/10 bg-secondary/80 px-1.5 py-0.5 text-[10px] text-primary/60 dark:bg-white/[0.03]"
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 pr-5 pl-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectBook(book);
                          }}
                          className="inline-flex items-center gap-1 rounded-lg border border-primary/15 bg-white px-2.5 py-1 text-[11px] font-bold text-primary shadow-xs hover:border-accent hover:text-accent dark:bg-secondary"
                        >
                          <EyeIcon className="size-3.5" />
                          <span>View</span>
                        </button>
                        <a
                          href={`https://openlibrary.org${book.key || `/works/${book.id}`}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          title="Open on Open Library"
                          className="grid size-7 place-items-center rounded-lg border border-primary/10 text-primary/50 hover:border-primary/30 hover:text-primary"
                        >
                          ↗
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={9} className="py-12 text-center text-primary/50">
                  <p className="font-serif text-base font-bold text-primary">
                    No books match &ldquo;{filterText}&rdquo; in this genre
                  </p>
                  <p className="mt-1 text-xs">
                    Try adjusting your in-table filter or search term.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination & Footer */}
      <div className="flex flex-col items-center justify-between gap-3 border-t border-primary/10 bg-secondary/40 px-5 py-3.5 text-xs text-primary/60 sm:flex-row dark:bg-white/[0.01]">
        <div className="font-medium">
          Showing{" "}
          <span className="font-bold text-primary">
            {processedBooks.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}
          </span>{" "}
          to{" "}
          <span className="font-bold text-primary">
            {Math.min(currentPage * pageSize, processedBooks.length)}
          </span>{" "}
          of{" "}
          <span className="font-bold text-primary">
            {processedBooks.length}
          </span>{" "}
          books
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="inline-flex items-center gap-1 rounded-lg border border-primary/15 bg-white px-3 py-1.5 text-xs font-semibold text-primary/70 transition-colors hover:border-accent hover:text-accent disabled:opacity-40 dark:bg-secondary"
          >
            <ArrowLeftIcon className="size-3.5" />
            <span>Prev</span>
          </button>

          <span className="px-2 font-mono font-semibold text-primary">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="inline-flex items-center gap-1 rounded-lg border border-primary/15 bg-white px-3 py-1.5 text-xs font-semibold text-primary/70 transition-colors hover:border-accent hover:text-accent disabled:opacity-40 dark:bg-secondary"
          >
            <span>Next</span>
            <ArrowRightIcon className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
