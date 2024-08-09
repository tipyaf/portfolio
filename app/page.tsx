"use client"

import {useCalculateYearsFromDate} from "@/app/hooks/useCalculateYearsFromDate";
import AnimText from "@/app/components/utils/AnimText";
import NavBar from "@/app/components/nav-bar/NavBar";
import ImageCursorFollower from "@/app/components/utils/ImageCursorFollower";
import {motion} from "framer-motion";

export default function Home() {
    const experience = useCalculateYearsFromDate('2016-09-01');
    const experienceText = `with ${experience} years of experience.`;
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <NavBar/>
            <section className='w-screen h-screen text-white text-4xl font flex'>
                <motion.div className="hidden md:block md:w-1/2 title p-12 portrait bg-cover bg-no-repeat"
                            initial={{
                                backgroundSize: '90%',
                                backgroundPosition: 'bottom right',
                                backgroundColor: 'rgba(250,250,250,0.8)'
                            }}
                            whileHover={{backgroundSize: '100%', backgroundColor: 'rgba(51,148,242,0.8)'}}
                ></motion.div>
                <div className="w-full md:w-1/2 p-12 flex flex-col justify-center bg-blue depth">
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <h1 className="md:sr-only">Hi, I'm Yannick Benchimol and I'm a <strong>Frontend developer</strong>
                    </h1>
                    <h2 className="md:sr-only text-yellow block">{experienceText}</h2>
                    <ImageCursorFollower className="hidden md:block">
                        <AnimText text="Hi, I'm Yannick Benchimol and I'm a Frontend developer" duration={1.5}/>
                        <AnimText className="text-yellow block" text={experienceText}
                                  duration={2.2}/>
                    </ImageCursorFollower>
                </div>
            </section>
        </main>
    );
}
