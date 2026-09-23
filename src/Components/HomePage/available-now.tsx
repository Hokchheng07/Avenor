import { BookCard, type Book } from "@/Components/Books/book-card";

export function AvailableNowSection({ books }: { books: readonly Book[] }) {
  return (
    <section id="available" aria-labelledby="available-title" className="border-b border-primary/10 bg-secondary py-18 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.2em] text-accent uppercase">Available now</p>
            <h2 id="available-title" className="mt-3 font-serif text-4xl leading-[1.05] tracking-[-0.035em] text-primary sm:text-5xl">
              Start reading without the wait
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-primary/58 sm:text-base">
              Books the Open Library catalog currently marks as free to read or ready to borrow.
            </p>
          </div>
          <div className="flex gap-2 text-[0.68rem] font-semibold tracking-[0.08em] uppercase">
            <span className="rounded-full border border-primary/12 px-3 py-2 text-primary/58">Free access</span>
            <span className="rounded-full border border-accent/30 px-3 py-2 text-accent">Borrowable</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 lg:grid-cols-4">
          {books.map((book) => (
            <BookCard
              key={book.key}
              book={book}
              href={`https://openlibrary.org${book.key}`}
              showAvailability
            />
          ))}
        </div>
      </div>
    </section>
  );
}
