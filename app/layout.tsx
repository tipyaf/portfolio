import { getProfile } from '@/sanity/sanity.query';
import { GeneratedMetadataParamsProps } from '@/types/server/genarated-metadata-params-props';
import { ProfileType } from '@/types/server/profile.model';
import type { Metadata, ResolvingMetadata } from 'next';
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

export async function generateMetadata(
  _: GeneratedMetadataParamsProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // fetch data
  const profile: ProfileType = await getProfile();

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: profile.fullName,
    description: profile.shortBio,
    openGraph: {
      images: [profile.profileImage.image, ...previousImages],
    },
  };
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body className={`${raleway.className} ${cormorant.variable}`}>{children}</body>
    </html>
  );
}
