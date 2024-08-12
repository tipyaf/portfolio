'use client';

import MenuList from '@/app/components/MenuList';
import AnimatedPortrait from '@/app/components/utils/AnimatedPortrait';
import Button from '@/app/components/utils/Button';
import Popover from '@/app/components/utils/Popover';
import { BsCaretDown } from 'react-icons/bs';
import { FiDownloadCloud } from 'react-icons/fi';
import css from './NavBar.module.css';

export default function NavBar() {
  return (
    <header
      className={`${css.navBar} fixed left-0 top-0 z-50 flex w-full items-center justify-center p-4`}
    >
      <nav className="navBar flex w-full max-w-[550px] items-center justify-between rounded-full border border-white/20 bg-white/50 px-4 py-1 backdrop-blur-lg">
        <Button href="/">
          <AnimatedPortrait imageSize={40} />
        </Button>
        <Popover label="Menu" icon={BsCaretDown}>
          <MenuList></MenuList>
        </Popover>
        <Button
          className="flex h-10 items-center justify-center rounded-[62.5rem] bg-tertiary px-4 py-2 font-medium text-white transition-colors duration-300 hover:bg-tertiary/80"
          icon={FiDownloadCloud}
        >
          CV
        </Button>
      </nav>
    </header>
  );
}
