import { HomeNavBar } from '@/components/layout/Home/HomeNavBar';
import Footer from '@/components/layout/Home/Footer';
import PublicProviders from '@/providers/public.provider';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PublicProviders>
      <HomeNavBar />
      {children}
      <Footer />
    </PublicProviders>
  );
}
