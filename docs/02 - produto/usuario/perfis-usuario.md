# Documento de Produto --- Perfis de Usuário

Classificação: Documento de Produto / Funcionalidade\
Camada: 2 --- Produto\
Status: Atualizado após implementação do Portfólio Público e correções de Disponibilidade

------------------------------------------------------------------------

## 1. Entidades Envolvidas

-   User
-   UserSkill
-   UserAvailability
-   UserCertificate
-   Feedback

------------------------------------------------------------------------

## 2. Estrutura do Perfil

Campos principais do User:

-   name
-   email
-   avatar
-   github (nullable; string vazia convertida para `null` no backend)
-   linkedin (nullable; mesma regra do github)
-   bio
-   userName (identificador público único; usado na URL do portfólio)
-   role (ADMIN, USER, MENTOR)
-   isActive
-   createdAt / updatedAt

### Campos de Controle de Visibilidade do Portfólio

Controlam o que é exibido na página pública `/portfolio/{username}`:

-   **portfolioPublic** — define se o portfólio pode ser acessado publicamente. Se `false`, a rota retorna 404.
-   **showEmail** — exibe o email publicamente.
-   **showGithub** — exibe o GitHub publicamente.
-   **showLinkedin** — exibe o LinkedIn publicamente.
-   **showCertificates** — exibe certificados publicamente.
-   **showProjects** — exibe projetos públicamente (apenas projetos com status `CONCLUIDO`).
-   **showFeedback** — exibe feedbacks recebidos publicamente.

> O campo `emailVisible` foi removido. O controle de visibilidade do email é feito exclusivamente por `showEmail`.

------------------------------------------------------------------------

## 3. Disponibilidade (UserAvailability)

Permite registrar:

-   weekday (0 = domingo … 6 = sábado)
-   startTime / endTime (formato `HH:MM`)

Regra:

-   Um único registro por usuário por dia da semana.

### Gerenciamento de Skills via UserAvailability

Skills são gerenciadas junto com a disponibilidade via `POST /api/user-availability`.
O padrão é **delete-then-recreate** dentro de uma transação:

1. Remove todos os `UserSkill` do usuário.
2. Recria os vínculos com os `skillIds` enviados.

Isso garante que skills removidas sejam persistidas corretamente.
A condição de execução é `if (skills !== undefined)` — enviar array vazio limpa todas as skills.

------------------------------------------------------------------------

## 4. Certificados (UserCertificate)

Permite registrar:

-   title
-   issuer
-   date
-   url
-   description

Impacto:

-   Reforço de credibilidade do perfil.
-   Exibição pública controlada por `showCertificates`.

------------------------------------------------------------------------

## 5. Reputação

-   Feedbacks recebidos
-   Histórico vinculado a projetos reais
-   Sem ranking público
-   Exibição pública controlada por `showFeedback`
-   Avaliador anonimizado no frontend se `anonymous = true`

------------------------------------------------------------------------

## 6. Regras de Negócio

-   Role define permissões sistêmicas.
-   `isActive` controla acesso à plataforma e visibilidade do portfólio (portfólio retorna 404 se `isActive = false`).
-   `portfolioPublic = false` retorna 404 na rota pública — indistinguível de usuário inexistente.
-   Campos `github` e `linkedin` aceitam URL válida ou `null`; string vazia enviada pelo cliente é convertida para `null`.
-   Skills e disponibilidade são gerenciados via delete-then-recreate para garantir consistência.

------------------------------------------------------------------------

## 7. Métricas Relacionadas

-   Taxa de preenchimento de perfil.
-   Número médio de skills por usuário.
-   Correlação disponibilidade ↔ participação em projetos.

------------------------------------------------------------------------

## 8. Relação com Outros Documentos

-   `docs/02 - produto/portfolio/portfolio.md` — regras de visibilidade do portfólio público
-   `docs/03 - tecnico/modelagem/modelagem-dados.md` — modelagem das entidades
