# Estado das Funcionalidades
 
**Classificação:** Documento de Produto / Consolidado
**Camada:** 2 — Documentos de Produto e Funcionalidades
**Status do documento:** consolidado
**Última verificação contra o código:** 17/10/2026
**Última revisão documental:** 17/10/2026
 
---
 
## 1. Para que serve
 
Este documento responde a uma pergunta só: **o que já está funcionando e o que
ainda falta.**
 
Ele existe porque os documentos de produto descrevem como cada funcionalidade
*deve* se comportar, mas não dizem se ela está no ar.
 
> ⚠️ **Não substitui os documentos de produto.** Aponta para eles. As regras de
> negócio, os critérios e os detalhes continuam lá.
 
---
 
## 2. Legenda
 
| Situação | Significa |
|---|---|
| 🟢 **Completa** | Backend e interface prontos, em uso |
| 🟡 **Parcial** | Parte funciona; falta algo para usar de ponta a ponta |
| 🔴 **Não iniciada** | Especificada em documento, sem implementação utilizável |
| ⚪ **Só documento** | Especificação escrita, sem contrapartida no código |
 
---
 
## 3. Visão geral
 
| Funcionalidade | Situação | O que falta | Documento |
|---|---|---|---|
| Autenticação e sessão | 🟢 | — | [permissoes.md](permissoes-papeis/permissoes.md) |
| Convites | 🟢 | — | [invite.md](convite/invite.md) |
| Solicitação de convite | 🟢 | — | [invite-request.md](convite/invite-request.md) |
| Skills | 🟢 | — | [gestao-skills.md](skills/gestao-skills.md) |
| Tech stacks | 🟢 | — | [gestao-stacks.md](tech-stacks/gestao-stacks.md) |
| Painel administrativo | 🟢 | Moderação de feedback (escopo novo) | [painel-administrativo.md](adminstrativo/painel-administrativo.md) |
| Perfil de usuário | 🟡 | Tela de certificados | [perfis-usuario.md](usuario/perfis-usuario.md) |
| Portfólio público | 🟡 | Bloco de corroborações (era 🟢) | [portfolio.md](portfolio/portfolio.md) |
| Encerramento de projeto | 🟡 | Validações, observação automática, tela de edição controlada e testes (#553) | [gestao-projetos.md](projetos/gestao-projetos.md) |
| Projetos em equipe (resto) | 🟡 | Notificação da equipe | [gestao-projetos.md](projetos/gestao-projetos.md) |
| Certificados | 🟡 | Tela de cadastro | [portfolio.md](portfolio/portfolio.md) |
| Jornada de entrada | 🟡 | Onboarding pós-cadastro | [how-to-join.md](jornada-de-entrada/jornada-de-entrada-how-to-join.md) |
| **Feedback e reputação** | 🔴 | Rotas v2 + tela de avaliação | [feedback-reputacao.md](feedback/feedback-reputacao.md) |
| Dashboard do membro | 🔴 | A tela inteira | [dashboard-membro.md](dashboard/dashboard-membro.md) |
| Exclusão de conta (LGPD) | 🟡 | Anonimização dos dados pessoais | [governanca-dados-lgpd.md](../01%20-%20estrategia/governanca-dados/governanca-dados-lgpd.md) |
| Conteúdos informativos (FAQ) | 🔴 | A tela inteira | [conteudos-informativos-e-educacionais.md](conteudos/conteudos-informativos-e-educacionais.md) |
| Fórum | ⚪ | Tudo | — |
 
---
 
## 4. A ordem de execução
 
> 🔗 **O bloqueio do feedback foi removido.** `feedback-reputacao.md` exige
> `Project.status = CONCLUIDO`. Desde o PR #708, o owner de um projeto
> `EM_ANDAMENTO` pode marcá-lo como concluído (`PATCH /api/team-project/user` e
> botão "Marcar como Concluído"). Projetos já chegam a `CONCLUIDO`, então o
> feedback pode ser gerado.
 
**Sequência recomendada:**
 
| # | Item | Situação |
|---|---|---|
| 1 | Encerramento manual de projeto (#553) | ✅ Endpoint e botão prontos; restam #555, #557, #559 e #560 |
| 2 | Spike de schema do feedback | ✅ Concluído (PR #722) |
| 3 | Migration do modelo v2 | ✅ Concluída (PR #723) |
| 4 | Rotas de feedback v2 | ⛔ `POST /api/feedback` ainda recebe `rating` (v1) |
| 5 | Tela `/dashboard/feedbacks` | ⛔ O meio que falta entre API e portfólio |
| 6 | Bloco de corroborações no portfólio | ⛔ Onde o sinal se torna público |
| 7 | Dashboard do membro (parcial) | ⛔ Blocos de projeto e perfil não dependem do feedback |
| 8 | Anonimização na exclusão de conta | ⛔ Regra decidida (seção 5); falta implementar |
| 9 | FAQ | ⛔ Depende de as regras estarem estáveis |
 
---
 
## 5. O que exige decisão agora
 
### 🔴 Feedback e reputação
 
O que já existe:
 
```
✅ POST/GET /api/feedback              criar e listar (ainda no formato v1)
✅ GET      /api/feedback/[id]         consultar
✅ GET      /api/dashboard/feedbacks   agregação para o painel
✅ PortfolioFeedbackSection            exibe só o texto; rating despublicado (PR #723)
✅ Modelo v2 no schema.prisma          corroborações por eixo (PR #723)
✅ Project.status = CONCLUIDO          alcançável pelo encerramento manual (PR #708)
```
 
O que falta:
 
```
⛔ Rotas de feedback v2                POST ainda recebe rating
⛔ /dashboard/feedbacks                <UnderDevelopment />
⛔ Bloco de corroborações              no portfólio público
```
 
**As decisões de produto que estavam pendentes foram fechadas** em
`feedback-reputacao.md` v2:
 
| Pergunta | Decisão |
|---|---|
| Granular por competência ou nota única? | Granular, por eixos fixos — sem nota |
| O que fica público? | Corroborações agregadas + texto com dupla autorização |
| Como não desmotivar? | Não existe sinal negativo público; ausência ≠ nota baixa |
| Anônimo é opcional ou padrão? | Público sempre anônimo; identidade registrada internamente |
 
**Ainda em aberto:** estrutura final do schema (spike), prazo do blind duplo
(14 dias proposto), N mínimo (3 proposto), destino definitivo do `rating`.
 
### 🔴 Dashboard do membro
 
`/dashboard` é a **primeira tela pós-login** e hoje é placeholder de 24 linhas.
Agora possui documento de produto — a lacuna apontada na revisão anterior foi
preenchida.
 
### 🟡 Exclusão de conta
 
O fluxo existe (`DELETE /api/user/[id]` e botão "Excluir conta"), para a própria
pessoa e para ADMIN, mas **não anonimiza**:
 
- com vínculos em `StackTaken`: desativa a conta (`isActive: false`) e mantém
  os dados pessoais;
- sem vínculos: apaga o usuário (*hard delete*).
 
**Regra decidida em 17/10/2026** (detalhe em `governanca-dados-lgpd.md`,
seção 6.3): quem tem vínculos passa por *soft delete* **com anonimização dos
dados pessoais**; quem não tem vínculo nenhum continua com *hard delete*. Vale
igual para a exclusão feita por ADMIN. Falta implementar.
 
### 🟡 Projetos em equipe
 
Criar, listar, detalhar, editar, assumir stack e concluir funcionam. Do épico
#553 restam as validações de encerramento (#555), a observação automática na
descrição (#557), a tela de edição controlada (#559) e os testes (#560).
 
> ⚠️ **A regra de bloqueio de edição após formação de equipe está desativada** por
> defeito na comparação de datas. A direção acordada é notificar em vez de
> bloquear — decisão de produto ainda a desenhar.
 
---
 
## 6. Divergências entre documentação e código
 
O Documento 0, seção 4, trata divergência como falha de qualidade.
 
### 6.1 Corrigidas na revisão de 18/08/2026
 
| Documento | Divergência | Resolução |
|---|---|---|
| `arquitetura-geral.md` + `arquitetura-geral-atualizado.md` | Dois arquivos concorrentes | Consolidados em um; remover o `-atualizado` |
| `adr-email-templates.md` | "ADR-XXX", fora do registro | Incorporado como ADR-004; remover o arquivo |
| `modelagem-dados.md` | "reputação é média simples dos ratings" | Afirmação revogada |
| `governanca-dados-lgpd.md` | Garantia de exclusão de conta não implementada | Corrigida com status real |
| `governanca-dados-lgpd.md` × `feedback-reputacao.md` | Exclusão × imutabilidade | Anonimização assimétrica |
| `visao-produto.md` × `Project.totalValue` | "não é marketplace" × valor no schema | Distinção registrar ≠ intermediar |
| `feedback-reputacao.md` | Princípios anti-nota × `rating` agregado | Modelo de corroborações |
| Dashboard do membro | Épico sem documento | Documento criado |
| `painel-administrativo.md` | 12 linhas para função crítica | Expandido |
 
### 6.2 Abertas
 
| Documento | Divergência | Ação |
|---|---|---|
| `conteudos-informativos-e-educacionais.md` | "consolidado", FAQ é placeholder | Ajustar header |
| `jornada-de-entrada-how-to-join-ux.md` | "proposta para validação", página existe | Ajustar header |
| Nome da marca | *TryCatch*, *TryCatch For Match*, *TryCatch 4Match* circulando | Padronizar conforme `decisao-marca.md` |
| Vários | Skills gerenciadas dentro da rota de disponibilidade | Avaliar separação |
| `governanca-dados-lgpd.md` × código | Exclusão de conta não anonimiza | Regra decidida em 17/10/2026; implementação pendente |
 
### 6.3 Corrigidas na revisão de 17/10/2026
 
| Documento | Divergência | Resolução |
|---|---|---|
| Este documento | Encerramento de projeto dado como inexistente | Existe desde o PR #708 |
| Este documento | Migration do feedback v2 pendente | Concluída no PR #723 |
| Este documento × LGPD | Exclusão de conta "não implementada" | Existe; falta a anonimização |
| Vários | SEC-03 — `User` retornado com hash de senha | Resolvida pelo `omit` global do PR #719 |
| `arquitetura-geral.md`, `IA-REGRAS.md` | BUG-02 — `params` síncrono | Resolvida pelo PR #713 |
 
---
 
## 6A. Decisões pendentes da mantenedoria
 
Itens identificados na revisão dos PRs #732 a #738. São decisões de produto,
design ou infraestrutura, por isso não viraram issue.
 
| Tema | Decisão em aberto |
|---|---|
| Links do rodapé e do FAQ | `/privacy`, `/terms` e `/register-project` apontam para páginas que não existem: criar as páginas ou remover os links |
| Portfólios no `sitemap` | Incluir os portfólios individuais expõe nome e perfil à indexação de buscadores. Como `portfolioPublic` vem `true` por padrão, exigiria consentimento explícito |
| Imagem de Open Graph | Depende de arte |
| Cores sem token | `#EDEDFF` (fundo do `CardProjectSummary`), `#33318c` (hover do `ProjectStackSelector`) e as cores citadas no PR #735 (gradiente, `#F8F8FA`, borda `#71717b67`) não têm token: criar tokens ou manter |
| `NEXT_PUBLIC_APP_URL` no deploy | Precisa estar definida no **build** da Vercel; sem ela, `robots.txt`, sitemap e Open Graph saem com `localhost` |
 
---
 
## 7. Como manter isto atualizado
 
Cada documento de produto declara dois estados:
 
```markdown
**Status do documento:** consolidado · alinhado ao schema.prisma
**Status da implementação:** 🟡 parcial — API pronta, tela de avaliação pendente
```
 
O primeiro responde *"este texto é confiável?"*. O segundo, *"isto está no ar?"*.
 
**Quando atualizar:** ao mergear PR que conclui ou avança funcionalidade; ao criar
documento de produto novo; ao descobrir divergência.
 
**Quem atualiza:** quem abre o PR que muda o estado. A revisão confere.
 
> 💡 Este documento é índice, não fonte da verdade. A fonte é o código. Ao
> encontrar divergência, corrija aqui **e** avise — divergência costuma indicar
> que algo mudou sem passar pela documentação.
 
---
 
## 8. Histórico de Revisão
 
| Data | Alteração |
|---|---|
| 16/08/2026 | Criação, a partir de levantamento de rotas, telas e componentes |
| 18/08/2026 | Encerramento de projeto isolado como bloqueio do feedback; ordem de execução; decisões de feedback fechadas; divergências corrigidas registradas; adicionados Dashboard do Membro e Exclusão de Conta 
| 17/10/2026 | Nova verificação contra o código: encerramento manual e migration v2 concluídos, feedback desbloqueado; exclusão de conta reclassificada e regra de anonimização registrada; SEC-03 e BUG-02 resolvidas; decisões pendentes da mantenedoria (seção 6A) |
