'use client';

import Button from '@/components/utils/Button';
import { localize } from '@/lib/localize';
import { Project } from '@/types/server/project.model';
import { urlFor } from '@/utils/url-for';
import { PortableText } from '@portabletext/react';
import { useInView } from 'framer-motion';
import { PortableTextBlock } from 'next-sanity';
import { Image as ImageComponent } from 'next-sanity/image';
import { useEffect, useRef, useState } from 'react';

interface ProjectCardProps {
  project: Project;
  locale: string;
}

export default function ProjectCard({ project, locale }: ProjectCardProps) {
  const [highResLoaded, setHighResLoaded] = useState(false);
  const cardRef = useRef<HTMLImageElement>(null);
  const inView = useInView(cardRef);
  const imageWidth = 1920;
  const imageHeight = 1080;

  const name = localize(project, 'name', locale) as string;
  const url = localize(project, 'url', locale) as string;
  const description = localize(project, 'description', locale) as PortableTextBlock;
  const imageAlt =
    locale === 'fr' && project.image.alt_fr ? project.image.alt_fr : project.image.alt;

  useEffect(() => {
    const img = new Image(imageWidth, imageHeight);
    img.src = urlFor(project.image.image).width(imageWidth).fit('min').url();
    img.onload = () => setHighResLoaded(true);
  }, [project.image.image, inView]);

  return (
    <div
      ref={cardRef}
      className="shadow-secondary-1 dark:bg-surface-dark block rounded-lg bg-white dark:bg-tertiary"
    >
      <Button className="w-full" href={url} target="_blank">
        {highResLoaded ? (
          <ImageComponent
            className="w-full rounded-t-lg"
            src={urlFor(project.image.image).width(imageWidth).fit('max').url()}
            alt={imageAlt}
            width={imageWidth}
            height={1080}
            loading="lazy"
          />
        ) : (
          <ImageComponent
            className="w-full rounded-t-lg"
            src={urlFor(project.image.image).width(imageWidth).fit('max').url()}
            alt={imageAlt}
            width={540}
            height={320}
            loading="lazy"
          />
        )}
      </Button>
      <div className="text-surface p-6 dark:text-white">
        <Button
          className="mb-2 text-xl font-medium leading-tight hover:underline"
          href={url}
          target="_blank"
        >
          {name}
        </Button>

        {description && (
          <div className="styled-link hidden text-justify md:block">
            <PortableText value={description} />
          </div>
        )}
      </div>
    </div>
  );
}
