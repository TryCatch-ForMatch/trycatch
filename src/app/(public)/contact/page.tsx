import { ContactForm } from '@/components/form/ContactForm/ContactForm';

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-30 py-30">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold">Entre em contato</h1>

          <p className="text-gray-600">
            Dúvidas, sugestões ou algo que você queira compartilhar, envie uma
            mensagem!
          </p>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
