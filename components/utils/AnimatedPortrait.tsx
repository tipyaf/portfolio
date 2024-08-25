'use client';

import { COLORS } from '@/tailwind.config';
import { AnimationProps, motion } from 'framer-motion';
import Image from 'next/image';

interface AnimatedPortraitProps {
  imageSize: number;
  backgroundColor?: string;
  initialBackgroundColor?: string;
  src: string;
}

export default function AnimatedPortrait({
  imageSize,
  src,
  initialBackgroundColor = COLORS.secondary,
  backgroundColor = COLORS.white,
}: AnimatedPortraitProps) {
  const motionContainer: AnimationProps = {
    initial: {
      backgroundColor: initialBackgroundColor,
      borderRadius: 20,
      scale: 0,
      opacity: 0,
    },
    animate: {
      scale: 1,
      backgroundColor: backgroundColor,
      opacity: 1,
      borderRadius: 9999,
    },
    transition: {
      duration: 1.5,
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
      duration: 1.5,
    },
  };
  return (
    <motion.div
      className="relative overflow-hidden shadow-portrait-start transition-box-shadow duration-1000 ease-linear hover:shadow-portrait-end"
      initial={motionContainer.initial}
      animate={motionContainer.animate}
      transition={motionContainer.transition}
      whileHover={{
        scale: 0.98,
        backgroundColor: initialBackgroundColor,
      }}
    >
      <motion.div
        className="relative"
        initial={motionImageContainer.initial}
        animate={motionImageContainer.animate}
        transition={motionImageContainer.transition}
        whileHover={{ scale: 1.1 }}
      >
        <Image
          className="rounded-full"
          src={src}
          priority={true}
          height={100}
          width={100}
          style={{ width: `${imageSize}px`, height: 'auto' }}
          alt="a happy developer"
        />
      </motion.div>
    </motion.div>
  );
}
