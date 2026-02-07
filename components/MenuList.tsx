'use client';

import Button from '@/components/utils/Button';
import { ILink } from '@/types/client/link.model';

interface MenuListProps {
  items: ILink[];
  activeHref?: string;
}

export default function MenuList({ items, activeHref }: MenuListProps) {
  return (
    <ul role="menu" className="flex h-full flex-col">
      {items.map((item, index) => {
        const isActive = activeHref === item.href;
        return (
          <li
            role="menuitem"
            key={index}
            className={`flex w-full cursor-pointer items-center gap-2 px-4 py-2.5 text-left text-sm transition-all duration-700 hover:bg-tertiary/95 ${
              isActive ? 'font-semibold text-primary' : 'text-white/80 hover:text-white'
            }`}
          >
            <Button className="w-full text-left" href={item.href}>
              {item.label}
            </Button>
            {isActive && <span className="ml-auto text-xs text-primary">●</span>}
          </li>
        );
      })}
    </ul>
  );
}
