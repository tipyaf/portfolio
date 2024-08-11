import { ColorsTheme } from '@/app/models/colors-theme.model';
import type { Config } from 'tailwindcss';

export const COLORS: ColorsTheme = {
  white: 'rgb(255,255,255)',
  primary: 'rgb(51,146,237)',
  secondary: 'rgb(227,204,48)',
  tertiary: 'rgb(253, 101, 113, 1)',
};

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: COLORS.primary,
        secondary: COLORS.secondary,
        tertiary: COLORS.tertiary,
      },
      boxShadow: {
        'portrait-start': `10px 5px 2px ${COLORS.secondary}, 0 -3px 12px 0 #b4c9ea, 0 4px 4px transparent`,
        'portrait-end': `3px 2px 10px ${COLORS.white}, 0 -3px 12px 0 #b4c9ea, 0 4px 4px transparent;`,
      },
      transitionProperty: {
        'box-shadow': 'box-shadow',
      },
      transitionDuration: {
        '1000': '1000ms',
      },
    },
  },
  plugins: [],
};
export default config;
