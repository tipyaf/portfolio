'use client';

import AnimText from '@/app/components/utils/AnimText';
import Button from '@/app/components/utils/Button';
import { useCalculateYearsFromDate } from '@/app/hooks/useCalculateYearsFromDate';
import Image from 'next/image';

export default function HomeSection() {
  const experience = useCalculateYearsFromDate('2016-09-01');
  const experienceText = `with ${experience} years of experience.`;

  return (
    <section className="relative flex h-screen max-h-[1024px] min-h-[720px] w-full flex-col overflow-hidden bg-primary text-white">
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
            I'm Yannick Benchimol and I'm a <strong>Frontend developer</strong> {experienceText}
          </h1>

          <div>
            <h1 className="max-w-5xl text-5xl">
              <AnimText text={"Hi, I'm Yannick Benchimol !"} duration={3} />
            </h1>
            <h2 className="max-w-2xl text-3xl">
              <AnimText
                className="mr-2 font-medium"
                text={"I'm a Frontend developer"}
                duration={3}
              />
              <AnimText
                className="font-medium text-secondary"
                text={experienceText}
                duration={3.5}
              />
            </h2>
          </div>
          <p className="max-w-[40rem] text-center">
            <strong className="text-secondary">Angular</strong>,
            <strong className="text-secondary">Vue.js</strong>,{' '}
            <strong className="text-secondary">Nuxt</strong>,{' '}
            <strong className="text-secondary">Next</strong>, and{' '}
            <strong className="text-secondary">React</strong> are my favorite playgrounds.
          </p>

          <div className="mt-20 flex w-full justify-center">
            <Button className="rounded-full bg-black px-10 py-5 text-2xl font-bold" href="#about">
              Learn more
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
