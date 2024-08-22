'use client';

import Button from '@/components/utils/Button';
import { Project } from '@/types/server/project.model';
import { PortableText } from '@portabletext/react';
import { Image } from 'next-sanity/image';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="shadow-secondary-1 dark:bg-surface-dark block rounded-lg bg-white">
      <Button className="w-full" href={project.url} target="_blank">
        <Image
          className="w-full rounded-t-lg"
          src={project.image.image}
          alt={project.image.alt}
          width={500}
          height={200}
        />
      </Button>
      <div className="text-surface p-6 dark:text-white">
        <Button
          className="mb-2 text-xl font-medium leading-tight hover:underline"
          href={project.url}
          target="_blank"
        >
          {project.name}
        </Button>

        <div className="styled-link hidden md:block">
          <PortableText value={project.description} />
        </div>
      </div>
    </div>
  );
}
