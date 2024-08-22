import type { Metadata } from 'next';
import { Cormorant, Raleway } from 'next/font/google';
import './globals.css';

interface RootLayoutProps {
  children: React.ReactNode;
}

const raleway = Raleway({ subsets: ['latin'], variable: '--font-raleway' });
const cormorant = Cormorant({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cormorant',
});

export const metadata: Metadata = {
  title: 'Yannick Benchimol',
  description:
    'Experienced front-end developer with 8 years of experience in Angular, Vue.js, React, Nuxt.js, Next.js, and Node.js. Explore my portfolio to see innovative projects and high-performance web solutions tailored to your projects.',
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body className={`${raleway.className} ${cormorant.variable}`}>{children}</body>
    </html>
  );
}
