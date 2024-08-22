'use client';

import { LinksHeaderSection } from '@/components/LinksHeaderSection';
import { FullBio } from '@/types/server/full-bio';
import { SocialLink } from '@/types/server/social-link.model';
import { PortableText } from '@portabletext/react';
import { motion, Variants } from 'framer-motion';
import YouTube from 'react-youtube';

interface AboutProps {
  fullBio: FullBio;
  youtubeId: string;
  email: string;
  socialLinks: SocialLink[];
}

export default function AboutSection({ youtubeId, fullBio, email, socialLinks }: AboutProps) {
  const cardVariants: Variants = {
    offscreen: {
      opacity: 0,
      rotate: 2,
    },
    onscreen: {
      opacity: 1,
      rotate: -2,
      transition: {
        type: 'spring',
        bounce: 0.2,
        duration: 2,
      },
    },
  };
  return (
    <section id="about" className="section-container">
      <motion.div initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.3 }}>
        <motion.div
          className="mb-4 flex h-full flex-col items-center rounded-3xl bg-secondary/50 px-3 py-2 shadow-xl backdrop-blur-2xl dark:bg-white"
          variants={cardVariants}
        >
          <h2 className="heading self-start text-tertiary">About me</h2>
          <div className="relative flex max-w-[1000px] flex-col items-center justify-center gap-6 rounded px-5 py-4 text-tertiary">
            {!!youtubeId && (
              <div className="w-full overflow-hidden rounded-2xl">
                <YouTube className="youtubeContainer" videoId={youtubeId}></YouTube>
              </div>
            )}
            <article className="mt-3 w-full text-justify font-mono">
              <h3 className="font-sans text-2xl font-medium text-primary">{fullBio.title}</h3>
              <PortableText value={fullBio.bio} />
            </article>
          </div>
        </motion.div>
      </motion.div>

      <LinksHeaderSection email={email} socialLinksData={socialLinks} />
    </section>
  );
}
