import { getProfile } from '@/sanity/sanity.query';
import { ProfileType } from '@/types/server/profile.model';
import { Analytics } from '@vercel/analytics/next';
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

export async function generateMetadata(): Promise<Metadata> {
  const profile: ProfileType = await getProfile();

  return {
    title: profile.fullName,
    description: profile.shortBio,
    openGraph: {
      images: [profile.profileImage.image],
    },
  };
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${raleway.className} ${cormorant.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
