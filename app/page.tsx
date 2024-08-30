import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import HomeSection from '@/components/HomeSection';
import NavBar from '@/components/nav-bar/NavBar';
import Button from '@/components/utils/Button';
import WorkHistorySection from '@/components/WorkHistorySection';
import { getProfile } from '@/sanity/sanity.query';

import ProjectsSection from '@/components/ProjectsSection';
import { ProfileType } from '@/types/server/profile.model';

export default async function Page() {
  const profile: ProfileType = await getProfile();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: process.env.NEXT_PUBLIC_BASE_URL,
    name: `${profile.fullName} | ${profile.role}`,
    image: profile.profileImage.image,
    description: profile.fullBio,
    citation: profile.shortBio,
    about: `${profile.fullName}, ${profile.role} and their skills: ${profile.skills.join(',')}`,
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <NavBar resumeUrl={profile.resumeURL} imageUrl={profile.profileImage.image} />
        <HomeSection
          email={profile.email}
          socialLinks={profile.socialLinks}
          headline={profile.headline}
          role={profile.role}
          userName={profile.fullName}
        />
        <AboutSection
          email={profile.email}
          socialLinks={profile.socialLinks}
          fullBio={profile.fullBio}
          youtubeId={profile.profileVideoId}
        />
        <ProjectsSection projects={profile.projects} />
        <WorkHistorySection jobs={profile.jobs} />
        <ContactSection email={profile.email} socialLinks={profile.socialLinks} />
      </main>
      <footer className="text bg-tertiary p-6 text-center text-sm font-light text-white">
        {new Date().getFullYear()} - Made with ❤️ and{' '}
        <Button className="underline underline-offset-2" href="https://nextjs.org/" target="_blank">
          Next JS
        </Button>
      </footer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
