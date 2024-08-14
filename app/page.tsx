import AboutSection from '@/components/AboutSection';
import HomeSection from '@/components/HomeSection';
import NavBar from '@/components/nav-bar/NavBar';
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
          socialLinksData={profile.socialLinks}
          fullBio={profile.fullBio}
          youtubeId={profile.profileVideoId}
        />
      </main>
      <footer>footer</footer>
    </>
  );
}
