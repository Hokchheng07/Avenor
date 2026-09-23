import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWorkDetails } from "@/lib/openlibrary";
import { BookDetailView } from "@/Components/Books/book-detail-view";
import { Footer } from "@/Components/Shared/footer";
import Link from "next/link";
import { ArrowLeftIcon } from "@/Components/Shared/icons";

interface BookPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: BookPageProps): Promise<Metadata> {
  const { id } = await params;
  const book = await getWorkDetails(id);

  if (!book) {
    return {
      title: "Book Not Found · Avenor",
    };
  }

  return {
    title: `${book.title} · Avenor`,
    description:
      book.description?.slice(0, 160) ||
      `Read and discover ${book.title} by ${book.author} on Avenor.`,
  };
}

export default async function BookDetailPage({ params }: BookPageProps) {
  const { id } = await params;
  const book = await getWorkDetails(id);

  if (!book) {
    notFound();
  }

  return (
    <main className="flex-1 bg-secondary py-8 sm:py-12">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Back breadcrumb navigation */}
        <div className="mb-6">
          <Link
            href="/discover"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary/60 hover:text-accent transition-colors"
          >
            <ArrowLeftIcon className="size-4" />
            <span>Back to Discovery</span>
          </Link>
        </div>

        {/* Mockup 2 Full Detail View */}
        <BookDetailView book={book} isModal={false} />
      </div>

      <div className="mt-16">
        <Footer />
      </div>
    </main>
  );
}
