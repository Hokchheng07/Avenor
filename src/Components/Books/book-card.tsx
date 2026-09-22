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

export function BookCard({ book }: { book: Book }) {
  const workId = book.key.replace("/works/", "");

  return (
    <article className="min-w-0">
      <Link
        href={`/books/${workId}`}
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
