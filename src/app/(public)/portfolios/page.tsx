import Image from 'next/image';
import PortfolioPage from '.';

export default function Page() {
  return (
    <main>
      {/* Title section with background */}
      <section className="relative mx-auto max-w-7xl py-24">
        {/* Background wrapper (controls side margins) */}
        <div className="pointer-events-none absolute inset-0 -z-10 px-2 sm:px-4 md:px-6">
          <Image
            src="/bg-title.png"
            alt="Background degradê azul e rosa claro"
            fill
            className="rounded-3xl object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="mx-auto max-w-4xl px-2 text-center sm:px-4 md:px-6">
          <span className="block text-sm font-medium text-gray-500">
            Portfólios
          </span>

          <h1 className="mt-4 text-2xl leading-tight font-semibold text-gray-900 sm:text-3xl md:text-5xl">
            Conheça quem faz parte
            <br className="hidden sm:block" />
            da nossa rede
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-600 sm:mt-6 sm:text-base">
            Conheça os perfis de quem participa da comunidade
            <br className="hidden sm:block" />e contribui para o desenvolvimento
            dos projetos.
          </p>
        </div>
      </section>

      <PortfolioPage />
    </main>
  );
}
