'use client';

import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export default function UIAssetUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return toast.error('Selecione uma imagem.');

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'ui_assets'); // pasta no Cloudinary

      const { data } = await apiTryCatch.post('/upload/ui-assets', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (data?.data?.url) {
        toast.success('Imagem enviada com sucesso!');
        window.dispatchEvent(new Event('ui-assets:refresh'));
        setFile(null);
      } else {
        toast.error('URL da imagem não retornada');
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err?.response?.data?.error || err.message);
      } else if (err instanceof Error) {
        // outros erros JS normais
        toast.error(err.message);
      } else {
        // caso caia aqui, não sabemos o que é
        toast.error('Erro desconhecido');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="mx-auto mt-1 max-w-4xl rounded-2xl p-6 shadow-lg">
      <form onSubmit={handleUpload} className="space-y-4">
        <Input
          className="p-10"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Enviando...' : 'Enviar Imagem'}
        </Button>
      </form>
    </Card>
  );
}
