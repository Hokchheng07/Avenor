"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import styles from "./scroll-timeline.module.css";

export interface TimelineEvent {
  id: string;
  /** Short marker shown beside the rail, e.g. "01" */
  index: string;
  label: string;
  title: string;
  description: string;
  icon: ReactNode;
  visual?: ReactNode;
}

export interface ScrollTimelineProps {
  events: TimelineEvent[];
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  id?: string;
}

const easeOut = [0.23, 1, 0.32, 1] as const;

function TimelineItem({
  event,
  side,
  reduceMotion,
}: {
  event: TimelineEvent;
  side: "left" | "right";
  reduceMotion: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);
  // Active once the item crosses the middle of the viewport, and stays
  // active while it is still near the top of the screen.
  const active = useInView(ref, { margin: "200% 0px -50% 0px" });

  return (
    <li
      ref={ref}
      className={styles.item}
      data-side={side}
      data-active={active || undefined}
    >
      <div className={styles.aside} aria-hidden="true">
        <span className={styles.numeral}>{event.index}</span>
        <span className={styles.asideLabel}>{event.label}</span>
      </div>

      <div className={styles.node} aria-hidden="true">
        {event.icon}
      </div>

      <motion.article
        className={styles.card}
        initial={reduceMotion ? false : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: 0.8, ease: easeOut }}
      >
        <p className={styles.cardEyebrow}>
          <span>{event.index}</span>
          {event.label}
        </p>
        <h3>{event.title}</h3>
        <p className={styles.cardBody}>{event.description}</p>
        {event.visual ? (
          <div className={styles.visual}>{event.visual}</div>
        ) : null}
      </motion.article>
    </li>
  );
}

export function ScrollTimeline({
  events,
  eyebrow,
  title,
  subtitle,
  className,
  id,
}: ScrollTimelineProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 50%", "end 50%"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const progress = reduceMotion ? scrollYProgress : smoothProgress;
  const headTop = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id={id}
      className={cn(styles.timeline, className)}
      aria-labelledby={id ? `${id}-title` : undefined}
    >
      <header className={styles.header}>
        <div>
          {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
          <h2 id={id ? `${id}-title` : undefined}>{title}</h2>
        </div>
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      </header>

      <div ref={trackRef} className={styles.track}>
        <div className={styles.rail} aria-hidden="true">
          <motion.div className={styles.fill} style={{ scaleY: progress }} />
          <motion.div className={styles.head} style={{ top: headTop }} />
        </div>

        <ol className={styles.list}>
          {events.map((event, index) => (
            <TimelineItem
              key={event.id}
              event={event}
              side={index % 2 === 0 ? "left" : "right"}
              reduceMotion={reduceMotion}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
