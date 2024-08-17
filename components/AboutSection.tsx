'use client';

import { LinksHeaderSection } from '@/components/LinksHeaderSection';
import { FullBio, SocialLink } from '@/types/server';
import { PortableText } from '@portabletext/react';
import YouTube from 'react-youtube';

interface AboutProps {
  fullBio: FullBio;
  youtubeId: string;
  socialLinksData: SocialLink[];
  email: string;
}

export default function AboutSection({ youtubeId, fullBio, socialLinksData, email }: AboutProps) {
  return (
    <section
      id="about"
      className="section-container relative rounded-b-3xl bg-gradient-to-br from-secondary to-white"
    >
      <LinksHeaderSection email={email} socialLinksData={socialLinksData} />
      <h2 className="heading text-tertiary">About me</h2>
      <div className="body flex justify-center">
        <div className="relative max-w-[500px] items-center justify-center gap-6 rounded-2xl px-5 py-4 text-tertiary">
          {!!youtubeId && (
            <div className="w-full overflow-hidden rounded-2xl">
              <YouTube className="youtubeContainer" videoId={youtubeId}></YouTube>
            </div>
          )}
          <article className="mt-3 w-full text-justify">
            <h3 className="text-2xl font-medium text-primary">{fullBio.title}</h3>
            <PortableText value={fullBio.bio} />
          </article>
        </div>
      </div>
    </section>
  );
}
