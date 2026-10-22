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
import { usePortfolioSettings } from './hooks/usePortfolioSettings';
import { SkillSelector } from '@/components/shared/SkillSelector';

export default function DashboardPortfolioClient() {
  const { form, username, isLoading, isSaving, saveStatus, onSubmit } =
    usePortfolioSettings();
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

  return (
    <main className="container mx-auto max-w-2xl space-y-8 px-4 py-10">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            Meu portfólio
          </h1>
          <SkillSelector
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
                {
                  shouldDirty: true,
                }
              )
            }
          />
          <p className="mt-1 text-sm text-muted-foreground">
            Configure o que aparece no seu portfólio público
          </p>
        </div>

        {username && (
          <a
            href={`/portfolio/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Ver portfólio
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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

          <div className="space-y-4">
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
              onChange={(v) => setValue('showEmail', v, { shouldDirty: true })}
            />
            <ToggleField
              icon={<Code className="h-3.5 w-3.5" />}
              label="GitHub"
              description="Exibir link do GitHub"
              checked={watch('showGithub')}
              onChange={(v) => setValue('showGithub', v, { shouldDirty: true })}
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

        <div className="flex items-center justify-between pt-2">
          <div className="text-sm">
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
          </div>

          <Button type="submit" disabled={isSaving || !isDirty}>
            <Save aria-hidden className="h-3.5 w-3.5" />
            {isSaving ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </div>
      </form>
    </main>
  );
}
