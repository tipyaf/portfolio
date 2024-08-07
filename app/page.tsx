import MainTitle from "@/app/components/main-title/main-title";
import "./components/main-title/main-title.css"

export default async function Home() {
  return (
      <main className="absolute w-screen h-screen">
        <section className="flex flex-col items-center justify-center h-full">
            <MainTitle />
        </section>
      </main>
  );
}