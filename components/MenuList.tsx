'use client';

import Button from '@/components/utils/Button';
import { ILink } from '@/types/client/link.model';

interface MenuListProps {
  items: ILink[];
}

export default function MenuList({ items }: MenuListProps) {
  return (
    <ul role="menu" className="flex h-full flex-col justify-evenly">
      {items.map((item, index) => (
        <li
          role="menuitem"
          key={index}
          className="flex h-full cursor-pointer items-center justify-center break-words p-3 text-center text-white transition-all duration-700 hover:scale-110 hover:bg-tertiary/95"
        >
          <Button className="w-full" href={item.href}>
            {item.label}
          </Button>
        </li>
      ))}
    </ul>
  );
}
