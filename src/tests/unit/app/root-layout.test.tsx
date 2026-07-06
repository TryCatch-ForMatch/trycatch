/**
 * @jest-environment node
 */

import { renderToStaticMarkup } from 'react-dom/server';
import RootLayout from '@/app/layout';
import { ReactNode } from 'react';

jest.mock('next/font/google', () => ({
  Poppins: () => ({ variable: 'font-poppins' }),
}));

jest.mock('@/components/ui/sonner', () => ({
  Toaster: ({ position }: { position: string }) => (
    <div data-position={position}>Toaster</div>
  ),
}));

jest.mock('@/providers', () => ({
  __esModule: true,
  default: ({ children }: { children: ReactNode }) => (
    <section>{children}</section>
  ),
}));

describe('RootLayout', () => {
  it('renders the application shell around children', () => {
    const view = renderToStaticMarkup(
      <RootLayout>
        <main>Page content</main>
      </RootLayout>
    );

    expect(view).toContain('lang="pt-BR"');
    expect(view).toContain('class="font-poppins"');
    expect(view).toContain('data-position="top-center"');
    expect(view).toContain('Page content');
  });
});
