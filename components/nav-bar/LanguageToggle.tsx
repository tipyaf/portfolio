'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';

type Language = 'en' | 'fr';

interface LanguageToggleProps {
  defaultLanguage: Language;
}

export default function LanguageToggle({ defaultLanguage }: LanguageToggleProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(defaultLanguage);
  const [announcement, setAnnouncement] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const handleToggle = (lang: Language) => {
    if (lang === selectedLanguage) return;
    setSelectedLanguage(lang);
    setAnnouncement(lang === 'en' ? 'Language changed to English' : 'Langue changée en français');
    router.replace(pathname, { locale: lang });
  };

  return (
    <>
      <div
        className="relative flex h-9 w-[60px] items-center rounded-full border border-white/20 bg-white/50 p-0.5 backdrop-blur-lg transition-all hover:border-white/40 dark:bg-black/50"
        role="group"
        aria-label="Language selector"
      >
        <motion.div
          className="absolute h-8 w-7 rounded-full bg-primary shadow-sm"
          initial={false}
          animate={{
            x: selectedLanguage === 'en' ? 2 : 30,
          }}
          transition={{
            type: 'spring',
            stiffness: 350,
            damping: 30,
          }}
        />

        <motion.button
          onClick={() => handleToggle('en')}
          whileTap={{ scale: 0.95 }}
          className={`relative z-10 flex h-8 w-7 items-center justify-center text-xs font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
            selectedLanguage === 'en' ? 'text-white' : 'text-tertiary dark:text-white/60'
          }`}
          aria-label="Switch to English"
          aria-pressed={selectedLanguage === 'en'}
        >
          EN
        </motion.button>

        <motion.button
          onClick={() => handleToggle('fr')}
          whileTap={{ scale: 0.95 }}
          className={`relative z-10 flex h-8 w-7 items-center justify-center text-xs font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
            selectedLanguage === 'fr' ? 'text-white' : 'text-tertiary dark:text-white/60'
          }`}
          aria-label="Passer en français"
          aria-pressed={selectedLanguage === 'fr'}
        >
          FR
        </motion.button>
      </div>

      <div role="status" aria-live="polite" className="sr-only">
        {announcement}
      </div>
    </>
  );
}
