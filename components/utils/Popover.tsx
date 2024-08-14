'use client';

import Button from '@/components/utils/Button';
import { stagger, useAnimate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { useOnClickOutside } from 'usehooks-ts';

interface Popover {
  children: React.ReactNode;
  className?: string;
  icon?: IconType;
  label?: string;
}

export default function Popover({ children, className, label, icon }: Popover) {
  const [open, setOpen] = useState(false);
  const [scope, animate] = useAnimate();
  const popoverContainerId = 'popoverContainer';
  const popoverContentId = 'popoverContent';
  const staggerList = stagger(0.1, { startDelay: 0.25 });
  const size = 200;

  useOnClickOutside(scope, () => setOpen(false));

  useEffect(() => {
    animate(
      `#${popoverContainerId}`,
      {
        width: size,
        height: open ? size : 0,
        opacity: open ? 1 : 0,
      },
      {
        type: 'spring',
        bounce: 0,
        duration: 0.4,
      },
    );
    animate(
      `#${popoverContentId}`,
      open ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.3, y: -50 },
      {
        duration: 0.2,
        delay: open ? staggerList : 0,
      },
    );
  }, [open, animate, staggerList]);
  return (
    <div ref={scope} className="relative">
      <Button onClick={() => setOpen(!open)} icon={icon} className={className}>
        {label}
      </Button>
      <div
        id={popoverContainerId}
        style={{ left: `-${size / 4}px` }}
        className="absolute top-[40px] w-0 overflow-y-auto rounded-2xl bg-tertiary/85 py-4 opacity-0 shadow-2xl backdrop-blur-lg"
      >
        <div className="h-full" id={popoverContentId}>
          {children}
        </div>
      </div>
    </div>
  );
}
