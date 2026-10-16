'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Image from 'next/image';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import { getApiErrorMessage } from '@/lib/axios/get-api-error-message';

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
      const { data } = await apiTryCatch.get('/upload/ui-assets');

      if (!data.success) {
        toast.error('Erro no retorno da API');
        return;
      }

      setImages(data.data);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Falha ao buscar imagens'));
    }
  }

  useEffect(() => {
    fetchImages();

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
            <Image
              src={img.url}
              alt={img.public_id}
              width={400}
              height={160}
              className="h-40 w-full object-cover"
            />

            <CardContent className="mt-2 space-y-2">
              <p className="text-xs break-all text-gray-500">{img.url}</p>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copy(img.url)}
                >
                  Copiar URL
                </Button>

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
