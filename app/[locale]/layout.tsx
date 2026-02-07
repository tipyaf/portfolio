import { routing } from '@/i18n/routing';
import { getProfile } from '@/sanity/sanity.query';
import { ProfileType } from '@/types/server/profile.model';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Raleway } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../globals.css';

const raleway = Raleway({ subsets: ['latin'], variable: '--font-raleway' });

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const profile: ProfileType = await getProfile();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const title = `Portfolio of ${profile.fullName} | ${profile.role}`;
  const description = profile.shortBio;

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      locale,
      alternateLocale: locale === 'en' ? 'fr' : 'en',
      title,
      description,
      url: locale === 'en' ? baseUrl : `${baseUrl}/fr`,
      siteName: `${profile.fullName} Portfolio`,
      images: [profile.profileImage.image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [profile.profileImage.image],
    },
    verification: {
      google: 'CpvTDgPE1Hdu5K3R4fYzYJxuN8dwjhzsNUXEQ985bY0',
    },
    alternates: {
      canonical: locale === 'en' ? baseUrl : `${baseUrl}/fr`,
      languages: {
        en: `${baseUrl}`,
        fr: `${baseUrl}/fr`,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className={raleway.className}>
        <NextIntlClientProvider>
          {children}
          <Analytics />
          <SpeedInsights />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
