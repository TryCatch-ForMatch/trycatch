'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

//import icons
import { ArrowUpRight, Mouse } from 'lucide-react';

export default function HomeHero() {
  const { status } = useSession();

  return (
    <section className="mt-20 mr-30 ml-30">
      {/* Conteúdo principal */}
      <div className="flex flex-col items-center justify-center rounded-3xl bg-gradient-to-r from-[#e3f0ff] via-[#f8f5ff] to-[#ffeef5] p-10 text-center">
        <Image
          src="/heroText.svg"
          alt="Equipe colaborando em um projeto"
          width={500}
          height={500}
          priority
          className="max-w-none"
        />

        {status === 'unauthenticated' ? (
          <div className="mt-8">
            <Link href="./login">
              <Button className="rounded-full bg-[#35343C] py-5 pr-1 pl-6 text-lg shadow-md transition hover:bg-[#35343C]/90">
                <span className="mr-3">Faça login</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Button>
            </Link>
          </div>
        ) : (
          <div className="mt-8">
            <Link href="./login">
              <Button className="rounded-full bg-[#35343C] py-5 pr-1 pl-6 text-lg shadow-md transition hover:bg-[#35343C]/90">
                <span className="mr-3">Acesse o Dashboard</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Button>
            </Link>
          </div>
        )}

        {/* Ilustração central */}

        <div className="grid grid-cols-3">
          <div className="flex items-end">
            <p className="flex w-200 content-center justify-center text-justify">
              Uma rede colaborativa onde talentos <br />
              se unem a desafios para criar grandes projetos.
            </p>
          </div>

          <div className="mt-10 flex content-center justify-center">
            <Image
              src="/heroBackground.svg"
              alt="Equipe colaborando em um projeto"
              width={500}
              height={500}
              priority
              className="max-w-none"
            />
          </div>

          <div className="flex content-center items-end justify-center">
            <Mouse />
            <p> rolar para baixo</p>
          </div>
        </div>
      </div>
    </section>
  );
}
