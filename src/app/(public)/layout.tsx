import { HomeNavBar } from '@/components/layout/Home/HomeNavBar';
import Footer from '@/components/layout/Home/Footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HomeNavBar />
      {children}
      <Footer />
    </>
  );
}
