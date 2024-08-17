import { PortableTextBlock } from 'next-sanity';

export type ProfileType = {
  readonly _id: string;
  readonly _updatedAt: string;
  readonly fullName: string;
  readonly role: string;
  readonly headline: PortableTextBlock[];
  readonly profileImage: {
    readonly alt: string;
    readonly image: string;
  };
  readonly profileVideoId: string;
  readonly shortBio: string;
  readonly email: string;
  readonly fullBio: FullBio;
  readonly location: string;
  readonly resumeURL: string;
  readonly socialLinks: SocialLink[];
  readonly skills: string[];
  readonly jobs: Job[];
};

// todo: move to clean
export type FullBio = { readonly title: string; readonly bio: PortableTextBlock[] };
export type SocialLink = { readonly name: string; url: string; code: SocialLinkCode };

export enum SocialLinkCode {
  LKIN = 'LKIN',
  GHUB = 'GHUB',
}

export interface Job {
  readonly company: {
    readonly name: string;
    readonly url?: string;
  };
  readonly jobType: string;
  readonly location: string;
  readonly date: {
    readonly start: string;
    readonly end?: string;
    readonly present?: boolean;
  };
  readonly role: string;
  readonly description: PortableTextBlock[];
}
