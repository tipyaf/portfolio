'use client';
import Button from '@/components/utils/Button';
import { Job } from '@/types/server';
import { PortableText } from '@portabletext/react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';

interface JobCardProps {
  job: Job;
  index: number;
}

export default function JobCard({ index, job }: JobCardProps) {
  const ref = useRef(null);
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  useEffect(() => {}, []);
  return (
    <motion.div
      initial={{
        opacity: 0,
        // if odd index card,slide from right instead of left
        x: index % 2 === 0 ? 50 : -50,
      }}
      whileInView={{
        opacity: 1,
        x: 0, // Slide in to its original position
        transition: {
          duration: 1, // Animation duration
        },
      }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      ref={ref}
      className="relative w-full rounded-lg bg-white/50 p-4 shadow-lg backdrop-blur-lg"
    >
      <div className="styled-list">
        <div className="text-xl font-bold">{job.role}</div>
        <div className="text-sm font-light">
          {job.date.start} - {job.date?.present ? 'Present' : job.date.end}
          <span className="ml-1">
            (<span className="inline-block first-letter:uppercase">{job.jobType}</span>)
          </span>
        </div>

        {job.company?.url ? (
          <Button className="hover:underline" href={job.company.url} target={'_blank'}>
            {job.company.name}
          </Button>
        ) : (
          <div>{job.company.name}</div>
        )}
        <div className="flex justify-end pt-2">
          <Button
            onClick={toggleDescription}
            icon={showDescription ? RxCross2 : BiPlus}
            className="rounded-full border-[1px] px-3 py-2 shadow transition-colors duration-300"
          ></Button>
        </div>
        <motion.div
          className="mt-2 overflow-y-hidden p-1 will-change-transform"
          animate={{
            height: showDescription ? '100%' : '0.01px',
            opacity: showDescription ? 1 : 0,
            type: 'spring',
          }}
          initial={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PortableText value={job.description} />
        </motion.div>
      </div>
    </motion.div>
  );
}
