import Link from 'next/link';

export default function About() {
  return (
    <section className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
      {/* Introdução */}
      <section
        className="mt-12 md:mt-20 lg:mt-24 xxl:mt-32"
        aria-labelledby="about-intro-title"
      >
        <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
          <h1
            id="about-intro-title"
            className="text-[26px] leading-[120%] font-medium text-[#35343C] md:text-[44px] xxl:text-[64px]"
          >
            Sobre nossa rede colaborativa
          </h1>

          <p className="mt-6 max-w-[720px] text-[14px] leading-[140%] text-[#5C5C65] md:text-[16px] xxl:text-[18px]">
            O TryCatch 4Match é uma rede colaborativa criada para conectar
            talentos a projetos reais, promovendo aprendizado prático, troca de
            conhecimento e desenvolvimento de soluções digitais em equipe. A
            plataforma reúne projetos de diferentes naturezas, talentos em
            diversos níveis de experiência e profissionais que atuam como
            mentores, criando um ambiente estruturado para colaboração, evolução
            técnica e participação em iniciativas reais.
          </p>
        </div>
      </section>

      {/* Seção 1 */}
      <section
        id="projetos"
        className="mt-20 scroll-mt-32 md:mt-28 xxl:mt-36"
        aria-labelledby="projetos-title"
      >
        <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
          <h2
            id="projetos-title"
            className="text-[22px] font-medium text-[#35343C] md:text-[32px] xxl:text-[48px]"
          >
            Projetos que ganham equipe
          </h2>

          <p className="mt-6 max-w-[860px] text-[14px] leading-[140%] text-[#5C5C65] md:text-[16px] xxl:text-[18px]">
            O TryCatch 4Match recebe projetos de diferentes naturezas, desde
            iniciativas educacionais até projetos profissionais. Pessoas ou
            empresas podem cadastrar projetos informando objetivos, prazos,
            tecnologias envolvidas e se o projeto é remunerado ou não. Os
            projetos são analisados para garantir alinhamento com a proposta da
            plataforma e, a partir disso, equipes colaborativas são formadas
            para desenvolver as soluções de forma organizada e transparente.
          </p>
          <br />

          <ul className="mt-4 list-disc pl-5 text-[#5C5C65]">
            <li>
              <Link
                href="/register-project"
                className="cursor-pointer hover:underline"
              >
                Cadastrar um projeto
              </Link>
            </li>
            <li>
              <Link href="/contact" className="cursor-pointer hover:underline">
                Quero mais informações
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Seção 2 */}
      <section
        id="equipes"
        className="mt-20 scroll-mt-32 md:mt-28 xxl:mt-36"
        aria-labelledby="equipes-title"
      >
        <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
          <h2
            id="equipes-title"
            className="text-[22px] font-medium text-[#35343C] md:text-[32px] xxl:text-[48px]"
          >
            Colaboração por habilidades
          </h2>

          <p className="mt-6 max-w-[860px] text-[14px] leading-[140%] text-[#5C5C65] md:text-[16px] xxl:text-[18px]">
            Os talentos podem se candidatar a projetos de acordo com suas
            habilidades, interesses e disponibilidade. As equipes se formam
            considerando as necessidades do projeto e as skills declaradas pelos
            participantes. A plataforma incentiva a colaboração entre talentos
            em diferentes níveis de experiência, com o apoio de mentores que
            acompanham o desenvolvimento técnico e organizacional dos projetos.
            Tecnologias, habilidades e papéis são definidos de forma clara para
            facilitar a colaboração e o aprendizado prático. A comunidade é
            aberta tanto para talentos em desenvolvimento quanto para
            profissionais experientes que desejam atuar como mentores e
            compartilhar conhecimento.
          </p>
          <br />

          <ul className="mt-4 list-disc pl-5 text-[#5C5C65]">
            <li>
              <Link
                href="/invite-request"
                className="cursor-pointer hover:underline"
              >
                Quero fazer parte da comunidade
              </Link>
            </li>
            <li>
              <Link href="portfolio" className="cursor-pointer hover:underline">
                Portfólios
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Seção 3 */}
      <section
        id="entrega"
        className="mt-20 scroll-mt-32 md:mt-28 xxl:mt-36"
        aria-labelledby="entrega-title"
      >
        <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
          <h2
            id="entrega-title"
            className="text-[22px] font-medium text-[#35343C] md:text-[32px] xxl:text-[48px]"
          >
            Da ideia até a entrega final
          </h2>

          <p className="mt-6 max-w-[860px] text-[14px] leading-[140%] text-[#5C5C65] md:text-[16px] xxl:text-[18px]">
            Os projetos no TryCatch 4Match seguem etapas de planejamento,
            execução e entrega adequadas ao seu contexto. Cada iniciativa é
            organizada para garantir clareza de objetivos, divisão de
            responsabilidades e acompanhamento ao longo do desenvolvimento.
            Mentores com experiência em diferentes áreas, como produto,
            desenvolvimento e qualidade, apoiam os times durante o processo,
            contribuindo para decisões mais conscientes e entregas consistentes.
            O foco é proporcionar uma experiência real de trabalho em equipe, do
            início à conclusão do projeto.
          </p>
          <br />

          <ul className="mt-4 list-disc pl-5 text-[#5C5C65]">
            <li>
              <Link
                href="/register-project"
                className="cursor-pointer hover:underline"
              >
                Cadastrar um projeto
              </Link>
            </li>
            <li>
              <Link href="/contact" className="cursor-pointer hover:underline">
                Quero mais informações
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </section>
  );
}
