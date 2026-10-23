'use client';

import { format } from 'date-fns';
import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import { getApiErrorMessage } from '@/lib/axios/get-api-error-message';
import type { PortfolioCertificate } from '@/types/portfolio.types';
import type { CertificateFormData } from '@/lib/validations/certificate.schema';
import { portfolioKeys } from './portfolioKeys';

export function useCertificates() {
  const queryClient = useQueryClient();
  const queryKey = portfolioKeys.certificates();

  const { data, isPending, isError } = useQuery({
    queryKey,
    queryFn: async () => {
      const response =
        await apiTryCatch.get<PortfolioCertificate[]>('/user-certificate');
      return response.data ?? [];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (values: CertificateFormData) => {
      const response = await apiTryCatch.post('/user-certificate', {
        title: values.title,
        issuer: values.issuer,
        date: format(values.date, 'MM/yyyy'),
        url: values.url || undefined,
        description: values.description || undefined,
      });
      return response.data.data as PortfolioCertificate;
    },
    onSuccess: (certificate) => {
      queryClient.setQueryData<PortfolioCertificate[]>(queryKey, (current) => [
        certificate,
        ...(current ?? []),
      ]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiTryCatch.delete(`/user-certificate/${id}`),
    onSuccess: (_response, id) => {
      queryClient.setQueryData<PortfolioCertificate[]>(queryKey, (current) =>
        (current ?? []).filter((cert) => cert.id !== id)
      );
    },
  });

  async function createCertificate(values: CertificateFormData) {
    try {
      await createMutation.mutateAsync(values);
      toast.success('Certificado adicionado!');
      return true;
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Erro ao adicionar certificado.'));
      return false;
    }
  }

  async function deleteCertificate(id: string) {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Certificado removido!');
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Erro ao remover certificado.'));
    }
  }

  return {
    certificates: data ?? [],
    isLoading: isPending,
    isError,
    createCertificate,
    deleteCertificate,
  };
}
