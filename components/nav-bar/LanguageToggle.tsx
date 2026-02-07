'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FiGlobe } from 'react-icons/fi';

const LOCALE_LABELS: Record<string, string> = {
  en: 'EN',
  fr: 'FR',
  es: 'ES',
  de: 'DE',
  it: 'IT',
  pt: 'PT',
  ja: 'JA',
  zh: 'ZH',
};

interface LanguageToggleProps {
  currentLocale: string;
}

export default function LanguageToggle({ currentLocale }: LanguageToggleProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  const locales = routing.locales;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (locale: string) => {
    if (locale === currentLocale) {
      setOpen(false);
      return;
    }
    setOpen(false);
    router.replace(pathname, { locale });
  };

  return (
    <div ref={ref} className="relative">
      <motion.button
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.9 }}
        className="flex h-9 items-center gap-1.5 rounded-full border border-white/20 bg-white/50 px-3 backdrop-blur-lg transition-colors hover:border-white/40 dark:bg-black/50 dark:text-white"
        aria-label="Change language"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <FiGlobe className="text-sm" />
        <span className="text-xs font-semibold">
          {LOCALE_LABELS[currentLocale] || currentLocale.toUpperCase()}
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="absolute right-0 top-[44px] z-50 min-w-[100px] overflow-hidden rounded-xl border border-white/20 bg-tertiary/90 shadow-2xl backdrop-blur-lg"
            role="listbox"
            aria-label="Select language"
          >
            {locales.map((locale) => (
              <motion.button
                key={locale}
                onClick={() => handleSelect(locale)}
                whileHover={{ backgroundColor: 'rgba(51,146,237,0.2)' }}
                whileTap={{ scale: 0.95 }}
                className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors ${
                  locale === currentLocale
                    ? 'font-semibold text-primary'
                    : 'text-white/80 hover:text-white'
                }`}
                role="option"
                aria-selected={locale === currentLocale}
              >
                <span className="font-medium">{LOCALE_LABELS[locale] || locale.toUpperCase()}</span>
                {locale === currentLocale && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto text-xs text-primary"
                  >
                    ●
                  </motion.span>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
