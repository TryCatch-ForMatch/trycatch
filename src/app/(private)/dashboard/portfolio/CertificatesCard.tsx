'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Award, ExternalLink, Plus, Trash } from 'lucide-react';
import {
  SettingsCard,
  SettingsCardHeader,
} from '@/components/ui/settings-card';
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/ui/input-field';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { ConfirmModal, Modal, ModalClose } from '@/components/ui/modal';
import { DatePicker } from '@/components/ui/date-picker';
import { useCertificates } from './hooks/useCertificates';
import {
  certificateSchema,
  type CertificateFormData,
} from './certificate.schema';

const EMPTY_CERTIFICATE: Partial<CertificateFormData> = {
  title: '',
  issuer: '',
  url: '',
  description: '',
};

export function CertificatesCard() {
  const { certificates, isLoading, createCertificate, deleteCertificate } =
    useCertificates();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CertificateFormData>({
    resolver: zodResolver(certificateSchema),
    defaultValues: EMPTY_CERTIFICATE,
  });

  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) reset(EMPTY_CERTIFICATE);
  };

  const onSubmit = async (values: CertificateFormData) => {
    const created = await createCertificate(values);
    if (created) handleOpenChange(false);
  };

  const confirmDelete = async () => {
    const id = pendingDeleteId;
    if (!id) return;
    setPendingDeleteId(null);
    await deleteCertificate(id);
  };

  return (
    <SettingsCard>
      <SettingsCardHeader
        icon={<Award className="h-4 w-4" />}
        title="Certificados"
        description="Cursos e certificações exibidos no seu portfólio"
      />

      <div className="space-y-3 p-5">
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
          </div>
        ) : certificates.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhum certificado cadastrado.
          </p>
        ) : (
          <ul className="space-y-3">
            {certificates.map((cert) => (
              <li
                key={cert.id}
                className="flex items-start justify-between gap-3 rounded-lg border border-border p-4"
              >
                <div className="min-w-0 space-y-0.5">
                  <p className="text-sm font-medium text-foreground">
                    {cert.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {cert.issuer} · {cert.date}
                  </p>
                  {cert.description && (
                    <p className="line-clamp-2 pt-1 text-xs text-muted-foreground">
                      {cert.description}
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 gap-1">
                  {cert.url && (
                    <Button variant="ghost" size="icon" asChild>
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Abrir certificado ${cert.title}`}
                      >
                        <ExternalLink aria-hidden />
                      </a>
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setPendingDeleteId(cert.id)}
                    aria-label={`Remover certificado ${cert.title}`}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash aria-hidden />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <Button
          type="button"
          variant="outline"
          onClick={() => setIsDialogOpen(true)}
          className="w-full"
        >
          <Plus aria-hidden />
          Adicionar certificado
        </Button>
      </div>

      <Modal
        title="Novo certificado"
        description="Informe os dados do curso ou da certificação."
        open={isDialogOpen}
        onOpenChange={handleOpenChange}
        footer={
          <>
            <ModalClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </ModalClose>
            <Button
              type="submit"
              form="certificate-form"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Salvando...' : 'Adicionar'}
            </Button>
          </>
        }
      >
        <form
          id="certificate-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <InputField
            label="Título"
            placeholder="Ex.: React Avançado"
            error={errors.title?.message}
            {...register('title')}
          />
          <InputField
            label="Emissor"
            placeholder="Ex.: Alura, Udemy, AWS"
            error={errors.issuer?.message}
            {...register('issuer')}
          />

          <div className="mb-4">
            <Label htmlFor="certificate-date" className="mb-1 block leading-5">
              Data de conclusão
            </Label>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  id="certificate-date"
                  value={field.value}
                  onChange={field.onChange}
                  disabledDates={{ after: new Date() }}
                  startMonth={new Date(1990, 0)}
                  endMonth={new Date()}
                  aria-invalid={!!errors.date}
                  aria-describedby={
                    errors.date ? 'certificate-date-error' : undefined
                  }
                />
              )}
            />
            {errors.date && (
              <p
                id="certificate-date-error"
                className="mt-1 text-sm text-destructive"
                role="alert"
              >
                {errors.date.message}
              </p>
            )}
          </div>

          <InputField
            label="Link do certificado (opcional)"
            type="url"
            placeholder="https://..."
            error={errors.url?.message}
            {...register('url')}
          />

          <div>
            <Label
              htmlFor="certificate-description"
              className="mb-1 block leading-5"
            >
              Descrição (opcional)
            </Label>
            <Textarea
              id="certificate-description"
              rows={3}
              className="resize-none"
              aria-invalid={!!errors.description}
              {...register('description')}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-destructive" role="alert">
                {errors.description.message}
              </p>
            )}
          </div>
        </form>
      </Modal>

      <ConfirmModal
        destructive
        open={pendingDeleteId !== null}
        title="Remover certificado"
        description="Deseja realmente remover este certificado?"
        confirmLabel="Remover"
        onConfirm={confirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      />
    </SettingsCard>
  );
}
