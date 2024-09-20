import { getProfile } from '@/sanity/sanity.query';
import { ProfileType } from '@/types/server/profile.model';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import './globals.css';

interface RootLayoutProps {
  children: React.ReactNode;
}

const raleway = Raleway({ subsets: ['latin'], variable: '--font-raleway' });

export async function generateMetadata(): Promise<Metadata> {
  const profile: ProfileType = await getProfile();

  return {
    title: `Portfolio of ${profile.fullName} | ${profile.role}`,
    description: profile.shortBio,
    openGraph: {
      images: [profile.profileImage.image],
    },
    verification: {
      google: 'CpvTDgPE1Hdu5K3R4fYzYJxuN8dwjhzsNUXEQ985bY0',
    },
  };
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
