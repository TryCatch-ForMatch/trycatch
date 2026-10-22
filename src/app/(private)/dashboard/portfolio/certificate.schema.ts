import { z } from 'zod';

export const certificateSchema = z.object({
  title: z.string().trim().min(1, 'Título obrigatório'),
  issuer: z.string().trim().min(1, 'Emissor obrigatório'),
  date: z.string().regex(/^\d{4}-\d{2}$/, 'Data obrigatória'),
  url: z.url('URL inválida').optional().or(z.literal('')),
  description: z
    .string()
    .max(300, 'Máximo 300 caracteres')
    .optional()
    .or(z.literal('')),
});

export type CertificateFormData = z.infer<typeof certificateSchema>;
