'use client';

import { useState } from 'react';
import { MoveRight, MoveUp, MoveDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function FAQ() {
  const [ativo, setAtivo] = useState<number>(0);

  const perguntas = [
    {
      pergunta: 'Como posso cadastrar meu projeto na plataforma?',
      resposta:
        'Você pode cadastrar um projeto informando objetivos, prazos, tecnologias envolvidas e se a iniciativa é remunerada ou não. Após o envio, o projeto passa por uma análise de alinhamento com a proposta da plataforma.',
      link: {
        label: 'Cadastrar um projeto',
        href: '/cadastrarprojeto',
      },
    },
    {
      pergunta: 'Preciso pagar para participar ou cadastrar um projeto?',
      resposta:
        'Não. A participação na plataforma é aberta. Existem projetos educacionais e projetos profissionais, e as condições de cada iniciativa são definidas de forma transparente.',
    },
    {
      pergunta: 'Quem pode participar dos projetos?',
      resposta:
        'Qualquer pessoa interessada em colaborar pode participar, seja para aprender, contribuir tecnicamente ou atuar como mentor. A participação ocorre de acordo com habilidades, interesses e disponibilidade.',
      link: {
        label: 'Quero fazer parte da comunidade',
        href: '/fazerparte',
      },
    },
    {
      pergunta: 'Os projetos contam com acompanhamento ou mentoria?',
      resposta:
        'Sim. Os projetos podem contar com o apoio de mentores que auxiliam no planejamento, organização e desenvolvimento das soluções, promovendo uma experiência colaborativa e orientada.',
      link: {
        label: 'Quero fazer parte da comunidade',
        href: '/fazerparte',
      },
    },
  ];

  return (
    <section
      id="FAQ"
      className="mt-[150px] sm:mt-[284px] md:mt-[113px] lg:mt-[109px] xl:mt-36 xxl:mt-[199px]"
    >
      <div className="grid grid-cols-4 lg:grid-cols-12">
        <h3 className="col-span-4 text-[24px] leading-[120%] font-medium text-[#35343C] sm:text-[26px] md:text-[44px] lg:col-start-2 lg:col-end-8 xxl:text-[64px]">
          O que você precisa <br /> saber
        </h3>
      </div>

      {/* MOBILE + TABLET */}
      <div className="block lg:hidden">
        {/* Bloco superior */}
        <div className="relative mt-10 flex h-auto flex-col justify-between rounded-2xl bg-[#35343C] px-6 py-8 md:mt-16">
          <div className="flex">
            <p className="text-[14px] leading-[140%] font-medium text-[#D9D9ED] md:text-[16px]">
              {perguntas[ativo].pergunta}
            </p>
            <MoveUp className="h-5! w-5! stroke-3 text-[#D9D9ED]" />
          </div>

          <p className="mt-4 text-[14px] text-white md:text-[16px]">
            {perguntas[ativo].resposta}
          </p>

          <Image
            src="/icon_faq_2.svg"
            alt="ColabWork"
            width={57}
            height={25}
            className="mt-4 ml-auto hidden md:block"
          />
        </div>

        {/* Lista inferior */}
        <div className="mt-4 flex flex-col gap-4">
          {perguntas
            .filter((_, index) => index !== ativo)
            .map((item) => {
              const i = perguntas.findIndex(
                (p) => p.pergunta === item.pergunta
              );

              return (
                <div
                  key={i}
                  onClick={() => setAtivo(i)}
                  className="flex cursor-pointer items-center justify-between rounded-2xl bg-[#D9D9ED] px-6 py-5"
                >
                  <p className="text-[14px] leading-[140%] font-medium text-[#101014] md:text-[16px]">
                    {item.pergunta}
                  </p>
                  <MoveDown className="h-5! w-5! text-[#101014]" />
                </div>
              );
            })}
        </div>
      </div>

      {/* DESKTOP (lg+) */}
      <div className="hidden lg:block">
        <div className="mt-10 grid grid-cols-12 items-stretch gap-4">
          {/* Coluna esquerda – lista completa */}
          <div className="col-start-2 col-end-7">
            <div className="flex h-full flex-col justify-evenly gap-4">
              {perguntas.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setAtivo(index)}
                  className={`flex h-full cursor-pointer items-center justify-between rounded-[20px] px-6 py-5 transition-colors xxl:h-[104px] ${
                    ativo === index ? 'bg-[#35343C] text-white' : 'bg-[#D9D9ED]'
                  }`}
                >
                  <p className="flex h-auto w-[359px] items-center text-[16px] leading-[140%] font-medium xl:w-[417px] xxl:w-[471px] xxl:text-[18px]">
                    {item.pergunta}
                  </p>
                  <MoveRight
                    className={`h-5! w-5! transition-opacity xl:h-6! xl:w-6! xxl:h-8! xxl:w-8! ${
                      ativo === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Coluna direita – resposta */}
          <div className="col-start-7 col-end-12">
            <div className="relative flex min-h-[360px] flex-col justify-between rounded-[28px] bg-[#35343C] px-10 py-10 xl:min-h-[420px] xxl:min-h-[520px]">
              {/* Ícone superior decorativo */}
              <Image
                src="/icon_faq_1.svg"
                alt=""
                aria-hidden
                width={23}
                height={22}
                className="absolute top-9 right-9 xl:top-8 xl:right-8 xl:h-[34px]! xl:w-20! xxl:h-[68px]! xxl:w-[30px]!"
              />

              {/* ZONA SEGURA DO TEXTO */}
              <div className="mx-auto flex h-auto max-w-[80%] items-center px-6 py-12 xl:py-14 xxl:py-16">
                <div className="flex flex-col gap-4">
                  <p className="text-[20px] leading-[140%] font-medium text-white xl:text-[22px] xxl:text-[26px]">
                    {perguntas[ativo].resposta}
                  </p>

                  {perguntas[ativo].link && (
                    <Link
                      href={perguntas[ativo].link.href}
                      className="absolute right-8 bottom-8 inline-flex items-center gap-2 border-b border-transparent text-[14px] font-medium text-white opacity-90 transition-colors hover:border-white hover:opacity-100 xl:text-[16px]"
                    >
                      {perguntas[ativo].link.label}
                      <MoveRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
              {/* Ícone inferior decorativo */}
              <Image
                src="/icon_faq_2.svg"
                alt=""
                aria-hidden
                width={68}
                height={30}
                className="absolute bottom-9 left-9 xl:h-[34px]! xl:w-20! xxl:h-[47px]! xxl:w-[110px]!"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
