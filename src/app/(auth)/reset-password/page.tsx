import { Suspense } from 'react';
import ResetPasswordClient from '@/components/ResetPasswordClient';

export const dynamic = 'force-dynamic';

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <section className="flex min-h-screen items-center justify-center">
          <p className="text-sm text-muted-foreground">Carregando...</p>
        </section>
      }
    >
      <ResetPasswordClient />
    </Suspense>
  );
}
