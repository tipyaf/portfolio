import { PortableTextBlock } from 'next-sanity';

export type ProfileType = {
  readonly _id: string;
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
  readonly socialLinks: SocialLinks[];
  readonly skills: string[];
  readonly _updatedAt: string;
};

// todo: move to clean
export type FullBio = { readonly title: string; readonly bio: PortableTextBlock[] };
export type SocialLinks = { readonly name: string; url: string; code: SocialLinkCode };

export enum SocialLinkCode {
  LKIN = 'LKIN',
  GHUB = 'GHUB',
}
