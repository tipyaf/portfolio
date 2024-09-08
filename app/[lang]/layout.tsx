import { getProfile } from '@/sanity/sanity.query';
import { ProfileType } from '@/types/server/profile.model';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Cormorant, Raleway } from 'next/font/google';
import '../globals.css';

interface RootLayoutProps {
  children: React.ReactNode;
  params: { lang: string };
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
    title: `Portfolio | ${profile.fullName} | ${profile.role}`,
    description: profile.shortBio,
    openGraph: {
      images: [profile.profileImage.image],
    },
    verification: {
      google: 'CpvTDgPE1Hdu5K3R4fYzYJxuN8dwjhzsNUXEQ985bY0',
    },
  };
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  return (
    <html lang={params.lang}>
      <body className={`${raleway.className} ${cormorant.variable}`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
