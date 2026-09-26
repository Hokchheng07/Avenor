export interface Subject {
  name: string;
  count: string;
  index: string;
}

export const subjects: Subject[] = [
  { name: "Fiction", count: "12.4k", index: "01" },
  { name: "History", count: "8.9k", index: "02" },
  { name: "Science", count: "6.2k", index: "03" },
  { name: "Poetry", count: "3.1k", index: "04" },
  { name: "Biography", count: "4.8k", index: "05" },
  { name: "Children’s", count: "5.0k", index: "06" },
];

export const subjectSlug = (name: string) =>
  name.toLowerCase().replace("’", "").replace(" ", "-");
