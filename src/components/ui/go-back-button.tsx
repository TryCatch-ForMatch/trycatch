import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './button';

function GoBackButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className="font-regular flex items-center justify-center gap-2"
    >
      Voltar
    </Button>
  );
}

export default GoBackButton;
