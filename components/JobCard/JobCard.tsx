'use client';
import Button from '@/components/utils/Button';
import { localize } from '@/lib/localize';
import { Job } from '@/types/server/job.model';
import { PortableText } from '@portabletext/react';
import { useTranslations } from 'next-intl';
import { PortableTextBlock } from 'next-sanity';
import { BiPlus } from 'react-icons/bi';

interface JobCardProps {
  job: Job;
  showDescription?: boolean;
  locale: string;
}

export default function JobCard({ job, showDescription = true, locale }: JobCardProps) {
  const t = useTranslations('workHistory');
  const role = localize(job, 'role', locale) as string;
  const location = localize(job, 'location', locale) as string;
  const description = localize(job, 'description', locale) as PortableTextBlock[];

  return (
    <div className="relative w-full rounded-lg bg-white p-4 shadow-lg dark:bg-tertiary">
      <div className="text-xl font-bold">{role}</div>
      {job.company?.url ? (
        <Button className="hover:underline" href={job.company.url} target={'_blank'}>
          {job.company.name}
        </Button>
      ) : (
        <div>{job.company.name}</div>
      )}
      <div className="text-sm font-light">
        {job.date.start} - {job.date?.present ? t('present') : job.date.end}
        <span className="ml-1">
          (<span className="inline-block first-letter:uppercase">{job.jobType}</span>)
        </span>
      </div>
      <div className="text-sm font-extralight">{location}</div>
      <div className="flex justify-end pt-2">
        {!showDescription && (
          <Button
            icon={BiPlus}
            className="rounded-full border-[1px] px-3 py-2 shadow transition-colors duration-300"
          ></Button>
        )}
      </div>

      {showDescription && description && (
        <div className="styled-list mt-2 min-h-0 overflow-hidden px-2">
          <PortableText value={description} />
        </div>
      )}
    </div>
  );
}
