'use client';

import MenuList from '@/components/MenuList';
import LanguageToggle from '@/components/nav-bar/LanguageToggle';
import AnimatedPortrait from '@/components/utils/AnimatedPortrait';
import Button from '@/components/utils/Button';
import Popover from '@/components/utils/Popover';
import { useTranslations } from 'next-intl';
import { BsCaretDown } from 'react-icons/bs';
import { FiDownloadCloud } from 'react-icons/fi';
import css from './NavBar.module.css';

interface NavBarProps {
  imageUrl: string;
  resumeUrl: string;
  locale: string;
}

export default function NavBar({ imageUrl, resumeUrl, locale }: NavBarProps) {
  const t = useTranslations('nav');
  return (
    <header
      className={`${css.navBar} pointer-events-none fixed left-0 top-0 z-30 flex w-full items-center justify-center p-4`}
    >
      <nav className="navBar pointer-events-auto flex w-full max-w-[550px] items-center justify-between rounded-full border border-white/20 bg-white/50 px-4 py-1 backdrop-blur-lg dark:bg-black/50">
        <Button href="/">
          <AnimatedPortrait src={imageUrl} imageSize={40} />
        </Button>
        <div className="flex items-center gap-2">
          <Popover label={t('menu')} icon={BsCaretDown} className="dark:text-white">
            <MenuList />
          </Popover>
          <LanguageToggle defaultLanguage={locale as 'en' | 'fr'} />
          <Button
            href={resumeUrl}
            download={true}
            className="flex h-10 items-center justify-center rounded-[62.5rem] bg-tertiary px-4 py-2 font-medium text-white transition-colors duration-300 hover:bg-tertiary/80"
            icon={FiDownloadCloud}
          >
            {t('cv')}
          </Button>
        </div>
      </nav>
    </header>
  );
}
