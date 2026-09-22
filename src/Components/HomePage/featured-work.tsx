import Image from "next/image";
import { SectionHeading } from "./section-heading";
import { BookmarkIcon } from "./icons";

export type FeaturedWork = {
  workUrl: string;
  title: string;
  author: string;
  firstPublished: string;
  description: string;
  coverUrl: string;
  rating: string;
  editionCount: string;
};

export function FeaturedWorkSection({ work }: { work: FeaturedWork }) {
  return (
    <section className="border-b border-primary/10 bg-secondary py-18 sm:py-24">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20 lg:px-10">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="One book, unfolding"
            title="A closer look, without the clutter"
            description="The card opens into the story, editions, availability, and reader signals only when you ask for them."
          />
          <div className="flex gap-2 text-xs text-primary/45">
            <span className="rounded-full border border-accent/40 px-3 py-1.5 text-accent">The story</span>
            <span className="rounded-full border border-primary/15 px-3 py-1.5">Editions</span>
            <span className="rounded-full border border-primary/15 px-3 py-1.5">Readers</span>
          </div>
        </div>

        <article className="grid gap-7 rounded-3xl border border-primary/10 bg-white p-5 shadow-[0_24px_70px_rgba(34,48,35,0.07)] dark:bg-white/[0.035] sm:grid-cols-[12rem_1fr] sm:p-7">
          <div className="relative aspect-[2/3] overflow-hidden rounded-[0.35rem_0.8rem_0.8rem_0.35rem] shadow-xl">
            <Image src={work.coverUrl} alt={`Cover of ${work.title}`} fill sizes="192px" className="object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">Featured work</p>
            <h3 className="mt-3 font-serif text-3xl leading-tight text-primary">{work.title}</h3>
            <p className="mt-2 text-sm text-primary/50">{work.author} · First published {work.firstPublished}</p>
            <p className="mt-6 line-clamp-5 text-sm leading-7 text-primary/65">{work.description}</p>
            <dl className="mt-6 grid grid-cols-2 gap-3 border-y border-primary/10 py-5 text-sm">
              <div><dt className="text-xs text-primary/40">Reader rating</dt><dd className="mt-1 font-semibold text-primary">★ {work.rating}</dd></div>
              <div><dt className="text-xs text-primary/40">Editions</dt><dd className="mt-1 font-semibold text-primary">{work.editionCount} listed</dd></div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={work.workUrl} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-secondary transition-opacity duration-150 hover:opacity-85">Read on Open Library</a>
              <button type="button" className="inline-flex h-11 items-center gap-2 rounded-full border border-primary/20 px-5 text-sm font-semibold text-primary transition-colors duration-150 hover:border-accent hover:text-accent"><BookmarkIcon /> Save</button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
