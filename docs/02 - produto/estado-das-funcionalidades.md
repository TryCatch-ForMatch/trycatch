# Estado das Funcionalidades

**Classificação:** Documento de Produto / Consolidado
**Camada:** 2 — Documentos de Produto e Funcionalidades
**Status do documento:** consolidado
**Última verificação contra o código:** 16/08/2026

---

## 1. Para que serve

Este documento responde a uma pergunta só: **o que já está funcionando e o que
ainda falta.**

Ele existe porque os documentos de produto descrevem como cada funcionalidade
*deve* se comportar, mas não dizem se ela está no ar. Quem precisa decidir o que
construir em seguida teria que abrir treze arquivos e conferir cada um contra o
código.

> ⚠️ **Este documento não substitui os documentos de produto.** Ele aponta para
> eles. As regras de negócio, os critérios e os detalhes continuam lá.

---

## 2. Legenda

| Situação | Significa |
|---|---|
| 🟢 **Completa** | Backend e interface prontos, em uso |
| 🟡 **Parcial** | Parte funciona; falta algo para a pessoa conseguir usar de ponta a ponta |
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
| Painel administrativo | 🟢 | — | [painel-administrativo.md](adminstrativo/painel-administrativo.md) |
| Portfólio público | 🟢 | — | [portfolio.md](portfolio/portfolio.md) |
| Perfil de usuário | 🟢 | — | [perfis-usuario.md](usuario/perfis-usuario.md) |
| Projetos em equipe | 🟡 | Encerramento manual e notificação da equipe | [gestao-projetos.md](projetos/gestao-projetos.md) |
| Certificados | 🟡 | Tela para a pessoa cadastrar os próprios certificados | [portfolio.md](portfolio/portfolio.md) |
| Jornada de entrada | 🟡 | Página existe; onboarding pós-cadastro não | [how-to-join.md](jornada-de-entrada/jornada-de-entrada-how-to-join.md) |
| **Feedback e reputação** | 🔴 | **A tela onde se avalia o colega** | [feedback-reputacao.md](feedback/feedback-reputacao.md) |
| Dashboard do membro | 🔴 | A tela inteira | — |
| Conteúdos informativos (FAQ) | 🔴 | A tela inteira | [conteudos-informativos-e-educacionais.md](conteudos/conteudos-informativos-e-educacionais.md) |
| Fórum | ⚪ | Tudo | — |

---

## 4. O que exige decisão agora

### 🔴 Feedback e reputação

**É a funcionalidade mais avançada entre as não concluídas — e a que menos
parece.**

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
⛔ /dashboard/feedbacks                <UnderDevelopment /> — 10 linhas
```

Ou seja: **dá para gravar feedback pela API e ele aparece no portfólio, mas não
existe tela onde a pessoa avalia o colega.** O caminho está construído dos dois
lados e falta o meio.

**Decisões pendentes de produto**, registradas no documento da funcionalidade mas
ainda não fechadas:

- a avaliação é granular por competência ou uma nota única?
- o que fica visível no portfólio público — média, distribuição, comentários?
- como evitar que uma nota baixa desmotive, dado que o objetivo é formar pessoas?
- feedback anônimo é opcional ou padrão?

> 💡 O modelo `Feedback` já tem os campos `rating`, `comment` e `anonymous`.
> Granularidade por competência exigiria mudança de schema — vale decidir **antes**
> de construir a tela.

### 🔴 Dashboard do membro

`/dashboard` é a **primeira tela que a pessoa vê ao entrar**, e hoje é um
placeholder de 24 linhas. Não há documento de produto para ela.

Existe o épico [#630](https://github.com/TryCatch-ForMatch/trycatch/issues/630)
com as issues #631, #635, #636 e #637, mas nenhum documento na camada 2.

### 🟡 Projetos em equipe

O grosso funciona: criar, listar, detalhar, editar, assumir stack. Falta o
encerramento manual, previsto no épico
[#553](https://github.com/TryCatch-ForMatch/trycatch/issues/553).

> ⚠️ **A regra de bloqueio de edição após formação da equipe está desativada.**
> Ela travava a edição por completo por um defeito na comparação de datas. A
> direção acordada é **notificar as pessoas envolvidas** em vez de bloquear —
> decisão de produto ainda a desenhar.

---

## 5. Onde a documentação diverge do código

Levantado em 16/08/2026. O Documento 0, seção 4, trata divergência entre
documentação e código como falha de qualidade.

| Documento | Diz | Realidade |
|---|---|---|
| `feedback-reputacao.md` | *"Versão consolidada alinhada ao schema.prisma"* | Sem tela de avaliação |
| `conteudos-informativos-e-educacionais.md` | *"Documento inicial consolidado"* | FAQ é placeholder |
| `jornada-de-entrada-how-to-join-ux.md` | *"Estrutura proposta para validação de UX"* | Página pública existe |

A causa não é descuido: **o campo `Status` desses documentos descreve o estado do
documento, não o da funcionalidade.** "Alinhada ao schema" significa que o texto
bate com o banco — não que exista tela.

Por isso os documentos de produto passam a ter **dois campos** (ver seção 6).

---

## 6. Como manter isto atualizado

Cada documento de produto deve declarar os dois estados no cabeçalho:

```markdown
**Status do documento:** consolidado · alinhado ao schema.prisma
**Status da implementação:** 🟡 parcial — API pronta, tela de avaliação pendente
```

O primeiro responde *"este texto é confiável?"*. O segundo, *"isto está no ar?"*.

**Quando atualizar:**

- ao mergear um PR que conclui ou avança uma funcionalidade;
- ao criar um documento de produto novo;
- ao descobrir divergência entre documento e código.

**Quem atualiza:** quem abre o PR que muda o estado. A revisão confere.

> 💡 Este documento é um índice, não a fonte da verdade. A fonte é o código. Ao
> encontrar divergência, corrija aqui **e** avise — divergência costuma indicar
> que algo mudou sem passar pela documentação.

---

## 7. Histórico de Revisão

| Data | Alteração |
|---|---|
| 16/08/2026 | Criação, a partir de levantamento das rotas de API, telas e componentes |
