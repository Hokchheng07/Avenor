"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import type { BookItem } from "@/lib/types";

export type Book = {
  key: string;
  title: string;
  author: string;
  coverUrl: string;
  year: number;
  rating: number;
  availability: "borrowable" | "accessible" | "preview";
};

type BookCardProps = {
  book: Book | BookItem;
  href?: string;
  showAvailability?: boolean;
  onSelect?: (book: BookItem) => void;
};

function isHomepageBook(book: Book | BookItem): book is Book {
  return "availability" in book;
}

function availabilityCopy(availability: Book["availability"]) {
  return availability === "accessible" ? "Read free" : "Borrow now";
}

export function BookCard({
  book,
  href,
  showAvailability = false,
  onSelect,
}: BookCardProps) {
  const homepageBook = isHomepageBook(book);
  const workId = book.key.replace("/works/", "").replace("/books/", "");
  const destination = href ?? `/book/${workId}`;
  const availability = homepageBook
    ? book.availability
    : book.isBorrowable
      ? "borrowable"
      : "preview";

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!onSelect || homepageBook) return;

    event.preventDefault();
    onSelect(book);
  }

  return (
    <article className="min-w-0">
      <Link
        href={destination}
        onClick={handleClick}
        aria-label={`View ${book.title} by ${book.author}`}
        className="group block rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:focus-visible:ring-offset-secondary"
      >
        <div className="book-object">
          <span aria-hidden="true" className="book-page-block" />
          <span aria-hidden="true" className="book-foot-block" />
          <div className="book-cover-face">
            {book.coverUrl ? (
              <Image
                src={book.coverUrl}
                alt={`Cover of ${book.title}`}
                fill
                sizes="(max-width: 640px) 42vw, (max-width: 1024px) 24vw, 190px"
                className="object-cover"
                unoptimized={book.coverUrl.includes("openlibrary.org")}
              />
            ) : (
              <div className="flex h-full flex-col justify-between bg-gradient-to-br from-[#2a3c2b] to-[#162117] p-4 text-white">
                <span className="text-[0.62rem] font-bold tracking-[0.12em] text-accent uppercase">
                  Avenor
                </span>
                <div>
                  <p className="font-serif text-base leading-tight font-semibold">
                    {book.title}
                  </p>
                  <p className="mt-2 text-xs text-white/65">{book.author}</p>
                </div>
              </div>
            )}
            {showAvailability || (!homepageBook && book.isBorrowable) ? (
              <span
                className={`absolute top-3 left-3 z-3 rounded-full px-3 py-1.5 text-[0.62rem] font-bold tracking-[0.08em] uppercase shadow-sm backdrop-blur ${availability === "accessible" ? "bg-white/90 text-[#24472f]" : "bg-[#d3a663]/92 text-[#172019]"}`}
              >
                {availabilityCopy(availability)}
              </span>
            ) : null}
          </div>
        </div>
        <div className="pt-7">
          <h3 className="line-clamp-2 font-serif text-[0.95rem] leading-[1.3] font-medium text-primary transition-colors duration-150 group-hover:text-accent sm:text-base">
            {book.title}
          </h3>
          <p className="mt-1.5 truncate text-xs text-primary/45">{book.author}</p>
        </div>
      </Link>
    </article>
  );
}
