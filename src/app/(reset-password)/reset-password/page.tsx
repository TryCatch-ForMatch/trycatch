import { Suspense } from 'react';
import ResetPasswordClient from '@/components/ResetPasswordClient';

// A página depende de dados de execução (token na URL), portanto, não deve ser pré-renderizada
export const dynamic = 'force-dynamic';

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <section className="flex min-h-screen items-center justify-center">
          <p className="text-sm text-zinc-500">Carregando...</p>
        </section>
      }
    >
      <ResetPasswordClient />
    </Suspense>
  );
}
