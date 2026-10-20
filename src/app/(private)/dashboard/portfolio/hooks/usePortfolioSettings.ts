'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import { portfolioSchema, type PortfolioFormData } from '../portfolio.schema';

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

export function usePortfolioSettings() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [username, setUsername] = useState<string | null>(null);

  const form = useForm<PortfolioFormData>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    async function load() {
      try {
        const { data } = await apiTryCatch.get('/portfolio/me');

        setUsername(data.userName ?? null);

        form.reset({
          bio: data.bio ?? '',
          github: data.github ?? '',
          linkedin: data.linkedin ?? '',
          skills:
            data.skills?.map(
              (item: { skill: { id: string } }) => item.skill.id
            ) ?? [],
          portfolioPublic: data.portfolioPublic ?? false,
          showEmail: data.showEmail ?? false,
          showGithub: data.showGithub ?? false,
          showLinkedin: data.showLinkedin ?? false,
          showProjects: data.showProjects ?? false,
          showCertificates: data.showCertificates ?? false,
          showFeedback: data.showFeedback ?? false,
        });
      } catch {
      } finally {
        setIsLoading(false);
      }
    }

    void load();
  }, [form.reset]); // eslint-disable-line react-hooks/exhaustive-deps

  async function onSubmit(values: PortfolioFormData) {
    setIsSaving(true);
    setSaveStatus('idle');

    try {
      await apiTryCatch.patch('/portfolio/me', values);

      setSaveStatus('success');
      form.reset(values);

      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch {
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  }

  return { form, username, isLoading, isSaving, saveStatus, onSubmit };
}
