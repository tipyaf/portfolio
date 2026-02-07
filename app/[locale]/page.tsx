import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import HomeSection from '@/components/HomeSection';
import NavBar from '@/components/nav-bar/NavBar';
import WorkHistorySection from '@/components/WorkHistorySection';
import { localize } from '@/lib/localize';
import { getProfile } from '@/sanity/sanity.query';

import ProjectsSection from '@/components/ProjectsSection';
import { FullBio } from '@/types/server/full-bio';
import { ProfileType } from '@/types/server/profile.model';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PortableTextBlock } from 'next-sanity';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('footer');
  const profile: ProfileType = await getProfile();

  const fullName = localize(profile, 'fullName', locale) as string;
  const role = localize(profile, 'role', locale) as string;
  const headline = localize(profile, 'headline', locale) as PortableTextBlock[];
  const shortBio = localize(profile, 'shortBio', locale) as string;
  const fullBio = localize(profile, 'fullBio', locale) as FullBio;
  const profileVideoId = localize(profile, 'profileVideoId', locale) as string;
  const resumeURL = localize(profile, 'resumeURL', locale) as string;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: process.env.NEXT_PUBLIC_BASE_URL,
    name: `${fullName} | ${role}`,
    image: profile.profileImage.image,
    description: fullBio,
    citation: shortBio,
    about: `${fullName}, ${role} and their skills: ${profile.skills.join(',')}`,
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <NavBar resumeUrl={resumeURL} imageUrl={profile.profileImage.image} locale={locale} />
        <HomeSection
          email={profile.email}
          socialLinks={profile.socialLinks}
          headline={headline}
          role={role}
          userName={fullName}
          locale={locale}
        />
        <AboutSection
          email={profile.email}
          socialLinks={profile.socialLinks}
          fullBio={fullBio}
          youtubeId={profileVideoId}
          locale={locale}
        />
        <ProjectsSection projects={profile.projects} locale={locale} />
        <WorkHistorySection jobs={profile.jobs} locale={locale} />
        <ContactSection email={profile.email} socialLinks={profile.socialLinks} locale={locale} />
      </main>
      <footer className="text bg-tertiary p-6 text-center text-sm font-light text-white">
        {new Date().getFullYear()} - {t('madeWith')}{' '}
        <a className="underline underline-offset-2" href="https://nextjs.org/" target="_blank">
          Next JS
        </a>
      </footer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
