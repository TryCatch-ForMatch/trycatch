import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from '@/components/ui/card';

export default function AboutUs() {
  return (
    <section id="aboutUs" className="mx-40 mt-20 h-screen">
      <div className="grid grid-cols-2">
        <div className="justify-self-start text-left">
          <p>Nossa Conexão</p>
        </div>

        <div className="justify-self-end text-right"></div>

        <div className="justify-self-start text-left">
          <div>
            <span className="text-5xl">Sobre nossa rede </span>
          </div>
          <div className="flex">
            <Image
              src="/IconsAboutUs.svg"
              alt="Equipe colaborando em um projeto"
              width={100}
              height={100}
              priority
              className="max-w-none"
            />
            <span className="text-5xl">colaborativa</span>
          </div>
        </div>

        <div className="justify-self-end text-justify">
          <p>
            Conexão entre talentos e projetos de <br /> forma ágil, permitindo
            equipes flexíveis e <br /> produtivas.
          </p>
        </div>

        <Card className="relative h-72 overflow-hidden rounded-2xl">
          {/* Fundo invertido */}
          <div className="absolute inset-0 scale-x-[-1] transform bg-[url('/BgCardAboutUs.jpg')] bg-cover bg-center bg-no-repeat" />

          {/* Conteúdo normal */}
          <div className="relative z-10 p-6">
            <CardTitle className="text-white">ColabWork</CardTitle>
          </div>
        </Card>
      </div>
    </section>
  );
}
