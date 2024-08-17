import { Job } from '@/types/server';

export function useJobs(jobs: Job[], locale = 'en'): Job[] {
  const formatDate = (date?: string) => {
    if (!date) {
      return '';
    }
    const d = new Date(date);
    return d.toLocaleString(locale, { year: 'numeric', month: 'short' });
  };

  return jobs.map((job) => ({
    ...job,
    date: {
      ...job.date,
      start: formatDate(job.date.start).toUpperCase(),
      end: formatDate(job.date.end).toUpperCase(),
    },
  }));
}
