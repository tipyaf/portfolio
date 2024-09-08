import { LanguageCode } from '@/types/server/language.enum';

export interface Language {
  id: LanguageCode;
  title: string;
  isDefault?: boolean;
  flag: string;
}
