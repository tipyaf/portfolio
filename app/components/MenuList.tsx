'use client';

import Button from '@/app/components/utils/Button';
import { ILink } from '@/app/models/link.model';
import { motion } from 'framer-motion';

export default function MenuList() {
  const items: ILink[] = [
    {
      label: 'About me',
      href: '/#about',
    },
    {
      label: 'Work history',
      href: '/#workHistory',
    },
    {
      label: 'Get in touch',
      href: '/#contact',
    },
  ];
  return (
    <ul role="menu" className="flex h-full flex-col justify-evenly">
      {items.map((item, index) => (
        <motion.li
          key={index}
          className="flex h-full cursor-pointer items-center justify-center break-words p-3 text-center text-white transition-all duration-700 hover:scale-110 hover:bg-black/95"
        >
          <Button className="w-full" href={item.href}>
            {item.label}
          </Button>
        </motion.li>
      ))}
    </ul>
  );
}
