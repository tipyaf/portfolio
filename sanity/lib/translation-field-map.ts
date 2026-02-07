export type FieldType = 'string' | 'text' | 'portableText' | 'skip';

export interface TranslationField {
  source: string;
  target: string;
  type: FieldType;
}

export const topLevelFields: TranslationField[] = [
  { source: 'fullName', target: 'fullName_fr', type: 'string' },
  { source: 'role', target: 'role_fr', type: 'string' },
  { source: 'shortBio', target: 'shortBio_fr', type: 'text' },
  { source: 'location', target: 'location_fr', type: 'string' },
  { source: 'headline', target: 'headline_fr', type: 'portableText' },
  { source: 'fullBio.title', target: 'fullBio_fr.title', type: 'string' },
  { source: 'fullBio.bio', target: 'fullBio_fr.bio', type: 'portableText' },
  { source: 'profileVideoId', target: 'profileVideoId_fr', type: 'skip' },
  { source: 'resumeURL', target: 'resumeURL_fr', type: 'skip' },
];

export const jobFields: TranslationField[] = [
  { source: 'role', target: 'role_fr', type: 'string' },
  { source: 'location', target: 'location_fr', type: 'string' },
  { source: 'description', target: 'description_fr', type: 'portableText' },
];

export const projectFields: TranslationField[] = [
  { source: 'name', target: 'name_fr', type: 'string' },
  { source: 'description', target: 'description_fr', type: 'portableText' },
  { source: 'image.alt', target: 'image.alt_fr', type: 'string' },
  { source: 'image2.alt', target: 'image2.alt_fr', type: 'string' },
  { source: 'url', target: 'url_fr', type: 'skip' },
];
