import { PortableTextBlock } from 'next-sanity';

export interface Job {
  readonly _key: string;
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