import type { Metadata } from 'next';
import type { ComponentType, SVGProps } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Code2,
  FolderKanban,
  GraduationCap,
  Handshake,
  UserPlus,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Como participar do TryCatch',
  description:
    'Conheça as formas de participar do TryCatch contribuindo com a plataforma, cadastrando projetos, participando como membro ou atuando como mentor.',
};

type ParticipationPath = {
  id: string;
  title: string;
  description: string;
  detail: string;
  expectation: string;
  cta: string;
  href: string;
  isExternal?: boolean;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const participationPaths: ParticipationPath[] = [
  {
    id: 'open-source',
    title: 'Contribuir com a plataforma',
    description:
      'Participe da evolução técnica do TryCatch com código, documentação, testes ou melhorias de processo.',
    detail:
      'Este caminho é indicado para quem deseja colaborar diretamente com a própria plataforma TryCatch como projeto open source.',
    expectation:
      'Escolha um escopo claro, siga as diretrizes de contribuição e mantenha as mudanças alinhadas aos padrões do projeto.',
    cta: 'Quero contribuir com o código',
    href: 'https://github.com/TryCatch-ForMatch/trycatch/blob/develop/CONTRIBUTING.md',
    isExternal: true,
    icon: Code2,
  },
  {
    id: 'cadastrar-projeto',
    title: 'Cadastrar um projeto',
    description:
      'Publique sua ideia ou projeto e forme uma equipe para desenvolver de forma estruturada e colaborativa.',
    detail:
      'Este caminho é voltado a pessoas ou organizações que possuem uma demanda real e precisam organizar sua execução.',
    expectation:
      'Descreva objetivo, contexto, necessidades técnicas e responsabilidades para que a equipe possa ser formada com clareza.',
    cta: 'Quero cadastrar meu projeto',
    href: '/dashboard/team-projects/new',
    icon: FolderKanban,
  },
  {
    id: 'membro',
    title: 'Participar como membro',
    description:
      'Faça parte de equipes reais, aplique seus conhecimentos e desenvolva experiência prática em colaboração.',
    detail:
      'Este caminho é indicado para quem deseja integrar a comunidade e participar de projetos conforme suas habilidades.',
    expectation:
      'Mantenha seu perfil atualizado, comunique disponibilidade e contribua com entregas compatíveis com sua experiência.',
    cta: 'Quero participar de uma equipe',
    href: '/invite-request?role=USER',
    icon: Handshake,
  },
  {
    id: 'mentor',
    title: 'Participar como mentor',
    description:
      'Apoie equipes com orientação técnica, revisão de decisões e direcionamento para evolução dos projetos.',
    detail:
      'Este caminho é voltado a profissionais experientes que desejam orientar equipes e apoiar a qualidade técnica dos projetos.',
    expectation:
      'Atue com clareza, responsabilidade e respeito à autonomia das equipes, oferecendo apoio compatível com cada contexto.',
    cta: 'Quero orientar equipes',
    href: '/invite-request?role=MENTOR',
    icon: GraduationCap,
  },
];

const entryProfiles = [
  'Membro de equipe',
  'Mentor técnico',
  'Colaborador open source',
  'Autor de projeto',
];

export default function HowToJoinPage() {
  return (
    <main className="px-5 py-5 md:px-7 lg:px-6 xl:px-10 xxl:px-[39px]">
      <section
        aria-labelledby="how-to-join-title"
        className="mx-auto max-w-[1280px] rounded-2xl bg-[#EAEAEB] px-6 py-12 md:px-10 md:py-16 lg:px-16 lg:py-20 xxl:px-24 xxl:py-28"
      >
        <div className="max-w-[820px]">
          <p className="text-[12px] leading-[140%] font-medium tracking-normal text-[#3B38A0] md:text-[14px] xxl:text-[16px]">
            Jornada de entrada
          </p>

          <h1
            id="how-to-join-title"
            className="mt-4 text-[30px] leading-[120%] font-medium tracking-normal text-[#35343C] md:text-[48px] lg:text-[56px] xxl:text-[72px]"
          >
            Como participar do TryCatch
          </h1>

          <p className="mt-6 max-w-[760px] text-[16px] leading-[150%] text-[#5C5C65] md:text-[18px] xxl:text-[22px]">
            Escolha como deseja contribuir e desenvolva experiência prática com
            organização, processos e colaboração.
          </p>

          <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-[600px]">
              <p className="flex items-center gap-2 text-[13px] leading-[140%] font-medium text-[#3B38A0] md:text-[15px]">
                <UserPlus className="h-4 w-4" aria-hidden />
                Entrada por convite
              </p>

              <p className="mt-2 text-[14px] leading-[150%] text-[#5C5C65] md:text-[16px] xxl:text-[18px]">
                O acesso à plataforma acontece por convite. Envie sua
                solicitação e escolha o perfil de participação mais adequado.
              </p>
            </div>

            <Button
              asChild
              className="h-auto min-h-12 w-full rounded-full bg-[#3B38A0] px-5 py-3 text-[14px] leading-[120%] text-white hover:bg-[#3B38A0]/90 md:w-auto xxl:text-[16px]"
            >
              <Link href="/invite-request">
                <span>Solicitar convite</span>
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>

          <p className="mt-5 max-w-[760px] text-[14px] leading-[150%] text-[#5C5C65] md:text-[16px] xxl:text-[18px]">
            O TryCatch reúne diferentes formas de participação para quem deseja
            contribuir com a plataforma, propor projetos, integrar equipes ou
            apoiar outras pessoas como mentor.
          </p>

          <div className="mt-8 border-t border-[#D9D9ED] pt-8 md:mt-10 md:pt-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-[680px]">
                <h2 className="text-[22px] leading-[120%] font-medium tracking-normal text-[#35343C] md:text-[30px] xxl:text-[40px]">
                  Principais perfis de participação
                </h2>

                <p className="mt-4 text-[14px] leading-[150%] text-[#5C5C65] md:text-[16px] xxl:text-[18px]">
                  Você pode entrar como membro, mentor, colaborador da
                  plataforma ou autor de projeto. A solicitação de convite ajuda
                  a comunidade a entender seu melhor caminho de entrada.
                </p>
              </div>
            </div>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {entryProfiles.map((profile) => (
                <li
                  key={profile}
                  className="rounded-full bg-white px-4 py-3 text-center text-[13px] leading-[120%] font-medium text-[#35343C] ring-1 ring-[#D9D9ED] md:text-[14px]"
                >
                  {profile}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="choose-path-title"
        className="mx-auto mt-16 max-w-[1280px] md:mt-24 xxl:mt-32"
      >
        <div className="grid gap-5 lg:grid-cols-12">
          <div className="lg:col-start-2 lg:col-end-8">
            <h2
              id="choose-path-title"
              className="text-[26px] leading-[120%] font-medium tracking-normal text-[#35343C] md:text-[44px] xxl:text-[64px]"
            >
              Escolha seu caminho
            </h2>

            <p className="mt-5 max-w-[720px] text-[14px] leading-[150%] text-[#5C5C65] md:text-[16px] xxl:text-[18px]">
              Cada forma de participação foi pensada para um momento diferente
              da jornada. Compare as opções e avance pelo caminho mais alinhado
              ao que você deseja construir, aprender ou apoiar.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4 xxl:gap-6">
          {participationPaths.map((path) => {
            const Icon = path.icon;

            return (
              <Card
                key={path.id}
                className="min-h-[360px] justify-between rounded-2xl border-0 bg-white px-0 py-0 shadow-none ring-1 ring-[#EAEAEB] transition-colors hover:ring-[#D9D9ED]"
              >
                <CardHeader className="gap-5 px-6 pt-6">
                  <span
                    aria-hidden
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D9D9ED] text-[#3B38A0]"
                  >
                    <Icon className="h-6 w-6" />
                  </span>

                  <CardTitle className="text-[20px] leading-[120%] font-medium tracking-normal text-[#35343C] xxl:text-[24px]">
                    {path.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="max-h-none overflow-visible px-6">
                  <p className="text-[14px] leading-[150%] text-[#5C5C65] md:text-[15px] xxl:text-[16px]">
                    {path.description}
                  </p>
                </CardContent>

                <CardFooter className="px-6 pb-6">
                  <Button
                    asChild
                    className="h-auto min-h-11 w-full rounded-full bg-[#35343C] px-4 py-3 text-[13px] leading-[120%] text-white hover:bg-[#35343C]/90 xxl:text-[15px]"
                  >
                    <Link
                      href={path.href}
                      aria-label={`${path.cta}: acessar o fluxo de ${path.title}`}
                      target={path.isExternal ? '_blank' : undefined}
                      rel={path.isExternal ? 'noreferrer' : undefined}
                    >
                      <span>{path.cta}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>

      <section
        aria-labelledby="details-title"
        className="mx-auto mt-16 max-w-[1280px] md:mt-24 xxl:mt-32"
      >
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-start-2 lg:col-end-6">
            <h2
              id="details-title"
              className="text-[26px] leading-[120%] font-medium tracking-normal text-[#35343C] md:text-[44px] xxl:text-[64px]"
            >
              Entenda o que esperar de cada caminho
            </h2>

            <p className="mt-5 text-[14px] leading-[150%] text-[#5C5C65] md:text-[16px] xxl:text-[18px]">
              As formas de participação indicam responsabilidades diferentes
              dentro da plataforma. Escolha uma forma de entrada alinhada ao seu
              momento atual e ao tipo de experiência que deseja desenvolver.
            </p>
          </div>

          <div className="space-y-4 lg:col-start-6 lg:col-end-12">
            {participationPaths.map((path) => {
              const Icon = path.icon;

              return (
                <article
                  key={path.id}
                  id={path.id}
                  className="scroll-mt-28 rounded-2xl bg-[#F8F8FA] p-6 md:p-8"
                >
                  <div className="flex items-start gap-4">
                    <span
                      aria-hidden
                      className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3B38A0] text-white"
                    >
                      <Icon className="h-5 w-5" />
                    </span>

                    <div>
                      <h3 className="text-[20px] leading-[120%] font-medium tracking-normal text-[#35343C] md:text-[24px] xxl:text-[30px]">
                        {path.title}
                      </h3>

                      <p className="mt-3 text-[14px] leading-[150%] text-[#5C5C65] md:text-[16px]">
                        {path.detail}
                      </p>

                      <p className="mt-3 text-[14px] leading-[150%] text-[#5C5C65] md:text-[16px]">
                        {path.expectation}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="future-faq-title"
        className="mx-auto mt-16 max-w-[1280px] md:mt-24 xxl:mt-32"
      >
        <div className="rounded-2xl bg-[#D9D9ED] px-6 py-8 md:px-10 md:py-10 lg:px-16">
          <h2
            id="future-faq-title"
            className="text-[22px] leading-[120%] font-medium tracking-normal text-[#35343C] md:text-[32px] xxl:text-[44px]"
          >
            Dúvidas frequentes
          </h2>

          <p className="mt-4 max-w-[760px] text-[14px] leading-[150%] text-[#5C5C65] md:text-[16px] xxl:text-[18px]">
            Esta página está preparada para receber uma seção de perguntas
            frequentes sobre convites, projetos, participação como membro e
            atuação como mentor conforme a jornada evoluir.
          </p>
        </div>
      </section>
    </main>
  );
}
