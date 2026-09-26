import type { CSSProperties } from "react";

const supportCards = [
  {
    id: "catalog",
    title: "Catalog Info",
    description: "Looking for a title, subject, or new arrivals?",
    icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    id: "borrowing",
    title: "Borrowing Help",
    description: "Need help with borrowing, renewals, or holds?",
    icon: "M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5z",
  },
  {
    id: "fines",
    title: "Fines & Fees",
    description: "Questions about late fees, payments, or waivers?",
    icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    id: "card",
    title: "Library Card",
    description: "Trouble with your card or your online account?",
    icon: "M12 4v1m0 14v1m8-8h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707",
  },
] as const;

function Card({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-[#4A6B53]/20 shadow-xs h-full flex flex-col items-center text-center">
      <div className="w-10 h-10 rounded-xl bg-[#4A6B53]/10 text-[#4A6B53] flex items-center justify-center mb-3 shrink-0">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={icon}
          />
        </svg>
      </div>
      <h4 className="font-bold text-gray-900 text-sm mb-1">{title}</h4>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
}

export function SupportCardsCarousel() {
  const set = (isClone: boolean) => (
    <ul
      className="flex shrink-0 gap-4 pr-4"
      aria-hidden={isClone ? true : undefined}
    >
      {supportCards.map((card, i) => (
        <li
          key={card.id}
          className="worm-item w-[230px] sm:w-[270px] shrink-0"
          style={{ "--i": i } as CSSProperties}
        >
          <Card {...card} />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="worm-viewport overflow-hidden py-4">
      <div className="worm-track flex w-max">
        {set(false)}
        {set(true)}
      </div>
    </div>
  );
}
