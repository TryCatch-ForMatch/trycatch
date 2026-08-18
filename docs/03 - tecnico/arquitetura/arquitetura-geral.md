# Documento Técnico — Arquitetura Geral
 
**Classificação:** Documento Técnico
**Camada:** 3 — Técnico
**Status:** Consolidado — substitui `arquitetura-geral.md` e `arquitetura-geral-atualizado.md`
 
> 🔀 **Consolidação.** Existiam dois arquivos com o mesmo título e conteúdos
> divergentes. Este documento os funde. O arquivo `arquitetura-geral-atualizado.md`
> **deve ser removido do repositório** — manter dois documentos concorrentes viola
> o Documento 0, seção 4.
 
---
 
## 1. Stack principal
 
- Next.js 16 (App Router)
- TypeScript
- Prisma 7 + PostgreSQL
- NextAuth v4 (JWT)
- TanStack Query v5 (estado de servidor no cliente)
- Tailwind 4
- Zod 4
- Jest
---
 
## 2. Modelo arquitetural
 
Monólito modular evolutivo.
 
Separação lógica por domínios, com possibilidade futura de extração de serviços
conforme os critérios da seção 12.
 
---
 
## 3. Separação de domínios
 
- Autenticação
- Perfis e Portfólio (público e privado)
- Projetos
- Skills e Stacks
- Convites
- Feedback e Reputação
- Administração
---
 
## 4. Estrutura de rotas (App Router)
 
```
src/app/
  (auth)/          # Login, registro, esqueci/reset senha — sem layout wrapper
  (public)/        # Landing, listagem de portfólios, portfólio individual
  (private)/       # /dashboard/** — todas as rotas exigem sessão ativa
  api/             # Route handlers
```
 
---
 
## 5. Providers globais
 
Centralizados em `src/providers/index.tsx`, incluídos uma única vez no layout raiz
(`src/app/layout.tsx`).
 
- `QueryProvider` — TanStack Query
- `SessionProvider` — NextAuth
---
 
## 6. Layout do dashboard
 
Shell único em `src/app/(private)/dashboard/layout.tsx` (Navbar + DashboardHeader
+ área de conteúdo) para todas as rotas privadas.
O componente `BasePage` foi removido — duplicava Navbar e Header em cada página.
 
---
 
## 7. Camada de serviço
 
Lógica de negócio em `src/lib/*.service.ts`. O route handler apenas orquestra:
valida entrada, chama o serviço, mapeia erro para status HTTP.
 
Referência de qualidade: `src/lib/portfolio.service.ts`, com `getPublicPortfolio()`
e `listPublicPortfolios()`.
 
Serviços lançam erros semânticos (ex.: `PortfolioNotFoundError`) para que os
handlers mapeiem códigos HTTP sem acoplar domínio a transporte.
 
Server Components que precisam de dados chamam os serviços diretamente, sem fetch
HTTP interno — elimina latência de serialização e dependência de URL local.
 
---
 
## 8. Padrões obrigatórios de rota
 
- Validação de entrada com **Zod**, na borda (início do handler);
- Verificação de sessão via `checkAuth` em toda rota nova;
- Verificação de propriedade do recurso, não apenas de identidade;
- Respostas via `buildResponse` (`src/constants/messages.ts`);
- Mensagens de usuário em `MESSAGES`;
- Log via `logger` (`src/lib/logger.ts`) — `console.*` proibido em runtime.
---
 
## 9. Máquina de estados — Project
 
```
BUSCANDO
   ↓  (automático, quando todas as stacks são assumidas)
EM_ANDAMENTO
   ↓  (ação manual e exclusiva do owner)
CONCLUIDO
```
 
Regras:
 
- `BUSCANDO → EM_ANDAMENTO` é automática;
- `EM_ANDAMENTO → CONCLUIDO` é manual e exclusiva do owner;
- Projeto concluído não retorna a `EM_ANDAMENTO`, salvo decisão futura formal;
- **`CONCLUIDO` é pré-requisito de todo o sistema de Feedback.**
> ⚠️ O encerramento manual **não está implementado** (épico #553). Consequência
> arquitetural: o domínio de Feedback está inalcançável em runtime.
 
---
 
## 10. Regra de edição condicional (Project)
 
Antes de existir qualquer `StackTaken`: update completo permitido.
 
Depois de existir ao menos um `StackTaken`: bloqueio de edição estrutural;
permitido apenas append de observação à descrição, concatenado no backend com
date stamp. O backend não aceita substituição integral da descrição.
 
> ⚠️ **A regra está desativada em produção** por defeito na comparação de datas —
> ela travava a edição por completo. A direção acordada é **notificar os
> participantes em vez de bloquear**, mas essa decisão de produto ainda não foi
> desenhada.
 
---
 
## 11. Observabilidade
 
- Logging estruturado obrigatório em todas as rotas de API;
- Logger centralizado em `src/lib/logger.ts`, assinatura
  `logger.info|warn|error(message, context, metadata)`;
- `context` no formato `'MÉTODO /api/rota'`;
- `metadata` nunca contém senha, token, e-mail completo ou dado pessoal;
- Ações críticas registradas: alteração de status de projeto, tentativa bloqueada
  de edição estrutural, encerramento manual, ações de portfólio, criação e
  ocultação de feedback;
- Auditoria completa em
  `docs/03 - tecnico/arquitetura/auditoria-logging-backend.md`.
---
 
## 12. Escalabilidade
 
Critérios para futura separação de serviços:
 
- Crescimento de carga;
- Necessidade de integração externa;
- Gargalos identificados;
- Complexidade excessiva em domínio específico.
Nenhum critério está atendido hoje. **Não separar por antecipação.**
 
---
 
## 13. Dívidas técnicas conhecidas
 
Registradas aqui porque afetam decisão arquitetural, não apenas manutenção.
 
| Dívida | Impacto | Ref. |
|---|---|---|
| `typescript.ignoreBuildErrors: true` no `next.config.ts` | Build passar não significa que compila; ~120 erros de tipo conhecidos | BUG-01 |
| `params` como `Promise` no Next 16, ~20 rotas tipadas como síncrono | Rotas quebradas em runtime | BUG-02 |
| Nenhuma rota usa `select`/`omit` do Prisma | `User` retornado com hash de senha — **falha de segurança ativa** | SEC-03 |
| Dependências com vulnerabilidade | 10 apontamentos em `npm audit` | SEC-07 |
| `package-lock.json` só pode ser gerado em Linux | Lockfile de Windows/macOS quebra o CI | Regra 7 |
 
**Não replicar esses padrões em código novo.** Correção segue o backlog; não
corrigir por conta própria fora de escopo.
 
---
 
## 14. Relação com outros documentos
 
- `docs/03 - tecnico/modelagem/modelagem-dados.md`
- `docs/03 - tecnico/arquitetura/auditoria-logging-backend.md`
- `docs/03 - tecnico/arquitetura/tratamento-de-erros.md`
- `docs/03 - tecnico/adrs.md`
- `docs/04 - processo/ci-e-validacao.md`
---
 
## 15. Histórico
 
| Data | Alteração |
|---|---|
| — | Versão inicial |
| — | Atualização após Portfólio Público, logging estruturado e refatoração de layout |
| Atual | **Consolidação dos dois arquivos divergentes**; adicionadas seções de padrões de rota, dívidas técnicas e dependência do Feedback sobre o encerramento de projeto |