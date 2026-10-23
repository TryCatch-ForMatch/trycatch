'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import { portfolioSchema, type PortfolioFormData } from '../portfolio.schema';
import { portfolioKeys } from './portfolioKeys';

const DEFAULT_VALUES: PortfolioFormData = {
  bio: '',
  github: '',
  linkedin: '',
  skills: [],
  portfolioPublic: false,
  showEmail: false,
  showGithub: false,
  showLinkedin: false,
  showProjects: false,
  showCertificates: false,
  showFeedback: false,
};

export type SaveStatus = 'idle' | 'success' | 'error';

type PortfolioSettings = {
  username: string | null;
  values: PortfolioFormData;
};

async function fetchPortfolioSettings(): Promise<PortfolioSettings> {
  const { data } = await apiTryCatch.get('/portfolio/me');

  return {
    username: data.userName ?? null,
    values: {
      bio: data.bio ?? '',
      github: data.github ?? '',
      linkedin: data.linkedin ?? '',
      skills:
        data.skills?.map((item: { skill: { id: string } }) => item.skill.id) ??
        [],
      portfolioPublic: data.portfolioPublic ?? false,
      showEmail: data.showEmail ?? false,
      showGithub: data.showGithub ?? false,
      showLinkedin: data.showLinkedin ?? false,
      showProjects: data.showProjects ?? false,
      showCertificates: data.showCertificates ?? false,
      showFeedback: data.showFeedback ?? false,
    },
  };
}

export function usePortfolioSettings() {
  const queryClient = useQueryClient();
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: portfolioKeys.settings(),
    queryFn: fetchPortfolioSettings,
  });

  const form = useForm<PortfolioFormData>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: DEFAULT_VALUES,
    values: data?.values,
    resetOptions: { keepDirtyValues: true },
  });

  const { mutateAsync, isPending: isSaving } = useMutation({
    mutationFn: (values: PortfolioFormData) =>
      apiTryCatch.patch('/portfolio/me', values),
    onSuccess: (_response, values) => {
      queryClient.setQueryData<PortfolioSettings>(
        portfolioKeys.settings(),
        (current) => (current ? { ...current, values } : current)
      );
      form.reset(values);
    },
  });

  async function onSubmit(values: PortfolioFormData) {
    setSaveStatus('idle');

    try {
      await mutateAsync(values);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch {
      setSaveStatus('error');
    }
  }

  return {
    form,
    username: data?.username ?? null,
    isLoading: isPending,
    isError,
    error,
    refetch,
    isSaving,
    saveStatus,
    onSubmit,
  };
}
