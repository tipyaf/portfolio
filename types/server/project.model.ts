import { ImageServer } from '@/types/server/image-server.model';
import { PortableTextBlock } from 'next-sanity';

export interface Project {
  _key: string;
  name: string;
  image: ImageServer;
  image2?: ImageServer;
  url: string;
  description: PortableTextBlock;
  technos: string[];
}
