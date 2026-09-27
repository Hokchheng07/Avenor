"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import styles from "./hero-carousel.module.css";

export interface HeroCover {
  src: string;
  title: string;
}

const AUTOPLAY_MS = 4800;
const easeOut = [0.23, 1, 0.32, 1] as const;

export function HeroCarousel({ covers }: { covers: readonly HeroCover[] }) {
  const [active, setActive] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;
  const count = covers.length;

  useEffect(() => {
    if (paused || reduceMotion || count < 2) return;
    const timer = window.setInterval(
      () => setActive((i) => (i + 1) % count),
      AUTOPLAY_MS
    );
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion, count]);

  const at = (offset: number) => covers[(active + offset + count) % count];
  const slots = [
    { key: "prev", cover: at(-1), offset: -1 },
    { key: "current", cover: at(0), offset: 0 },
    { key: "next", cover: at(1), offset: 1 },
  ] as const;

  return (
    <div
      className={styles.carousel}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured books"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={styles.stage}>
        {slots.map(({ key, cover, offset }) => {
          const isCurrent = offset === 0;
          const content = (
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={cover.src}
                className={styles.cover}
                initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.6, ease: easeOut }}
              >
                <Image
                  src={cover.src}
                  alt={isCurrent ? cover.title : ""}
                  fill
                  sizes={isCurrent ? "(max-width: 760px) 34vw, 180px" : "(max-width: 760px) 26vw, 140px"}
                  priority={isCurrent}
                />
              </motion.div>
            </AnimatePresence>
          );

          return isCurrent ? (
            <div key={key} className={styles.panel} data-slot={key}>
              {content}
            </div>
          ) : (
            <button
              key={key}
              type="button"
              className={styles.panel}
              data-slot={key}
              onClick={() => setActive((i) => (i + offset + count) % count)}
              aria-label={`Show ${cover.title}`}
            >
              {content}
            </button>
          );
        })}
      </div>

      <div className={styles.dots}>
        {covers.map((cover, i) => (
          <button
            key={cover.src}
            type="button"
            className={styles.dot}
            aria-label={`Show ${cover.title}`}
            aria-current={i === active || undefined}
            onClick={() => setActive(i)}
          />
        ))}
      </div>

      <p className={styles.srOnly} aria-live={paused || reduceMotion ? "polite" : "off"}>
        {`Showing ${at(0).title}, ${active + 1} of ${count}`}
      </p>
    </div>
  );
}
