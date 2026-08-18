# Documento de Produto --- Permissões e Papéis

Classificação: Documento de Produto / Funcionalidade\
Camada: 2 --- Produto\
**Status do documento:** Versão consolidada baseada no schema.prisma  
**Status da implementação:** 🟢 completa — papéis aplicados via checkAuth nas rotas  
**Estado consolidado:** ver [estado-das-funcionalidades.md](../estado-das-funcionalidades.md)

------------------------------------------------------------------------

## 1. Enumerações Envolvidas

-   UserRole (ADMIN, USER, MENTOR)
-   RoleRequest (USER, MENTOR)
-   RequestStatus (PENDING, APPROVED, REJECTED)

------------------------------------------------------------------------

## 2. UserRole

Define permissões ativas do usuário.

ADMIN: - Gestão completa da plataforma.

MENTOR: - Participação como orientador em projetos.

USER: - Participação padrão.

------------------------------------------------------------------------

## 3. RoleRequest

Representa solicitação de mudança de papel.

Fluxo: 1. Usuário solicita mudança. 2. Admin avalia. 3. Status
atualizado.

------------------------------------------------------------------------

## 4. Regras

-   Apenas ADMIN aprova mudança de papel.
-   Mudança de papel deve ser registrada.
-   Rejeições devem manter rastreabilidade.

------------------------------------------------------------------------

## 5. Riscos

-   Elevação indevida de privilégio.
-   Falta de critério na aprovação.

------------------------------------------------------------------------

## 6. Métricas

-   Taxa de aprovação de mentor.
-   Tempo médio de análise de solicitação.
