# Documento de Produto --- Solicitação de Convite (InviteRequest)

Classificação: Documento de Produto / Funcionalidade\
Camada: 2 --- Produto\
**Status do documento:** Versão consolidada baseada no schema.prisma  
**Status da implementação:** 🟢 completa — formulário público e aprovação pelo admin  
**Estado consolidado:** ver [estado-das-funcionalidades.md](../estado-das-funcionalidades.md)

------------------------------------------------------------------------

## 1. Entidade Envolvida

InviteRequest

------------------------------------------------------------------------

## 2. Objetivo

Permitir que usuários interessados solicitem acesso à plataforma antes
de receber convite formal.

------------------------------------------------------------------------

## 3. Campos

-   name
-   email (único)
-   linkedin
-   role (USER ou MENTOR)
-   status (PENDING, APPROVED, REJECTED)

------------------------------------------------------------------------

## 4. Fluxo

1.  Usuário preenche formulário.
2.  Registro criado com status PENDING.
3.  ADMIN avalia.
4.  Se aprovado, pode gerar Invite.

------------------------------------------------------------------------

## 5. Regras

-   Email único.
-   Apenas ADMIN altera status.
-   Registro histórico deve ser preservado.

------------------------------------------------------------------------

## 6. Métricas

-   Taxa de aprovação.
-   Tempo médio de resposta.
