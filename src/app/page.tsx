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

      <div className="px-5 py-5 md:px-7 lg:px-6 xl:px-10 xxl:px-[39px]">
        <HomeHero />

        <AboutUs />
        {/* 
        <Faq />

        <JoinUs />

        <Footer />
         */}
      </div>
    </main>
  );
}
