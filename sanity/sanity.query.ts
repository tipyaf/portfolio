import { sanityFetch } from '@/sanity/utils/sanity-fetch';
import { ProfileType } from '@/types/server/profile.model';
import { groq } from 'next-sanity';

export const PROFILE_QUERY: string = groq`*[_type == "profile"][0] {
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
    }`;

export async function getProfile(): Promise<ProfileType> {
  return sanityFetch({ query: PROFILE_QUERY });
}
