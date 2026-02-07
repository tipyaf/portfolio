'use client';

import ProjectCard from '@/components/ProjectCard';
import { Project } from '@/types/server/project.model';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface ProjectsProps {
  projects: Project[];
  locale: string;
}

export default function ProjectsSection({ projects, locale }: ProjectsProps) {
  const t = useTranslations('projects');
  return (
    <section id="projects" className="section-container flex flex-col">
      <h2 className="heading self-start text-white">{t('title')}</h2>

      <ul className="flex w-full flex-col justify-between gap-28">
        {projects.map((item, i) => (
          <motion.li
            key={`project_${i}`}
            className="w-full odd:self-end md:w-1/2"
            initial={{
              opacity: 0,
              x: i % 2 === 0 ? 50 : -50,
            }}
            whileHover={{
              rotate: 0,
              width: '100%',
              transition: {
                duration: 0.3,
              },
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              rotate: i % 2 === 0 ? 2 : -2,
              transition: {
                duration: 1,
              },
            }}
            viewport={{ once: true }}
          >
            <ProjectCard key={i} project={item} locale={locale} />
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
