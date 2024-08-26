import { type ClientConfig, createClient } from '@sanity/client';

const config: ClientConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: new Date().toISOString().slice(0, 10),
  useCdn: true,
};

const client = createClient(config);

export default client;
