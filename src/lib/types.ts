export type SearchMode = "all" | "title" | "author" | "subject";

export interface BookItem {
  id: string; // OLID, e.g., "OL45804W"
  key: string; // "/works/OL45804W"
  title: string;
  author: string;
  authorKey?: string;
  coverUrl?: string | null;
  coverId?: number | null;
  isbn?: string | null;
  rating?: number; // e.g. 4.2
  ratingCount?: number;
  readerCount?: number; // e.g. 15300
  alreadyReadCount?: number;
  currentlyReadingCount?: number;
  wantToReadCount?: number;
  publishYear?: number | string | null;
  publishDate?: string | null;
  editionCount?: number;
  isBorrowable?: boolean;
  hasFulltext?: boolean;
  subjects?: string[];
  description?: string;
}

export interface GenreItem {
  name: string;
  slug: string;
  countLabel: string;
  description: string;
  previewCovers?: string[];
}

export interface AuthorSpotlight {
  name: string;
  authorKey: string;
  role: string;
  avatarUrl: string;
  quote: string;
  featuredBookTitle: string;
}

export interface WorkDetailData extends BookItem {
  firstSentence?: string;
  pages?: number;
  publisher?: string;
  language?: string;
  covers?: number[];
  relatedWorks?: BookItem[];
}

