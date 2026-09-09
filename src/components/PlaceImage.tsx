"use client";

import { useState } from "react";

export function PlaceImage({
  src,
  gradient,
  className = "",
  imgClassName = "",
  alt = "",
}: {
  src?: string;
  gradient: string;
  className?: string;
  imgClassName?: string;
  alt?: string;
}) {
  const [failed, setFailed] = useState(false);
  const showImg = Boolean(src) && !failed;

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${gradient} ${className}`}>
      {showImg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : null}
    </div>
  );
}
