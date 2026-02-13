# Documento de Produto --- Convites de Acesso (Invite)

Classificação: Documento de Produto / Funcionalidade\
Camada: 2 --- Produto\
Status: Versão consolidada alinhada ao schema.prisma

------------------------------------------------------------------------

## 1. Identificação da Funcionalidade

-   Nome da funcionalidade: Convites de Acesso (Invite)
-   Domínio do produto: Governança e Acesso à Plataforma
-   Entidade principal: Invite
-   Entidades relacionadas: User, UserRole
-   Documentos relacionados: Perfis de Usuário; Permissões e Papéis;
    Solicitação de Convite (InviteRequest)

------------------------------------------------------------------------

## 2. Contexto e Objetivo

A funcionalidade de Convites de Acesso controla o ingresso inicial de
novos usuários na plataforma TryCatch.

Ela existe para:

-   Evitar cadastro aberto e descontrolado;
-   Garantir rastreabilidade de quem convidou cada usuário;
-   Controlar o papel inicial (role) do usuário ao ingressar;
-   Preservar a qualidade e governança da comunidade.

O fluxo é acionado antes da criação completa da conta.

------------------------------------------------------------------------

## 3. Estrutura da Entidade Invite (schema.prisma)

Campos:

-   id
-   email
-   code
-   used (Boolean)
-   invitedBy (opcional)
-   role (UserRole)
-   createdAt
-   usedAt (opcional)

------------------------------------------------------------------------

## 4. Escopo da Funcionalidade

### 4.1 O que a funcionalidade faz

-   Permite criação de convite com código único;
-   Associa convite a um e-mail específico;
-   Define o papel inicial (ADMIN, USER ou MENTOR);
-   Registra quem criou o convite (quando aplicável);
-   Valida convite antes de permitir cadastro;
-   Marca convite como utilizado após uso;
-   Registra data de utilização (usedAt).

### 4.2 O que a funcionalidade não faz

-   Não permite cadastro sem convite válido;
-   Não permite reutilização de convite marcado como used;
-   Não define informações profissionais do usuário (skills, stacks,
    etc.);
-   Não concede permissões além do role definido;
-   Não altera papel após criação da conta (isso é responsabilidade do
    fluxo de RoleRequest).

------------------------------------------------------------------------

## 5. Usuários Envolvidos e Permissões

-   ADMIN: pode criar convites e definir role inicial;
-   Usuário convidado: pode utilizar convite válido para iniciar
    cadastro;
-   Sistema: valida, registra e controla estado do convite.

Restrições:

-   Apenas ADMIN pode criar convites;
-   Convite é vinculado a um e-mail específico;
-   Convite com used = true não pode ser reutilizado.

------------------------------------------------------------------------

## 6. Fluxo de Uso (UX)

1.  ADMIN cria convite no painel administrativo;
2.  Sistema gera código único;
3.  Código é compartilhado com e-mail definido;
4.  Usuário informa código na tela de primeiro acesso;
5.  Sistema valida:
    -   Código existente;
    -   Código não utilizado;
    -   E-mail correspondente;
6.  Se válido, usuário prossegue para cadastro;
7.  Após cadastro concluído:
    -   used é marcado como true;
    -   usedAt é registrado.

Estados relevantes:

-   Convite válido e ativo;
-   Convite utilizado;
-   Convite inválido;
-   Convite com e-mail divergente.

------------------------------------------------------------------------

## 7. Regras de Negócio

-   Todo cadastro exige convite válido;
-   code deve ser único;
-   invite.email deve corresponder ao e-mail do cadastro;
-   used deve impedir reutilização;
-   usedAt deve ser preenchido no momento da utilização;
-   role definido no convite deve ser atribuído ao novo usuário.

------------------------------------------------------------------------

## 8. Impactos em Dados

-   Criação de registro na tabela Invite;
-   Registro de quem criou (invitedBy);
-   Registro de quando foi utilizado (usedAt);
-   Associação indireta com User criado.

Os dados são utilizados para:

-   Auditoria interna;
-   Rastreabilidade de crescimento;
-   Controle de permissões iniciais.

------------------------------------------------------------------------

## 9. Impactos em Segurança

-   Redução de spam e criação automatizada de contas;
-   Controle de privilégio inicial via role;
-   Registro de autoria do convite (invitedBy);
-   Mitigação de elevação indevida de permissão.

Risco identificado:

-   Uso indevido de convite ADMIN;
-   Compartilhamento não autorizado de código.

Mitigação:

-   Controle restrito de criação;
-   Monitoramento de convites criados por ADMIN.

------------------------------------------------------------------------

## 10. Impactos em Reputação e Confiança

-   Não impacta diretamente reputação pública;
-   Contribui para credibilidade do ambiente;
-   Reforça governança e controle de acesso.

------------------------------------------------------------------------

## 11. Métricas Relacionadas

-   Taxa de conversão convite → cadastro;
-   Tempo médio entre criação e uso do convite;
-   Distribuição de role inicial;
-   Número de convites criados por ADMIN.

------------------------------------------------------------------------

## 12. Relação com Implementação Técnica

-   Implementado via entidade Invite;
-   Integrado ao fluxo de autenticação;
-   Interage com criação de User;
-   Depende de controle de UserRole.

Este documento descreve comportamento esperado e decisões de produto,
não detalhes de implementação técnica.

------------------------------------------------------------------------

## 13. Histórico de Decisões

-   Adoção de convite obrigatório;
-   Associação de role inicial ao convite;
-   Registro de invitedBy para rastreabilidade;
-   Registro de usedAt para auditoria;
-   Separação entre convite e solicitação pública (InviteRequest).
