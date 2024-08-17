'use client';

import Button from '@/components/utils/Button';
import { SocialNetworkIconMap } from '@/constants/social-network-icon-map';
import { SocialLink } from '@/types/server';
import { SiMinutemailer } from 'react-icons/si';

interface GetInTouchSectionProps {
  socialLinks: SocialLink[];
  email: string;
}

export default function GetInTouchSection({ socialLinks, email }: GetInTouchSectionProps) {
  return (
    <section
      id="contact"
      className="section-container flex flex-col items-center justify-center bg-tertiary"
    >
      <h2 className="heading self-start text-white">Contact</h2>
      <div className="mt-24 w-full text-center">
        <Button
          className="rounded border border-white px-12 py-12 text-xl font-medium text-white"
          href={`mailto:` + email}
          icon={SiMinutemailer}
        >
          Get In Touch !
        </Button>
      </div>
      <div className="mt-48 flex w-full flex-wrap justify-around">
        {socialLinks.map((link, i) => (
          <Button
            key={`btnSLks_${i}`}
            className="text-5xl font-medium text-white"
            href={link.url}
            target="_blank"
            icon={SocialNetworkIconMap.get(link.code)}
          ></Button>
        ))}
      </div>
    </section>
  );
}
