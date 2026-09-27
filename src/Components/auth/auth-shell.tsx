"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { usePathname } from "next/navigation"

import readingRoom from "../../../public/Images/auth-reading-room.png"
import styles from "./auth-shell.module.css"

export function AuthShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isRegister = pathname === "/register"

  return (
    <main
      className={styles.stage}
      data-auth-mode={isRegister ? "register" : "login"}
    >
      <Link href="/" className={styles.homeLink}>
        <ArrowLeft aria-hidden="true" />
        Back to Avenor
      </Link>
      <div className={styles.composition}>
        <div className={styles.media} aria-hidden="true">
          <Image
            src={readingRoom}
            alt=""
            fill
            priority
            sizes="(max-width: 820px) 100vw, 50vw"
            className={styles.mediaImage}
          />
          <div className={styles.mediaShade} />
          <p className={`${styles.quote} ${styles.loginQuote}`}>
            Every return
            <br />
            begins with a page.
          </p>
          <p className={`${styles.quote} ${styles.registerQuote}`}>
            A shelf of your own
            <br />
            starts here.
          </p>
        </div>

        <section className={styles.formSurface} aria-live="polite">
          <svg
            className={`${styles.wave} ${styles.waveLeft}`}
            viewBox="0 0 160 700"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M160 0V700H116C51 641 47 566 104 479C155 402 37 326 75 230C108 148 151 86 160 0Z" />
          </svg>
          <svg
            className={`${styles.wave} ${styles.waveRight}`}
            viewBox="0 0 160 700"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M160 0V700H116C51 641 47 566 104 479C155 402 37 326 75 230C108 148 151 86 160 0Z" />
          </svg>

          <svg
            className={styles.mobileWave}
            viewBox="0 0 1000 90"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0 90V56C168 7 338 18 500 50C683 87 826 88 1000 31V90H0Z" />
          </svg>

          <div className={styles.formInner} key={pathname}>
            {children}
          </div>
        </section>
      </div>
    </main>
  )
}
