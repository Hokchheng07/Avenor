"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { testimonials } from "@/data/testimonials";

const INTERVAL_MS = 6000;

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={`w-4 h-4 ${
            i < rating ? "text-[#B3874E]" : "text-[#4A6B53]/25"
          }`}
          fill="currentColor"
        >
          <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;
  const regionRef = useRef<HTMLElement>(null);

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % total) + total) % total);
    },
    [total]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused || total < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused, total]);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      prev();
    }
  };

  return (
    <section
      ref={regionRef}
      aria-roledescription="carousel"
      aria-label="What our members say"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKeyDown}
      tabIndex={0}
      className="outline-none"
    >
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#4A6B53] uppercase tracking-wider">
          From Our Readers
        </h2>
        <div className="w-12 h-1 bg-[#4A6B53] mx-auto mt-2 rounded-full" />
      </div>

      <div className="relative max-w-3xl mx-auto">
        <div className="overflow-hidden">
          <ul
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {testimonials.map((t, i) => (
              <li
                key={t.id}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${total}`}
                aria-hidden={i !== index}
                className="w-full shrink-0"
              >
                <figure className="bg-white rounded-3xl border border-[#4A6B53]/20 shadow-sm p-8 sm:p-10 flex flex-col items-center text-center">
                  <Stars rating={t.rating} />
                  <blockquote className="mt-5 text-base sm:text-lg text-gray-700 leading-relaxed">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6">
                    <p className="font-bold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{t.role}</p>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={prev}
          aria-label="Previous testimonial"
          className="absolute top-1/2 -translate-y-1/2 -left-3 sm:-left-5 w-10 h-10 rounded-full bg-white border border-[#4A6B53]/30 text-[#4A6B53] shadow-sm hover:bg-[#4A6B53]/10 transition-colors flex items-center justify-center"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          type="button"
          onClick={next}
          aria-label="Next testimonial"
          className="absolute top-1/2 -translate-y-1/2 -right-3 sm:-right-5 w-10 h-10 rounded-full bg-white border border-[#4A6B53]/30 text-[#4A6B53] shadow-sm hover:bg-[#4A6B53]/10 transition-colors flex items-center justify-center"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        {testimonials.map((t, i) => (
          <button
            key={t.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all ${
              i === index
                ? "w-7 bg-[#4A6B53]"
                : "w-2 bg-[#4A6B53]/30 hover:bg-[#4A6B53]/50"
            }`}
          />
        ))}
      </div>

      <p aria-live="polite" className="sr-only">
        Testimonial {index + 1} of {total}
      </p>
    </section>
  );
}
