import type { Metadata } from 'next';
import { ContactForm } from '@/components/form/ContactForm/ContactForm';

export const metadata: Metadata = {
  title: 'Contato',
  description:
    'Envie dúvidas, sugestões ou mensagens para a equipe do TryCatch For Match.',
};

export default function ContactPage() {
  return (
    <main className="px-5 py-10 md:px-7 md:py-16 lg:px-6 lg:py-24 xl:px-10 xxl:px-[39px]">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold">Entre em contato</h1>

          <p className="text-gray-300">
            Dúvidas, sugestões ou algo que você queira compartilhar, envie uma
            mensagem!
          </p>
        </div>

        <ContactForm />
      </div>
    </main>
  );
}
