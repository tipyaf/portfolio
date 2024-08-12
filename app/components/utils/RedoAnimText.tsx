'use client';
import { animate, motion, RepeatType, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export interface IRedoAnimTextProps {
  delay?: number;
  texts: string[];
  repeat?: number;
  repeatType?: RepeatType;
}

export default function RedoAnimText({
  delay,
  texts,
  repeat = Infinity,
  repeatType = 'reverse',
}: IRedoAnimTextProps) {
  const textIndex = useMotionValue(0);
  const baseText = useTransform(textIndex, (latest) => texts[latest] || '');
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => baseText.get().slice(0, latest));
  const updatedThisRound = useMotionValue(true);

  useEffect(() => {
    animate(count, 60, {
      type: 'tween',
      delay: delay,
      duration: 1,
      ease: 'easeIn',
      repeat: repeat,
      repeatType: repeatType,
      repeatDelay: 1,
      onUpdate(latest) {
        if (updatedThisRound.get() === true && latest > 0) {
          updatedThisRound.set(false);
        } else if (updatedThisRound.get() === false && latest === 0) {
          if (textIndex.get() === texts.length - 1) {
            textIndex.set(0);
          } else {
            textIndex.set(textIndex.get() + 1);
          }
          updatedThisRound.set(true);
        }
      },
    });
  });

  return <motion.span className="inline">{displayText}</motion.span>;
}
