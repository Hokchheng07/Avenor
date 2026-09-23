import Image from "next/image";
import Link from "next/link";

export type Book = {
  key: string;
  title: string;
  author: string;
  coverUrl: string;
  year: number;
  rating: number;
  availability: "borrowable" | "accessible" | "preview";
};

function availabilityCopy(availability: Book["availability"]) {
  return availability === "accessible" ? "Read free" : "Borrow now";
}

export function BookCard({
  book,
  href,
  showAvailability = false,
}: {
  book: Book;
  href?: string;
  showAvailability?: boolean;
}) {
  const workId = book.key.replace("/works/", "");

  return (
    <article className="min-w-0">
      <Link
        href={href ?? `/books/${workId}`}
        aria-label={`View ${book.title} by ${book.author}`}
        className="group block rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:focus-visible:ring-offset-secondary"
      >
        <div className="book-object">
          <span aria-hidden="true" className="book-page-block" />
          <span aria-hidden="true" className="book-foot-block" />
          <div className="book-cover-face">
            <Image
              src={book.coverUrl}
              alt={`Cover of ${book.title}`}
              fill
              sizes="(max-width: 640px) 42vw, (max-width: 1024px) 24vw, 190px"
              className="object-cover"
            />
            {showAvailability ? (
              <span className={`absolute top-3 left-3 z-3 rounded-full px-3 py-1.5 text-[0.62rem] font-bold tracking-[0.08em] uppercase shadow-sm backdrop-blur ${book.availability === "accessible" ? "bg-white/90 text-[#24472f]" : "bg-[#d3a663]/92 text-[#172019]"}`}>
                {availabilityCopy(book.availability)}
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
