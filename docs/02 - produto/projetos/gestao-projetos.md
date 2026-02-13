# Documento de Produto --- Gestão de Projetos

Classificação: Documento de Produto / Funcionalidade\
Camada: 2 --- Produto\
Status: Versão consolidada baseada no schema.prisma

------------------------------------------------------------------------

## 1. Identificação da Funcionalidade

-   Domínio: Projetos
-   Entidade principal: Project
-   Entidades relacionadas: ProjectSkill, ProjectStack, StackTaken,
    Feedback

------------------------------------------------------------------------

## 2. Contexto e Objetivo

A funcionalidade de Gestão de Projetos permite a criação, organização,
execução e conclusão de projetos reais dentro da plataforma.

Ela resolve:

-   Falta de experiência prática estruturada;
-   Ausência de governança em projetos colaborativos;
-   Dificuldade de rastrear participação individual.

------------------------------------------------------------------------

## 3. Estrutura da Entidade Project

Campos principais:

-   id
-   ownerId
-   name
-   description
-   deadline
-   totalValue
-   status (BUSCANDO, EM_ANDAMENTO, CONCLUIDO)
-   createdAt
-   updatedAt

------------------------------------------------------------------------

## 4. Estados do Projeto (ProjectStatus)

### BUSCANDO

Projeto criado, aguardando formação de equipe.

### EM_ANDAMENTO

Projeto com equipe definida e execução ativa.

### CONCLUIDO

Projeto finalizado formalmente. Apenas neste estado o feedback pode ser
gerado.

------------------------------------------------------------------------

## 5. Relações Estruturais

### 5.1 ProjectSkill

Define quais habilidades são desejadas no projeto.

### 5.2 ProjectStack

Define stacks tecnológicas e percentual de responsabilidade.

### 5.3 StackTaken

Representa qual usuário assumiu qual parte da stack.

------------------------------------------------------------------------

## 6. Regras de Negócio

-   Todo projeto deve possuir descrição clara.
-   Deve possuir deadline definido.
-   Apenas o owner pode alterar status.
-   Feedback só é permitido após status CONCLUIDO.
-   Percentual total de ProjectStack deve somar 100%.

------------------------------------------------------------------------

## 7. Impacto em Dados

-   Criação de registros em Project
-   Criação de registros relacionados em ProjectSkill e ProjectStack
-   Associação posterior via StackTaken

------------------------------------------------------------------------

## 8. Riscos Identificados

-   Má distribuição percentual de stack
-   Projetos criados sem equipe mínima
-   Encerramento prematuro para gerar feedback

------------------------------------------------------------------------

## 9. Métricas Relacionadas

-   Taxa de conclusão de projetos
-   Tempo médio de execução
-   Número médio de participantes por projeto
-   Percentual de projetos com feedback completo

------------------------------------------------------------------------

## 10. Histórico

Versão consolidada após revisão completa do schema.
