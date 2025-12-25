import AboutUs from '@/components/layout/Home/AboutUs';
import Faq from '@/components/layout/Home/Faq';
import Footer from '@/components/layout/Home/Footer';
import Hero from '@/components/layout/Home/Hero';
import { HomeNavBar } from '@/components/layout/Home/HomeNavBar';
import JoinUs from '@/components/layout/Home/JoinUs';

export default function HomePage() {
  return (
    <main>
      <HomeNavBar />

      <div className="px-5 py-5 md:px-7 lg:px-6 xl:px-10 xxl:px-[39px]">
        <Hero />

        <AboutUs />

        <Faq />

        <JoinUs />
        <Footer />
      </div>
    </main>
  );
}
