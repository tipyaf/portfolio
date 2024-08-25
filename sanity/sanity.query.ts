import { ProfileType } from '@/types/server/profile.model';
import { groq } from 'next-sanity';
import client from './sanity.client';

export async function getProfile(): Promise<ProfileType> {
  return client.fetch(
    groq`*[_type == "profile"][0] {
      _id,
      _updatedAt,
      fullName,
      role,
      headline,
      profileImage {alt, "image": asset->url},
      profileVideoId,
      shortBio,
      location,
      fullBio,
      email,
      "resumeURL": resumeURL.asset->url,
      socialLinks,
      skills,
      "jobs": jobs[] | order(date.start desc),
      projects[] {
        ...,
        image {
          alt,
          "image": asset->url
        }
      }
    }`,
  );
}
