import { z } from 'zod';

export const portfolioSchema = z.object({
  bio: z
    .string()
    .max(500, 'Máximo 500 caracteres')
    .optional()
    .or(z.literal('')),
  github: z.url('URL inválida').optional().or(z.literal('')),
  linkedin: z.url('URL inválida').optional().or(z.literal('')),
  portfolioPublic: z.boolean(),
  showEmail: z.boolean(),
  showGithub: z.boolean(),
  showLinkedin: z.boolean(),
  showProjects: z.boolean(),
  showCertificates: z.boolean(),
  showFeedback: z.boolean(),
});

export type PortfolioFormData = z.infer<typeof portfolioSchema>;
