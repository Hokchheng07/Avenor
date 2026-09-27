"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import type React from "react";
import styles from "./shelf-scene.module.css";

type Cover = { src: string; rotate: number; hideOnMobile?: boolean; label?: boolean; leans?: boolean };

const LEFT: Cover[] = [
  { src: "/Images/hero-covers/the-hobbit.jpg", rotate: -2.2, hideOnMobile: true },
  { src: "/Images/hero-covers/circe.jpg", rotate: 1.2, label: true, leans: true },
];
const RIGHT: Cover[] = [
  { src: "/Images/hero-covers/beloved.jpg", rotate: -1.2, label: true },
  { src: "/Images/hero-covers/the-left-hand-of-darkness.jpg", rotate: 2.4 },
  { src: "/Images/hero-covers/the-waves.jpg", rotate: -1.6, hideOnMobile: true },
];

const STAGGER = 0.09;
const COVER_START = 0.3;

type SlotProps = {
  cover: Cover;
  index: number;
  replay?: number;
  onLeanEnd?: (e: React.AnimationEvent) => void;
};

function CoverSlot({ cover, index, replay = 0, onLeanEnd }: SlotProps) {
  const style = {
    "--r": `${cover.rotate}deg`,
    "--d": `${COVER_START + index * STAGGER}s`,
  } as CSSProperties;
  const leanClass = cover.leans ? (replay === 0 ? styles.leanIntro : styles.leanNow) : "";
  return (
    <div className={`${styles.slot} ${cover.hideOnMobile ? styles.hideSm : ""}`} style={style}>
      <div
        key={cover.leans ? replay : undefined}
        className={`${styles.leaner} ${leanClass}`}
        onAnimationEnd={cover.leans ? onLeanEnd : undefined}
      >
        <div className={styles.cover}>
          <Image src={cover.src} alt="" fill sizes="(max-width: 560px) 20vw, 77px" />
          {cover.label && <span className={styles.label}>4</span>}
        </div>
      </div>
    </div>
  );
}

export default function ShelfScene() {
  // replay: 0 = intro lean (delayed), n > 0 = hover replays (immediate)
  const [replay, setReplay] = useState(0);
  const [leaning, setLeaning] = useState(true);

  const handleEnter = () => {
    if (leaning) return;
    setLeaning(true);
    setReplay((n) => n + 1);
  };
  const handleLeanEnd = (e: React.AnimationEvent) => {
    if (e.target === e.currentTarget) setLeaning(false);
  };

  return (
    <div className={styles.scene} aria-hidden="true">
      <div className={styles.row} onMouseEnter={handleEnter}>
        <div className={styles.sprigWrap}>
          <div className={styles.sprig}>
            <Image src="/Images/about/botanical-sprig.png" alt="" fill sizes="80px" />
          </div>
        </div>

        {LEFT.map((c, i) => (
          <CoverSlot key={c.src} cover={c} index={i} replay={replay} onLeanEnd={handleLeanEnd} />
        ))}

        <div className={styles.gap} />

        {RIGHT.map((c, i) => <CoverSlot key={c.src} cover={c} index={LEFT.length + i} />)}

        <span className={styles.shelf} />
      </div>
    </div>
  );
}
