'use client';

import NavBar from '@/app/components/nav-bar/NavBar';
import HomeSection from '@/app/components/home-section/HomeSection';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavBar />
      <HomeSection />
    </main>
  );
}
