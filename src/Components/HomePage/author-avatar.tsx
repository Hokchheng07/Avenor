"use client";

import { useState } from "react";
import Image from "next/image";

export function AuthorAvatar({
  name,
  initials,
  photoUrl,
  accent,
}: {
  name: string;
  initials: string;
  photoUrl?: string;
  accent: boolean;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const showPhoto = photoUrl && !imageFailed;

  return (
    <span className={`relative grid size-16 shrink-0 place-items-center overflow-hidden rounded-full border font-serif text-lg sm:size-18 ${accent ? "border-accent/35 bg-accent/12 text-primary" : "border-primary/10 bg-primary text-secondary"}`}>
      {showPhoto ? (
        <Image
          src={photoUrl}
          alt={`Portrait of ${name}`}
          fill
          sizes="72px"
          className="object-cover"
          onError={() => setImageFailed(true)}
        />
      ) : (
        initials
      )}
    </span>
  );
}
