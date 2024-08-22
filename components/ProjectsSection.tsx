'use client';

import ProjectCard from '@/components/ProjectCard';
import { Project } from '@/types/server/project.model';
import { motion } from 'framer-motion';

interface ProjectsProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="section-container flex flex-col">
      <h2 className="heading self-start text-white">Projects</h2>

      <ul className="flex w-full flex-col justify-between gap-28">
        {projects.map((item, i) => (
          <motion.li
            key={`project_${i}`}
            className="w-full odd:self-end md:w-1/2"
            initial={{
              opacity: 0,
              // if odd index card,slide from right instead of left
              x: i % 2 === 0 ? 50 : -50,
            }}
            whileHover={{
              rotate: 0,
              width: '100%',
              transition: {
                duration: 0.5,
              },
            }}
            whileInView={{
              opacity: 1,
              x: 0, // Slide in to its original position
              rotate: i % 2 === 0 ? 2 : -2,
              transition: {
                duration: 1, // Animation duration
              },
            }}
            viewport={{ once: true }}
          >
            <ProjectCard key={i} project={item} />
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
