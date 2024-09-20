'use client';
import Button from '@/components/utils/Button';
import { Job } from '@/types/server/job.model';
import { PortableText } from '@portabletext/react';
import { BiPlus } from 'react-icons/bi';

interface JobCardProps {
  job: Job;
  showDescription?: boolean;
}

export default function JobCard({ job, showDescription = true }: JobCardProps) {
  return (
    <div className="relative w-full rounded-lg bg-white p-4 shadow-lg dark:bg-tertiary">
      <div className="text-xl font-bold">{job.role}</div>
      {job.company?.url ? (
        <Button className="hover:underline" href={job.company.url} target={'_blank'}>
          {job.company.name}
        </Button>
      ) : (
        <div>{job.company.name}</div>
      )}
      <div className="text-sm font-light">
        {job.date.start} - {job.date?.present ? 'Present' : job.date.end}
        <span className="ml-1">
          (<span className="inline-block first-letter:uppercase">{job.jobType}</span>)
        </span>
      </div>
      <div className="text-sm font-extralight">{job.location}</div>
      <div className="flex justify-end pt-2">
        {!showDescription && (
          <Button
            icon={BiPlus}
            className="rounded-full border-[1px] px-3 py-2 shadow transition-colors duration-300"
          ></Button>
        )}
      </div>

      {showDescription && (
        <div className="styled-list mt-2 min-h-0 overflow-hidden px-2">
          <PortableText value={job.description} />
        </div>
      )}
    </div>
  );
}
