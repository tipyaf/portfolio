'use client';

import { IButton } from '@/app/models/button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps extends IButton {
  children: ReactNode;
  href?: string;
}

export default function Button({
  onClick,
  className = '',
  icon: Icon,
  children,
  href = '',
}: ButtonProps) {
  const classStyle = `btn ${className}`;
  const iconClasStyle = 'mr-2 inline';
  const scale = 0.85;
  const MotionLink = motion(Link);
  const link = (
    <MotionLink href={href} whileTap={{ scale }} className={className}>
      {Icon && <Icon className={iconClasStyle} />}
      {children}
    </MotionLink>
  );

  const button = (
    <motion.button onClick={onClick} whileTap={{ scale }} className={classStyle}>
      {Icon && <Icon className={iconClasStyle} />}
      {children}
    </motion.button>
  );

  return href ? link : button;
}
