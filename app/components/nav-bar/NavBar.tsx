'use client';

import AnimatedPortrait from '@/app/components/utils/AnimatedPortrait';
import Button from '@/app/components/utils/Button';
import { motion, stagger, useAnimate } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BsCaretDown } from 'react-icons/bs';
import { FiDownloadCloud } from 'react-icons/fi';
import css from './NavBar.module.css';

export default function NavBar() {
  const [scroll, setScroll] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [scope, animate] = useAnimate();
  const items = ['Item 1', 'Item 2', 'Item 3'];
  const staggerList = stagger(0.1, { startDelay: 0.25 });

  // todo: dropdown component for menu (get out from here) + outside click close menu

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScroll(window.scrollY >= 90);
    });
  });

  useEffect(() => {
    animate(
      'ul',
      {
        width: openMenu ? 200 : 0,
        height: openMenu ? 200 : 0,
        opacity: openMenu ? 1 : 0,
      },
      {
        type: 'spring',
        bounce: 0,
        duration: 0.4,
      },
    );
    animate('li', openMenu ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.3, x: -50 }, {
      duration: 0.2,
      delay: openMenu ? staggerList : 0,
    });
  }, [openMenu, animate, staggerList]);

  return (
    <header
      className={`${css.navBar} fixed left-0 top-0 z-50 flex w-full items-center justify-center p-4`}
    >
      <nav
        className={`navBar flex w-full max-w-[550px] items-center justify-between rounded-full border border-white/20 bg-white/50 px-4 py-2 backdrop-blur-lg`}
      >
        <Link href="/">
          <Button>
            <AnimatedPortrait imageSize={50} />
          </Button>
        </Link>
        <div ref={scope} className="relative">
          <Button onClick={() => setOpenMenu(!openMenu)} icon={BsCaretDown} className="">
            Menu
          </Button>
          <ul
            role="menu"
            className="absolute top-[40px] flex w-0 flex-col justify-evenly rounded-2xl bg-white py-4 opacity-0 shadow-2xl"
          >
            {items.map((item, index) => (
              <motion.li
                key={index}
                className="cursor-pointer break-words p-3 transition-all duration-1000 hover:bg-stone-100"
              >
                <Button className="w-full text-left" href="">
                  {item}
                </Button>
              </motion.li>
            ))}
          </ul>
        </div>
        <Button
          className="flex h-10 items-center justify-center rounded-[62.5rem] bg-black px-4 py-2 font-medium text-white transition-colors duration-300 hover:bg-black/80"
          icon={FiDownloadCloud}
        >
          CV
        </Button>
      </nav>
    </header>
  );
}
