# Documento de Produto --- Gestão de Stacks

Classificação: Documento de Produto / Funcionalidade\
Camada: 2 --- Produto\
**Status do documento:** Versão consolidada baseada no schema.prisma  
**Status da implementação:** 🟢 completa — CRUD no painel e vínculo com projetos  
**Estado consolidado:** ver [estado-das-funcionalidades.md](../estado-das-funcionalidades.md)

------------------------------------------------------------------------

## 1. Identificação

-   Entidades principais: Stack, ProjectStack, StackTaken

------------------------------------------------------------------------

## 2. Contexto e Objetivo

A gestão de stacks permite estruturar tecnicamente a divisão de
responsabilidades dentro de um projeto.

Resolve:

-   Falta de clareza sobre responsabilidades técnicas;
-   Distribuição desigual de esforço;
-   Dificuldade de rastrear contribuição individual.

------------------------------------------------------------------------

## 3. Entidade Stack

Representa tecnologia base (ex: React, Node, PostgreSQL).

Campos: 
- id 
- name 
- createdAt 
- updatedAt

------------------------------------------------------------------------

## 4. Entidade ProjectStack

Representa a porcentagem da stack dentro do projeto.

Campos: 
- projectId 
- stackId 
- percentage

Regras: 
- Percentual total do projeto deve ser 100% 
- Cada stack pode aparecer apenas uma vez por projeto

------------------------------------------------------------------------

## 5. Entidade StackTaken

Representa a alocação real de um usuário para uma parte da stack.

Campos: 
- projectStackId 
- userId 
- stackId 
- projectId

Permite:

-   Rastrear contribuição individual
-   Vincular feedback a stack específica

------------------------------------------------------------------------

## 6. Regras de Negócio

-   Apenas participantes do projeto podem assumir stack
-   Um usuário pode assumir múltiplas stacks
-   StackTaken depende de ProjectStack existente

------------------------------------------------------------------------

## 7. Impacto em Feedback

Feedback pode ser vinculado a stackTakenId para avaliação contextual.

------------------------------------------------------------------------

## 8. Riscos Identificados

-   Concentração excessiva de responsabilidade em um usuário
-   Percentuais inconsistentes
-   Falta de alinhamento entre skill e stack

------------------------------------------------------------------------

## 9. Métricas Relacionadas

-   Distribuição média de stacks por projeto
-   Correlação entre stack e feedback
-   Participação média por usuário em stacks

------------------------------------------------------------------------

## 10. Histórico

Documento criado após análise completa do schema.prisma.
