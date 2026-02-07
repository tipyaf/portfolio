import { ImageServer } from '@/types/server/image-server.model';
import { PortableTextBlock } from 'next-sanity';

export interface Project {
  _key: string;
  name: string;
  name_fr?: string;
  image: ImageServer;
  image2?: ImageServer;
  url: string;
  url_fr?: string;
  description: PortableTextBlock;
  description_fr?: PortableTextBlock;
  technos: string[];
}
