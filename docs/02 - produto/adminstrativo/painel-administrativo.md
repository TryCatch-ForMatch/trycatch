# Documento de Produto — Painel Administrativo
 
**Classificação:** Documento de Produto / Funcionalidade
**Camada:** 2 — Documentos de Produto e Funcionalidades
**Status do documento:** Expandido — versão anterior tinha 12 linhas
**Status da implementação:** 🟢 completa para o escopo atual — moderação de feedback pendente
**Estado consolidado:** ver [estado-das-funcionalidades.md](../estado-das-funcionalidades.md)
 
---
 
## 1. Identificação
 
- **Nome:** Painel Administrativo
- **Rota base:** `/dashboard/admin`
- **Domínio:** Governança e operação da plataforma
- **Papel exigido:** `ADMIN`
- **Documentos relacionados:** Convites; Solicitação de Convite; Permissões e
  Papéis; Gestão de Skills; Gestão de Stacks; Feedback e Reputação; Governança de
  Dados e LGPD
---
 
## 2. Contexto e objetivo
 
O TryCatch tem acesso controlado por convite. Isso significa que existe uma
camada operacional permanente — aprovar solicitações, emitir convites, manter os
cadastros de referência — sem a qual a plataforma não recebe ninguém.
 
O painel centraliza essa operação. Ele existe para:
 
- controlar a entrada de novos membros;
- manter os catálogos de skills e stacks que sustentam a formação de equipes;
- apurar conduta quando houver denúncia;
- dar rastreabilidade a ações administrativas.
**O painel não é ferramenta de vigilância.** Ele não expõe atividade de membro
além do necessário para a operação e para a apuração de conduta.
 
---
 
## 3. Escopo
 
### 3.1 O que faz
 
**Convites**
 
- Criar convite com código único, vinculado a e-mail e papel inicial;
- Listar convites com estado (ativo, utilizado);
- Invalidar convite não utilizado;
- Consultar quem criou cada convite (`invitedBy`) e quando foi usado (`usedAt`).
**Solicitações de convite**
 
- Listar solicitações com status `PENDING`, `APPROVED`, `REJECTED`;
- Aprovar ou rejeitar, preservando o registro histórico;
- Gerar convite a partir de solicitação aprovada.
**Usuários**
 
- Listar e consultar membros;
- Ativar e desativar conta (`isActive`);
- Aprovar solicitação de mudança de papel (`RoleRequest`).
**Catálogos**
 
- CRUD de `Skill`;
- CRUD de `Stack`.
### 3.2 O que não faz
 
- Não edita perfil, bio, portfólio ou configuração de visibilidade de terceiros;
- Não edita nem exclui conteúdo de feedback (ver 3.3);
- Não altera papel sem registro;
- Não acessa senha (armazenada apenas em hash);
- Não exibe métrica de membro individual sem finalidade operacional;
- Não exclui projeto de terceiro sem procedimento formal.
### 3.3 Escopo pendente — moderação de feedback
 
🔴 **Não implementado. Requer decisão de produto.**
 
O modelo de feedback v2 pressupõe que ADMIN possa:
 
- consultar a autoria de um feedback **mediante denúncia**, com o acesso
  registrado em log;
- **ocultar** feedback que viole as regras da plataforma, com motivo registrado —
  nunca editar o conteúdo;
- ver o efeito da ocultação nas agregações públicas.
**Decisões em aberto:** existe fluxo de denúncia acionado pelo avaliado? Quem
apura? Há direito de resposta do avaliador? Prazo?
 
Ver `docs/02 - produto/feedback/feedback-reputacao.md`, seções 7 e 16.
 
---
 
## 4. Permissões
 
| Ação | Papel |
|---|---|
| Acessar o painel | `ADMIN` |
| Criar e invalidar convite | `ADMIN` |
| Aprovar solicitação de convite | `ADMIN` |
| Aprovar mudança de papel | `ADMIN` |
| CRUD de skills e stacks | `ADMIN` |
| Consultar autoria de feedback | `ADMIN`, mediante denúncia |
| Ocultar feedback | `ADMIN`, com motivo |
 
Verificação de papel via `checkAuth` no backend, em toda rota. **Ocultar o link no
frontend não é controle de acesso.**
 
---
 
## 5. Regras de negócio
 
1. Toda ação administrativa é registrada em log estruturado com identificador do
   ADMIN, ação e alvo — nunca com conteúdo pessoal.
2. Convite é vinculado a um e-mail; `code` é único; `used = true` impede reuso.
3. Rejeição de solicitação preserva o registro — não apaga.
4. Mudança de papel exige registro e é reversível apenas por novo registro.
5. Desativar conta (`isActive = false`) torna o portfólio inacessível (404) e
   **não** exclui dados — exclusão segue o fluxo da LGPD.
6. ADMIN não edita conteúdo produzido por membro. Pode ocultar, nunca reescrever.
7. Consulta de autoria de feedback exige motivo registrado.
---
 
## 6. Impactos em dados
 
Entidades: `Invite`, `InviteRequest`, `User`, `RoleRequest`, `Skill`, `Stack`,
`Feedback` (somente ocultação).
 
Rastreabilidade: `invitedBy`, `usedAt`, status de solicitação, histórico de
mudança de papel, motivo de ocultação de feedback.
 
---
 
## 7. Segurança e riscos
 
| Risco | Mitigação |
|---|---|
| Convite `ADMIN` usado indevidamente | Criação restrita; monitoramento de convites com papel elevado |
| Elevação indevida de privilégio | Aprovação exclusiva de ADMIN, com registro |
| Acesso a autoria de feedback sem motivo | Exige denúncia; acesso logado |
| Ação administrativa sem rastro | Log obrigatório |
| Desativação usada como punição informal | Motivo registrado; não substitui apuração |
 
---
 
## 8. Comunicação com o usuário
 
- Aprovação de solicitação gera e-mail com o convite;
- Rejeição deve ser comunicada de forma respeitosa e sem julgamento — o Plano
  Geral de Comunicação proíbe tom punitivo;
- Ocultação de feedback deve ser comunicada às duas partes, com motivo objetivo;
- Mudança de papel deve ser comunicada ao titular.
> 🔴 Nem todas essas comunicações existem hoje. Verificar contra
> `docs/03 - tecnico/adrs.md` (ADR-004) antes de assumir que o template existe.
 
---
 
## 9. Antipadrões evitados
 
- ADMIN editando conteúdo de membro;
- Ação administrativa sem log;
- Controle de acesso baseado em esconder botão no frontend;
- Exclusão de registro histórico de solicitação;
- Exposição de atividade de membro sem finalidade operacional;
- Desativação silenciosa de conta.
---
 
## 10. Métricas relacionadas
 
- Taxa de aprovação de solicitações;
- Tempo médio entre solicitação e resposta;
- Conversão convite → cadastro;
- Distribuição de papel inicial;
- Volume de denúncias de feedback (quando existir).
---
 
## 11. Decisões em aberto
 
- Fluxo de denúncia de feedback;
- Direito de resposta do avaliador em caso de ocultação;
- Existe papel de moderador distinto de `ADMIN`?
- Exclusão de conta: executada manualmente por ADMIN até o fluxo existir — falta
  procedimento documentado.
---
 
## 12. Histórico
 
| Versão | Alteração |
|---|---|
| Inicial | Três seções, doze linhas |
| Atual | Expandido: permissões, regras, riscos, comunicação, antipadrões; registrada a lacuna de moderação de feedback |