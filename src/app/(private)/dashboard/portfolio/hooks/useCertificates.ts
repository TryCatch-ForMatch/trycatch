'use client';

import { useCallback, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import { getApiErrorMessage } from '@/lib/axios/get-api-error-message';
import type { PortfolioCertificate } from '@/types/portfolio.types';
import type { CertificateFormData } from '../certificate.schema';

export function useCertificates() {
  const [certificates, setCertificates] = useState<PortfolioCertificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCertificates = useCallback(async () => {
    try {
      const { data } = await apiTryCatch.get('/user-certificate');
      setCertificates(data ?? []);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Erro ao carregar certificados.'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchCertificates();
  }, [fetchCertificates]);

  async function createCertificate(values: CertificateFormData) {
    try {
      const { data } = await apiTryCatch.post('/user-certificate', {
        title: values.title,
        issuer: values.issuer,
        date: format(values.date, 'MM/yyyy'),
        url: values.url || undefined,
        description: values.description || undefined,
      });

      setCertificates((current) => [data.data, ...current]);
      toast.success('Certificado adicionado!');
      return true;
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Erro ao adicionar certificado.'));
      return false;
    }
  }

  async function deleteCertificate(id: string) {
    try {
      await apiTryCatch.delete(`/user-certificate/${id}`);
      setCertificates((current) => current.filter((cert) => cert.id !== id));
      toast.success('Certificado removido!');
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Erro ao remover certificado.'));
    }
  }

  return { certificates, isLoading, createCertificate, deleteCertificate };
}
