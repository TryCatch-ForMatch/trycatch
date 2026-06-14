# Documento Técnico --- Arquitetura Geral

Classificação: Documento Técnico\
Camada: 3 --- Técnico\
Status: Atualizado após implementação do Portfólio Público, logging estruturado e refatorações de layout

------------------------------------------------------------------------

## 1. Stack Principal

-   Next.js (App Router)
-   TypeScript
-   Prisma ORM
-   PostgreSQL
-   NextAuth v4
-   TanStack Query v5 (estado de servidor no cliente)

------------------------------------------------------------------------

## 2. Modelo Arquitetural

Monólito modular evolutivo.

Separação lógica por domínios com possibilidade futura de extração de
serviços conforme critérios definidos.

------------------------------------------------------------------------

## 3. Separação de Domínios

-   Portfólio (público e privado)
-   Autenticação
-   Feedback
-   Convites
-   Projetos
-   Produto

------------------------------------------------------------------------

## 4. Estrutura de Rotas (App Router)

```
src/app/
  (auth)/          # Login, registro, esqueci/reset senha — sem layout wrapper
  (public)/        # Landing, listagem de portfólios, portfólio individual
  (private)/       # /dashboard/** — todas as rotas exigem sessão ativa
  api/             # Route handlers (Next.js App Router)
```

------------------------------------------------------------------------

## 5. Providers Globais

Todos os providers da aplicação são centralizados em `src/providers/index.tsx`
e incluídos uma única vez no layout raiz (`src/app/layout.tsx`).

Providers ativos:

-   `QueryProvider` — TanStack Query client para estado de servidor
-   `SessionProvider` — NextAuth session context

------------------------------------------------------------------------

## 6. Layout do Dashboard

O dashboard usa um layout compartilhado em
`src/app/(private)/dashboard/layout.tsx` como shell único para todas as
rotas privadas (Navbar + DashboardHeader + área de conteúdo principal).

O componente `BasePage` foi removido — ele duplicava Navbar e Header em
cada página individualmente.

------------------------------------------------------------------------

## 7. Camada de Serviço

Lógica de query complexa fica em arquivos de serviço dedicados em vez de
dentro dos route handlers.

Exemplo: `src/lib/portfolio.service.ts` com `getPublicPortfolio()` e
`listPublicPortfolios()`.

Serviços lançam erros semânticos (ex.: `PortfolioNotFoundError`) para que
os handlers mapeiem para códigos HTTP corretos sem acoplamento de domínio.

Server Components que precisam de dados chamam os serviços diretamente
(sem fetch HTTP interno), eliminando latência de serialização e dependência
de URL local.

------------------------------------------------------------------------

## 8. Máquina de Estados --- Project

Fluxo oficial:

BUSCANDO\
↓ (todas stacks assumidas automaticamente)\
EM_ANDAMENTO\
↓ (ação manual do owner)\
CONCLUIDO

Regras técnicas:

-   Transição BUSCANDO → EM_ANDAMENTO ocorre automaticamente.
-   Transição EM_ANDAMENTO → CONCLUIDO é manual e exclusiva do owner.
-   Projeto concluído não retorna para EM_ANDAMENTO (salvo decisão
    futura formal).

------------------------------------------------------------------------

## 9. Regra Técnica de Edição Condicional (Project)

Antes de existir qualquer StackTaken: - Update completo permitido.

Após existir pelo menos um StackTaken: - Bloqueio de edição
estrutural. - Permitido apenas append de observação na descrição. -
Concatenação deve ocorrer no backend. - Backend não deve aceitar
substituição completa da descrição.

------------------------------------------------------------------------

## 10. Escalabilidade

Critérios para futura separação de serviços:

-   Crescimento de carga.
-   Necessidade de integração externa.
-   Gargalos identificados.
-   Complexidade excessiva em domínio específico.

------------------------------------------------------------------------

## 11. Observabilidade

-   Logs estruturados obrigatórios em todas as rotas de API.
-   Logger centralizado em `src/lib/logger.ts` com assinatura
    `logger.info/warn/error(message, context, metadata)`.
-   Registro de ações críticas:
    -   Alteração de status de projeto.
    -   Tentativas bloqueadas de edição estrutural.
    -   Encerramento manual.
    -   Ações críticas de portfólio (GET, PATCH, erros de autenticação).
-   Proibição de `console.log` em código de runtime.
-   Auditoria completa de logging registrada em
    `docs/03 - tecnico/arquitetura/auditoria-logging-backend.md`.
