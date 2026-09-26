import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/Components/Books/book-card";

const coverPositions = [
  "hero-book-shell--far-left",
  "hero-book-shell--left",
  "hero-book-shell--center",
  "hero-book-shell--right",
  "hero-book-shell--far-right",
] as const;

function PlayIcon() {
  return (
    <svg aria-hidden="true" className="ml-0.5 size-4" viewBox="0 0 20 20" fill="currentColor">
      <path d="M6.75 4.9a1 1 0 0 1 1.52-.85l7.2 4.6a1.6 1.6 0 0 1 0 2.7l-7.2 4.6a1 1 0 0 1-1.52-.84V4.9Z" />
    </svg>
  );
}

export function HeroSection({ books }: { books: readonly Book[] }) {
  return (
    <section id="search" className="relative isolate min-h-[calc(100svh-6rem)] overflow-hidden bg-white dark:bg-[#171b18]">

      <div className="mx-auto flex min-h-[calc(100svh-6rem)] w-full max-w-7xl flex-col px-5 pt-14 sm:px-8 sm:pt-18 lg:px-10 lg:pt-20">
        <div className="hero-copy mx-auto flex max-w-4xl flex-col items-center text-center">
          <p className="mb-5 text-[0.7rem] font-bold tracking-[0.24em] text-accent uppercase sm:text-xs">
            Your next chapter starts here
          </p>
          <h1 className="max-w-4xl font-serif text-[2.8rem] leading-[1.04] tracking-[-0.045em] text-[#161914] sm:text-6xl lg:text-[4.65rem] dark:text-[#f6f0e6]">
            Discover books and authors worth remembering
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-primary/62 sm:text-base sm:leading-8">
            Search millions of stories, follow the authors behind them, and find a book that meets you exactly where you are.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <Link
              href="/#discover"
              className="hero-primary-action inline-flex h-13 min-w-52 items-center justify-center rounded-full bg-primary px-8 text-sm font-bold text-secondary shadow-[0_12px_30px_rgba(34,48,35,0.2)] outline-none transition-[background-color,transform,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-primary/90 hover:shadow-[0_16px_34px_rgba(34,48,35,0.28)] active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#171b18]"
            >
              Explore the library
            </Link>
            <Link
              href="/#discover"
              className="group inline-flex h-13 items-center gap-3 rounded-full pr-3 text-sm font-semibold text-accent outline-none transition-colors duration-150 hover:text-[#966832] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#171b18]"
            >
              <span className="grid size-13 place-items-center rounded-full border border-accent/45 bg-white/45 shadow-[0_6px_20px_rgba(67,56,40,0.06)] transition-[transform,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5 group-hover:bg-white group-active:scale-[0.97] dark:bg-white/5">
                <PlayIcon />
              </span>
              Browse collection
            </Link>
          </div>
        </div>

        <div className="hero-covers relative mt-10 min-h-[19rem] flex-1 sm:mt-12 sm:min-h-[25rem] lg:mt-14 lg:min-h-[30rem]">
          <div aria-hidden="true" className="absolute top-[8%] left-1/2 -z-10 h-[78%] w-screen -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(34,48,35,.14),transparent_68%)] dark:hidden" />
          <p aria-hidden="true" className="hero-watermark absolute inset-x-0 top-[10%] text-center font-serif text-[17vw] leading-none tracking-[-0.07em] text-primary/[0.07] select-none dark:text-white/[0.025] lg:text-[13rem]">
            AVENOR
          </p>
          {books.map((book, index) => (
            <Link
              key={book.key}
              href={`https://openlibrary.org${book.key}`}
              aria-label={`Open ${book.title} by ${book.author} on Open Library`}
              className={`hero-book-shell rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#171b18] ${coverPositions[index]}`}
            >
              <div className="hero-book group">
                <span aria-hidden="true" className="book-page-block" />
                <span aria-hidden="true" className="book-foot-block" />
                <div className="book-cover-face">
                  <Image
                    src={book.coverUrl}
                    alt=""
                    fill
                    preload={index === 2}
                    sizes="(max-width: 640px) 42vw, (max-width: 1024px) 24vw, 260px"
                    quality={90}
                    className="object-cover"
                  />
                  <span className="hero-cover-copy">
                    <span className="hero-cover-title">{book.title}</span>
                    <span className="hero-cover-author">{book.author}</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
          <div aria-hidden="true" className="absolute bottom-0 left-1/2 z-40 h-20 w-screen -translate-x-1/2 bg-gradient-to-t from-white via-white/85 to-transparent dark:from-[#171b18] dark:via-[#171b18]/80" />
        </div>
      </div>
    </section>
  );
}
