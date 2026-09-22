"use client";

import { BookCard, type Book } from "./book-card";

export function BookRail({ books, label }: { books: readonly Book[]; label: string }) {
  return (
    <div
      role="region"
      aria-label={label}
      tabIndex={0}
      className="book-rail -mx-5 grid auto-cols-[44vw] grid-flow-col gap-6 overflow-x-auto px-5 pb-7 outline-none [scroll-padding-inline:1.25rem] sm:mx-0 sm:auto-cols-[13rem] sm:gap-8 sm:px-0 sm:[scroll-padding-inline:0] lg:auto-cols-[12rem]"
    >
      {books.map((book) => (
        <div key={book.key} className="snap-start">
          <BookCard book={book} />
        </div>
      ))}
    </div>
  );
}
