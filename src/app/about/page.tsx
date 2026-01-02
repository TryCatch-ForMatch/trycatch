import Footer from '@/components/layout/Home/Footer';
import { HomeNavBar } from '@/components/layout/Home/HomeNavBar';
import About from '@/components/layout/About/About';

export default function AboutPage() {
  return (
    <main>
      <HomeNavBar />

      <div className="px-5 py-5 md:px-7 lg:px-6 xl:px-10 xxl:px-[39px]">
        <About />

        <Footer />
      </div>
    </main>
  );
}
