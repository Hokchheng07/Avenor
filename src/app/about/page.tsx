import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  Compass,
  Eye,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { LibraryRequestForm } from "@/Components/Contact/LibraryRequestForm";
import { SupportCardsCarousel } from "@/Components/Contact/SupportCardsCarousel";
import { TestimonialSlider } from "@/Components/Contact/TestimonialSlider";
import { HeroCarousel } from "@/Components/About/hero-carousel";
import { Footer } from "@/Components/Shared/footer";
import {
  ScrollTimeline,
  type TimelineEvent,
} from "@/Components/lightswind/scroll-timeline";
import { mentors, teamMembers, type TeamMember } from "@/data/team";
import styles from "./about.module.css";

const discoveryBooks = [
  { src: "/Images/hero-covers/beloved.jpg", alt: "Beloved book cover" },
  { src: "/Images/hero-covers/circe.jpg", alt: "Circe book cover" },
  { src: "/Images/hero-covers/the-hobbit.jpg", alt: "The Hobbit book cover" },
  {
    src: "/Images/hero-covers/the-left-hand-of-darkness.jpg",
    alt: "The Left Hand of Darkness book cover",
  },
] as const;

const heroCovers = [
  { src: "/Images/hero-covers/the-hobbit.jpg", title: "The Hobbit" },
  { src: "/Images/hero-covers/circe.jpg", title: "Circe" },
  { src: "/Images/hero-covers/beloved.jpg", title: "Beloved" },
  {
    src: "/Images/hero-covers/the-left-hand-of-darkness.jpg",
    title: "The Left Hand of Darkness",
  },
  { src: "/Images/hero-covers/the-waves.jpg", title: "The Waves" },
] as const;

const missionPath = ["Curiosity", "Discovery", "Connection"] as const;

const storyEvents: TimelineEvent[] = [
  {
    id: "story",
    index: "01",
    label: "Our Story",
    title: "It started with a noisy shelf.",
    description:
      "A small team of readers kept asking the same question: why does finding the next good book feel so crowded? Avenor is our answer—new books, familiar voices, and unexpected favorites, arranged into a calmer path.",
    icon: <BookOpen aria-hidden="true" />,
    visual: (
      <div className={styles.bookRow} aria-label="Books to discover">
        {discoveryBooks.map((book) => (
          <div className={styles.bookCover} key={book.src}>
            <Image src={book.src} alt={book.alt} fill sizes="110px" />
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "mission",
    index: "02",
    label: "Our Mission",
    title: "Help people find meaningful books—and the authors behind them.",
    description:
      "Wherever someone is on their reading journey, Avenor should make the next step obvious: a clear place to look, a reason to care, and a voice worth following.",
    icon: <Compass aria-hidden="true" />,
    visual: (
      <ol className={styles.missionPath} aria-label="The reading path">
        {missionPath.map((step, i) => (
          <li key={step}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            {step}
          </li>
        ))}
      </ol>
    ),
  },
  {
    id: "vision",
    index: "03",
    label: "Our Vision",
    title: "A more thoughtful, more human reading culture.",
    description:
      "One where great stories reach the people who need them, and every reader leaves with a little more curiosity than they arrived with.",
    icon: <Eye aria-hidden="true" />,
    visual: (
      <div className={styles.quoteBlock}>
        <Image
          src="/Images/about/botanical-sprig.png"
          alt=""
          width={328}
          height={440}
          className={styles.botanical}
        />
        <blockquote>
          Different stories.
          <br />A more connected you.
        </blockquote>
      </div>
    ),
  },
];

const githubUrl = (value: string) => {
  const handle = value.trim().replace(/^@/, "");
  if (!handle) return null;
  if (/^https?:\/\//i.test(handle)) return handle;
  return `https://github.com/${handle}`;
};

const roleTitles: Record<string, string> = {
  FRONTEND: "Frontend Developer",
  BACKEND: "Backend Developer",
  FULLSTACK: "Full-stack Developer",
  MENTOR: "Project Mentor",
};

function PersonLinks({ member }: { member: TeamMember }) {
  const github = githubUrl(member.github);
  const name = member.name.trim();

  return (
    <div className={styles.personLinks}>
      {github ? (
        <a
          href={github}
          target="_blank"
          rel="noreferrer"
          aria-label={`${name} on GitHub`}
        >
          <Image
            src="/Brand/GitHub_light_dark/GitHub_light.svg"
            alt=""
            width={20}
            height={20}
          />
        </a>
      ) : null}
      <a href={`mailto:${member.email}`} aria-label={`Email ${name}`}>
        <Mail aria-hidden="true" />
      </a>
    </div>
  );
}

function PersonCard({ member, badge }: { member: TeamMember; badge: string }) {
  const name = member.name.trim();

  return (
    <article className={styles.personCard}>
      <div className={styles.avatar}>
        <Image
          src={member.image}
          alt={name}
          fill
          sizes="(max-width: 520px) 96px, 128px"
          className={styles.avatarImage}
        />
      </div>
      <h4>{name}</h4>
      <p className={styles.personRole}>{roleTitles[member.role] ?? member.role}</p>
      <span className={styles.personRule} aria-hidden="true" />
      <span className={styles.badge}>{badge}</span>
      <PersonLinks member={member} />
    </article>
  );
}

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <main>
        <section className={styles.hero} aria-labelledby="about-title">
          <div className={styles.heroStatement}>
            <h1 id="about-title">Find Your Next Book</h1>
            <p>
              Avenor connects the stories worth following—a thoughtful path
              from curiosity to the books and authors that stay with you.
            </p>
            <Link href="/discover" className={styles.heroButton}>
              Explore Now <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className={styles.heroVisual}>
            <HeroCarousel covers={heroCovers} />
          </div>
        </section>

        <ScrollTimeline
          id="story"
          className={styles.story}
          eyebrow="Our story"
          title="Three chapters, one reading path."
          subtitle="Where Avenor came from, what it sets out to do, and the reading culture it hopes to leave behind."
          events={storyEvents}
        />

        <section id="team" className={styles.teamSection} aria-labelledby="team-title">
          <div className={styles.teamLead}>
            <p className={styles.eyebrow}>The people</p>
            <h2 id="team-title">The people behind Avenor.</h2>
            <p>
              A multidisciplinary team united by a love of books and a belief
              in their power to bring people closer—to new ideas, new
              perspectives, and to each other.
            </p>
          </div>

          <div className={styles.teamGroup}>
            <h3 className={styles.groupTitle}>
              <span>Our Mentor</span>
            </h3>
            <ul className={styles.mentorGrid}>
              {mentors.map((mentor) => (
                <li key={mentor.id}>
                  <PersonCard member={mentor} badge="Mentor" />
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.teamGroup}>
            <h3 className={styles.groupTitle}>
              <span>Our Team</span>
            </h3>
            <ul className={styles.memberGrid}>
              {teamMembers.map((member) => (
                <li key={member.id}>
                  <PersonCard member={member} badge="Member" />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contact" className={styles.contactSection} aria-labelledby="contact-title">
          <div className={styles.contactLead}>
            <h2 id="contact-title">Let&apos;s find the next story together.</h2>
            <p>
              Ask about a title, get help with the library, or simply tell us
              what you want to read next.
            </p>
          </div>

          <SupportCardsCarousel />

          <div className={styles.contactGrid}>
            <LibraryRequestForm />

            <aside className={styles.contactDetails} aria-label="Contact information">
              <div>
                <h3>Visit the reading room</h3>
                <p>
                  Come by, call, or write. We will help point you toward the
                  right shelf.
                </p>
              </div>
              <address>
                <div>
                  <MapPin aria-hidden="true" />
                  <span>
                    No. 40, Street 273, Sangkat Boeung Kak I, Khan Toul Kork,
                    Phnom Penh, Cambodia
                  </span>
                </div>
                <div>
                  <Phone aria-hidden="true" />
                  <span>
                    <a href="tel:+85595990910">(+855) 95-990-910</a><br />
                    <a href="tel:+85593990910">(+855) 93-990-910</a>
                  </span>
                </div>
                <div>
                  <Mail aria-hidden="true" />
                  <a href="mailto:info.istad@gmail.com">info.istad@gmail.com</a>
                </div>
                <div>
                  <Clock3 aria-hidden="true" />
                  <span>
                    Mon–Fri, 8:00 AM–5:00 PM<br />
                    Sat, 8:00 AM–12:00 PM
                  </span>
                </div>
              </address>
              <div className={styles.mapFrame}>
                <iframe
                  title="ISTAD location map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.773822187042!2d104.9014024!3d11.585256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951e96d257a6f%3A0x6b66703c5fc0c7cc!2sScience%20and%20Technology%20Advanced%20Development%20Co.%2C%20Ltd.!5e0!3m2!1sen!2skh!4v1700000000000"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a
                  href="https://maps.app.goo.gl/ksmWeyUZa1H3eTSB9"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open in Maps <ArrowRight aria-hidden="true" />
                </a>
              </div>
            </aside>
          </div>
        </section>

        <div className={styles.testimonials}>
          <TestimonialSlider />
        </div>
      </main>
      <Footer />
    </div>
  );
}
