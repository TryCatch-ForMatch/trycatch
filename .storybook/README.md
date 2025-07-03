# Storybook

Configuração do Storybook para desenvolvimento e documentação de componentes. O Storybook permite visualizar, testar e documentar componentes de forma isolada.

## Estrutura

- `main.ts` - Configuração principal do Storybook (addons, framework, stories pattern)
- `preview.ts` - Configurações globais de preview (CSS, parameters, decorators)

## Scripts Disponíveis

```bash
# Iniciar Storybook em modo desenvolvimento
npm run storybook

# Build do Storybook para produção
npm run build-storybook
```

## Como Criar Stories

Crie arquivos `.stories.tsx` ao lado dos seus componentes:

```tsx
// src/components/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};
```

## Configuração Atual

### Addons Configurados

- `@storybook/addon-onboarding` - Tutorial de introdução
- `@storybook/addon-links` - Navegação entre stories  
- `@storybook/addon-essentials` - Pack essencial (actions, controls, docs, etc.)

### Framework

- **Next.js** - Configurado para funcionar com Next.js e Tailwind CSS
- **Tailwind CSS** - Estilos importados automaticamente via `globals.css`

## Padrões de Nomenclatura

### Arquivos de Stories

- **Localização**: Ao lado do componente (ex: `src/components/Button.stories.tsx`)
- **Nomenclatura**: `NomeDoComponente.stories.tsx`
- **Padrão**: Sempre terminar com `.stories.tsx` ou `.stories.ts`

### Títulos das Stories (meta.title)

- **Formato**: `Categoria/NomeDoComponente`
- **Exemplos**:
  - `Components/Button` - Para componentes básicos
  - `Forms/FormInput` - Para componentes de formulário
  - `Layout/Navbar` - Para componentes de layout
  - `UI/Modal` - Para componentes de interface

### Exports das Stories

- **Primária**: `Primary` - Versão principal do componente
- **Secundária**: `Secondary` - Versão alternativa (outline, ghost, etc.)
- **Tamanhos**: `Small`, `Medium`, `Large` - Variações de tamanho
- **Estados**: `Loading`, `Disabled`, `Error` - Estados especiais
- **Variações**: `WithIcon`, `WithoutLabel` - Funcionalidades específicas

### Exemplo Completo

```tsx
// src/components/Button.stories.tsx
const meta: Meta<typeof Button> = {
  title: 'Components/Button', // Categoria/Componente
  component: Button,
};

export default meta;

// Stories nomeadas descritivamente
export const Primary: Story = { /* ... */ };
export const Secondary: Story = { /* ... */ };
export const Large: Story = { /* ... */ };
export const Small: Story = { /* ... */ };
export const WithIcon: Story = { /* ... */ };
```

## Acesso

- **Local**: <http://localhost:6006>
