# Auditoria de Logging no Backend

Classificação: Documento Técnico\
Camada: 3 - Técnico\
Status: Padronização concluída\
Issue relacionada: #536\
Data da auditoria inicial: 2026-05-17\
Data da conclusão: 2026-06-14

------------------------------------------------------------------------

## 1. Objetivo

Mapear o uso de logs no backend para garantir cobertura uniforme via
logger estruturado em `src/lib/logger.ts`, eliminando o uso direto de
`console.log`, `console.error` e `console.warn` em código de runtime.

------------------------------------------------------------------------

## 2. Status da Padronização

**Padronização concluída.** Todas as rotas de API em `src/app/api`
agora utilizam o logger estruturado.

| Item | Estado anterior | Estado atual |
| --- | --- | --- |
| Rotas com logger estruturado | 1 | Todas |
| Rotas com uso direto de console | 37 | 0 (exceto scripts) |
| Rotas sem nenhum logging | 15 | 0 |

------------------------------------------------------------------------

## 3. Logger Estruturado

O logger centralizado está em `src/lib/logger.ts`.

Assinatura:

```ts
logger.info(message: string, context?: string, metadata?: unknown)
logger.warn(message: string, context?: string, metadata?: unknown)
logger.error(message: string, context?: string, metadata?: unknown)
```

Saída em JSON com campos:

-   `timestamp` — ISO 8601
-   `level` — `info`, `warn` ou `error`
-   `context` — string no formato `METHOD /api/resource`
-   `message` — descrição do evento
-   `metadata` — objeto com dados adicionais (sem dados sensíveis)

A saída atual vai para `console.error/warn/info` de forma centralizada.
O módulo está preparado para trocar o destino por um serviço externo
sem alterar os chamadores.

------------------------------------------------------------------------

## 4. Convenção Adotada

| Nível | Quando usar |
| --- | --- |
| `logger.error` | Erros inesperados em blocos `catch` |
| `logger.warn` | Tentativas inválidas, recursos não encontrados com relevância operacional, bloqueios |
| `logger.info` | Ações críticas de negócio concluídas com sucesso |

Regras obrigatórias:

-   `context` no formato `'MÉTODO /api/rota'` (ex.: `'PATCH /api/portfolio/me'`).
-   `metadata` nunca deve conter senha, token ou dados sensíveis.
-   `console.log` / `console.error` diretos são proibidos em código de runtime.

------------------------------------------------------------------------

## 5. Exceções Permitidas

Scripts interativos de CLI (`scripts/`) podem continuar usando `console`
quando a saída faz parte da experiência de terminal.

Bibliotecas em `src/lib` que não são chamadas durante runtime de API
também ficam fora do escopo de aplicação obrigatória.

------------------------------------------------------------------------

## 6. Cobertura Atual

Todas as rotas abaixo foram migradas para o logger estruturado:

**Autenticação**
-   `src/app/api/auth/forgot-password/route.ts`
-   `src/app/api/auth/register/route.ts`
-   `src/app/api/auth/reset-password/route.ts`
-   `src/app/api/auth/signup/route.ts`
-   `src/app/api/auth/validate-reset-token/route.ts`

**Portfólio**
-   `src/app/api/portfolio/[username]/route.ts`
-   `src/app/api/portfolio/me/route.ts`
-   `src/app/api/portfolio/summary/route.ts`
-   `src/app/api/portfolios/route.ts`

**Disponibilidade**
-   `src/app/api/user-availability/[id]/route.ts`
-   `src/app/api/user-availability/me/route.ts`
-   `src/app/api/user-availability/route.ts`

**Convites**
-   `src/app/api/invite-request/admin/route.ts`
-   `src/app/api/invite-request/route.ts`
-   `src/app/api/invite/[id]/route.ts`
-   `src/app/api/invite/count/route.ts`
-   `src/app/api/invite/route.ts`

**Projetos e Stacks**
-   `src/app/api/project-skill/[id]/route.ts`
-   `src/app/api/project-skill/route.ts`
-   `src/app/api/project-stack/[id]/route.ts`
-   `src/app/api/project-stack/route.ts`
-   `src/app/api/stack-taken/[id]/route.ts`
-   `src/app/api/stack-taken/route.ts`
-   `src/app/api/team-project/[id]/route.ts`
-   `src/app/api/team-project/count/route.ts`
-   `src/app/api/team-project/user/route.ts`

**Skills e Stacks Técnicas**
-   `src/app/api/skill/[id]/route.ts`
-   `src/app/api/skill/count/route.ts`
-   `src/app/api/skill/route.ts`
-   `src/app/api/tech-stack/[id]/route.ts`
-   `src/app/api/tech-stack/count/route.ts`
-   `src/app/api/tech-stack/route.ts`

**Usuários e Admin**
-   `src/app/api/user-admin/[id]/route.ts`
-   `src/app/api/user-admin/route.ts`
-   `src/app/api/user-skill/[id]/route.ts`
-   `src/app/api/user-skill/me/route.ts`
-   `src/app/api/user-skill/route.ts`
-   `src/app/api/user/[id]/route.ts`
-   `src/app/api/user/count/route.ts`

**Outros**
-   `src/app/api/contact/route.ts`
-   `src/app/api/feedback/[id]/route.ts`
-   `src/app/api/feedback/route.ts`
-   `src/app/api/upload/ui-assets/route.ts`

------------------------------------------------------------------------

## 7. Histórico

-   **2026-05-17** — Auditoria inicial realizada. Identificado que apenas 1 rota
    usava o logger estruturado; 37 rotas usavam console direto; 15 sem logging.
-   **2026-06-14** — Padronização concluída. Logger estruturado aplicado em
    todas as rotas de API.
