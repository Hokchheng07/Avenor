export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "I asked for a novel about the Mekong and left with three recommendations I have since read twice. The librarians here actually read what they suggest.",
    name: "Beckham",
    role: "Member since 2023",
    rating: 5,
  },
  {
    id: "t2",
    quote:
      "Finding a first edition of a quiet poetry collection would have taken me weeks. I sent one request and had a reply the next morning with two options.",
    name: "Selina",
    role: "Member since 2022",
    rating: 5,
  },
  {
    id: "t3",
    quote:
      "The subject browsing is the part I did not expect to like. I drift from Poetry to History most evenings now.",
    name: "Harry Potter",
    role: "Member since 2024",
    rating: 4,
  },
  {
    id: "t4",
    quote:
      "Renewals take seconds and the fines page explains itself without any legal language. As a first-time library member I knew exactly what I owed.",
    name: "James",
    role: "Member since 2024",
    rating: 5,
  },
  {
    id: "t5",
    quote:
      "They held a Cambodian history title for me while I finished my current book. That small thing made me stay a member.",
    name: "Lukas",
    role: "Member since 2021",
    rating: 5,
  },
];
