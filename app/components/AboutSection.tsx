import { LinksHeaderSection } from '@/app/components/LinksHeaderSection';
import YouTube from 'react-youtube';

export default function AboutSection() {
  const ytId = 'EGjTTjAVWRs';
  return (
    <section id="about" className="section-container relative bg-secondary">
      <LinksHeaderSection />
      <h2 className="heading text-tertiary">About me</h2>
      <div className="body flex justify-center">
        <div className="max-w-[500px] items-center justify-center gap-6 rounded-2xl border border-gray-200 bg-white/50 px-5 py-4 text-tertiary shadow backdrop-blur-lg">
          <div className="w-full overflow-hidden">
            <YouTube className="youtubeContainer" videoId={ytId}></YouTube>
          </div>
          <article className="mt-3 w-full text-justify">
            <h3 className="text-2xl font-medium text-primary">A little title</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab ad animi aperiam,
              architecto atque autem, beatae cum cumque debitis delectus dicta dolorem ducimus earum
              eligendi, ex excepturi facere facilis fugiat harum illo ipsam itaque iure labore
              maiores molestias nulla optio pariatur possimus provident quaerat quos repudiandae
              sapiente totam ullam vel veritatis? Consequuntur eaque enim, et eveniet facilis id
              laborum, libero magni minima nobis quibusdam soluta tempora tenetur unde voluptate?
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
