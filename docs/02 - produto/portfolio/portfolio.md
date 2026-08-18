# Documento de Produto — Portfólio Público e Privado

**Classificação:** Documento de Produto / Funcionalidade\
**Camada:** 2 — Documentos de Produto e Funcionalidades\
**Status do documento:** Implementado (versão consolidada com visibilidade e segurança)  
**Status da implementação:** 🟢 completa — portfólio público, listagem e controle de visibilidade  
**Estado consolidado:** ver [estado-das-funcionalidades.md](../estado-das-funcionalidades.md)

---

## 1. Identificação da Funcionalidade

- **Nome da funcionalidade:** Portfólio Público por Username + Configuração Privada
- **Domínio do produto:** Usuários / Reputação / Exposição Profissional
- **Documento relacionado:** Documento 0 — Visão Geral, Governança e Arquitetura da Documentação

---

## 2. Contexto e Objetivo

O Portfólio permite que usuários exponham suas informações profissionais dentro da plataforma TryCatch, com controle granular sobre o que é visível para visitantes externos.

Resolve os seguintes problemas:

- Apresentação estruturada de habilidades e experiências;
- Facilita formação de equipes por meio de transparência profissional;
- Possibilita compartilhamento externo do perfil via link público;
- Garante que cada usuário controle exatamente o que é exposto publicamente.

---

## 3. Rotas

### Rotas Públicas (sem autenticação)

| Rota | Descrição |
|------|-----------|
| `/portfolios` | Listagem pública paginada de portfólios com filtros |
| `/portfolio/{username}` | Portfólio público individual do usuário |

### Rotas Privadas (autenticação obrigatória)

| Rota | Descrição |
|------|-----------|
| `/dashboard/portfolio` | Configuração privada do portfólio (visibilidade, bio, links) |

---

## 4. Escopo da Funcionalidade

### 4.1 O que a funcionalidade faz

- Exibe dados públicos configurados pelo usuário;
- Permite controle granular de visibilidade por meio de toggles;
- Exibe apenas projetos com status **CONCLUIDO**;
- Agrupa múltiplas stacks assumidas pelo usuário dentro de um mesmo projeto;
- Permite listagem pública resumida em `/portfolios` com busca e filtros;
- Permite compartilhamento externo via URL baseada em `username`;
- Retorna 404 quando o portfólio não deve ser exibido;
- Permite que o usuário configure bio, GitHub, LinkedIn e visibilidade via dashboard privado.

### 4.2 O que a funcionalidade não faz

- Não exibe projetos em andamento ou em busca de equipe;
- Não exibe email no resumo público (`/portfolios`);
- Não expõe dados privados quando toggles estão desativados;
- Não permite edição pública (edição apenas via `/dashboard/portfolio`);
- Não permite descobrir se um usuário existe quando o portfólio é privado.

---

## 5. Usuários Envolvidos e Permissões

### Visitante (não autenticado)

- Pode acessar `/portfolio/{username}`;
- Pode acessar `/portfolios`.

### Usuário Autenticado

- Pode acessar `/dashboard/portfolio`;
- Pode alterar bio, GitHub, LinkedIn e todas as configurações de visibilidade.

### Restrições

- Se `portfolioPublic = false`, a rota pública retorna 404.
- Se `isActive = false`, a rota pública retorna 404.
- A resposta 404 é idêntica para usuário inexistente e portfólio privado (não revela existência do usuário).

---

## 6. Fluxo de Uso (UX)

### Fluxo público — Listagem

1. Visitante acessa `/portfolios`;
2. Visualiza cards resumidos com nome, skills e role;
3. Pode filtrar por nome, username, role ou skill;
4. Clica em um card e é direcionado para `/portfolio/{username}`;
5. Visualiza apenas os dados permitidos pelos toggles do usuário.

### Fluxo público — Portfólio individual

A página pública é composta pelas seguintes seções (exibidas apenas se o toggle correspondente estiver ativo e o portfólio for público):

1. **Identidade** — avatar, nome, bio, email, GitHub, LinkedIn
2. **Tecnologias** — skills cadastradas
3. **Projetos Concluídos** — projetos com status CONCLUIDO
4. **Certificados**
5. **Feedback** *(implementado, exibição configurável)*

### Fluxo privado — Configuração

1. Usuário autenticado acessa `/dashboard/portfolio`;
2. Visualiza formulário com seus dados e toggles atuais;
3. Altera bio, GitHub, LinkedIn e configurações de visibilidade;
4. Salva via `PATCH /api/portfolio/me`;
5. Mudanças são refletidas imediatamente na rota pública (sem cache).

### Estados da página pública

- **404** — usuário inexistente ou portfólio privado;
- **Exibição parcial** — seções ocultas quando toggle desativado;
- **SEO** — metadados dinâmicos (`generateMetadata`) populados com nome e bio do usuário.

---

## 7. Regras de Negócio

1. O portfólio público é identificado exclusivamente por `username`.
2. O campo `username` é único no sistema.
3. Se `portfolioPublic = false` → retornar 404.
4. Se `isActive = false` → retornar 404.
5. Email só é exibido se `showEmail = true`.
6. GitHub só é exibido se `showGithub = true`.
7. LinkedIn só é exibido se `showLinkedin = true`.
8. Certificados só são exibidos se `showCertificates = true`.
9. Feedback só é exibido se `showFeedback = true`.
10. Projetos exibidos apenas se `showProjects = true` **e** `ProjectStatus = CONCLUIDO`.
11. O resumo (`/portfolios`) nunca exibe email, certificados ou projetos.
12. Feedback exibe identificação do avaliador no frontend apenas se não for anônimo (`anonymous = false`).
13. O sistema utiliza logging estruturado em todas as rotas de portfólio.
14. Quando um usuário assume múltiplas stacks em um mesmo projeto, o sistema agrupa em um único card (lógica no backend).
15. A rota pública chama o serviço diretamente (sem fetch interno), eliminando latência de cache.

Todas as regras são aplicadas no backend e testáveis.

---

## 8. Impactos em Dados

### Entidades impactadas

- `User` — campos de visibilidade e perfil
- `UserSkill` — skills do usuário
- `UserCertificate` — certificados
- `Feedback` — feedbacks recebidos
- `StackTaken` — participação em projetos
- `Project` — projetos com status CONCLUIDO

### Dados sensíveis e proteção

| Dado | Controle |
|------|----------|
| Email | Toggle `showEmail`; nunca exposto no resumo |
| GitHub | Toggle `showGithub` |
| LinkedIn | Toggle `showLinkedin` |
| Feedback | Toggle `showFeedback`; avaliador anonimizado se `anonymous = true` |
| Senha | Nunca selecionada em nenhuma query de portfólio |
| `id` interno | Nunca exposto na URL pública (usa `username`) |

---

## 9. Impactos em Reputação e Confiança

O portfólio público impacta diretamente:

- Percepção de competência entre membros;
- Formação de equipes;
- Confiança e transparência na plataforma;
- Exposição profissional externa.

Riscos mitigados:

- Controle granular de visibilidade;
- Exibição apenas de projetos concluídos;
- Impossibilidade de detectar existência de usuário privado via 404 uniforme;
- Logging estruturado para rastreabilidade de acessos.

---

## 10. Comunicação com o Usuário

- 404 para portfólio inexistente ou privado;
- Mensagens de erro padronizadas via `MESSAGES`;
- Toast de sucesso/erro no dashboard privado ao salvar configurações.

Não há comunicação transacional (email) associada nesta versão.

---

## 11. Antipadrões Evitados

- Uso de `id` interno na URL pública (substituído por `username`);
- Exposição automática de dados pessoais sem consentimento;
- Exposição de projetos em andamento;
- `console.log` / `console.error` em produção (substituídos por logger estruturado);
- Retorno 403 para portfólio privado (substituído por 404 por segurança);
- Lógica de agrupamento de projetos no frontend (realizada no backend);
- Fetch HTTP interno com cache no Server Component (substituído por chamada direta ao serviço);
- URL hardcoded `localhost` em produção.

---

## 12. Relação com Implementação Técnica

### Documentos técnicos relacionados

- `docs/03 - tecnico/modelagem/modelagem-dados.md`
- `docs/03 - tecnico/arquitetura/arquitetura-geral.md`
- `docs/03 - tecnico/arquitetura/auditoria-logging-backend.md`

### Templates relacionados

- `docs/templates/02 - template-dados-portfolio.md`

### Pontos técnicos relevantes

- `username` é o único identificador público do portfólio;
- A página `/portfolio/{username}` é um Server Component que chama `getPublicPortfolio()` diretamente;
- A página `/dashboard/portfolio` separa server wrapper (auth + layout) de client component (formulário);
- O formulário privado usa React Hook Form + Zod com hook dedicado `usePortfolioSettings`;
- Logger estruturado com timestamp, nível, contexto e metadados em todas as rotas;
- Filtro `ProjectStatus.CONCLUIDO` aplicado na query Prisma;
- A resposta pública retorna projetos já agrupados por `projectId`.

---

## 13. Histórico de Decisões

- Substituição de busca por `id` para `username` na URL pública;
- Retorno 404 (em vez de 403) para portfólio privado;
- Implementação de toggles de visibilidade granulares;
- Restrição de exibição a projetos com status CONCLUIDO;
- Adoção de logging estruturado em todas as rotas;
- Agrupamento de stacks por projeto realizado no backend;
- Chamada direta ao serviço no Server Component (elimina cache e dependência de URL local);
- Separação de server component e client component na rota privada.

---

## 14. Status e Próximos Passos

### Status atual

Implementado — visibilidade, segurança, logging e separação público/privado concluídos.

### Itens concluídos nesta iteração

- ✅ Controle de visibilidade por toggle (backend + frontend)
- ✅ Logging estruturado em todas as rotas de portfólio
- ✅ SEO com `generateMetadata` dinâmico
- ✅ Separação clara entre rota pública e privada
- ✅ Eliminação de cache e URL hardcoded no Server Component
- ✅ Correção do PATCH (dados não estavam sendo persistidos)
- ✅ Suporte a GitHub e LinkedIn no PATCH

### Próximos passos

- Criar geração automática de `username` no cadastro;
- Permitir edição de `username` pelo usuário;
- Definir modelo definitivo de reputação e média de feedback;
- Implementar versão interna ampliada para formação de equipes;
- Revisar padronização visual do portfólio.
