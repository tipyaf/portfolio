import { sanityFetch } from '@/sanity/utils/sanity-fetch';
import { LanguageCode } from '@/types/server/language.enum';
import { ProfileType } from '@/types/server/profile.model';
import { groq } from 'next-sanity';

export const PROFILE_QUERY = (lang: LanguageCode): string => {
  return groq`*[_type == "profile" && language == '${lang}'][0] {
        "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
          language
        },
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
};

export async function getProfile(lang: LanguageCode = LanguageCode.ENGLISH): Promise<ProfileType> {
  return sanityFetch({ query: PROFILE_QUERY(lang), params: { lang } });
}
