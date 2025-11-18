import AboutUs from '@/components/layout/Home/AboutUs';
import Faq from '@/components/layout/Home/Faq';
import Footer from '@/components/layout/Home/Foooter';
import HomeHero from '@/components/layout/Home/HomeHero';
import { HomeNavBar } from '@/components/layout/Home/HomeNavBar';
import JoinUs from '@/components/layout/Home/JoinUs';

export default function HomePage() {
  return (
    <main>
      <HomeNavBar />

      <div className="mx-[20px] md:mx-[28px] lg:mx-[24px] xl:mx-[40px] xxl:mx-[40px]">
        <HomeHero />
        {/*
        <AboutUs />
        <Faq />
        <JoinUs />
        <Footer />
        */}
      </div>
    </main>
  );
}
