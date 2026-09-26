import Image from "next/image";
import Link from "next/link";
import { teamMembers, mentors, TeamMember } from "@/data/team";
import { LibraryRequestForm } from "@/Components/Contact/LibraryRequestForm";
import { TestimonialSlider } from "@/Components/Contact/TestimonialSlider";
import { SupportCardsCarousel } from "@/Components/Contact/SupportCardsCarousel";

const buttonClass =
  "w-8 h-8 rounded-full border border-[#4A6B53]/30 flex items-center justify-center text-[#4A6B53] hover:bg-[#4A6B53]/10 transition-colors";

const githubUrl = (value: string) => {
  const handle = value.trim().replace(/^@/, "");
  if (!handle) return null;
  if (/^https?:\/\//i.test(handle)) return handle;
  return `https://github.com/${handle}`;
};

const mailtoUrl = (value: string) => {
  const email = value.trim();
  if (!email.includes("@")) return null;
  return `mailto:${email}`;
};

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="bg-white dark:bg-secondary/50 rounded-3xl border border-[#4A6B53]/20 dark:border-primary/20 p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-200">
      {/* Avatar Circle */}
      <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-[#4A6B53]/30 bg-gray-100 flex items-center justify-center">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="128px"
            className="object-cover object-center"
          />
        ) : (
          <svg
            className="w-14 h-14 text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        )}
      </div>

      {/* Member Name */}
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
        {member.name}
      </h3>

      {/* Role Pill */}
      <span className="px-5 py-1 rounded-full bg-[#4A6B53] text-white text-xs font-semibold uppercase tracking-wider mb-5">
        {member.role}
      </span>

      {/* Social Action Buttons */}
      <div className="flex items-center gap-3">
        {/* GitHub */}
        {githubUrl(member.github) && (
          <a
            href={githubUrl(member.github) as string}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on GitHub`}
            title={`${member.name} on GitHub`}
            className={buttonClass}
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        )}

        {/* Email */}
        {mailtoUrl(member.email) && (
          <a
            href={mailtoUrl(member.email) as string}
            aria-label={`Email ${member.name}`}
            title={`Email ${member.name}`}
            className={buttonClass}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-[#4A6B53]/10 via-white to-[#4A6B53]/5 text-gray-800 min-h-screen">
      <main className="max-w-7xl mx-auto px-5 py-12 space-y-20">

        {/* 1. Hero Section */}
        <section className="text-center max-w-3xl mx-auto pt-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#4A6B53]">
            REDEFINING THE LITERARY JOURNEY
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 mt-3 mb-6">
            Welcome to <span className="text-[#4A6B53]">Avenor</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Avenor is built for real book enthusiasts. We provide instant access to high-definition cataloging, detailed showcase aggregation, real-time bookshelf tracking, and an interactive reader community—all through a seamless digital experience.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/#discover"
              className="px-6 py-3 rounded-full bg-[#4A6B53] text-white font-semibold hover:bg-[#3A5541] transition-all text-sm shadow-md"
            >
              Explore Books
            </Link>
          </div>
        </section>

        {/* 2. Our Story Section */}
        <section className="bg-white/80 rounded-3xl p-8 sm:p-12 border border-[#4A6B53]/20 shadow-sm text-center max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#4A6B53] uppercase tracking-wide">
            Our Story
          </h2>
          <div className="w-12 h-1 bg-[#4A6B53] mx-auto mt-2 mb-6 rounded-full" />
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            Avenor started as an initiative to declutter the digital discovery experience. We wanted to build a platform that strips away aggressive clutter and offers users a clean, curated environment to manage their personal lists and discover hidden gems seamlessly.
          </p>
        </section>

        {/* 3. Our Mentors Section */}
        <section id="mentors" className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#4A6B53] uppercase tracking-wider">
              Our Mentor
            </h2>
            <div className="w-12 h-1 bg-[#4A6B53] mx-auto mt-2 rounded-full" />
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-xs">
              {mentors.map((mentor) => (
                <MemberCard key={mentor.id} member={mentor} />
              ))}
            </div>
          </div>
        </section>

        {/* 4. Meet Our Team Section */}
        <section id="team" className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#4A6B53] uppercase tracking-wider">
              Meet Our Team
            </h2>
            <div className="w-12 h-1 bg-[#4A6B53] mx-auto mt-2 rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>

        {/* 5. Contact Us Section */}
        <section id="contact" className="pt-10 max-w-6xl mx-auto space-y-12">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#4A6B53] uppercase tracking-wider">
              Contact Us Now
            </h2>
            <div className="w-12 h-1 bg-[#4A6B53] mx-auto mt-2 rounded-full" />
          </div>

          {/* Quick Support Feature Cards Carousel */}
          <SupportCardsCarousel />

          {/* Form & Info Section Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Box: Ask a Librarian Form */}
            <LibraryRequestForm />


            {/* Right Box: Contact Information & Google Maps Embed */}
            <div className="bg-white p-8 rounded-3xl border border-[#4A6B53]/20 shadow-sm flex flex-col justify-between space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <p className="flex items-start gap-3">
                    <span className="text-[#4A6B53] font-semibold shrink-0">📍 Address:</span>
                    <span>
                      No. 40, Street 273, Sangkat Boeung Kak I, Khan Toul Kork,
                      Phnom Penh, Cambodia
                    </span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-[#4A6B53] font-semibold shrink-0">📞 Phone:</span>
                    <span>
                      <a href="tel:+85595990910" className="hover:text-[#4A6B53]">
                        (+855) 95-990-910
                      </a>
                      {" · "}
                      <a href="tel:+85593990910" className="hover:text-[#4A6B53]">
                        (+855) 93-990-910
                      </a>
                    </span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-[#4A6B53] font-semibold shrink-0">📧 Email:</span>
                    <a
                      href="mailto:info.istad@gmail.com"
                      className="hover:text-[#4A6B53]"
                    >
                      info.istad@gmail.com
                    </a>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-[#4A6B53] font-semibold shrink-0">🕒 Reading Room:</span>
                    <span>Mon–Fri, 8:00 AM – 5:00 PM · Sat, 8:00 AM – 12:00 PM</span>
                  </p>
                </div>
              </div>

              {/* Map Preview Box */}
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 h-52 bg-gray-100">
                <iframe
                  title="ISTAD Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.773822187042!2d104.9014024!3d11.585256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951e96d257a6f%3A0x6b66703c5fc0c7cc!2sScience%20and%20Technology%20Advanced%20Development%20Co.%2C%20Ltd.!5e0!3m2!1sen!2skh!4v1700000000000"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a
                  href="https://maps.app.goo.gl/ksmWeyUZa1H3eTSB9"
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-2 right-2 px-3 py-1.5 rounded-full bg-[#4A6B53] text-white text-[11px] font-semibold shadow-md hover:bg-[#3A5541] transition-colors"
                >
                  Open in Maps
                </a>
              </div>

              <p className="text-xs text-gray-400 text-center">
                For faster help, visit the circulation desk at the reading room with your library card.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Testimonial Slider */}
        <TestimonialSlider />
      </main>

      {/* 7. Footer */}
      <footer className="bg-white border-t border-[#4A6B53]/20 pt-12 pb-6 mt-20">
        <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-5 gap-8 mb-8 text-sm">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <h3 className="text-xl font-extrabold text-[#4A6B53]">Avenor</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Experience seamless online discovery and top-tier literary entertainment with Avenor.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3 border-b border-[#4A6B53] w-fit pb-1">Quick Link</h4>
            <ul className="space-y-2 text-xs text-gray-600">
              <li><Link href="/" className="hover:text-[#4A6B53]">Home</Link></li>
              <li><Link href="/#deals" className="hover:text-[#4A6B53]">Deals</Link></li>
              <li><Link href="/about" className="hover:text-[#4A6B53]">About</Link></li>
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3 border-b border-[#4A6B53] w-fit pb-1">More</h4>
            <ul className="space-y-2 text-xs text-gray-600">
              <li><Link href="#" className="hover:text-[#4A6B53]">My Favorites</Link></li>
              <li><Link href="#" className="hover:text-[#4A6B53]">How to Book</Link></li>
            </ul>
          </div>

          {/* Legal & App */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3 border-b border-[#4A6B53] w-fit pb-1">Legal & App</h4>
            <ul className="space-y-2 text-xs text-gray-600">
              <li><Link href="#" className="hover:text-[#4A6B53]">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-[#4A6B53]">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-[#4A6B53]">Age Policy</Link></li>
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3 border-b border-[#4A6B53] w-fit pb-1">Get in Touch</h4>
            <ul className="space-y-2 text-xs text-gray-600 mb-4">
              <li>📧 avenor67@gmail.com</li>
              <li>📞 +855 12 44 55 66</li>
              <li>📍 Toul Kork, Phnom Penh</li>
            </ul>

            <div className="pt-2">
              <span className="text-xs font-bold text-[#4A6B53] block mb-2">Sponsored and Organized</span>
              <div className="relative w-36 h-12 mt-8">
                <Image
                  src="/Brand/ISTADLogo(LightMode).png"
                  alt="ISTAD Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#4A6B53]/10 pt-4 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Avenor. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}