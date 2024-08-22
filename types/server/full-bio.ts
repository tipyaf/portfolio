import { PortableTextBlock } from 'next-sanity';

export type FullBio = { readonly title: string; readonly bio: PortableTextBlock[] };
