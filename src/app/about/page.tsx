import Image from "next/image";
import { teamMembers } from "@/data/team";

export default function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto px-5 py-16 sm:px-8 lg:px-10">
      {/* Header */}
      <section className="text-center mb-16">
        <h1 className="font-serif text-4xl font-bold tracking-tight text-primary sm:text-5xl mb-4">
          About Us
        </h1>
        <p className="text-lg text-primary/70 max-w-2xl mx-auto leading-relaxed">
          Meet the team behind Avenor working together to build a modern, calm
          book discovery platform.
        </p>
      </section>

      {/* 6-Member Grid */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white dark:bg-secondary/50 rounded-2xl border border-primary/10 p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-200"
            >
              {/* Member Image Avatar */}
              <div className="relative w-36 h-36 rounded-full overflow-hidden mb-5 border-2 border-primary/15 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="144px"
                    className="object-cover object-center"
                  />
                ) : (
                  <svg
                    className="w-16 h-16 text-primary/40"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                )}
              </div>

              {/* Member Details */}
              <h3 className="text-xl font-bold text-primary font-serif">
                {member.name}
              </h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
