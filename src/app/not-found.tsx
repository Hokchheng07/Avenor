import type { Metadata } from "next";
import Link from "next/link";
import ShelfScene from "@/Components/NotFound/shelf-scene";
import styles from "@/Components/NotFound/not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found",
  robots: {
    index: false,
    follow: false,
  },
};

function Arrow() {
  return (
    <svg className={styles.arrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export default function NotFound() {
  return (
    <div className={styles.page}>
      <Link href="/" className={styles.back}>← Back to Avenor</Link>

      <main className={styles.main}>
        <span className={styles.srOnly}>Error 404</span>
        <ShelfScene />

        <div className={styles.copy}>
          <p className={styles.eyebrow}>Page not found</p>
          <h1 className={styles.title}>This page isn&rsquo;t on the shelf.</h1>
          <p className={styles.body}>
            It may have been moved, renamed, or never written at all. Let&rsquo;s find you something worth reading.
          </p>
          <div className={styles.actions}>
            <Link href="/" className={styles.button}>
              Back to home
              <Arrow />
            </Link>
            <Link href="/discover" className={styles.link}>
              Discover books
              <Arrow />
            </Link>
          </div>
          <p className={styles.tertiary}>
            Or <Link href="/about#team">browse the team behind Avenor</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
