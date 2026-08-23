# Documento de Produto --- Gestão de Projetos

Classificação: Documento de Produto / Funcionalidade\
Camada: 2 --- Produto\
**Status do documento:** Versão atualizada com regra de edição controlada e encerramento  
**Status da implementação:** 🟡 parcial — falta encerramento manual e notificação da equipe  
**Estado consolidado:** ver [estado-das-funcionalidades.md](../estado-das-funcionalidades.md)
manual

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

Projeto finalizado formalmente pelo **owner**.\
Apenas neste estado o feedback pode ser gerado.

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

### 6.1 Regras Gerais

-   Todo projeto deve possuir descrição clara.
-   Deve possuir deadline definido.
-   Percentual total de ProjectStack deve somar 100%.
-   Apenas o owner pode alterar o status.
-   Feedback só é permitido após status CONCLUIDO.

------------------------------------------------------------------------

### 6.2 Regra de Encerramento do Projeto

-   O projeto só pode ser marcado como CONCLUIDO pelo owner.
-   Só pode ser concluído se estiver em status EM_ANDAMENTO.
-   Todas as stacks devem estar assumidas para permitir encerramento.
-   Após concluído, o projeto não pode retornar para EM_ANDAMENTO (salvo
    regra futura específica).

------------------------------------------------------------------------

### 6.3 Regra de Edição do Projeto

#### Antes de existir qualquer StackTaken

O owner pode editar livremente:

-   name
-   description
-   deadline
-   totalValue
-   skills
-   stacks

#### Após existir pelo menos um StackTaken

O owner NÃO pode mais alterar:

-   name
-   deadline
-   totalValue
-   skills
-   stacks
-   descrição original

O owner pode apenas:

-   Adicionar uma observação à descrição.

A observação deve:

-   Ser adicionada automaticamente com date stamp (data e hora).
-   Não substituir o texto original.
-   Ser concatenada ao final da descrição existente.

Exemplo de formato:

\[Atualização - YYYY-MM-DD HH:mm\]\
Texto da observação adicionada pelo owner.

Essa regra garante transparência e preserva a confiança entre
participantes.

------------------------------------------------------------------------

### 6.4 Revisão de 19/08/2026 — notificar em vez de bloquear

**Decisão:** a restrição da seção 6.3 passa a ser **notificação**, não bloqueio.
O owner pode editar o projeto após a formação da equipe; as pessoas envolvidas
são avisadas da alteração.

**Por que mudou.** A regra foi implementada e desativada em 16/08/2026, por dois
defeitos que só apareceram no uso:

1. **Escopo largo demais.** A verificação tratava `name`, `deadline` e
   `totalValue` como estrutura, travando edições sem relação com a composição da
   equipe — inclusive corrigir um erro de digitação na descrição.

2. **Falso positivo na comparação de datas.** O formulário carregava o prazo sem
   a hora (`deadline.split('T')[0]`) enquanto o banco guardava o timestamp
   completo. Os dois nunca coincidiam, então **abrir a tela de edição e salvar
   sem alterar nada já disparava o bloqueio.** Na prática a regra não protegia a
   estrutura: travava a edição inteira, sem saída pela interface.

**Por que notificar é melhor.** O bloqueio parte da premissa de que mudar é
errado. Notificar parte de que **mudar sem avisar** é que é. Num projeto onde as
pessoas estão aprendendo a trabalhar em equipe, a segunda premissa é mais fiel ao
que acontece no mercado: escopo muda, e a equipe é comunicada.

O bloqueio também criava um beco sem saída — uma vez formada a equipe, nem o
owner nem um ADMIN conseguiam corrigir nada pela tela.

**A regra da observação com data continua valendo.** Ela é o registro histórico
da mudança; a notificação é o aviso ativo. As duas se complementam.

#### O que ainda precisa ser definido

- **Quem é notificado** — todos que assumiram stack, ou apenas os afetados pela
  alteração específica?
- **Por qual canal** — e-mail (o projeto já usa Resend), aviso no painel, ou os
  dois?
- **O que a mensagem informa** — que houve alteração, ou quais campos mudaram?
- **Alguma alteração ainda exige confirmação prévia?** Trocar uma stack já
  assumida afeta diretamente o trabalho de alguém — talvez mereça tratamento
  diferente de corrigir a descrição.

> ⚠️ **Estado atual do código:** a verificação existe em
> `src/app/api/team-project/[id]/route.ts`, desativada por uma constante, com o
> motivo documentado no próprio arquivo. Os três testes que a cobriam estão como
> `it.skip`, descrevendo o comportamento esperado caso a regra volte.

------------------------------------------------------------------------

## 7. Impacto em Dados

-   Criação de registros em Project
-   Criação de registros relacionados em ProjectSkill e ProjectStack
-   Associação posterior via StackTaken
-   Concatenação controlada de descrição em caso de observação

------------------------------------------------------------------------

## 8. Riscos Identificados

-   Má distribuição percentual de stack
-   Projetos criados sem equipe mínima
-   Encerramento prematuro para gerar feedback
-   Alterações indevidas após formação de equipe

------------------------------------------------------------------------

## 9. Métricas Relacionadas

-   Taxa de conclusão de projetos
-   Tempo médio de execução
-   Número médio de participantes por projeto
-   Percentual de projetos com feedback completo

------------------------------------------------------------------------

## 10. Templates Relacionados

-   `docs/templates/02 - template-cadastro-projeto-externo.md`

O template de cadastro de projeto externo padroniza as informações
necessárias para avaliar propostas enviadas por pessoas ou organizações
que ainda não são membros da plataforma.

------------------------------------------------------------------------

## 11. Histórico

Versão consolidada após revisão completa do schema.\
Atualização incluída: Regra de edição controlada e encerramento manual
do projeto.
