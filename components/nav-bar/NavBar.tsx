'use client';

import MenuList from '@/components/MenuList';
import AnimatedPortrait from '@/components/utils/AnimatedPortrait';
import Button from '@/components/utils/Button';
import Popover from '@/components/utils/Popover';
import { languages } from '@/i18n.config';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsCaretDown } from 'react-icons/bs';
import { FiDownloadCloud } from 'react-icons/fi';
import css from './NavBar.module.css';

interface NavBarProps {
  imageUrl: string;
  resumeUrl: string;
}

export default function NavBar({ imageUrl, resumeUrl }: NavBarProps) {
  const pathname = usePathname() ?? '';
  const [currentFlag, setCurrentFlag] = useState<string>('');

  useEffect(() => {
    const lang = pathname.split('/').pop() as string;
    const current = languages.find((l) => l.id === lang);
    if (current) {
      setCurrentFlag(getUnicodeFlagIcon(current.flag));
    }
  }, [pathname]);
  // todo: transaltions of menu
  //todo: responsive navbar
  return (
    <header
      className={`${css.navBar} pointer-events-none fixed left-0 top-0 z-30 flex w-full items-center justify-center p-4`}
    >
      <nav className="navBar pointer-events-auto flex w-full max-w-[550px] items-center justify-between rounded-full border border-white/20 bg-white/50 px-4 py-1 backdrop-blur-lg dark:bg-black/50">
        <div className="hidden w-1/3 md:flex">
          <Button href="/">
            <AnimatedPortrait src={imageUrl} imageSize={40} />
          </Button>
        </div>
        <div className="flex w-1/3 items-center justify-between gap-6 border-gray-200 border-opacity-20 px-2 md:gap-12 md:border-l md:border-r">
          <Popover label="Menu" icon={BsCaretDown} className="flex-row-reverse dark:text-white">
            <MenuList></MenuList>
          </Popover>
          {currentFlag && (
            <Popover label={currentFlag} className="text-2xl dark:text-white">
              <ul>
                {languages.map((lang) => (
                  <li
                    key={lang.id}
                    className="px-4 py-3 text-center text-white transition-all duration-700 hover:scale-110 hover:bg-tertiary/95"
                  >
                    <Link href={`/${lang.id}`} className="flex items-center justify-center">
                      <span className="mr-2 text-2xl">{getUnicodeFlagIcon(lang.flag)}</span>
                      {lang.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Popover>
          )}
        </div>
        <div className="flex w-1/3 justify-end">
          <Button
            href={resumeUrl}
            download={true}
            className="h-10 items-center justify-center rounded-[62.5rem] bg-tertiary px-4 py-2 font-medium text-white transition-colors duration-300 hover:bg-tertiary/80"
            icon={FiDownloadCloud}
          >
            CV
          </Button>
        </div>
      </nav>
    </header>
  );
}
