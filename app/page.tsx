import HomeSection from "@/app/components/main-title/HomeSection";
import { YouTubeEmbed } from "@next/third-parties/google";
import "./components/main-title/HomeSection.module.css";

export default async function Home() {
  return (

      <main className="w-screen h-screen">
          <HomeSection/>
          <section id="about" className="w-full h-full flex flex-col items-center justify-center">
              <YouTubeEmbed videoid="ogfYd705cRs" height={400} />
          </section>
      </main>
  );
}