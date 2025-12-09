'use client';

import { useState } from 'react';
import { MoveRight, MoveUp, MoveDown } from 'lucide-react';
import Image from 'next/image';

export default function FAQ() {
  const [ativo, setAtivo] = useState<number>(0);

  const perguntas = [
    {
      pergunta: 'Como posso cadastrar meu projeto na plataforma?',
      resposta:
        'Você precisa falar com um de nossos devs e passar infos como prazo, empresa e tecnologias do projeto.',
    },
    {
      pergunta: 'Pergunta 2',
      resposta: 'Resposta 1.',
    },
    {
      pergunta: 'Pergunta 3',
      resposta: 'Resposta 2.',
    },
    {
      pergunta: 'Pergunta 4',
      resposta: 'Resposta 3.',
    },
  ];

  return (
    <section
      id="FAQ"
      className="mt-[284px] md:mt-[113px] lg:mt-[109px] xl:mt-36 xxl:mt-[199px]"
    >
      <div className="grid grid-cols-4 lg:grid-cols-12">
        <h3 className="col-span-4 text-[26px] leading-[120%] font-medium text-[#35343C] md:text-[44px] lg:col-start-2 lg:col-end-8 xxl:text-[64px]">
          Tudo o que colocamos <br /> em prática
        </h3>
      </div>

      {/* MOBILE + TABLET */}
      <div className="block lg:hidden">
        {/* Bloco superior */}
        <div className="relative mt-10 flex h-[204px] flex-col justify-center rounded-2xl bg-[#35343C] p-6 md:mt-16">
          <div className="flex">
            <p className="text-[14px] leading-[140%] font-medium text-[#D9D9ED] md:text-[16px]">
              {perguntas[ativo].pergunta}
            </p>
            <MoveUp className="h-5! w-5! stroke-3 text-[#D9D9ED]" />
          </div>

          <p className="mt-4 text-[14px] leading-[140%] text-white md:text-[16px]">
            {perguntas[ativo].resposta}
          </p>

          <Image
            src="/icon_faq_2.svg"
            alt="ColabWork"
            width={57}
            height={25}
            className="mt-4 ml-auto"
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
            <div className="flex h-full flex-col gap-4">
              {perguntas.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setAtivo(index)}
                  className={`flex h-auto cursor-pointer items-center justify-between rounded-[20px] px-6 py-5 transition-colors xxl:h-[104px] ${
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
            <div className="relative flex h-full rounded-[28px] bg-[#35343C] px-[34px] pt-[55px] pb-[34px] xl:px-10 xl:pt-16 xl:pb-10 xxl:px-[55px] xxl:pt-[88px] xxl:pb-[55px]">
              <Image
                src="/icon_faq_1.svg"
                alt="ColabWork"
                width={23}
                height={22}
                className="absolute top-[13%] right-[9%] xl:top-[13%] xl:right-[0%] xl:h-[34px] xl:w-20! xxl:right-[5%] xxl:h-[68px]! xxl:w-[30px]!"
              />

              <p className="h-[136px] w-[379px] text-[24px] font-medium text-white xl:w-[442px] xxl:w-[608px] xxl:text-[34px]">
                {perguntas[ativo].resposta}
              </p>

              <Image
                src="/icon_faq_2.svg"
                alt="ColabWork"
                width={68}
                height={30}
                className="absolute top-[80%] xl:h-[34px]! xl:w-20! xxl:h-[47px]! xxl:w-[110px]!"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
