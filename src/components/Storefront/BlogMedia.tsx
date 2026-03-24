"use client";

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
        <img src={imageUrl} alt={title} className={mediaClassName} />
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
