'use client';

import JobCard from '@/components/JobCard/JobCard';
import Button from '@/components/utils/Button';
import Modal from '@/components/utils/Modal';
import { useJobs } from '@/hooks/useJobs';
import { Job } from '@/types/server/job.model';
import { motion, Variants } from 'framer-motion';
import { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';

interface WorkHistoryProps {
  jobs: Job[];
}

export default function WorkHistorySection({ jobs }: WorkHistoryProps) {
  const jobsViews = useJobs(jobs);
  const [selectedId, setSelectedId] = useState<string>('');
  const sectionVariants: Variants = {
    offscreen: {
      y: -100,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        bounce: 0.2,
        duration: 2,
      },
    },
  };

  return (
    <motion.section
      id="workHistory"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
      className="section-container relative overflow-y-hidden bg-gradient-to-b from-transparent to-secondary dark:to-white"
    >
      <h2 className="heading text-tertiary">Work history</h2>
      <motion.div className="body flex items-center justify-center">
        <div className="flex w-full flex-col flex-wrap gap-16">
          {jobsViews.map((item) => (
            <motion.div
              className="hover:cursor-pointer"
              layoutId={`card-container-${item._key}`}
              onClick={() => setSelectedId(item._key)}
              key={item._key}
              initial={{ scale: 1 }}
              animate={{ scale: selectedId === item._key ? 1.2 : 1 }} // Increase scale on selected card
              transition={{ duration: 0.3 }}
              whileHover={{ scaleY: 1.1 }}
            >
              <JobCard showDescription={false} job={item} />
            </motion.div>
          ))}
        </div>

        {selectedId && (
          <Modal>
            {jobsViews.map(
              (item) =>
                item._key === selectedId && (
                  <motion.div
                    className="relative max-h-[70vh] w-full overflow-y-auto rounded-lg"
                    layoutId={`card-container-${item._key}`}
                    key={item._key}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                  >
                    <Button
                      onClick={() => setSelectedId('')}
                      icon={RxCross2}
                      className="fixed right-2 top-10 rounded-full border-[1px] bg-white px-3 py-2 text-tertiary shadow transition-colors duration-300"
                    ></Button>
                    <JobCard job={item} />
                  </motion.div>
                ),
            )}
          </Modal>
        )}
      </motion.div>
    </motion.section>
  );
}
