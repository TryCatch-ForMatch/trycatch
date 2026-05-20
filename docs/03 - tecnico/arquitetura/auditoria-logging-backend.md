# Auditoria de Logging no Backend

Classificação: Documento Técnico\
Camada: 3 - Técnico\
Status: Auditoria inicial\
Issue relacionada: #536\
Data da auditoria: 2026-05-17

------------------------------------------------------------------------

## 1. Objetivo

Mapear o uso atual de logs no backend para identificar:

-   Uso direto de `console.log`, `console.error`, `console.warn` e
    `console.info`;
-   Uso do logger estruturado em `src/lib/logger.ts`;
-   Rotas sem registro de log identificado;
-   Padrões inconsistentes que devem ser ajustados em etapa posterior.

Esta auditoria não altera código de produção. O objetivo é registrar o
estado atual para orientar a padronização futura.

------------------------------------------------------------------------

## 2. Escopo

Foram analisados:

-   Rotas de API em `src/app/api`;
-   Bibliotecas de suporte em `src/lib`;
-   Scripts operacionais em `scripts`.

Arquivos de frontend e componentes visuais ficaram fora do escopo, exceto
quando importam ou chamam rotas indiretamente.

------------------------------------------------------------------------

## 3. Método de auditoria

Busca textual executada sobre o backend com os seguintes padrões:

-   `console.log`
-   `console.error`
-   `console.warn`
-   `console.info`
-   `logger.info`
-   `logger.warn`
-   `logger.error`

Resumo encontrado em `src/app/api`:

| Item | Quantidade |
| --- | ---: |
| Rotas de API analisadas | 53 |
| Rotas com logger estruturado | 1 |
| Rotas com uso direto de console | 37 |
| Rotas sem logging identificado | 15 |
| Rotas com `catch` sem logging identificado | 3 |

------------------------------------------------------------------------

## 4. Estado atual do logger estruturado

O projeto já possui um logger centralizado em:

-   `src/lib/logger.ts`

Esse logger gera entradas com:

-   `timestamp`;
-   `level`;
-   `context`;
-   `message`;
-   `metadata`.

O uso real ainda é limitado. A única rota de API identificada usando
`logger.info`, `logger.warn` ou `logger.error` é:

-   `src/app/api/portfolio/[username]/route.ts`

O uso de `console` dentro de `src/lib/logger.ts` é intencional porque ele
centraliza a saída atual. A inconsistência está no uso direto de `console`
fora desse módulo.

------------------------------------------------------------------------

## 5. Rotas com uso direto de console

As rotas abaixo usam `console.log`, `console.error`, `console.warn` ou
`console.info` diretamente:

-   `src/app/api/auth/register/route.ts`
-   `src/app/api/auth/signup/route.ts`
-   `src/app/api/contact/route.ts`
-   `src/app/api/feedback/[id]/route.ts`
-   `src/app/api/feedback/route.ts`
-   `src/app/api/invite-request/admin/route.ts`
-   `src/app/api/invite-request/route.ts`
-   `src/app/api/invite/[id]/route.ts`
-   `src/app/api/invite/count/route.ts`
-   `src/app/api/invite/route.ts`
-   `src/app/api/portfolio/summary/route.ts`
-   `src/app/api/project-skill/[id]/route.ts`
-   `src/app/api/project-skill/route.ts`
-   `src/app/api/project-stack/[id]/route.ts`
-   `src/app/api/project-stack/route.ts`
-   `src/app/api/skill/[id]/route.ts`
-   `src/app/api/skill/count/route.ts`
-   `src/app/api/skill/route.ts`
-   `src/app/api/stack-taken/[id]/route.ts`
-   `src/app/api/stack-taken/route.ts`
-   `src/app/api/team-project/[id]/route.ts`
-   `src/app/api/team-project/count/route.ts`
-   `src/app/api/team-project/user/route.ts`
-   `src/app/api/tech-stack/[id]/route.ts`
-   `src/app/api/tech-stack/count/route.ts`
-   `src/app/api/tech-stack/route.ts`
-   `src/app/api/upload/ui-assets/route.ts`
-   `src/app/api/user-admin/[id]/route.ts`
-   `src/app/api/user-admin/route.ts`
-   `src/app/api/user-availability/[id]/route.ts`
-   `src/app/api/user-availability/me/route.ts`
-   `src/app/api/user-availability/route.ts`
-   `src/app/api/user-skill/[id]/route.ts`
-   `src/app/api/user-skill/me/route.ts`
-   `src/app/api/user-skill/route.ts`
-   `src/app/api/user/[id]/route.ts`
-   `src/app/api/user/count/route.ts`

### Observações

-   A maior parte dos registros usa `console.error`.
-   Existem mensagens com formatos diferentes, algumas com contexto textual
    e outras apenas com o objeto de erro.
-   Algumas rotas usam `console.log` para erros, o que dificulta filtros por
    severidade.
-   Não há padrão único para contexto da rota, método HTTP ou metadados.

------------------------------------------------------------------------

## 6. Rotas sem logging identificado

As rotas abaixo não apresentaram uso de `console` nem do logger estruturado:

-   `src/app/api/auth/[...nextauth]/route.ts`
-   `src/app/api/auth/forgot-password/route.ts`
-   `src/app/api/auth/reset-password/route.ts`
-   `src/app/api/auth/validate-reset-token/route.ts`
-   `src/app/api/invite-request/admin/[id]/route.ts`
-   `src/app/api/metrics/route.ts`
-   `src/app/api/portfolio/me/route.ts`
-   `src/app/api/team-project/route.ts`
-   `src/app/api/team-project/summary/route.ts`
-   `src/app/api/team-project/summary/status/route.ts`
-   `src/app/api/upload/avatar/route.ts`
-   `src/app/api/user-certificate/[id]/route.ts`
-   `src/app/api/user-certificate/route.ts`
-   `src/app/api/user/me/route.ts`
-   `src/app/api/user/route.ts`

Nem toda rota sem logging é necessariamente incorreta. Algumas podem não ter
blocos `catch` ou podem delegar erros para bibliotecas externas. Ainda assim,
essas rotas devem ser revisadas para confirmar se erros inesperados e ações
críticas precisam de registro.

------------------------------------------------------------------------

## 7. Rotas com catch sem logging identificado

As rotas abaixo possuem tratamento de erro, mas não registram o erro em log:

-   `src/app/api/auth/forgot-password/route.ts`
-   `src/app/api/auth/reset-password/route.ts`
-   `src/app/api/auth/validate-reset-token/route.ts`

Esses arquivos devem ser priorizados em uma etapa de padronização porque já
capturam falhas, mas descartam o detalhe operacional antes de retornar a
resposta.

------------------------------------------------------------------------

## 8. Bibliotecas e scripts com uso direto de console

Uso direto identificado fora de `src/app/api`:

-   `scripts/code-reviewer.ts`
-   `scripts/createTestUser.js`
-   `scripts/fix-contributors-style.js`
-   `src/lib/check-auth.ts`
-   `src/lib/check-project-status.ts`

Scripts interativos podem continuar usando console quando a saída for parte
da experiência de CLI. Já bibliotecas em `src/lib` devem ser avaliadas com
mais cuidado porque podem ser chamadas em fluxos de runtime da aplicação.

------------------------------------------------------------------------

## 9. Inconsistências encontradas

-   O logger estruturado existe, mas ainda não é usado como padrão nas rotas.
-   O backend mistura `console.error`, `console.log` e mensagens livres para
    falhas operacionais.
-   Algumas mensagens registram apenas o objeto de erro, sem contexto de rota.
-   Algumas mensagens usam emojis ou textos variados, o que dificulta busca e
    agregação em ambiente produtivo.
-   Não há convenção única para `context`, método HTTP, recurso afetado ou
    metadados sanitizados.
-   Rotas de autenticação possuem tratamentos que retornam resposta ao
    cliente sem registro operacional do erro.

------------------------------------------------------------------------

## 10. Recomendação para a próxima etapa

Em uma tarefa futura, padronizar as rotas para usar `src/lib/logger.ts` com:

-   `logger.error` em falhas inesperadas;
-   `logger.warn` para tentativas inválidas, bloqueios ou recursos não
    encontrados quando houver relevância operacional;
-   `logger.info` para ações críticas de negócio;
-   `context` no formato `METHOD /api/resource`;
-   `metadata` sem dados sensíveis;
-   Remoção de `console.log` em código de runtime.

Prioridade sugerida:

1.  Rotas com `catch` sem logging;
2.  Rotas que usam `console.log` para erro;
3.  Rotas de domínios críticos como autenticação, convites, projetos e
    portfólio;
4.  Bibliotecas em `src/lib` chamadas durante runtime;
5.  Scripts operacionais, quando não forem interativos.
