'use client';

import {
  Eye,
  Globe,
  GlobeLock,
  Save,
  ExternalLink,
  Code,
  Link,
  Mail,
  Sparkles,
  User,
} from 'lucide-react';
import {
  SettingsCard,
  SettingsCardHeader,
} from '@/components/ui/settings-card';
import { ToggleField } from '@/components/ui/toggle-field';
import { FormField } from '@/components/ui/form-field';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { PortfolioPageSkeleton } from '@/components/Dashboard/Portfolio/PortfolioPageSkeleton';
import { usePortfolioSettings } from '@/hooks/api/usePortfolioSettings';
import { SkillSelector } from '@/components/shared/SkillSelector';
import { CertificatesCard } from './CertificatesCard';
import { getApiErrorMessage } from '@/lib/axios/get-api-error-message';

export default function DashboardPortfolioClient() {
  const {
    form,
    username,
    isLoading,
    isError,
    error,
    refetch,
    isSaving,
    saveStatus,
    onSubmit,
  } = usePortfolioSettings();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = form;

  const portfolioPublic = watch('portfolioPublic');
  const selectedSkills: string[] = watch('skills') || [];

  if (isLoading) return <PortfolioPageSkeleton />;
  if (isError) {
    return (
      <div role="alert" className="space-y-4 p-6">
        <p className="text-sm text-destructive">
          {getApiErrorMessage(error, 'Erro ao carregar portfólio.')}
        </p>
        <Button variant="outline" onClick={() => refetch()}>
          Tentar novamente
        </Button>
      </div>
    );
  }
  return (
    <div className="space-y-8 p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium text-foreground">
            Meu portfólio
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Configure o que aparece no seu portfólio público
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span role="status" className="text-sm">
            {saveStatus === 'success' && (
              <span className="text-green-600 dark:text-green-400">
                ✓ Alterações salvas
              </span>
            )}
            {saveStatus === 'error' && (
              <span className="text-destructive">
                Erro ao salvar. Tente novamente.
              </span>
            )}
          </span>

          {username && (
            <Button variant="outline" asChild>
              <a
                href={`/portfolio/${username}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver portfólio
                <ExternalLink aria-hidden />
              </a>
            </Button>
          )}

          <Button
            type="submit"
            form="portfolio-form"
            disabled={isSaving || !isDirty}
          >
            <Save aria-hidden />
            {isSaving ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </div>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-2">
        <form
          id="portfolio-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <SettingsCard>
            <SettingsCardHeader
              icon={
                portfolioPublic ? (
                  <Globe className="h-4 w-4 text-green-500" />
                ) : (
                  <GlobeLock className="h-4 w-4 text-muted-foreground" />
                )
              }
              title="Visibilidade do portfólio"
              description={
                portfolioPublic
                  ? 'Seu portfólio está público e pode ser acessado por qualquer pessoa'
                  : 'Seu portfólio está privado — apenas você pode vê-lo'
              }
            />
            <ToggleField
              label="Portfólio público"
              description="Permite acesso via /portfolio/@username"
              checked={portfolioPublic}
              onChange={(v) =>
                setValue('portfolioPublic', v, { shouldDirty: true })
              }
            />
          </SettingsCard>

          <SettingsCard>
            <SettingsCardHeader
              icon={<User className="h-4 w-4" />}
              title="Dados pessoais"
            />

            <div className="space-y-4 py-4">
              <FormField
                label="Bio"
                htmlFor="portfolio-bio"
                error={errors.bio?.message}
              >
                <Textarea
                  id="portfolio-bio"
                  {...register('bio')}
                  rows={3}
                  placeholder="Conte um pouco sobre você..."
                  className="resize-none"
                />
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {watch('bio')?.length ?? 0}/500 caracteres
                </p>
              </FormField>

              <FormField
                label="GitHub"
                htmlFor="portfolio-github"
                error={errors.github?.message}
              >
                <InputGroup>
                  <InputGroupAddon>
                    <Code aria-hidden className="h-3.5 w-3.5" />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="portfolio-github"
                    {...register('github')}
                    type="url"
                    placeholder="https://github.com/seu-usuario"
                  />
                </InputGroup>
              </FormField>

              <FormField
                label="LinkedIn"
                htmlFor="portfolio-linkedin"
                error={errors.linkedin?.message}
              >
                <InputGroup>
                  <InputGroupAddon>
                    <Link aria-hidden className="h-3.5 w-3.5" />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="portfolio-linkedin"
                    {...register('linkedin')}
                    type="url"
                    placeholder="https://linkedin.com/in/seu-usuario"
                  />
                </InputGroup>
              </FormField>
            </div>
          </SettingsCard>

          <SettingsCard>
            <SettingsCardHeader
              icon={<Sparkles className="h-4 w-4" />}
              title="Skills"
              description="Tecnologias exibidas no seu portfólio"
            />

            <div className="p-5">
              <SkillSelector
                label="Buscar skills"
                selectedSkills={selectedSkills}
                errorMessage={errors.skills?.message}
                onAddSkill={(skillId) =>
                  setValue('skills', [...selectedSkills, skillId], {
                    shouldDirty: true,
                  })
                }
                onRemoveSkill={(skillId) =>
                  setValue(
                    'skills',
                    selectedSkills.filter((id) => id !== skillId),
                    { shouldDirty: true }
                  )
                }
              />
            </div>
          </SettingsCard>
        </form>

        <div className="space-y-6">
          <SettingsCard>
            <SettingsCardHeader
              icon={<Eye className="h-4 w-4" />}
              title="O que exibir no portfólio"
              description="Campos desativados ficam ocultos para visitantes"
            />

            <div className="divide-y divide-border">
              <ToggleField
                icon={<Mail className="h-3.5 w-3.5" />}
                label="E-mail"
                description="Exibir seu e-mail de contato"
                checked={watch('showEmail')}
                onChange={(v) =>
                  setValue('showEmail', v, { shouldDirty: true })
                }
              />
              <ToggleField
                icon={<Code className="h-3.5 w-3.5" />}
                label="GitHub"
                description="Exibir link do GitHub"
                checked={watch('showGithub')}
                onChange={(v) =>
                  setValue('showGithub', v, { shouldDirty: true })
                }
              />
              <ToggleField
                icon={<Link className="h-3.5 w-3.5" />}
                label="LinkedIn"
                description="Exibir link do LinkedIn"
                checked={watch('showLinkedin')}
                onChange={(v) =>
                  setValue('showLinkedin', v, { shouldDirty: true })
                }
              />
              <ToggleField
                label="Projetos concluídos"
                description="Exibir projetos que você participou"
                checked={watch('showProjects')}
                onChange={(v) =>
                  setValue('showProjects', v, { shouldDirty: true })
                }
              />
              <ToggleField
                label="Certificados"
                description="Exibir seus certificados"
                checked={watch('showCertificates')}
                onChange={(v) =>
                  setValue('showCertificates', v, { shouldDirty: true })
                }
              />
              <ToggleField
                label="Feedback recebido"
                description="Exibir avaliações de colegas de projeto"
                checked={watch('showFeedback')}
                onChange={(v) =>
                  setValue('showFeedback', v, { shouldDirty: true })
                }
              />
            </div>
          </SettingsCard>

          <CertificatesCard />
        </div>
      </div>
    </div>
  );
}
