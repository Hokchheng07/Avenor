import TextScrollMarquee from "@/Components/lightswind/text-scroll-marquee";

export function SubjectMarquee({ subjects }: { subjects: readonly string[] }) {
  return (
    <section id="categories" aria-labelledby="catalog-title" className="border-b border-primary/10 bg-secondary py-10 sm:py-12">
      <div className="mx-auto mb-5 w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <p id="catalog-title" className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">Explore the catalog</p>
        <ul className="sr-only">{subjects.map((subject) => <li key={subject}>{subject}</li>)}</ul>
      </div>
      <TextScrollMarquee baseVelocity={1.15} scrollDependent pauseOnHover>
        <span className="flex gap-3 pr-3">
          {subjects.map((subject, index) => (
            <span key={subject} className={`inline-flex items-center rounded-[999px_1rem_999px_1rem/1rem_999px_1rem_999px] border px-6 py-3 text-sm font-semibold ${index % 2 === 0 ? "border-accent/50 text-primary" : "border-primary/20 text-primary/75"}`}>{subject}</span>
          ))}
        </span>
      </TextScrollMarquee>
    </section>
  );
}
