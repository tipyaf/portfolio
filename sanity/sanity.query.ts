import { sanityFetch } from '@/sanity/utils/sanity-fetch';
import { ProfileType } from '@/types/server/profile.model';
import { groq } from 'next-sanity';

export const PROFILE_QUERY: string = groq`*[_type == "profile"][0] {
      _id,
      _updatedAt,
      fullName,
      fullName_fr,
      role,
      role_fr,
      headline,
      headline_fr,
      profileImage {alt, "image": asset->url},
      profileVideoId,
      profileVideoId_fr,
      shortBio,
      shortBio_fr,
      location,
      location_fr,
      fullBio,
      fullBio_fr,
      email,
      "resumeURL": resumeURL.asset->url,
      "resumeURL_fr": resumeURL_fr.asset->url,
      socialLinks[] {
        name,
        url,
        url_fr,
        code
      },
      skills,
      "jobs": jobs[] | order(date.start desc) {
        ...,
        location,
        location_fr,
        role,
        role_fr,
        description,
        description_fr
      },
      projects[] {
        ...,
        name,
        name_fr,
        url,
        url_fr,
        description,
        description_fr,
        image {
          alt,
          alt_fr,
          "image": asset->url
        },
        image2 {
          alt,
          alt_fr,
          "image": asset->url
        }
      }
    }`;

export async function getProfile(): Promise<ProfileType> {
  return sanityFetch({ query: PROFILE_QUERY });
}
