"use client";

import Image from "next/image";

type BlogMediaProps = {
  title: string;
  imageUrl?: string;
  videoUrl?: string;
  className?: string;
  mediaClassName: string;
  fallbackClassName?: string;
  detail?: boolean;
};

export default function BlogMedia({
  title,
  imageUrl,
  videoUrl,
  className,
  mediaClassName,
  fallbackClassName,
  detail = false,
}: BlogMediaProps) {
  return (
    <div className={className}>
      {videoUrl ? (
        <div className="relative">
          <video
            src={videoUrl}
            poster={imageUrl}
            className={`${mediaClassName}${detail ? "" : " pointer-events-none"}`}
            controls={detail}
            muted={!detail}
            playsInline
            preload="metadata"
          />
          {!detail ? (
            <span className="absolute left-3 top-3 inline-flex rounded-full bg-dark px-3 py-1 text-xs font-medium text-white">
              Видео
            </span>
          ) : null}
        </div>
      ) : imageUrl ? (
        <Image
          src={imageUrl}
          alt={title}
          width={1200}
          height={630}
          sizes={
            detail
              ? "(min-width: 1280px) 850px, (min-width: 1024px) 720px, 100vw"
              : "(min-width: 1280px) 370px, (min-width: 640px) 50vw, 100vw"
          }
          className={mediaClassName}
        />
      ) : (
        <div
          className={
            fallbackClassName ||
            `${mediaClassName} flex items-center justify-center bg-gray-1 px-3 text-center text-dark-4`
          }
        >
          {title}
        </div>
      )}
    </div>
  );
}
