'use client';

import { IButton } from '@/types/client/button.model';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { HTMLAttributeAnchorTarget, ReactNode } from 'react';

interface ButtonProps extends IButton {
  children: ReactNode;
  href?: string;
  target?: HTMLAttributeAnchorTarget | undefined;
  download?: boolean;
}

export default function Button({
  onClick,
  className = '',
  icon: Icon,
  children,
  href = '',
  target,
  download = false,
}: ButtonProps) {
  const classStyle = `btn ${className}`;
  const iconClasStyle = 'mr-2 inline';
  const scale = 0.85;
  const MotionLink = motion(Link);

  const link = download ? (
    <motion.a href={`${href}?dl=`} whileTap={{ scale }} className={className}>
      {Icon && <Icon className={iconClasStyle} />}
      {children}
    </motion.a>
  ) : (
    <MotionLink href={href} whileTap={{ scale }} className={className} target={target}>
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
