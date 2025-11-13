'use client';

import { useState } from 'react';
import { MoveRight } from 'lucide-react';
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
      pergunta: 'Qual o prazo médio para aprovação?',
      resposta: 'O prazo médio é de 3 dias úteis após o envio das informações.',
    },
    {
      pergunta: 'Posso editar meu projeto depois de enviado?',
      resposta: 'Sim, você pode editar até o momento da publicação final.',
    },
    {
      pergunta: 'Há custos para publicar?',
      resposta:
        'Não, a publicação é gratuita, mas há taxas para projetos premium.',
    },
  ];

  return (
    <section className="mt-20 w-full px-40">
      <div className="mb-20 flex justify-center">
        <h3 className="text-center text-[48px] font-medium">
          Tudo o que colocamos <br /> em prática
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Perguntas */}
        <div className="flex flex-col gap-4">
          {perguntas.map((item, index) => (
            <div
              key={index}
              onClick={() => setAtivo(index)}
              className={`flex cursor-pointer items-center justify-between rounded-3xl p-6 transition-colors ${
                ativo === index ? 'bg-[#35343C] text-white' : 'bg-[#D9D9ED]'
              }`}
            >
              <p className="text[16px] font-regular">{item.pergunta}</p>
              <MoveRight
                className={`transition-opacity ${
                  ativo === index ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Perguntas */}
        <div className="relative rounded-3xl bg-[#35343C] p-10">
          <Image
            src="/icon_faq_1.svg"
            alt="ColabWork"
            width={20}
            height={20}
            className="absolute top-8 right-6"
          />
          <p className="text-[24px] font-medium text-white">
            {perguntas[ativo].resposta}
          </p>
          <Image
            src="/icon_faq_2.svg"
            alt="ColabWork"
            width={80}
            height={80}
            className="absolute bottom-10"
          />
        </div>
      </div>
    </section>
  );
}
