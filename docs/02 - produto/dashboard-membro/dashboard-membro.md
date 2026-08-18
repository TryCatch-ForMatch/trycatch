# Documento de Produto — Dashboard do Membro
 
**Classificação:** Documento de Produto / Funcionalidade
**Camada:** 2 — Documentos de Produto e Funcionalidades
**Status do documento:** Versão inicial proposta — requer validação
**Status da implementação:** 🔴 não iniciada — `/dashboard` é placeholder de 24 linhas
**Estado consolidado:** ver [estado-das-funcionalidades.md](../estado-das-funcionalidades.md)
 
> 📌 **Este documento preenche uma lacuna.** Existe o épico
> [#630](https://github.com/TryCatch-ForMatch/trycatch/issues/630) com as issues
> #631, #635, #636 e #637, mas nenhum documento de produto correspondente — o que
> viola o Documento 0, seção 4 ("nenhuma funcionalidade deve existir sem
> documentação mínima").
 
---
 
## 1. Identificação
 
- **Nome:** Dashboard do Membro
- **Rota:** `/dashboard`
- **Domínio:** Experiência do membro autenticado
- **Épico:** #630
- **Documentos relacionados:** Feedback e Reputação; Gestão de Projetos;
  Portfólio; Perfis de Usuário; Jornada de Entrada
---
 
## 2. Contexto e objetivo
 
`/dashboard` é a **primeira tela que a pessoa vê ao entrar na plataforma** e hoje
é um placeholder.
 
O impacto disso é maior do que parece. Alguém que solicitou convite, esperou
aprovação, criou conta e fez login chega a uma tela vazia. Todo o esforço de
comunicação institucional — Home, How-to-Join, textos de CTA — desemboca aqui.
 
**Objetivo:** responder três perguntas, nesta ordem de prioridade:
 
1. **O que eu preciso fazer agora?** (pendências acionáveis)
2. **Onde eu estou?** (projetos ativos, participação)
3. **Como estou sendo percebido?** (feedback recebido, estado do portfólio)
**Antiobjetivo:** o dashboard não é painel de métricas nem vitrine de progresso
gamificada. Ele orienta ação.
 
---
 
## 3. Escopo
 
### 3.1 O que faz
 
- Exibe pendências que dependem de ação da pessoa;
- Lista projetos em que ela participa, com status;
- Mostra estado de completude do perfil e do portfólio;
- Indica feedback novo recebido (contagem, respeitado o blind duplo);
- Oferece atalhos para as áreas privadas.
### 3.2 O que não faz
 
- Não exibe pontuação, nível, streak ou qualquer elemento de gamificação;
- Não exibe ranking nem comparação com outros membros;
- Não exibe métricas de plataforma (isso é painel administrativo);
- Não substitui `/dashboard/portfolio`, `/dashboard/feedbacks` ou a listagem de
  projetos — apenas aponta para elas;
- Não expõe conteúdo de feedback (apenas a existência dele).
---
 
## 4. Estrutura proposta
 
### 4.1 Bloco de pendências (topo, prioridade máxima)
 
Só aparece quando existe pendência. **Dashboard sem pendência não mostra bloco
vazio** — mostra o estado de "tudo em dia".
 
Pendências previstas:
 
| Pendência | Origem | Ação |
|---|---|---|
| Avaliações pendentes | Projeto concluído sem feedback enviado | Ir para `/dashboard/feedbacks` |
| Perfil incompleto | Campos mínimos ausentes | Ir para perfil |
| Projeto pronto para encerrar | Owner, todas as stacks assumidas | Ir para o projeto |
| Convite não utilizado | Convite emitido pela pessoa, não usado | Informativo |
 
> ⚠️ **Regra de tom.** Pendência é convite, não cobrança. A comunicação segue o
> Plano Geral de Comunicação: sem urgência artificial, sem contagem regressiva,
> sem linguagem de culpa. "Você tem 2 avaliações para enviar" — não "Você está
> atrasado".
 
### 4.2 Bloco de projetos
 
Projetos em que a pessoa participa, agrupados por status:
 
- `BUSCANDO` — projetos que ela criou e aguardam equipe;
- `EM_ANDAMENTO` — participação ativa, com a stack assumida em destaque;
- `CONCLUIDO` — últimos concluídos, com link para o feedback daquele projeto.
Estado vazio: quem não participa de nenhum projeto vê um caminho, não um vazio —
link para a listagem de projetos abertos e para o cadastro de projeto próprio.
 
### 4.3 Bloco de reputação e portfólio
 
- Contagem de feedbacks novos (**sem conteúdo**, respeitado o blind duplo);
- Estado do portfólio: público ou privado, com link para configuração;
- Corroborações já exibidas publicamente.
> Este bloco **nunca** exibe nota, média ou barra de progresso. Ver
> `feedback-reputacao.md`, seção 5.4.
 
### 4.4 Bloco de primeiros passos (condicional)
 
Aparece apenas para conta recém-criada, e some quando os passos são cumpridos:
 
1. Complete seu perfil;
2. Cadastre suas skills e disponibilidade;
3. Configure seu portfólio;
4. Encontre um projeto.
Isso cobre parcialmente a lacuna de onboarding pós-cadastro apontada em
`jornada-de-entrada-how-to-join.md` (status 🟡 — a página pública existe, o
onboarding não).
 
---
 
## 5. Permissões
 
- Rota privada: exige sessão ativa;
- Cada pessoa vê exclusivamente os próprios dados;
- `MENTOR` vê a mesma estrutura (diferenciação de mentoria é decisão futura);
- `ADMIN` vê a mesma estrutura — administração fica no painel administrativo.
---
 
## 6. Regras de negócio
 
1. Nenhum bloco exibe dado de terceiro.
2. Contagem de feedback respeita o blind duplo definido em `feedback-reputacao.md`,
   seção 8 — antes da liberação, só o número, nunca o conteúdo.
3. Pendência de avaliação só existe para projeto com status `CONCLUIDO`.
4. Bloco vazio não é renderizado; cada estado vazio tem texto e ação próprios.
5. Nenhum elemento de gamificação, pontuação ou comparação.
6. Toda agregação é feita no backend.
---
 
## 7. Acessibilidade
 
Conforme o Documento Estratégico — Acessibilidade e Inclusão Digital:
 
- Um único `H1`;
- Ordem semântica de headings entre blocos;
- Pendência **não** sinalizada apenas por cor — sempre com texto;
- Contagens com rótulo textual completo, legível por leitor de tela;
- Foco visível e áreas clicáveis confortáveis;
- Layout mobile-first, coluna única em telas pequenas.
---
 
## 8. Comunicação com o usuário
 
- Estados vazios são orientadores, nunca em branco;
- Sem linguagem de urgência ou culpa;
- Sem promessa que a plataforma não sustenta (participação em projeto não é
  garantida);
- Mensagens em `MESSAGES`, nunca string solta.
---
 
## 9. Antipadrões evitados
 
- Placeholder permanente (situação atual);
- Gamificação (pontos, níveis, streaks) — contradiz "não competitivo";
- Métrica de plataforma em tela de membro;
- Exposição de conteúdo de feedback antes da liberação;
- Bloco vazio renderizado sem propósito;
- Barra de progresso de perfil que sugira que a pessoa está "incompleta".
---
 
## 10. Relação com implementação técnica
 
- Depende de agregações novas (pendências, contagem de feedback, projetos por
  status);
- Recomendado um `dashboard.service.ts` seguindo o padrão de
  `portfolio.service.ts`;
- Server Component chamando o serviço diretamente, sem fetch interno;
- Rota `GET /api/dashboard/feedbacks` já existe e pode ser reaproveitada.
---
 
## 11. Dependências
 
| Depende de | Situação |
|---|---|
| Encerramento manual de projeto (#553) | 🔴 bloqueia a pendência de avaliação |
| Modelo de feedback v2 | 🔴 bloqueia o bloco de reputação |
| Perfil e portfólio | 🟢 prontos |
| Projetos | 🟡 parcial |
 
**O dashboard pode ser construído em partes.** Blocos de projeto, perfil e
primeiros passos não dependem do feedback e podem ir ao ar antes.
 
---
 
## 12. Decisões em aberto
 
- `MENTOR` precisa de bloco próprio (equipes que orienta)?
- Notificações in-app fazem parte do dashboard ou são funcionalidade separada?
- O bloco de primeiros passos some por conclusão ou pode ser dispensado?
- Quais campos definem "perfil completo"?
---
 
## 13. Critérios de aceite
 
- A pessoa entende, sem rolar, se há algo a fazer;
- Toda pendência leva a uma ação concreta;
- Nenhum bloco vazio é renderizado;
- Nenhum elemento de comparação ou pontuação;
- Conteúdo de feedback não vaza antes da liberação;
- Um `H1`, hierarquia semântica correta, funcional em mobile.
---
 
## 14. Histórico
 
| Versão | Alteração |
|---|---|
| Inicial | Criação do documento para cobrir a lacuna do épico #630 |
 