# Estado das Funcionalidades
 
**Classificação:** Documento de Produto / Consolidado
**Camada:** 2 — Documentos de Produto e Funcionalidades
**Status do documento:** consolidado
**Última verificação contra o código:** 16/08/2026
**Última revisão documental:** 18/08/2026
 
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
| **Encerramento de projeto** | 🔴 | **Bloqueia o feedback inteiro** | [gestao-projetos.md](projetos/gestao-projetos.md) |
| Projetos em equipe (resto) | 🟡 | Notificação da equipe | [gestao-projetos.md](projetos/gestao-projetos.md) |
| Certificados | 🟡 | Tela de cadastro | [portfolio.md](portfolio/portfolio.md) |
| Jornada de entrada | 🟡 | Onboarding pós-cadastro | [how-to-join.md](jornada-de-entrada/jornada-de-entrada-how-to-join.md) |
| **Feedback e reputação** | 🔴 | Migration + tela de avaliação | [feedback-reputacao.md](feedback/feedback-reputacao.md) |
| Dashboard do membro | 🔴 | A tela inteira | [dashboard-membro.md](dashboard/dashboard-membro.md) |
| Exclusão de conta (LGPD) | 🔴 | O fluxo inteiro | [governanca-dados-lgpd.md](../01%20-%20estrategia/governanca/governanca-dados-lgpd.md) |
| Conteúdos informativos (FAQ) | 🔴 | A tela inteira | [conteudos-informativos-e-educacionais.md](conteudos/conteudos-informativos-e-educacionais.md) |
| Fórum | ⚪ | Tudo | — |
 
---
 
## 4. A ordem de execução
 
> 🔗 **A dependência que muda tudo.** `feedback-reputacao.md` exige
> `Project.status = CONCLUIDO`. `gestao-projetos.md` informa que o encerramento
> manual não existe. **Nenhum projeto chega a `CONCLUIDO` hoje — logo, nenhum
> feedback pode ser gerado.** Construir a tela de avaliação antes do encerramento
> produz uma tela que nunca dispara.
 
**Sequência recomendada:**
 
| # | Item | Por quê |
|---|---|---|
| 1 | Encerramento manual de projeto (#553) | Destrava o domínio de feedback inteiro |
| 2 | Spike de schema do feedback | Decisão de estrutura antes da migration |
| 3 | Migration + rotas de feedback | Base do modelo v2 |
| 4 | Tela `/dashboard/feedbacks` | O meio que falta entre API e portfólio |
| 5 | Bloco de corroborações no portfólio | Onde o sinal se torna público |
| 6 | Dashboard do membro (parcial) | Blocos de projeto e perfil não dependem do feedback |
| 7 | Fluxo de exclusão de conta | Direito prometido e não implementado |
| 8 | FAQ | Depende de as regras estarem estáveis |
 
---
 
## 5. O que exige decisão agora
 
### 🔴 Feedback e reputação
 
O que já existe:
 
```
✅ POST/GET /api/feedback              criar e listar
✅ GET      /api/feedback/[id]         consultar
✅ GET      /api/dashboard/feedbacks   agregação para o painel
✅ PortfolioFeedbackSection            exibição no portfólio público
✅ Modelo Feedback no schema.prisma    com rating, comment, anonymous
```
 
O que falta:
 
```
⛔ Project.status = CONCLUIDO          inalcançável hoje
⛔ Migration do modelo v2              atributos de corroboração
⛔ /dashboard/feedbacks                <UnderDevelopment /> — 10 linhas
⛔ Bloco de corroborações              exibição atual pressupõe rating
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
 
### 🔴 Exclusão de conta
 
Direito garantido em documento estratégico e **não implementado**. Até existir o
fluxo, pedidos são tratados manualmente por ADMIN seguindo a regra de
anonimização assimétrica.
 
### 🟡 Projetos em equipe
 
Criar, listar, detalhar, editar e assumir stack funcionam. Falta o encerramento
manual (#553).
 
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
| Código | SEC-03 — `User` retornado com hash de senha | **Prioridade de segurança** |
 
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