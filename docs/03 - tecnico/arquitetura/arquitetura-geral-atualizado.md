# Documento Técnico --- Arquitetura Geral

Classificação: Documento Técnico\
Camada: 3 --- Técnico\
Status: Atualizado com regras de edição controlada e encerramento manual

------------------------------------------------------------------------

## 1. Stack Principal

-   Next.js (App Router)
-   TypeScript
-   Prisma ORM
-   PostgreSQL
-   NextAuth

------------------------------------------------------------------------

## 2. Modelo Arquitetural

Monólito modular evolutivo.

Separação lógica por domínios com possibilidade futura de extração de
serviços conforme critérios definidos.

------------------------------------------------------------------------

## 3. Separação de Domínios

-   Produto
-   Autenticação
-   Feedback
-   Convites
-   Projetos

------------------------------------------------------------------------

## 4. Máquina de Estados --- Project

Fluxo oficial:

BUSCANDO\
↓ (todas stacks assumidas automaticamente)\
EM_ANDAMENTO\
↓ (ação manual do owner)\
CONCLUIDO

Regras técnicas:

-   Transição BUSCANDO → EM_ANDAMENTO ocorre automaticamente.
-   Transição EM_ANDAMENTO → CONCLUIDO é manual e exclusiva do owner.
-   Projeto concluído não retorna para EM_ANDAMENTO (salvo decisão
    futura formal).

------------------------------------------------------------------------

## 5. Regra Técnica de Edição Condicional (Project)

Antes de existir qualquer StackTaken: - Update completo permitido.

Após existir pelo menos um StackTaken: - Bloqueio de edição
estrutural. - Permitido apenas append de observação na descrição. -
Concatenação deve ocorrer no backend. - Backend não deve aceitar
substituição completa da descrição.

------------------------------------------------------------------------

## 6. Escalabilidade

Critérios para futura separação de serviços:

-   Crescimento de carga.
-   Necessidade de integração externa.
-   Gargalos identificados.
-   Complexidade excessiva em domínio específico.

------------------------------------------------------------------------

## 7. Observabilidade

-   Logs estruturados obrigatórios.
-   Registro de ações críticas:
    -   Alteração de status de projeto.
    -   Tentativas bloqueadas de edição estrutural.
    -   Encerramento manual.
-   Proibição de console.log em ambiente produtivo.
-   Auditoria inicial de logging backend registrada em
    `docs/03 - tecnico/arquitetura/auditoria-logging-backend.md`.
