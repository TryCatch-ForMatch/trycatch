import AboutUs from '@/components/layout/Home/AboutUs';
import Faq from '@/components/layout/Home/Faq';
import HomeHero from '@/components/layout/Home/HomeHero';
import { HomeNavBar } from '@/components/layout/Home/HomeNavBar';

export default function HomePage() {
  return (
    <main>
      <HomeNavBar />
      <HomeHero />
      <AboutUs />
      <Faq />
    </main>
  );
}
