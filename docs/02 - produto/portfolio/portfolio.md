# Documento de Produto — Portfólio Público e Privado
 
**Classificação:** Documento de Produto / Funcionalidade
**Camada:** 2 — Documentos de Produto e Funcionalidades
**Status do documento:** Consolidado — seção de Feedback atualizada para o modelo v2
**Status da implementação:** 🟡 parcial — portfólio, listagem e visibilidade prontos; bloco de corroborações pendente
**Estado consolidado:** ver [estado-das-funcionalidades.md](../estado-das-funcionalidades.md)
 
> 🔄 **Mudança de status.** A versão anterior marcava 🟢 completa. Com a revisão do
> modelo de reputação, o bloco de feedback do portfólio precisa ser reconstruído —
> a exibição atual pressupõe `rating`, que deixou de ser público.
 
---
 
## 1. Identificação da Funcionalidade
 
- **Nome:** Portfólio Público por Username + Configuração Privada
- **Domínio:** Usuários / Reputação / Exposição Profissional
- **Documentos relacionados:** Feedback e Reputação; Perfis de Usuário;
  Governança de Dados e LGPD; Documento 0
---
 
## 2. Contexto e Objetivo
 
O Portfólio permite que membros exponham informações profissionais com controle
granular sobre o que é visível externamente.
 
Resolve:
 
- Apresentação estruturada de habilidades e experiências;
- Transparência profissional que facilita formação de equipes;
- Compartilhamento externo do perfil via link público;
- Controle preciso do que cada pessoa expõe.
**Com a erosão do código como evidência de competência, o portfólio ganha uma
função nova:** reunir sinais que uma ferramenta de IA não produz — projetos
concluídos em equipe real e corroborações de conduta dadas por quem trabalhou
junto.
 
---
 
## 3. Rotas
 
### Públicas (sem autenticação)
 
| Rota | Descrição |
|---|---|
| `/portfolios` | Listagem pública paginada com filtros |
| `/portfolio/{username}` | Portfólio público individual |
 
### Privadas (autenticação obrigatória)
 
| Rota | Descrição |
|---|---|
| `/dashboard/portfolio` | Configuração de visibilidade, bio e links |
 
---
 
## 4. Escopo da Funcionalidade
 
### 4.1 O que faz
 
- Exibe dados públicos configurados pelo titular;
- Controle granular de visibilidade por toggles;
- Exibe apenas projetos `CONCLUIDO`;
- Agrupa múltiplas stacks do mesmo projeto em um card;
- Listagem pública resumida em `/portfolios` com busca e filtros;
- Compartilhamento externo via URL baseada em `username`;
- Retorna 404 quando o portfólio não deve ser exibido;
- Permite configurar bio, GitHub, LinkedIn e visibilidade no dashboard privado.
### 4.2 O que não faz
 
- Não exibe projetos em andamento ou em busca de equipe;
- Não exibe email no resumo público;
- Não expõe dados com toggle desativado;
- Não permite edição pública;
- Não revela se um usuário existe quando o portfólio é privado;
- **Não exibe nota, média, ranking ou comparação entre membros.**
---
 
## 5. Usuários e Permissões
 
**Visitante:** acessa `/portfolio/{username}` e `/portfolios`.
 
**Autenticado:** acessa `/dashboard/portfolio` e altera bio, links e visibilidade.
 
**Restrições:**
 
- `portfolioPublic = false` → 404;
- `isActive = false` → 404;
- 404 idêntico para usuário inexistente e portfólio privado.
---
 
## 6. Fluxo de Uso (UX)
 
### 6.1 Listagem pública
 
1. Visitante acessa `/portfolios`;
2. Vê cards resumidos com nome, skills e papel;
3. Filtra por nome, username, papel ou skill;
4. Clica e vai para `/portfolio/{username}`.
### 6.2 Portfólio individual
 
Seções, exibidas conforme os toggles:
 
1. **Identidade** — avatar, nome, bio, email, GitHub, LinkedIn
2. **Tecnologias** — skills cadastradas
3. **Projetos Concluídos** — apenas status `CONCLUIDO`
4. **Certificados**
5. **Corroborações** — ver seção 7
### 6.3 Configuração privada
 
1. Acessa `/dashboard/portfolio`;
2. Altera dados e toggles;
3. Salva via `PATCH /api/portfolio/me`;
4. Mudanças refletidas imediatamente na rota pública (sem cache).
---
 
## 7. Seção de Corroborações — especificação
 
> Substitui integralmente a exibição de feedback baseada em `rating`.
> Fonte: `docs/02 - produto/feedback/feedback-reputacao.md`.
 
### 7.1 Formato
 
```
🗣️  Avisa antes de travar        4 pessoas · 3 projetos
📦  Entrega o que assume         5 pessoas · 3 projetos
🤝  Puxa a equipe junto          3 pessoas · 2 projetos
```
 
### 7.2 Regras de exibição
 
1. Exibida apenas com `showFeedback = true`;
2. Eixo só aparece com **≥ 3 atestados de pessoas distintas** (corte no backend);
3. Sempre com **duplo denominador**: pessoas **e** projetos;
4. Ordenação por volume de atestados;
5. Identidade do avaliador **nunca** exibida;
6. Feedback ocultado por ADMIN não entra na agregação.
### 7.3 Proibições visuais
 
Não usar: barra de progresso, termômetro, gauge, estrelas, percentual, nota,
badge de nível, comparação com média da plataforma, ou qualquer elemento com teto
implícito.
 
Intensidade pode ser sinalizada por peso tipográfico, opacidade ou tamanho —
nunca por preenchimento.
 
### 7.4 Texto de feedback publicado
 
Exibido apenas quando **ambas** as condições se cumprem:
 
- `publicationAllowed = true` (autor autorizou na escrita);
- `publishedByReceiver = true` (avaliado escolheu exibir).
Exibido sem identificação do autor, com contexto de projeto.
 
### 7.5 Estado vazio
 
Quem ainda não tem corroborações suficientes **não exibe a seção** — não exibe
seção vazia, nem "0 avaliações", nem mensagem de incompletude. Ausência de
evidência não é sinal negativo.
 
### 7.6 Acessibilidade
 
- Cada selo tem rótulo textual completo, independente do emoji;
- O emoji é decorativo (`aria-hidden`), nunca portador único de significado;
- Contagens legíveis por leitor de tela em frase completa.
---
 
## 8. Regras de Negócio
 
1. Portfólio identificado exclusivamente por `username` (único);
2. `portfolioPublic = false` → 404;
3. `isActive = false` → 404;
4. Email exibido só se `showEmail = true`;
5. GitHub só se `showGithub = true`;
6. LinkedIn só se `showLinkedin = true`;
7. Certificados só se `showCertificates = true`;
8. Corroborações só se `showFeedback = true` **e** N mínimo atingido;
9. Projetos só se `showProjects = true` **e** status `CONCLUIDO`;
10. O resumo (`/portfolios`) nunca exibe email, certificados, projetos ou
    corroborações;
11. Texto de feedback exige dupla autorização (seção 7.4);
12. Identidade do avaliador nunca é exposta publicamente;
13. Logging estruturado em todas as rotas de portfólio;
14. Múltiplas stacks no mesmo projeto agrupadas em um card, no backend;
15. A rota pública chama o serviço diretamente, sem fetch interno.
Todas aplicadas no backend e testáveis.
 
---
 
## 9. Impactos em Dados
 
**Entidades:** `User`, `UserSkill`, `UserCertificate`, `Feedback`,
`FeedbackAttribute`, `StackTaken`, `Project`.
 
| Dado | Controle |
|---|---|
| Email | `showEmail`; nunca no resumo |
| GitHub / LinkedIn | `showGithub` / `showLinkedin` |
| Corroborações | `showFeedback` + N mínimo; avaliador sempre anônimo |
| Texto de feedback | Dupla autorização; autor sempre anônimo |
| Senha | Nunca selecionada em query de portfólio |
| `id` interno | Nunca exposto na URL |
 
---
 
## 10. Impactos em Reputação e Confiança
 
O portfólio é a superfície onde a reputação se torna pública. Isso o torna o ponto
de maior risco de dano involuntário.
 
Riscos mitigados:
 
- Controle granular de visibilidade;
- Apenas projetos concluídos;
- 404 uniforme impede detectar existência de conta;
- Sem sinal negativo público;
- N mínimo impede que uma avaliação isolada vire rótulo;
- Duplo denominador dificulta conluio;
- Logging para rastreabilidade.
---
 
## 11. Comunicação com o Usuário
 
- 404 para portfólio inexistente ou privado;
- Mensagens padronizadas via `MESSAGES`;
- Toast de sucesso/erro no dashboard privado;
- Ao ativar `showFeedback`, a interface deve explicar **o que exatamente ficará
  visível** — corroborações agregadas e anônimas, nunca notas.
---
 
## 12. Antipadrões Evitados
 
- `id` interno na URL pública;
- Exposição de dados pessoais sem consentimento;
- Exposição de projetos em andamento;
- `console.*` em runtime;
- 403 para portfólio privado (substituído por 404);
- Agrupamento de projetos no frontend;
- Fetch HTTP interno com cache no Server Component;
- URL `localhost` hardcoded;
- **Média de notas exibida publicamente;**
- **Termômetro, barra ou estrelas na seção de reputação;**
- **Seção de reputação vazia sugerindo perfil incompleto.**
---
 
## 13. Relação com Implementação Técnica
 
- `docs/03 - tecnico/modelagem/modelagem-dados.md`
- `docs/03 - tecnico/arquitetura/arquitetura-geral.md`
- `docs/02 - produto/feedback/feedback-reputacao.md`
- `docs/templates/02 - template-dados-portfolio.md`
Pontos relevantes:
 
- `username` é o único identificador público;
- `/portfolio/{username}` é Server Component chamando `getPublicPortfolio()`;
- `/dashboard/portfolio` separa server wrapper de client component;
- Formulário privado usa React Hook Form + Zod com `usePortfolioSettings`;
- Filtro `ProjectStatus.CONCLUIDO` na query Prisma;
- Resposta pública retorna projetos já agrupados por `projectId`;
- **Nova:** agregação de corroborações por eixo, com corte de N mínimo no backend.
---
 
## 14. Histórico de Decisões
 
- Substituição de `id` por `username` na URL pública;
- 404 em vez de 403 para portfólio privado;
- Toggles de visibilidade granulares;
- Exibição restrita a projetos `CONCLUIDO`;
- Logging estruturado;
- Agrupamento de stacks no backend;
- Chamada direta ao serviço no Server Component;
- Separação server/client na rota privada;
- **Substituída a exibição de feedback por nota pelo bloco de corroborações;**
- **Proibida qualquer representação com teto na seção de reputação;**
- **Texto de feedback só publicado com dupla autorização.**
---
 
## 15. Status e Próximos Passos
 
### Concluído
 
- ✅ Controle de visibilidade por toggle
- ✅ Logging estruturado
- ✅ SEO com `generateMetadata`
- ✅ Separação pública/privada
- ✅ Eliminação de cache e URL hardcoded
- ✅ Correção do PATCH
- ✅ Suporte a GitHub e LinkedIn
### Pendente
 
- 🔴 Bloco de corroborações (depende do modelo de feedback v2)
- 🔴 Exibição de texto de feedback com dupla autorização
- 🟡 Tela para cadastro de certificados pelo próprio membro
- 🟡 Geração automática de `username` no cadastro
- 🟡 Edição de `username` pelo titular
- ⚪ Versão interna ampliada para formação de equipes
- ⚪ Revisão de padronização visual
 