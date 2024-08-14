'use client';

import { LinksHeaderSection } from '@/components/LinksHeaderSection';
import { FullBio, SocialLinks } from '@/types/server';
import { PortableText } from '@portabletext/react';
import YouTube from 'react-youtube';

interface AboutProps {
  fullBio: FullBio;
  youtubeId: string;
  socialLinksData: SocialLinks[];
}

export default function AboutSection({ youtubeId, fullBio, socialLinksData }: AboutProps) {
  return (
    <section id="about" className="section-container relative bg-secondary">
      <LinksHeaderSection socialLinksData={socialLinksData} />
      <h2 className="heading text-tertiary">About me</h2>
      <div className="body flex justify-center">
        <div className="max-w-[500px] items-center justify-center gap-6 rounded-2xl border border-gray-200 bg-white/50 px-5 py-4 text-tertiary shadow backdrop-blur-lg">
          {youtubeId && (
            <div className="w-full overflow-hidden">
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
