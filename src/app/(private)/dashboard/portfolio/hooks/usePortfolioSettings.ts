'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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

  // ── Load current data ──────────────────────────────────────────────────────
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/portfolio/me');
        if (!res.ok)
          throw new Error('Falha ao carregar configurações do portfólio');
        const data = await res.json();

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
        // Keep defaults — don't block the UI
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, [form.reset]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Submit ─────────────────────────────────────────────────────────────────
  async function onSubmit(values: PortfolioFormData) {
    setIsSaving(true);
    setSaveStatus('idle');

    try {
      const res = await fetch('/api/portfolio/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok)
        throw new Error('Falha ao salvar configurações do portfólio');

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
