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
      <HomeHero />
      <AboutUs />
      <Faq />
      <JoinUs />
      <Footer />
    </main>
  );
}
