# Documento Técnico — ADRs (Architecture Decision Records)
 
**Classificação:** Documento Técnico
**Camada:** 3 — Técnico
**Status:** Consolidado — registro único de decisões arquiteturais
 
> 🔀 **Consolidação.** O arquivo `adr-email-templates.md` existia solto, sem
> número ("ADR-XXX") e fora deste registro. Ele foi incorporado como **ADR-004** e
> **deve ser removido do repositório.**
 
---
 
## Como usar este documento
 
Uma ADR registra uma decisão arquitetural: o contexto que a exigiu, a decisão
tomada, as alternativas descartadas e as consequências aceitas.
 
**Regras:**
 
- ADR recebe número sequencial no momento da criação. Nunca "ADR-XXX";
- ADR não é apagada. Decisão superada recebe status `Substituída por ADR-NNN`;
- Toda decisão arquitetural relevante gera ADR — ver Documento Estratégico —
  Modelo de Gestão de Trabalho, seção 7;
- ADR extensa pode viver em arquivo próprio, desde que **listada aqui** com número,
  título, status e link.
**Status possíveis:** `Proposta` · `Aprovada` · `Substituída por ADR-NNN` ·
`Revogada`
 
---
 
## Índice
 
| ADR | Título | Status | Data |
|---|---|---|---|
| 001 | Next.js com App Router | Aprovada | — |
| 002 | Prisma ORM | Aprovada | — |
| 003 | Monólito modular | Aprovada | — |
| 004 | Templates de e-mail com React Email | Aprovada | 2026-02-25 |
| 005 | Logger estruturado centralizado | Aprovada | 2026-06-14 |
| 006 | `username` como identificador público e 404 uniforme | Aprovada | — |
| 007 | Camada de serviço separada do route handler | Aprovada | — |
| 008 | Modelo de reputação por corroborações | Proposta | — |
 
---
 
## ADR-001 — Next.js com App Router
 
**Status:** Aprovada
 
**Contexto.** O projeto precisa de frontend e backend em uma base única, com
renderização no servidor e boa experiência de desenvolvimento.
 
**Decisão.** Adotar Next.js com App Router.
 
**Alternativas.** SPA React + API Node separada (mais peças, mais deploy); Remix
(menor familiaridade da comunidade-alvo).
 
**Consequências.** Integração simplificada; acoplamento ao ciclo de releases do
Next; particularidades do App Router (como `params` assíncrono no Next 16) viram
armadilha para quem chega.
 
---
 
## ADR-002 — Prisma ORM
 
**Status:** Aprovada
 
**Contexto.** Acesso a PostgreSQL com tipagem forte e migrations controladas.
 
**Decisão.** Adotar Prisma ORM.
 
**Alternativas.** SQL direto (mais controle, menos produtividade); TypeORM,
Drizzle.
 
**Consequências.** Tipagem forte e produtividade; `prisma generate` obrigatório
após instalação (resolvido via `postinstall`); atenção permanente a `select`/`omit`
para não vazar campos sensíveis.
 
---
 
## ADR-003 — Monólito modular
 
**Status:** Aprovada
 
**Contexto.** Projeto em estágio inicial, equipe variável, sem carga que
justifique distribuição.
 
**Decisão.** Monólito modular evolutivo, com separação lógica por domínio.
 
**Alternativas.** Microsserviços (complexidade sem benefício no estágio atual).
 
**Consequências.** Simplicidade de deploy e onboarding; disciplina de fronteira
entre domínios fica por conta da equipe. Critérios de separação futura em
`arquitetura-geral.md`, seção 12.
 
---
 
## ADR-004 — Templates de e-mail com React Email
 
**Status:** Aprovada
**Data:** 2026-02-25
 
**Contexto.** A plataforma possui múltiplos e-mails transacionais (solicitação de
convite para admin, confirmação para o usuário, reset de senha, contato). Parte
usava HTML inline dentro do service, gerando duplicação de estrutura, dificuldade
de manutenção, inconsistência visual e acoplamento entre layout e lógica.
 
**Decisão.** Adotar **React Email** como padrão oficial de templates.
 
Definições:
 
- Todo template usa `EmailLayout`;
- Nenhum HTML inline em service;
- Envio centralizado via `lib/mail`;
- SDK Resend;
- Cliente Resend instanciado por factory `getResend()` (lazy initialization).
Estrutura:
 
```
lib/
  mail/
    templates/
      layout/
        layout.tsx
        emails-styles.ts
      contact-sender.tsx
      invite-request-confirmation.tsx
      invite-request-receiver.tsx
      invite-request-sender.tsx
      reset-password.tsx
    resend.ts
    send-invite-request-confirmation-email.ts
    send-invite-request-email.ts
    send-reset-password-email.ts
```
 
**Sobre a factory.** O cliente **não** é instanciado no nível do módulo.
`resend.ts` exporta `getResend()`, que cria a instância sob demanda durante o
runtime da requisição:
 
```ts
export function getResend(): Resend {
  // inicializa apenas quando chamado, não no import
}
```
 
Isso evita que a verificação de `RESEND_API_KEY` ocorra durante o build do Next
(fase de coleta de dados das páginas), que causava crash quando a variável não
estava disponível em build time.
 
Testes devem mockar `getResend`, não uma instância global.
 
**Alternativas.** Manter HTML inline; templates do próprio Resend; string HTML
simples. Descartadas por padronização e escalabilidade menores.
 
**Consequências.** Padronização visual, reuso de layout, melhor testabilidade e
separação de responsabilidades; em troca, uma dependência a mais e leve aumento de
complexidade inicial.
 
**Impacto.** Infraestrutura / Comunicação. Não impacta banco, domínio nem regras
de negócio.
 
---
 
## ADR-005 — Logger estruturado centralizado
 
**Status:** Aprovada
**Data:** 2026-06-14
**Issue:** #536
 
**Contexto.** Auditoria de 2026-05-17 encontrou 1 rota com logger estruturado, 37
com `console` direto e 15 sem logging algum. Sem padrão, não há rastreabilidade
nem caminho de migração para serviço externo.
 
**Decisão.** Logger centralizado em `src/lib/logger.ts`, saída JSON com
`timestamp`, `level`, `context`, `message` e `metadata`. `console.*` proibido em
código de runtime; scripts de CLI permanecem como exceção.
 
**Consequências.** Cobertura uniforme; destino trocável sem alterar chamadores;
disciplina permanente para não registrar dado pessoal em `metadata`.
 
Detalhamento em `docs/03 - tecnico/arquitetura/auditoria-logging-backend.md`.
 
---
 
## ADR-006 — `username` como identificador público e 404 uniforme
 
**Status:** Aprovada
 
**Contexto.** A rota pública de portfólio usava `id` interno, expondo
identificador de banco. Além disso, portfólio privado retornava 403 — o que
confirmava a existência da conta.
 
**Decisão.** URL pública usa exclusivamente `username` (único). Portfólio privado,
usuário inativo e usuário inexistente retornam **404 idêntico**.
 
**Alternativas.** Manter `id` (expõe interno); usar 403 para privado (enumeração
de contas).
 
**Consequências.** Não é possível descobrir se uma conta existe pela rota pública;
`username` precisa ser único e sua alteração quebra links externos — geração
automática no cadastro e edição pelo titular seguem pendentes.
 
---
 
## ADR-007 — Camada de serviço separada do route handler
 
**Status:** Aprovada
 
**Contexto.** Lógica de negócio dentro de route handlers impede reuso por Server
Components e dificulta teste unitário.
 
**Decisão.** Lógica em `src/lib/*.service.ts`; handler apenas orquestra. Serviços
lançam erros semânticos; handlers mapeiam para HTTP. Server Components chamam o
serviço diretamente, sem fetch HTTP interno.
 
**Consequências.** Elimina latência de serialização, cache implícito e dependência
de URL local; testes unitários de rota passam a mockar o service, não o Prisma.
 
Referência: `src/lib/portfolio.service.ts`.
 
---
 
## ADR-008 — Modelo de reputação por corroborações
 
**Status:** **Proposta** — aguarda spike de schema
 
**Contexto.** O modelo original previa `rating` numérico agregado como média
simples exibida no portfólio. Isso contradiz os princípios declarados no próprio
documento de produto e nos textos institucionais: sem ranking, sem nota pública,
foco em aprendizado. Uma média pública **é** uma nota; duas médias lado a lado
**são** um ranking.
 
Há ainda o problema de fundo: com IA gerando projetos inteiros, código deixou de
ser evidência de competência colaborativa.
 
**Decisão proposta.** Substituir a nota agregada por **corroborações**: atestados
de comportamento observável, escolhidos de lista fechada de seis eixos, exibidos
com duplo denominador (pessoas × projetos), sem teto e com N mínimo de 3.
Feedback escrito vive em área privada; publicação exige consentimento do autor na
origem e do avaliado no destino. `rating` é despublicado e mantido como sinal
interno.
 
**Alternativas.** Manter média (contradiz princípios); nota por competência
(continua sendo nota, com mais superfície de comparação); só texto livre (não
agrega, não compara, não sustenta portfólio).
 
**Consequências.** Exige migration (nova entidade ou enum de atributos) e nova
rota de agregação; sinal anônimo é menos verificável externamente — mitigado pelo
duplo denominador; agregação por perfil fica mais cara que uma média e precisa ser
medida.
 
**Pendências para aprovação:** estrutura final do schema; prazo do blind duplo;
validação do N mínimo com dados reais.
 
Detalhamento em `docs/02 - produto/feedback/feedback-reputacao.md`.