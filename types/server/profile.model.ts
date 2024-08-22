import { FullBio } from '@/types/server/full-bio';
import { ImageServer } from '@/types/server/image-server.model';
import { Job } from '@/types/server/job.model';
import { Project } from '@/types/server/project.model';
import { SocialLink } from '@/types/server/social-link.model';
import { PortableTextBlock } from 'next-sanity';

export type ProfileType = {
  readonly _id: string;
  readonly _updatedAt: string;
  readonly fullName: string;
  readonly role: string;
  readonly headline: PortableTextBlock[];
  readonly profileImage: ImageServer;
  readonly profileVideoId: string;
  readonly shortBio: string;
  readonly email: string;
  readonly fullBio: FullBio;
  readonly location: string;
  readonly resumeURL: string;
  readonly socialLinks: SocialLink[];
  readonly skills: string[];
  readonly jobs: Job[];
  readonly projects: Project[];
};
