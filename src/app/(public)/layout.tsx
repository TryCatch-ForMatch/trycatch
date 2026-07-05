import { HomeNavBar } from '@/components/shell/HomeNavBar';
import { Footer } from '@/components/shell/Footer';

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
