# Documento Técnico — Modelagem de Dados
 
**Classificação:** Documento Técnico
**Camada:** 3 — Técnico
**Status:** Atualizado — seção de Feedback revisada conforme modelo de reputação v2
 
---
 
## 1. Entidades Principais
 
### User
 
#### Identificadores
 
- **id** — identificador interno único, uso exclusivo do sistema.
- **userName** — identificador público único (`@unique`).
  - Chave pública na rota `/portfolio/{username}`;
  - Substitui `id` para exposição externa;
  - Pode ser alterado pelo usuário (regra de produto);
  - Deve ser único no sistema.
#### Campos de Perfil
 
- **bio** — texto de apresentação;
- **github** — URL (nullable; string vazia convertida para `null` no backend);
- **linkedin** — URL (nullable; mesma regra);
- **avatar** — URL do avatar.
#### Campos de Controle de Visibilidade
 
- **showEmail**, **showGithub**, **showLinkedin**, **showCertificates**,
  **showProjects**, **showFeedback**;
- **portfolioPublic** — define se o portfólio é acessível publicamente.
#### Campos de Controle Sistêmico
 
- **isActive** — define se o usuário está ativo na plataforma.
#### Observações Arquiteturais
 
- O campo `emailVisible` foi removido por padronização;
- `id` nunca deve ser usado como identificador público;
- A separação entre identificador interno (`id`) e público (`userName`) é
  obrigatória;
- `github` e `linkedin` aceitam URL válida ou `null`.
---
 
### Project
 
Enumeração **ProjectStatus**: `BUSCANDO`, `EM_ANDAMENTO`, `CONCLUIDO`.
 
#### Regra de Exposição Pública
 
- Apenas projetos `CONCLUIDO` podem ser exibidos no portfólio público;
- `BUSCANDO` e `EM_ANDAMENTO` não são elegíveis.
#### Campo `totalValue`
 
Valor **declarado** do projeto, quando houver. Não representa transação: a
plataforma não intermedia nem processa pagamento. Ver
`docs/01 - estrategia/visao-produto.md`, seção 7.1.
 
---
 
### Feedback
 
> ⚠️ **Esta seção foi revisada.** A versão anterior afirmava: *"a reputação
> atualmente é calculada como média simples dos ratings recebidos"*. **Essa
> afirmação está revogada** por `docs/02 - produto/feedback/feedback-reputacao.md`
> (v2). Média pública de notas contradiz os princípios declarados do produto.
 
#### Estado atual do schema
 
- Relaciona dois usuários (`fromUserId` avaliador, `toUserId` avaliado);
- Vinculado obrigatoriamente a `projectId`;
- Vínculo opcional a `stackTakenId`;
- Campos existentes: `rating`, `comment`, `anonymous`.
#### Modelo alvo (v2) — exige migration
 
A reputação deixa de ser numérica e passa a ser composta por **corroborações**:
atestados de comportamento observável, de lista fechada.
 
Estrutura proposta (pendente de spike técnico):
 
- `Feedback` ganha `publicationAllowed`, `publishedByReceiver`, `hiddenByAdmin`,
  `hiddenReason`;
- Nova entidade `FeedbackAttribute` (ou array de enum) com os eixos;
- Enum `FeedbackAttrEnum` com seis valores fixos;
- Restrição de unicidade em `(projectId, fromUserId, toUserId)`.
#### Destino dos campos legados
 
| Campo | Destino |
|---|---|
| `rating` | Despublicado. Passa a `Int?`, sinal interno para ADMIN. Nunca agregado publicamente. |
| `anonymous` | Sem função de produto. Exibição pública é sempre anônima por regra fixa. Código novo não deve lê-lo. |
 
#### Regras de persistência
 
- `fromUserId` é sempre persistido — a identidade do avaliador nunca é anônima no
  banco;
- Feedback não é editável nem excluível pelo autor;
- Na exclusão de conta aplica-se **anonimização assimétrica**: feedbacks recebidos
  são excluídos; feedbacks dados a terceiros são preservados com `fromUserId`
  substituído por marcador de conta removida. Ver
  `docs/01 - estrategia/governanca/governanca-dados-lgpd.md`, seção 6.3.
#### Agregação pública
 
A consulta pública devolve, por eixo: contagem de **avaliadores distintos** e
contagem de **projetos distintos**, filtrando `hiddenByAdmin = false`, com corte
de N mínimo (3) aplicado **no backend**.
 
---
 
### UserAvailability
 
Disponibilidade semanal do usuário.
 
- **weekday** — 0 (domingo) a 6 (sábado);
- **startTime** / **endTime** — formato `HH:MM`;
- **userId** — referência ao dono.
Regra: um único registro por usuário por dia da semana.
 
#### Gerenciamento de Skills via UserAvailability
 
Skills são gerenciadas junto com a disponibilidade via
`POST /api/user-availability`, com padrão **delete-then-recreate** em transação:
 
1. `UserSkill.deleteMany({ where: { userId } })`
2. `UserSkill.createMany(...)`
Condição de execução: `if (skills !== undefined)` — array vazio limpa todas as
skills.
 
> 🔍 **Observação para revisão futura.** Gerenciar skills dentro da rota de
> disponibilidade acopla dois domínios distintos. Funciona, mas é
> contraintuitivo para quem chega. Candidato a issue própria — não corrigir fora
> de escopo.
 
---
 
### Invite
 
Controle de convites para criação de usuários. Campos: `id`, `email`, `code`,
`used`, `invitedBy`, `role`, `createdAt`, `usedAt`.
 
---
 
### Stack e Skill
 
- **Stack** — tecnologia base, associada a projetos via `ProjectStack` e a pessoas
  via `StackTaken`;
- **Skill** — habilidade individual, associada a usuários via `UserSkill` e a
  projetos via `ProjectSkill`.
---
 
## 2. Relações
 
- Usuários participam de Projetos via `StackTaken`;
- Feedback vincula-se a Projeto e a dois Usuários;
- Invite vincula-se à criação de User;
- User possui múltiplas Skills (`UserSkill`), Certificados (`UserCertificate`) e
  disponibilidades (`UserAvailability`).
---
 
## 3. Regras de Exposição Pública
 
Aplicadas no serviço `getPublicPortfolio()`:
 
1. A URL pública usa exclusivamente `userName`;
2. Usuário inexistente → 404;
3. `isActive = false` → 404;
4. `portfolioPublic = false` → 404;
5. Campos exibidos apenas com o respectivo toggle ativo;
6. Apenas projetos `CONCLUIDO` são exibidos;
7. Email nunca aparece no resumo público (`/portfolios`);
8. Certificados e projetos não aparecem na listagem resumida;
9. Corroborações exibidas apenas com `showFeedback = true` **e** com N mínimo
   atingido;
10. Feedback escrito exibido apenas com `publicationAllowed = true` **e**
    `publishedByReceiver = true`;
11. As respostas 404 para usuário inexistente e portfólio privado são idênticas.
Todas aplicadas no backend, sem depender do frontend.
 
---
 
## 4. Logging e Auditoria
 
Logging estruturado implementado em todas as rotas de API. Padronização concluída
em 2026-06-14 (ver `auditoria-logging-backend.md`).
 
```ts
logger.info(message: string, context?: string, metadata?: unknown)
logger.warn(...)
logger.error(...)
```
 
Saída JSON com `timestamp`, `level`, `context`, `message`, `metadata`.
 
| Nível | Quando usar |
|---|---|
| `logger.error` | Erros inesperados em `catch` |
| `logger.warn` | Tentativas inválidas, bloqueios, recursos não encontrados com relevância operacional |
| `logger.info` | Ações críticas de negócio concluídas com sucesso |
 
Regras:
 
- `context` no formato `'MÉTODO /api/rota'`;
- `console.*` proibido em runtime;
- Erros inesperados incluem `error.message` nos metadados;
- **Nunca** registrar senha, token, e-mail completo, conteúdo de feedback ou
  qualquer dado pessoal.
**Ações de feedback que exigem log:** criação, ocultação por ADMIN (com motivo),
consulta de autoria mediante denúncia.
 
---
 
## 5. Padrões de Acesso a Dados
 
### Server Component sem HTTP round-trip
 
`/portfolio/{username}` chama `getPublicPortfolio(username)` diretamente,
eliminando dependência de URL local, cache implícito que mascarava mudanças de
visibilidade, e latência de serialização.
 
### PATCH via Prisma `update`
 
`PATCH /api/portfolio/me` usa `prisma.user.update()`. Apenas campos presentes no
payload entram em `updateData` — campos ausentes não sobrescrevem valores
existentes.
 
### Delete-then-recreate para coleções
 
Skills e certificados usam delete-then-recreate, evitando lógica de diff e
garantindo consistência da coleção.
 
---
 
## 6. Princípios Arquiteturais
 
- Integridade referencial via Prisma;
- Separação clara entre dados públicos e privados;
- Minimização de exposição de dados sensíveis;
- Não exposição de identificadores internos;
- Rastreabilidade via logger estruturado;
- Regras de negócio aplicadas no backend.
> 🔴 **Dívida que contradiz os princípios acima (SEC-03):** nenhuma rota usa
> `select`/`omit` do Prisma, e objetos `User` são retornados íntegros — com o hash
> da senha. Isso viola "sem dados sensíveis em queries públicas". É falha ativa,
> não dívida de estilo. Em código novo, nunca retornar `User` cru.
 
---
 
## 7. Histórico
 
| Alteração |
|---|
| Atualizado após Portfólio Público por Username + Segurança e Logging (issue #527) |
| **Revogada** a afirmação de que a reputação é média simples dos ratings |
| Documentado o modelo alvo de corroborações e o destino dos campos legados |
| Registrada a regra de anonimização assimétrica na exclusão de conta |
| Registrada a dívida SEC-03 como contradição ativa com os princípios |