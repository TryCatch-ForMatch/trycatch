import type { Metadata } from 'next';
import About from '@/components/layout/About/About';

export const metadata: Metadata = {
  title: 'Sobre',
  description:
    'Conheça a proposta do TryCatch For Match: projetos reais, equipes multidisciplinares e entregas acompanhadas por mentores.',
};

export default function AboutPage() {
  return (
    <main>
      <div className="px-5 py-5 md:px-7 lg:px-6 xl:px-10 xxl:px-[39px]">
        <About />
      </div>
    </main>
  );
}
