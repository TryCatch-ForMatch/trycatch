export const portfolioKeys = {
  all: ['portfolio-me'] as const,
  settings: () => [...portfolioKeys.all, 'settings'] as const,
  certificates: () => [...portfolioKeys.all, 'certificates'] as const,
};
