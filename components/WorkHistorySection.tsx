'use client';

import JobCard from '@/components/JobCard/JobCard';
import { LinksHeaderSection } from '@/components/LinksHeaderSection';
import { useJobs } from '@/hooks/useJobs';
import { Job, SocialLinks } from '@/types/server';

interface WorkHistoryProps {
  socialLinksData: SocialLinks[];
  jobs: Job[];
  email: string;
}

export default function WorkHistorySection({ socialLinksData, jobs, email }: WorkHistoryProps) {
  const jobsViews = useJobs(jobs);

  return (
    <section
      id="workHistory"
      className="section-container relative -mt-12 overflow-y-hidden shadow-none"
    >
      <LinksHeaderSection email={email} socialLinksData={socialLinksData} />
      <h2 className="heading text-tertiary">Work history</h2>
      <div id="workHistoryBody" className="body">
        <ul className="flex w-full flex-col gap-4">
          {jobsViews.map((job, i) => {
            return (
              <li key={`p_${i}`} className="flex items-center justify-center">
                <JobCard index={i} job={job} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
