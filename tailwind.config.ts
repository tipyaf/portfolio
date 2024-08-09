import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: 'rgba(51, 148, 242, 0.8)',
                secondary: 'rgba(242, 217, 51, 0.8)',
                tertiary: 'rgb(253, 101, 113, 1)'
            },
            boxShadow: {
                'portrait-start': '25px 11px 2px rgba(242, 217, 51, 0.8), 0 -3px 12px 0 #b4c9ea, 0 4px 4px transparent',
                'portrait-end': '3px 2px 10px rgb(255, 255, 255), 0 -3px 12px 0 #b4c9ea, 0 4px 4px transparent;'
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
