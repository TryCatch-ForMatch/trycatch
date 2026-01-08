import { HomeNavBar } from '@/components/layout/Home/HomeNavBar';
import Footer from '@/components/layout/Home/Footer';
import { InviteRequestForm } from '@/components/form/InviteRequest/InviteRequestForm';

export default function InviteRequestPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <HomeNavBar />

      <section className="flex flex-1 items-center justify-center px-5 py-10 md:px-7 lg:px-6 xl:px-10">
        <div className="flex w-full max-w-6xl flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <header className="flex w-full flex-col gap-3 text-center lg:max-w-xl lg:text-left">
            <h1 className="py-5 text-3xl font-bold text-[#3B38A0] md:text-4xl">
              Sua jornada começa aqui
            </h1>

            <p className="text-sm text-zinc-600 md:text-base">
              O TryCatch 4Match é uma plataforma colaborativa criada para
              conectar pessoas em diferentes níveis de experiência, promovendo
              aprendizado prático, colaboração e troca de experiências.
              <br />
              <br />
              Para manter a organização dos projetos e garantir uma boa
              experiência para todos, utilizamos um processo simples de
              solicitação de acesso. Após o envio dos seus dados, nossa equipe
              fará uma análise rápida e, em breve, você receberá um email com as
              próximas orientações.
            </p>
          </header>

          <InviteRequestForm />
        </div>
      </section>

      <div className="px-5 md:px-7 lg:px-6 xl:px-10">
        <Footer />
      </div>
    </main>
  );
}
