"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { createColumnHelper } from "@tanstack/react-table";
import { BookItem } from "@/lib/types";
import { DataTable } from "@/Components/ui/data-table";
import { type DataTableFeatures } from "@/Components/ui/data-table-features";
import {
  StarIcon,
  UsersIcon,
  SearchIcon,
  CloseIcon,
  BookOpenIcon,
  CheckIcon,
} from "@/Components/Shared/icons";
import { ArrowUpDown, ExternalLink } from "lucide-react";

interface GenreDataTableProps {
  genreName: string;
  genreSlug: string;
  books: BookItem[];
  isLoading?: boolean;
  onSelectBook: (book: BookItem) => void;
}

const columnHelper = createColumnHelper<DataTableFeatures, BookItem>();

export function GenreDataTable({
  genreName,
  books,
  isLoading = false,
  onSelectBook,
}: GenreDataTableProps) {
  const [filterText, setFilterText] = useState("");
  const [borrowableOnly, setBorrowableOnly] = useState(false);

  // Filter books by search text and borrowable status
  const filteredData = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        !filterText.trim() ||
        book.title.toLowerCase().includes(filterText.toLowerCase().trim()) ||
        book.author.toLowerCase().includes(filterText.toLowerCase().trim());

      const matchesBorrow = !borrowableOnly || book.isBorrowable;

      return matchesSearch && matchesBorrow;
    });
  }, [books, filterText, borrowableOnly]);

  // Define columns for TanStack DataTable
  const columns = useMemo(
    () =>
      columnHelper.columns([
        columnHelper.display({
          id: "cover",
          header: "Cover",
          cell: ({ row }) => {
            const book = row.original;
            return (
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
            );
          },
        }),
        columnHelper.accessor("title", {
          header: ({ column }) => (
            <button
              type="button"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="flex items-center gap-1.5 font-semibold text-primary/70 transition-colors hover:text-primary"
            >
              Title &amp; Author
              <ArrowUpDown className="size-3" />
            </button>
          ),
          cell: ({ row }) => {
            const book = row.original;
            return (
              <div>
                <div className="font-serif font-semibold text-primary transition-colors hover:text-accent">
                  {book.title}
                </div>
                <div className="text-xs text-primary/60">{book.author}</div>
              </div>
            );
          },
        }),
        columnHelper.accessor("publishYear", {
          header: ({ column }) => (
            <button
              type="button"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="hidden items-center gap-1.5 font-semibold text-primary/70 transition-colors hover:text-primary md:flex"
            >
              Year
              <ArrowUpDown className="size-3" />
            </button>
          ),
          cell: ({ row }) => {
            const year = row.original.publishYear;
            return (
              <span className="hidden text-xs text-primary/70 md:inline">
                {year ? String(year) : "—"}
              </span>
            );
          },
        }),
        columnHelper.accessor("rating", {
          header: ({ column }) => (
            <button
              type="button"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="hidden items-center gap-1.5 font-semibold text-primary/70 transition-colors hover:text-primary sm:flex"
            >
              Rating
              <ArrowUpDown className="size-3" />
            </button>
          ),
          cell: ({ row }) => {
            const rating = row.original.rating;
            return rating ? (
              <span className="hidden items-center gap-1 text-xs font-semibold text-amber-500 sm:inline-flex">
                <StarIcon className="size-3.5 fill-amber-500 text-amber-500" />
                {rating.toFixed(1)}
              </span>
            ) : (
              <span className="hidden text-xs text-primary/40 sm:inline">—</span>
            );
          },
        }),
        columnHelper.accessor("readerCount", {
          header: ({ column }) => (
            <button
              type="button"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="hidden items-center gap-1.5 font-semibold text-primary/70 transition-colors hover:text-primary lg:flex"
            >
              Readers
              <ArrowUpDown className="size-3" />
            </button>
          ),
          cell: ({ row }) => {
            const readers = row.original.readerCount;
            if (!readers) return <span className="hidden text-xs text-primary/40 lg:inline">—</span>;
            const formatted =
              readers >= 1000 ? `${(readers / 1000).toFixed(1)}k` : String(readers);
            return (
              <span className="hidden items-center gap-1 text-xs text-primary/60 lg:inline-flex">
                <UsersIcon className="size-3.5" />
                {formatted}
              </span>
            );
          },
        }),
        columnHelper.display({
          id: "availability",
          header: "Status",
          cell: ({ row }) => {
            const isBorrowable = row.original.isBorrowable;
            return (
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                  isBorrowable
                    ? "bg-[#24472f]/10 text-[#24472f] dark:bg-[#d3a663]/15 dark:text-accent"
                    : "bg-primary/5 text-primary/50"
                }`}
              >
                {isBorrowable ? (
                  <>
                    <CheckIcon className="size-2.5" />
                    Borrowable
                  </>
                ) : (
                  "Preview"
                )}
              </span>
            );
          },
        }),
        columnHelper.display({
          id: "actions",
          header: () => <span className="sr-only">Actions</span>,
          cell: ({ row }) => {
            const book = row.original;
            return (
              <div className="text-right">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectBook(book);
                  }}
                  className="inline-flex items-center gap-1 rounded-lg border border-primary/15 bg-background/60 px-2.5 py-1 text-xs font-semibold text-primary transition-colors hover:border-accent hover:text-accent"
                >
                  <span>View</span>
                  <ExternalLink className="size-3" />
                </button>
              </div>
            );
          },
        }),
      ]),
    [onSelectBook]
  );

  return (
    <div className="space-y-4">
      {/* Controls Bar: Search + Borrowable Toggle */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary/40" />
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder={`Search in ${genreName}...`}
            className="w-full rounded-xl border border-primary/15 bg-background/60 py-2 pl-9 pr-8 text-xs text-primary outline-none transition placeholder:text-primary/40 focus:border-accent focus:ring-1 focus:ring-accent"
          />
          {filterText && (
            <button
              type="button"
              onClick={() => setFilterText("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary"
            >
              <CloseIcon className="size-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-primary/75">
            <input
              type="checkbox"
              checked={borrowableOnly}
              onChange={(e) => setBorrowableOnly(e.target.checked)}
              className="size-4 rounded border-primary/20 accent-primary"
            />
            Borrowable only
          </label>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="overflow-hidden rounded-2xl border border-primary/10 bg-background/50 p-6">
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex animate-pulse items-center gap-4 py-2">
                <div className="h-14 w-10 rounded-md bg-primary/10" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/3 rounded bg-primary/10" />
                  <div className="h-3 w-1/4 rounded bg-primary/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* shadcn TanStack DataTable */
        <DataTable
          columns={columns}
          data={filteredData}
          pageSize={8}
          onRowClick={onSelectBook}
          emptyMessage={`No books found in ${genreName} matching your search.`}
        />
      )}
    </div>
  );
}
