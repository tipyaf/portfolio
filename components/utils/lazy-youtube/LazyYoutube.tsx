import Image from 'next/image';
import { useEffect, useState } from 'react';

interface LazyYoutubeProps {
  youtubeId: string;
  thumbnailWidth?: number;
  thumbnailHeight?: number;
  thumbnailQuality?: number;
}

export default function LazyYoutube({
  youtubeId,
  thumbnailWidth = 960,
  thumbnailHeight = 540,
  thumbnailQuality = 100,
}: LazyYoutubeProps): JSX.Element {
  const [imageClicked, setImageClicked] = useState(false);

  const onThumbnailClick = () => {
    setImageClicked(true);
  };

  useEffect(() => {
    const playImg = document.querySelector('#play-button');

    playImg?.addEventListener('click', onThumbnailClick, { once: true });
  }, []);

  return (
    <div className="youtubeContainer relative flex w-full items-center justify-center">
      {!imageClicked ? (
        <>
          <Image
            className="w-full"
            src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
            alt="yt thumbnail"
            width={thumbnailWidth}
            height={thumbnailHeight}
            quality={thumbnailQuality}
            loading="lazy"
          />
          <Image
            id="play-button"
            className="fixed w-28 cursor-pointer"
            src="/assets/yt-play.svg"
            alt="play button"
            width={80}
            height={80}
            loading="lazy"
          />
        </>
      ) : (
        <iframe
          allowFullScreen
          src={
            imageClicked
              ? `https://www.youtube.com/embed/${youtubeId}?rel=0&showinfo=0&autoplay=1&mute=1`
              : ''
          }
          title="youtube video"
        />
      )}
    </div>
  );
}
