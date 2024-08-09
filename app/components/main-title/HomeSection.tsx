"use client";

import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import {useCalculateYearsFromDate} from "@/app/hooks/useCalculateYearsFromDate";
import {useMovingBackground} from "@/app/hooks/useMovingBackground";
import AnimText from "@/app/components/utils/AnimText";
import {LuArrowDownCircle} from "react-icons/lu";
import css from './HomeSection.module.css';

// Linear interpolation function
const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

export default function HomeSection() {
    const experience = useCalculateYearsFromDate('2016-09-01');
    const {mainRef, currentX, currentY, targetX, targetY, setCurrentX, setCurrentY} = useMovingBackground();

    const [isInitialAnimationDone] = useState(false);
    const textHello = "Hi, I'm Yannick Benchimol";
    const textExperience = `${experience} years of experience`;

    // Handle animation based on mouse movement after the initial animation
    useEffect(() => {
        if (isInitialAnimationDone) {
            let animationFrameId: number;

            const animate = () => {
                setCurrentX(prevX => lerp(prevX, targetX, 0.01));
                setCurrentY(prevY => lerp(prevY, targetY, 0.02));

                animationFrameId = requestAnimationFrame(animate);
            };
            animate();


            return () => {
                cancelAnimationFrame(animationFrameId);
            };
        }
    }, [isInitialAnimationDone, targetX, targetY]);

    return (
        <section className="flex flex-col items-center justify-center h-full">
            <motion.div
                ref={mainRef}
                className={`${css.title} flex flex-col justify-center text-center`}
                transition={{ease: "easeInOut", duration: 0.75}}
                style={{backgroundPosition: `${currentX}% ${currentY}%`}}
            >
                <h1 className="sr-only">frontend developper</h1>
                <AnimText className="text-1xl xl:text-3xl depth" duration={1} text={textHello}/>
                <AnimText className="text-5xl xl:text-8xl font-extrabold depth uppercase" duration={2}
                          text="front developer"/>
                <AnimText className="text-3xl xl:text-6xl font-light depth" duration={2.5} text={textExperience}/>
                <div className=" flex justify-around gap-2 p-14">
                    <motion.a className="btn text-3xl mt-10"
                              href="#about"
                              whileTap={{scale: 0.85, color: 'var(--primary-500)'}}
                              animate={{opacity: 1, transition: {delay: 2.5}}}
                              initial={{opacity: 0.5, color: 'var(--tertiary-500)'}}>
                        <LuArrowDownCircle/>
                    </motion.a>
                </div>
                {/*whileHover={{ scale: 1.5 }}*/}
            </motion.div>
        </section>
    );
}
