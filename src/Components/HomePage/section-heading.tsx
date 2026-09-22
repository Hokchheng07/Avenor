export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8 max-w-2xl">
      <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-accent uppercase">{eyebrow}</p>
      <h2 className="font-serif text-3xl leading-tight tracking-[-0.025em] text-primary sm:text-4xl">{title}</h2>
      {description ? <p className="mt-3 text-sm leading-6 text-primary/55 sm:text-base">{description}</p> : null}
    </div>
  );
}
