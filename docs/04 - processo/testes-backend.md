# Documento de Processo - Padrão de Testes Backend

**Classificação:** Documento de Processo  
**Camada:** 4 - Processo  
**Status:** Versão inicial

------------------------------------------------------------------------

## 1. Objetivo

Este documento define o padrão oficial para testes backend no TryCatch.

Ele orienta contribuidores sobre cobertura mínima, estrutura de arquivos,
convenção de nomes, uso de mocks do Prisma e comandos de validação antes
de abrir Pull Request.

------------------------------------------------------------------------

## 2. Escopo

Este padrão se aplica a:

- Rotas em `src/app/api`;
- Funções de domínio usadas por rotas backend;
- Bibliotecas em `src/lib` usadas por APIs;
- Templates e serviços de email;
- Regras de negócio executadas no servidor.

Ficam fora deste documento:

- Testes visuais de componentes;
- Testes manuais de interface;
- Estratégia completa de testes end to end;
- Regras de qualidade que não envolvem backend.

------------------------------------------------------------------------

## 3. Ferramentas Oficiais

| Ferramenta | Uso |
| --- | --- |
| Jest | Execução dos testes automatizados. |
| SWC Jest | Transformação de arquivos TypeScript e TSX. |
| Jest DOM | Matchers adicionais usados nos testes de componentes. |
| React Testing Library | Testes de componentes quando necessário. |
| Prisma mockado | Isolamento de banco nos testes unitários de API. |

O arquivo principal de configuração é `jest.config.ts`.

O setup global fica em `jest.setup.ts`.

------------------------------------------------------------------------

## 4. Cobertura Mínima

### Meta oficial inicial

A cobertura mínima oficial para backend é:

| Métrica | Mínimo |
| --- | --- |
| Statements | 60% |
| Branches | 60% |
| Functions | 60% |
| Lines | 60% |

Essa meta é inicial e deve subir conforme a base de testes amadurecer.

### Regra de evolução

- Novas rotas backend devem incluir testes desde o primeiro PR.
- Correções de bug devem incluir teste que reproduza o comportamento
  corrigido sempre que possível.
- Refactors não devem reduzir cobertura sem justificativa no PR.
- Quando uma área já estiver acima de 60%, novas mudanças devem preservar
  ou melhorar a cobertura daquele domínio.

------------------------------------------------------------------------

## 5. Estrutura de Arquivos

O projeto utiliza dois tipos de testes backend:

### Testes Unitários

Executados no pipeline padrão e isolados de banco de dados.

```text
src/tests/
└── unit/
    ├── api/
    ├── lib/
    ├── services/
    └── utils/
```

Exemplos:

```text
src/tests/unit/api/invite/invite-request-route.test.ts
src/tests/unit/api/portfolio/portfolio-me.test.ts
src/tests/unit/api/portfolio/portfolio-summary.test.ts
src/tests/unit/api/portfolio/portfolio-username.test.ts
```

### Testes de Integração

Utilizam banco de dados e seeds de teste.

```
src/tests/
└── integration/
    ├── api/
    └── services/
```

Exemplos:

```text
src/tests/integration/api/portfolio/portfolio-username.integration.test.ts
src/tests/integration/api/portfolio/portfolio-me.integration.test.ts
```

### Regras

- Novos testes unitários devem ser criados em src/tests/unit.
- Novos testes de integração devem ser criados em src/tests/integration.
- Não criar testes dentro de src/app/api/**/__tests__.
- Não misturar testes unitários e integração na mesma pasta.

------------------------------------------------------------------------

## 6. Convenção de Nomes

### Arquivos

Use o formato:

### Testes Unitários

```text
nome-da-rota-ou-caso.test.ts
```

Exemplos:

- `invite-request-route.test.ts`
- `portfolio-username.test.ts`
- `portfolio-summary.test.ts`

### Testes de Integração
```text
nome-da-rota-ou-caso.integration.test.ts
```

Exemplos:

- portfolio-username.integration.test.ts
- portfolio-me.integration.test.ts

### Blocos de teste

Use `describe` para identificar rota ou unidade testada.

Formato recomendado:

```ts
describe('POST /api/invite-request', () => {
  it('deve criar solicitação e retornar 201', async () => {
    // ...
  });
});
```

Para testes novos, prefira descrições em português quando o restante do
arquivo já usa português. Se o arquivo existente estiver em inglês,
mantenha o idioma do arquivo para evitar mistura desnecessária.

------------------------------------------------------------------------

## 7. Ambiente de Teste

O ambiente padrão do Jest é `jsdom`, porque a base também possui testes
de componentes.

Testes de rotas API devem declarar ambiente Node no início do arquivo:

```ts
/**
 * @jest-environment node
 */
```

Essa regra evita comportamento diferente entre código de servidor e
ambiente de browser simulado.

------------------------------------------------------------------------

## 8. Padrão de Mock e Isolamento

Testes unitários de rotas backend não devem acessar o banco real.

O Prisma deve ser mockado no próprio arquivo de teste ou em helper
dedicado quando houver repetição real.

Exemplo:

```ts
import { prisma } from '@/lib/prisma';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  },
}));

(prisma.user.findUnique as jest.Mock).mockResolvedValue({
  id: 'user-1',
});
```

### Regras:

- Mockar apenas os modelos e métodos usados pelo teste.
- Declarar retornos explícitos para cada cenário relevante.
- Limpar mocks entre testes usando `jest.clearAllMocks()`.
- Não depender de ordem global de execução.
- Não usar dados reais de banco em teste unitário.

### Rotas que utilizam Services

Quando a rota delegar a lógica para um service, o teste unitário deve mockar o service e não o Prisma.

Exemplo:

```ts
jest.mock('@/lib/portfolio.service', () => ({
  getPublicPortfolio: jest.fn(),
}));
```
------------------------------------------------------------------------

## 9. Cenários Obrigatórios por Rota

Cada rota backend nova deve cobrir, quando aplicável:

- Caminho de sucesso;
- Validação de entrada inválida;
- Registro já existente ou conflito;
- Recurso inexistente;
- Usuário sem permissão;
- Regra de negócio principal;
- Erro inesperado quando a rota possuir tratamento específico.

Nem toda rota precisa cobrir todos os cenários. O PR deve justificar
quando algum cenário não se aplica.

------------------------------------------------------------------------

## 10. Testes de Integração

Testes de integração validam a integração entre rotas, services e banco de dados.

Características:

- Utilizam Prisma real;
- Utilizam banco de teste;
- Podem depender de seed;
- Não são executados no pipeline padrão.

### Regras:

- Devem ficar em `src/tests/integration`;
- Devem possuir sufixo `.integration.test.ts`;
- Devem ser independentes entre si;
- Não devem modificar dados compartilhados sem limpeza adequada.

Exemplo:

```text
portfolio-username.integration.test.ts
```

------------------------------------------------------------------------

## 11. Comandos de Validação

### Testes Unitários

```bash
npm run test
```

### Testes de Integração

```bash
npm run test:integration
```

### Cobertura

```bash
npm run test:coverage
```

Antes de abrir Pull Request:

```bash
npm run lint
npm run test:push
npm run build
```

Para validar o mesmo limite global usado na CI:

```bash
npx jest --coverage --coverageThreshold='{"global":{"branches":60,"functions":60,"lines":60,"statements":60}}'
```

------------------------------------------------------------------------

## 12. Critérios para Pull Request

Um PR que altera backend deve informar:

- Quais rotas ou funções foram testadas;
- Quais cenários foram cobertos;
- Quais comandos de teste foram executados;
- Se houve execução de testes de integração;
- Se houve mudança de regra de negócio;
- Se a documentação precisou ser atualizada.

Modelo mínimo:

```md
## Validation

- `npm run lint`
- `npm run test:push`
- `npm run build`
```

Quando houver teste específico:

```md
- `npm run test -- src/tests/unit/api/portfolio/portfolio-me.test.ts`
```

------------------------------------------------------------------------

## 13. Antipadrões Evitados

- Mock genérico que esconde regra de negócio;
- Teste que valida apenas se a função foi chamada, sem validar resposta;
- Teste que depende de data, ordem ou estado global sem controle;
- Cobertura alta sem cenários relevantes;
- Alteração de código backend sem teste quando a regra é testável.
- Testes de integração dentro de `src/app/api/**/__tests__`;
- Testes unitários dependentes de banco real;
- Mock de Prisma quando a unidade testada depende de um service;

------------------------------------------------------------------------

## 14. Relação com Outros Documentos

- `docs/01 - estrategia/qualidade/planejamento-qualidade-software.md`
- `docs/04 - processo/ci-e-validacao.md`
- `src/tests/README.md`
- `.github/workflows/ci.yml`

------------------------------------------------------------------------

## 15. Histórico de Decisões

- Definida cobertura mínima inicial de 60% para backend.
- Padronizada estrutura de testes em `src/tests/unit` e `src/tests/integration`.
- Proibida criação de testes em `src/app/api/**/__tests__`.
- Confirmado uso de mocks para isolamento dos testes unitários.
- Confirmado uso de Prisma mockado ou Services mockados em testes unitários.
- Confirmado uso de Prisma real apenas em testes de integração.
- Confirmado ambiente Node por arquivo para rotas backend.
