'use client';

import Button from '@/components/utils/Button';
import { SocialNetworkIconMap } from '@/constants/social-network-icon-map';
import { SocialLink } from '@/types/server/social-link.model';
import { SiMinutemailer } from 'react-icons/si';

interface ContactSectionProps {
  socialLinks: SocialLink[];
  email: string;
}

export default function ContactSection({ socialLinks, email }: ContactSectionProps) {
  return (
    <section id="contact" className="section-container -mt-16 flex flex-col bg-tertiary">
      <h2 className="heading self-start text-white">Contact</h2>
      <div className="mt-24 flex w-full flex-col items-center justify-center">
        <Button
          className="rounded border border-white px-12 py-12 text-xl font-medium text-white"
          href={`mailto:${email}`}
          icon={SiMinutemailer}
        >
          Get In Touch !
        </Button>
        <div className="mt-40 flex w-full flex-1 flex-wrap justify-around">
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
      </div>
    </section>
  );
}
