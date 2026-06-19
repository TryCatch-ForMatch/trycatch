# Documento Técnico --- Modelagem de Dados

Classificação: Documento Técnico\
Camada: 3 --- Técnico\
Status: Atualizado após implementação do Portfólio Público por Username + Segurança e Logging (issue #527)

------------------------------------------------------------------------

## 1. Entidades Principais

### User

#### Identificadores

-   **id**: Identificador interno único (uso exclusivo do sistema).
-   **userName**: Identificador público único (`@unique`).
    -   Utilizado como chave pública na rota `/portfolio/{username}`.
    -   Substitui o uso de `id` para exposição externa.
    -   Pode ser alterado pelo usuário (regra de produto).
    -   Deve ser único no sistema.

#### Campos de Perfil

-   **bio**: Texto de apresentação.
-   **github**: URL do perfil no GitHub (nullable; string vazia convertida para `null` no backend).
-   **linkedin**: URL do perfil no LinkedIn (nullable; mesma regra do GitHub).
-   **avatar**: URL do avatar.

#### Campos de Controle de Visibilidade

-   **showEmail**: controla exibição pública do email.
-   **showGithub**: controla exibição pública do GitHub.
-   **showLinkedin**: controla exibição pública do LinkedIn.
-   **showCertificates**: controla exibição pública de certificados.
-   **showProjects**: controla exibição pública de projetos.
-   **showFeedback**: controla exibição pública de feedbacks.
-   **portfolioPublic**: define se o portfólio pode ser acessado publicamente.

#### Campos de Controle Sistêmico

-   **isActive**: define se o usuário está ativo na plataforma.

#### Observações Arquiteturais

-   O campo `emailVisible` foi removido para padronização.
-   O `id` nunca deve ser utilizado como identificador público.
-   A separação entre identificador interno (`id`) e público (`userName`) é obrigatória.
-   Campos `github` e `linkedin` aceitam URL válida ou `null`. String vazia enviada pelo cliente é convertida para `null` antes da persistência.

------------------------------------------------------------------------

### Project

-   Possui enumeração **ProjectStatus**:
    -   `BUSCANDO`
    -   `EM_ANDAMENTO`
    -   `CONCLUIDO`

#### Regra de Exposição Pública

-   Apenas projetos com status **CONCLUIDO** podem ser exibidos no portfólio público.
-   Projetos em `BUSCANDO` ou `EM_ANDAMENTO` não são elegíveis para exposição pública.

------------------------------------------------------------------------

### Feedback

-   Relaciona dois usuários (avaliador e avaliado).
-   O campo `fromUser` é persistido no banco para rastreabilidade.
-   No frontend público, a identificação do avaliador é anonimizada se `anonymous = true`.
-   A reputação atualmente é calculada como média simples dos ratings recebidos.

------------------------------------------------------------------------

### UserAvailability

Representa a disponibilidade semanal de um usuário para participar de projetos.

-   **weekday**: dia da semana (0 = domingo … 6 = sábado).
-   **startTime** / **endTime**: horário de disponibilidade no formato `HH:MM`.
-   **userId**: referência ao usuário dono da disponibilidade.

#### Gerenciamento de Skills via UserAvailability

Skills do usuário são gerenciadas junto com a disponibilidade via `POST /api/user-availability`. O padrão utilizado é **delete-then-recreate** dentro de uma transação:

1. `UserSkill.deleteMany({ where: { userId } })` — remove todos os vínculos existentes.
2. `UserSkill.createMany(...)` — recria os vínculos com os skillIds enviados.

Isso garante consistência sem precisar diferenciar inserções de atualizações.

------------------------------------------------------------------------

### Invite

Entidade responsável pelo controle de convites para criação de usuários.

------------------------------------------------------------------------

### Stack

Representa tecnologias associadas a projetos e usuários.

------------------------------------------------------------------------

### Skill

Representa habilidades individuais associadas a usuários via `UserSkill`.

------------------------------------------------------------------------

## 2. Relações

-   Usuários participam de Projetos via `StackTaken`.
-   Feedback está vinculado a Projeto e Usuários.
-   Invite vincula criação de User.
-   User possui múltiplas Skills via `UserSkill`.
-   User possui múltiplos Certificados via `UserCertificate`.
-   User possui múltiplas disponibilidades via `UserAvailability`.

------------------------------------------------------------------------

## 3. Regras de Exposição Pública

As seguintes regras são aplicadas nas rotas públicas e validadas no serviço `getPublicPortfolio()`:

1.  A URL pública utiliza exclusivamente `userName`.
2.  Se o usuário não existir → retornar 404.
3.  Se `isActive = false` → retornar 404.
4.  Se `portfolioPublic = false` → retornar 404.
5.  Campos são exibidos apenas se seus respectivos toggles estiverem ativos.
6.  Apenas projetos com `ProjectStatus.CONCLUIDO` são exibidos.
7.  Email nunca é exibido no resumo público (`/portfolios`).
8.  Certificados e projetos não aparecem na listagem resumida.
9.  Feedback é exibido apenas se `showFeedback = true`.
10. As respostas 404 para usuário inexistente e portfólio privado são idênticas (não revelam existência do usuário).

Essas regras são aplicadas no backend e não dependem do frontend.

------------------------------------------------------------------------

## 4. Logging e Auditoria

Logging estruturado implementado em **todas** as rotas de API em `src/app/api`.
A padronização foi concluída em 2026-06-14 (detalhes em
`docs/03 - tecnico/arquitetura/auditoria-logging-backend.md`).

### Formato dos logs

Todos os logs utilizam o logger estruturado em `src/lib/logger.ts`:

```ts
logger.info(message, context, metadata)
logger.warn(message, context, metadata)
logger.error(message, context, metadata)
```

Assinatura real:

```ts
logger.info(message: string, context?: string, metadata?: unknown)
```

Saída em JSON com campos: `timestamp`, `level`, `context`, `message`, metadados livres.

### Convenção de uso

| Nível | Quando usar |
|-------|-------------|
| `logger.error` | Erros inesperados em blocos `catch` |
| `logger.warn` | Tentativas inválidas, bloqueios, recursos não encontrados com relevância operacional |
| `logger.info` | Ações críticas de negócio concluídas com sucesso |

### Regras

-   `context` no formato `'MÉTODO /api/rota'` (ex.: `'PATCH /api/portfolio/me'`).
-   `console.log` / `console.error` não devem ser utilizados em código de runtime.
-   Erros inesperados sempre incluem `error.message` nos metadados.
-   Dados sensíveis (senha, token) nunca devem aparecer nos logs.

------------------------------------------------------------------------

## 5. Padrões de Acesso a Dados

### Server Component sem HTTP round-trip

A rota pública `/portfolio/{username}` chama `getPublicPortfolio(username)` diretamente (serviço Prisma), sem fetch interno. Isso elimina:

-   Dependência de URL local (`localhost`) em produção.
-   Cache implícito (`{ next: { revalidate: 60 } }`) que mascarava mudanças de visibilidade.
-   Latência de serialização/desserialização HTTP desnecessária.

### PATCH via Prisma `update`

O endpoint `PATCH /api/portfolio/me` utiliza `prisma.user.update()` (não `findUnique`). Apenas campos presentes no payload são incluídos em `updateData` — campos ausentes não sobrescrevem valores existentes.

### Delete-then-recreate para coleções

Skills e certificados são gerenciados pelo padrão delete-then-recreate:

```ts
await prisma.userSkill.deleteMany({ where: { userId } });
await prisma.userSkill.createMany({ data: [...] });
```

Isso evita lógica de diff e garante consistência da coleção após cada atualização.

------------------------------------------------------------------------

## 6. Princípios Arquiteturais

-   Integridade referencial garantida via Prisma.
-   Separação clara entre dados públicos e privados.
-   Minimização de exposição de dados sensíveis.
-   Não exposição de identificadores internos.
-   Rastreamento histórico e auditabilidade via logger estruturado.
-   Aplicação consistente de regras de negócio no backend.
-   Sem dados sensíveis em queries públicas (`password`, `token` nunca selecionados).
