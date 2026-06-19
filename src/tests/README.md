# Tests

Pasta destinada para configuração dos testes automatizados do projeto. Contém utilitários de teste, configurações customizadas e helpers que facilitam a criação e execução de testes em componentes React, APIs e funções utilitárias.

## 📁 Pasta `tests`

Esta pasta centraliza as ferramentas e utilitários necessários para testes no projeto, utilizando **Jest** e **React Testing Library**.

## 🛠️ Stack de Testes

- **Jest** → Framework principal de testes
- **React Testing Library** → Testes de componentes React
- **ESLint Testing Library** → Plugin ESLint para melhores práticas em testes

## 📌 Padrão oficial

O padrão oficial para testes backend está documentado em:

`docs/04 - processo/testes-backend.md`

Esse documento define cobertura mínima, estrutura de arquivos, convenção
de nomes, ambiente de teste para rotas API e padrão de mock do Prisma.

## 📜 Estrutura

### **`test-utils.tsx`** → Utilitários de teste (em desenvolvimento)

- 🎯 **Objetivo:** Criar `test-utils.tsx` com render customizado
- Configurar providers de contexto automaticamente
- Evitar configuração manual repetitiva em cada teste
- Incluir providers como QueryClientProvider, ThemeProvider, AuthProvider etc.

## 🚀 Como Executar os Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm test:watch

# Executar testes em modo watchAll
npm test:watchAll

# Executar testes com coverage
npm test:coverage

# Executar validação usada antes de push
npm run test:push
```

## 🧪 Configuração dos Testes

### ESLint Testing Library Plugin

O projeto está configurado com o plugin `eslint-plugin-testing-library` que fornece regras específicas para melhores práticas ao escrever testes com React Testing Library.

**Benefícios:**

- 🎯 Enforça uso correto de queries (`getBy`, `findBy`, `queryBy`)
- 🚫 Previne antipadrões comuns em testes
- ♿ Promove práticas de teste focadas em acessibilidade
- 📝 Sugere melhores alternativas para código de teste

**Configuração no ESLint (`eslint.config.mjs`):**

```javascript
{
  files: ['**/tests/**/*', '**/*.{test,spec}.*'],
  ...compat.extends('plugin:testing-library/react')[0],
}
```

O plugin aplica regras apenas para arquivos de teste (`.test.*`, `.spec.*` ou dentro de `tests/`).

### Jest Config (`jest.config.ts`)

- **Ambiente:** `jsdom` (para componentes React)
- **Setup:** `jest.setup.ts` (configurações globais)
- **Aliases:** `@/` para `src/` e `@tests/` para `src/tests/`
- **Transform:** SWC para performance otimizada

### Jest Setup (`jest.setup.ts`)

- Importa `@testing-library/jest-dom` automaticamente
- Limpa mocks após cada teste
- Configurações globais para todos os testes

## Backend

- Testes de API devem ficar em `src/tests/api/{dominio}`.
- Testes de rotas API devem declarar `@jest-environment node`.
- Prisma deve ser mockado em testes unitários.
- A cobertura mínima global oficial é 60%.

## 🔗 Referências

- **Configuração Jest:** `/jest.config.ts`
- **Setup Global:** `/jest.setup.ts`
- **Documentação RTL:** [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **Jest Matchers:** [Jest DOM](https://github.com/testing-library/jest-dom)
- **ESLint Plugin:** [ESLint Plugin Testing Library](https://github.com/testing-library/eslint-plugin-testing-library)
