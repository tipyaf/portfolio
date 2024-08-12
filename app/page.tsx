'use client';

import AboutSection from '@/app/components/AboutSection';
import HomeSection from '@/app/components/HomeSection';
import NavBar from '@/app/components/nav-bar/NavBar';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavBar />
      <HomeSection />
      <AboutSection />
    </main>
  );
}
