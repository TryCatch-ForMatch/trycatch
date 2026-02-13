# Documento de Produto --- Perfis de Usuário

Classificação: Documento de Produto / Funcionalidade\
Camada: 2 --- Produto\
Status: Versão consolidada baseada no schema.prisma

------------------------------------------------------------------------

## 1. Entidades Envolvidas

-   User
-   UserSkill
-   UserAvailability
-   UserCertificate
-   Feedback

------------------------------------------------------------------------

## 2. Estrutura do Perfil

Campos principais do User:

-   name
-   email
-   avatar
-   github
-   linkedin
-   bio
-   role (ADMIN, USER, MENTOR)
-   isActive
-   emailVisible
-   createdAt / updatedAt

------------------------------------------------------------------------

## 3. Disponibilidade (UserAvailability)

Permite registrar: 
- weekday 
- startTime 
- endTime

Regra: 
- Um único registro por usuário por dia da semana.

------------------------------------------------------------------------

## 4. Certificados (UserCertificate)

Permite registrar: 
- title 
- issuer 
- date 
- url 
- description

Impacto: 
- Reforço de credibilidade do perfil.

------------------------------------------------------------------------

## 5. Reputação

-   Feedbacks recebidos
-   Histórico vinculado a projetos reais
-   Sem ranking público

------------------------------------------------------------------------

## 6. Regras de Negócio

-   Email pode ser ocultado via emailVisible.
-   Role define permissões sistêmicas.
-   isActive controla acesso à plataforma.

------------------------------------------------------------------------

## 7. Métricas Relacionadas

-   Taxa de preenchimento de perfil.
-   Número médio de skills por usuário.
-   Correlação disponibilidade ↔ participação em projetos.
