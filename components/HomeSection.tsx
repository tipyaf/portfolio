'use client';

import { LinksHeaderSection } from '@/components/LinksHeaderSection';
import AnimText from '@/components/utils/AnimText';
import Button from '@/components/utils/Button';
import { useCalculateYearsFromDate } from '@/hooks/useCalculateYearsFromDate';
import { SocialLink } from '@/types/server/social-link.model';
import { PortableText } from '@portabletext/react';
import { PortableTextBlock } from 'next-sanity';
import Image from 'next/image';

interface HomeSectionProps {
  userName: string;
  role: string;
  headline: PortableTextBlock[];
  email: string;
  socialLinks: SocialLink[];
}

export default function HomeSection({
  userName,
  role,
  headline,
  email,
  socialLinks,
}: HomeSectionProps) {
  const experience = useCalculateYearsFromDate('2016-09-01');
  const experienceText = `with ${experience} years of experience`;
  return (
    <section className="bg-gradient-to-tb relative flex h-screen max-h-screen min-h-[720px] w-full flex-col overflow-hidden bg-gradient-to-b from-primary via-50% to-transparent">
      {/*background shapes*/}
      <div className="absolute left-1/2 top-0 z-0 grid h-screen w-[120%] min-w-[900px] max-w-[2048px] -translate-x-1/2 grid-cols-1 grid-rows-1 lg:-top-0">
        <Image
          className="rotate-shapes h-full w-full"
          src="/sweety-shapes.svg"
          alt="background shapes"
          width={300}
          height={300}
        />
      </div>

      {/*content*/}
      <div className="flex h-full p-4">
        <div className="relative flex w-full flex-1 flex-col items-center justify-center gap-6 text-center text-white">
          {/*only SEO*/}
          <h1 className="sr-only">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            I'm {userName} and I'm a <strong>{role}</strong> {experienceText}
          </h1>

          <div>
            <h1 className="max-w-5xl text-5xl">
              <AnimText text={`Hi, I'm ${userName} !`} duration={2} />
            </h1>
            <h2 className="max-w-2xl text-3xl">
              <AnimText className="mr-2 font-medium" text={role} duration={2} />
              <AnimText
                className="font-medium text-secondary"
                text={experienceText}
                duration={2.5}
              />
            </h2>
          </div>
          <div className="max-w-[40rem] text-center">
            <PortableText value={headline} />
          </div>
          <div className="mt-20 flex w-full justify-center">
            <Button className="rounded-full bg-tertiary px-10 py-4 text-xl font-bold" href="#about">
              Learn more
            </Button>
          </div>
        </div>
      </div>
      <LinksHeaderSection email={email} socialLinksData={socialLinks} />
    </section>
  );
}
