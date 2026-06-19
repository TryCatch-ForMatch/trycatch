'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Image from 'next/image';

type CloudImage = {
  url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
  created_at: string;
};

export default function UIAssetList() {
  const [images, setImages] = useState<CloudImage[]>([]);

  async function fetchImages() {
    try {
      const res = await fetch('/api/upload/ui-assets');
      if (!res.ok) throw new Error('Falha ao buscar imagens');

      const data = await res.json();
      if (!data.success) throw new Error('Erro no retorno da API');

      setImages(data.data); // array de imagens
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'Erro ao carregar imagens.'
      );
    }
  }

  useEffect(() => {
    fetchImages();

    // atualizar automaticamente após upload
    const listener = () => fetchImages();
    window.addEventListener('ui-assets:refresh', listener);

    return () => window.removeEventListener('ui-assets:refresh', listener);
  }, []);

  function copy(url: string) {
    navigator.clipboard.writeText(url);
    toast.success('URL copiada!');
  }

  return (
    <CardContent>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images.map((img) => (
          <Card key={img.public_id} className="overflow-hidden shadow">
            {/* Miniatura da imagem */}
            <Image
              src={img.url}
              alt={img.public_id}
              width={400} // largura fixa ou dinâmica
              height={160} // altura proporcional ao grid
              className="h-40 w-full object-cover"
            />

            <CardContent className="mt-2 space-y-2">
              {/* URL completa da imagem */}
              <p className="text-xs break-all text-gray-500">{img.url}</p>

              <div className="flex gap-2">
                {/* Copiar URL */}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copy(img.url)}
                >
                  Copiar URL
                </Button>

                {/* Botão de preview rápido em nova aba */}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(img.url, '_blank')}
                >
                  Abrir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </CardContent>
  );
}
