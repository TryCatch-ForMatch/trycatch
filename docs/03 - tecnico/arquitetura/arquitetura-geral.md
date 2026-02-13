# Documento Técnico --- Arquitetura Geral

Classificação: Documento Técnico\
Camada: 3 --- Técnico

## 1. Stack Principal

-   Next.js (App Router)
-   TypeScript
-   Prisma ORM
-   PostgreSQL
-   NextAuth

## 2. Modelo Arquitetural

Monólito modular evolutivo.

## 3. Separação de Domínios

-   Produto
-   Autenticação
-   Feedback
-   Convites
-   Projetos

## 4. Escalabilidade

Critérios para futura separação de serviços: - Crescimento de carga. -
Necessidade de integração externa. - Gargalos identificados.

## 5. Observabilidade

-   Logs estruturados.
-   Registro de ações críticas.
