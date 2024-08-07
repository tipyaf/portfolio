"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TypewriterProps, useTypewriter } from "nextjs-simple-typewriter";

// Fonction de calcul de l'expérience
function calculateExperience() {
    const startWorking = new Date('2016-09-01');
    const today = new Date(); // Date actuelle

    // Calculer la différence en millisecondes
    const diffInMs = today - startWorking;

    // Définir les constantes
    const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25;

    // Convertir la différence en années et arrondir à la demi-année la plus proche
    const diffInYears = Math.round((diffInMs / MS_PER_YEAR) * 2) / 2;

    return diffInYears;
}

// Fonction de lissage linéaire
const lerp = (start: number, end: number) => start + (end - start) * 0.01;

export default function MainTitle() {
    const mainRef = useRef<HTMLDivElement>(null);
    const [currentX, setCurrentX] = useState(50);
    const [currentY, setCurrentY] = useState(50);

    // Variables pour stocker les positions cibles
    const [targetX, setTargetX] = useState(50);
    const [targetY, setTargetY] = useState(50);

    // Met à jour les positions cibles à chaque mouvement de souris
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (mainRef.current) {
                // Get the dimensions of the container
                const containerRect = mainRef.current.getBoundingClientRect();
                const containerWidth = containerRect.width;
                const containerHeight = containerRect.height;

                // Calculate the position in a percentage within the container
                const mousePositionInContainerX = ((e.clientX - containerRect.left) / containerWidth) * 100;
                const mousePositionInContainerY = ((e.clientY - containerRect.top) / containerHeight) * 100;

                // Set the target position
                setTargetX(mousePositionInContainerX);
                setTargetY(100 - mousePositionInContainerY); // Inverser Y pour le fond
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    // Utilise requestAnimationFrame pour un mouvement fluide
    useEffect(() => {
        let animationFrameId: number;
        const animate = () => {
            setCurrentX(prevX => lerp(prevX, targetX)); // 0.1 est le facteur de lissage
            setCurrentY(prevY => lerp(prevY, targetY)); // 0.1 est le facteur de lissage

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [targetX, targetY]);

    const typeWritterConfig: Omit<TypewriterProps, 'words'> = {
        loop: 1,
        delaySpeed: 0,
        typeSpeed: 50,
    }
    const [textExperience] = useTypewriter({
        ...typeWritterConfig,
        words: [`${calculateExperience()} years of experience`],
    });

    const [textHello] = useTypewriter({
        ...typeWritterConfig,
        words: ["Hi, I'm Yannick Benchimol"],
    });

    return (
        <motion.div
            ref={mainRef}
            className="title flex flex-col justify-center text-center"
            transition={{ ease: "easeInOut", duration: 0.75 }}
            style={{ backgroundPosition: `${currentX}% ${currentY}%` }}
        >
            <div className="text-1xl xl:text-3xl depth">{textHello}</div>
            <h1 className="text-5xl xl:text-8xl depth">FRONTEND DEVELOPER</h1>
            <div className="text-3xl xl:text-6xl font-light depth">{textExperience}</div>
        </motion.div>
    );
}
