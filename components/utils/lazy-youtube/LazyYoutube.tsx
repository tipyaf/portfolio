'use client';

import Image from 'next/image';
import { useState } from 'react';

interface LazyYoutubeProps {
  youtubeId: string;
  thumbnailWidth?: number;
  thumbnailHeight?: number;
  thumbnailQuality?: number;
  thumbnailAlt?: string;
  playButtonAlt?: string;
  videoTitle?: string;
}

export default function LazyYoutube({
  youtubeId,
  thumbnailWidth = 960,
  thumbnailHeight = 540,
  thumbnailQuality = 100,
  thumbnailAlt = '',
  playButtonAlt = '',
  videoTitle = '',
}: LazyYoutubeProps) {
  const [imageClicked, setImageClicked] = useState(false);

  return (
    <div className="youtubeContainer relative flex w-full items-center justify-center">
      {!imageClicked ? (
        <button
          type="button"
          onClick={() => setImageClicked(true)}
          className="relative flex w-full items-center justify-center"
          aria-label={playButtonAlt || 'Play video'}
        >
          <Image
            className="w-full"
            src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
            alt={thumbnailAlt}
            width={thumbnailWidth}
            height={thumbnailHeight}
            quality={thumbnailQuality}
            loading="lazy"
          />
          <Image
            className="absolute w-28"
            src="/assets/yt-play.svg"
            alt={playButtonAlt}
            width={80}
            height={80}
          />
        </button>
      ) : (
        <iframe
          allowFullScreen
          src={`https://www.youtube.com/embed/${youtubeId}?rel=0&showinfo=0&autoplay=1&mute=1`}
          title={videoTitle}
        />
      )}
    </div>
  );
}
