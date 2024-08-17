'use client';

import AnimText from '@/components/utils/AnimText';
import Button from '@/components/utils/Button';
import { useCalculateYearsFromDate } from '@/hooks/useCalculateYearsFromDate';
import { PortableText } from '@portabletext/react';
import { PortableTextBlock } from 'next-sanity';
import Image from 'next/image';

interface HomeSectionProps {
  userName: string;
  role: string;
  headline: PortableTextBlock[];
}

export default function HomeSection({ userName, role, headline }: HomeSectionProps) {
  const experience = useCalculateYearsFromDate('2016-09-01');
  const experienceText = `with ${experience} years of experience`;
  return (
    <section className="relative flex h-screen max-h-[1024px] min-h-[720px] w-full flex-col overflow-hidden bg-gradient-to-tl from-secondary via-white via-10% to-primary to-70%">
      {/*background shapes*/}
      <div className="absolute left-1/2 top-0 z-0 grid w-[120%] min-w-[900px] max-w-[2048px] -translate-x-1/2 grid-cols-1 grid-rows-1 lg:-top-[15%]">
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
              <AnimText text={`Hi, I'm ${userName} !`} duration={3} />
            </h1>
            <h2 className="max-w-2xl text-3xl">
              <AnimText className="mr-2 font-medium" text={role} duration={3} />
              <AnimText
                className="font-medium text-secondary"
                text={experienceText}
                duration={3.5}
              />
            </h2>
          </div>
          <div className="max-w-[40rem] text-center">
            {/*todo: configure bold in secondary color*/}
            <PortableText value={headline} />
          </div>
          <div className="mt-20 flex w-full justify-center">
            <Button className="rounded-full bg-tertiary px-10 py-4 text-xl font-bold" href="#about">
              Learn more
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
