"use client";

import {AnimationProps, motion} from "framer-motion";
import {useCalculateYearsFromDate} from "@/app/hooks/useCalculateYearsFromDate";
import AnimText from "@/app/components/utils/AnimText";
import Image from "next/image";

export default function HomeSection() {
    const experience = useCalculateYearsFromDate('2016-09-01');
    const experienceText = `with ${experience} years of experience.`;
    const imageSize = 400;
    const colors: Record<'primary' | 'secondary' | 'white', string> = {
        white: 'rgba(250,250,250,0.8)',
        primary: 'rgba(51,148,242,0.8)',
        secondary: 'rgba(242,217,51,0.8)',
    };
    const motionContainer: AnimationProps = {
        initial: {
            backgroundColor: colors.secondary,
            borderRadius: 20,
            scale: 0,
            opacity: 0,
        },
        animate: {
            scale: 1,
            backgroundColor: colors.white,
            opacity: 1,
            borderRadius: 9999,
        },
        transition: {
            duration: 1.5
        },
    };

    const motionImageContainer: AnimationProps = {
        initial: {
            translateY: 1000,
            translateX: -500,
        },
        animate: {
            translateY: 0,
            translateX: 0,
        },
        transition: {
            duration: 1.5
        },
    };

    return (
        <section className='w-screen h-screen text-white text-4xl font flex'>
            <div className="hidden md:w-1/2 md:flex justify-center items-center bg-primary">
                <motion.div
                    // transition duration-1000 ease-linear
                    className="relative overflow-hidden shadow-portrait-start hover:shadow-portrait-end transition-box-shadow ease-linear duration-1000"
                    initial={motionContainer.initial}
                    animate={motionContainer.animate}
                    transition={motionContainer.transition}
                    whileHover={{
                        scale: 0.98,
                        backgroundColor: colors.secondary,
                    }}
                >
                    <motion.div className="relative"
                                initial={motionImageContainer.initial}
                                animate={motionImageContainer.animate}
                                transition={motionImageContainer.transition}
                                whileHover={{scale: 1.1}}

                    >
                        <Image className="rounded-full" src="/portrait_Yannick_Benchimol.png" width={imageSize}
                               height={imageSize}
                               priority={true}
                               alt="a happy developer"/>
                    </motion.div>
                </motion.div>
            </div>
            <div className="w-full md:w-1/2 p-12 flex flex-col justify-center bg-primary">
                {/*only SEO*/}
                <h1 className="md:sr-only">
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    Hi, I'm Yannick Benchimol and I'm a <strong>Frontend developer</strong>
                </h1>
                <h2 className="md:sr-only text-secondary block">{experienceText}</h2>
                {/*visible part*/}
                <div className="hidden md:block">
                    <AnimText text="Hi, I'm Yannick Benchimol and I'm a Frontend developer"
                              duration={3}/>
                    <AnimText className="text-secondary block" text={experienceText}
                              duration={3.5}/>
                </div>
            </div>
        </section>
    );
}
