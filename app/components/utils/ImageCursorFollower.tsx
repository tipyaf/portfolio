"use client";

import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import {useMovingBackground} from "@/app/hooks/useMovingBackground";

interface ImageCursorFollowerProps {
    children: React.ReactNode;
    className?: string;
}

// Linear interpolation function
const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

export default function ImageCursorFollower({children, className = ''}: Readonly<ImageCursorFollowerProps>) {
    const {mainRef, currentX, currentY, targetX, targetY, setCurrentX, setCurrentY} = useMovingBackground();

    const [isInitialAnimationDone] = useState(false);
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
    }, [isInitialAnimationDone, targetX, targetY, setCurrentX, setCurrentY]);

    return (
        <motion.div
            ref={mainRef}
            className={`${className} bg-baloon-effect p-2`}
            transition={{ease: "easeInOut", duration: 0.75}}
            style={{backgroundPosition: `${currentX}% ${currentY}%`}}
        >
            {children}
        </motion.div>
    );
}
