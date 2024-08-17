import AboutSection from '@/components/AboutSection';
import GetInTouchSection from '@/components/GetInTouchSection';
import HomeSection from '@/components/HomeSection';
import NavBar from '@/components/nav-bar/NavBar';
import Button from '@/components/utils/Button';
import WorkHistorySection from '@/components/WorkHistorySection';
import { getProfile } from '@/sanity/sanity.query';
import { ProfileType } from '@/types/server';

export default async function Page() {
  const profile: ProfileType = await getProfile();

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <NavBar resumeUrl={profile.resumeURL} imageUrl={profile.profileImage.image} />
        <HomeSection headline={profile.headline} role={profile.role} userName={profile.fullName} />
        <AboutSection
          email={profile.email}
          socialLinksData={profile.socialLinks}
          fullBio={profile.fullBio}
          youtubeId={profile.profileVideoId}
        />
        <WorkHistorySection
          email={profile.email}
          jobs={profile.jobs}
          socialLinksData={profile.socialLinks}
        />
        <GetInTouchSection email={profile.email} socialLinks={profile.socialLinks} />
      </main>
      <footer className="text bg-tertiary p-6 text-center text-sm font-light text-white">
        {new Date().getFullYear()} - Made with ❤️ and{' '}
        <Button className="underline underline-offset-2" href="https://nextjs.org/" target="_blank">
          Next JS
        </Button>
      </footer>
    </>
  );
}
