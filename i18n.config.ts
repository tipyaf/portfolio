import { Language } from '@/types/client/language.model';
import { LanguageCode } from '@/types/server/language.enum';

export const languages: Language[] = [
  { id: LanguageCode.ENGLISH, title: 'English', flag: 'gb', isDefault: true },
  { id: LanguageCode.FRENCH, title: 'Français', flag: 'fr' },
];

export const i18n = {
  languages,
  base: languages.find((item) => item.isDefault)?.id,
};
