'use client';

import MenuList from '@/components/MenuList';
import LanguageToggle from '@/components/nav-bar/LanguageToggle';
import AnimatedPortrait from '@/components/utils/AnimatedPortrait';
import Button from '@/components/utils/Button';
import Popover from '@/components/utils/Popover';
import { useTranslations } from 'next-intl';
import { FiDownloadCloud, FiMenu } from 'react-icons/fi';
import css from './NavBar.module.css';

interface NavBarProps {
  imageUrl: string;
  resumeUrl: string;
  locale: string;
}

const navBtnStyle =
  'flex h-9 items-center gap-1.5 rounded-full border border-white/20 bg-white/50 px-3 backdrop-blur-lg transition-colors hover:border-white/40 dark:bg-black/50 dark:text-white';

export default function NavBar({ imageUrl, resumeUrl, locale }: NavBarProps) {
  const t = useTranslations('nav');
  const tMenu = useTranslations('menu');
  const tAlt = useTranslations('alt');

  const menuItems = [
    { label: tMenu('about'), href: '/#about' },
    { label: tMenu('projects'), href: '/#projects' },
    { label: tMenu('workHistory'), href: '/#workHistory' },
    { label: tMenu('contact'), href: '/#contact' },
  ];

  return (
    <header
      className={`${css.navBar} pointer-events-none fixed left-0 top-0 z-30 flex w-full items-center justify-center p-4`}
    >
      <nav className="navBar pointer-events-auto flex w-full max-w-[550px] items-center justify-between rounded-full border border-white/20 bg-white/50 px-2 py-1 backdrop-blur-lg sm:px-4 dark:bg-black/50">
        <Button href="/">
          <AnimatedPortrait src={imageUrl} imageSize={40} altText={tAlt('portrait')} />
        </Button>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Popover icon={FiMenu} className={navBtnStyle} label={t('menu')} hideLabel>
            <MenuList items={menuItems} />
          </Popover>
          <LanguageToggle currentLocale={locale} />
          <Button
            href={resumeUrl}
            download={true}
            className={`${navBtnStyle} text-xs font-semibold`}
            icon={FiDownloadCloud}
          >
            <span className="hidden sm:inline">{t('cv')}</span>
          </Button>
        </div>
      </nav>
    </header>
  );
}
