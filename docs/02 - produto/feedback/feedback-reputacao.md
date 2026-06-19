# Documento de Produto --- Sistema de Feedback e Reputação

Classificação: Documento de Produto / Funcionalidade\
Camada: 2 --- Produto\
Status: Versão consolidada alinhada ao schema.prisma

------------------------------------------------------------------------

## 1. Identificação da Funcionalidade

-   Nome da funcionalidade: Sistema de Feedback e Reputação
-   Domínio do produto: Reputação, Qualidade e Governança
-   Entidade principal: Feedback
-   Entidades relacionadas: Project, User, StackTaken
-   Documentos relacionados: Gestão de Projetos; Perfis de Usuário;
    Permissões e Papéis; Gestão de Stacks

------------------------------------------------------------------------

## 2. Contexto e Objetivo

O TryCatch é uma plataforma colaborativa onde desenvolvedores participam
de projetos reais em equipe.

Ao final de cada projeto concluído, os participantes podem avaliar uns
aos outros com base em comportamentos observáveis durante a execução do
trabalho.

A funcionalidade existe para:

-   Incentivar aprendizado contínuo;
-   Valorizar colaboração e postura profissional;
-   Construir confiança baseada em evidência real de participação;
-   Proteger usuários iniciantes contra exposição pública inadequada;
-   Criar um sistema de reputação progressivo e não competitivo.

O sistema é acionado exclusivamente após o projeto atingir status
CONCLUIDO.

------------------------------------------------------------------------

## 3. Estrutura da Entidade Feedback (schema.prisma)

Campos:

-   id
-   projectId
-   fromUserId
-   toUserId
-   rating (Int)
-   comment (opcional)
-   anonymous (Boolean)
-   stackTakenId (opcional)
-   createdAt
-   updatedAt

------------------------------------------------------------------------

## 4. Escopo da Funcionalidade

### 4.1 O que a funcionalidade faz

-   Permite que participantes de um mesmo projeto avaliem uns aos
    outros;
-   Vincula feedback obrigatoriamente a um projeto concluído;
-   Permite rating numérico (escala definida pelo produto, ex: 1 a 5);
-   Permite comentário opcional;
-   Permite anonimato apenas no frontend;
-   Permite vinculação a uma contribuição específica via stackTakenId;
-   Consolida sinais agregados no perfil público.

### 4.2 O que a funcionalidade não faz

-   Não cria ranking público de usuários;
-   Não gera nota pública única de reputação;
-   Não permite edição ou exclusão de feedback após envio;
-   Não permite avaliação fora de contexto de projeto;
-   Não expõe comentários negativos publicamente.

------------------------------------------------------------------------

## 5. Usuários Envolvidos e Permissões

-   Avaliador: participante confirmado de projeto CONCLUIDO;
-   Avaliado: participante do mesmo projeto;
-   Sistema: consolida dados e controla visibilidade.

Restrições:

-   Usuário não pode avaliar a si mesmo;
-   Apenas participantes confirmados podem avaliar;
-   Feedback não pode ser alterado após criação;
-   Identidade do avaliador sempre armazenada internamente.

------------------------------------------------------------------------

## 6. Fluxo de Uso (UX)

1.  Projeto é marcado como CONCLUIDO;
2.  Participantes recebem acesso ao fluxo de avaliação;
3.  Usuário seleciona participante a ser avaliado;
4.  Define rating;
5.  Opcionalmente adiciona comentário;
6.  Define se deseja anonimato no frontend;
7.  Feedback é registrado;
8.  Sistema consolida sinais agregados no perfil.

Estados relevantes:

-   Feedback pendente;
-   Feedback enviado;
-   Projeto concluído sem feedback;
-   Feedback contextualizado por stack.

------------------------------------------------------------------------

## 7. Regras de Negócio

-   Feedback só pode ocorrer após status CONCLUIDO;
-   Feedback é sempre vinculado a projectId;
-   rating deve respeitar escala definida;
-   anonymous não oculta identidade no banco de dados;
-   stackTakenId é opcional, mas se informado deve existir e pertencer
    ao mesmo projeto;
-   Feedbacks não podem ser editados nem excluídos;
-   Um usuário pode receber múltiplos feedbacks por projeto.

------------------------------------------------------------------------

## 8. Impactos em Dados

-   Criação de registro na tabela Feedback;
-   Relação com User (fromUser e toUser);
-   Relação com Project;
-   Relação opcional com StackTaken;
-   Dados utilizados para consolidação de reputação agregada.

Os dados são utilizados para:

-   Desenvolvimento do usuário;
-   Consolidação de sinais de reputação;
-   Auditoria interna e rastreabilidade.

------------------------------------------------------------------------

## 9. Impactos em Reputação e Confiança

A reputação no TryCatch não é uma nota isolada.

Ela representa um sinal construído a partir de múltiplas evidências de
participação real.

Decisões estruturais adotadas:

-   Separação entre feedback privado e sinal público agregado;
-   Ênfase em evolução ao longo do tempo;
-   Proibição explícita de ranking competitivo;
-   Redução de incentivos a comportamento estratégico de avaliação.

------------------------------------------------------------------------

## 10. Riscos Identificados

-   Retaliação entre participantes;
-   Avaliações estratégicas para prejudicar reputação;
-   Concentração de avaliações entre grupos fechados;
-   Viés inconsciente.

Mitigações incluem:

-   Registro interno de avaliador;
-   Contextualização por projeto;
-   Ausência de ranking público;
-   Consolidação agregada em vez de exposição isolada.

------------------------------------------------------------------------

## 11. Métricas Relacionadas

-   Taxa de envio de feedback por projeto concluído;
-   Média de rating por projeto;
-   Correlação entre stackTaken e rating;
-   Evolução temporal de reputação por usuário.

------------------------------------------------------------------------

## 12. Relação com Implementação Técnica

-   Depende do status do Project;
-   Depende da entidade StackTaken;
-   Integra-se ao perfil do usuário;
-   Requer controle de permissão baseado em participação real.

Este documento descreve comportamento esperado e decisões de produto,
não detalhes de implementação técnica.

------------------------------------------------------------------------

## 13. Histórico de Decisões

-   Adoção de rating contextualizado;
-   Permissão de anonimato apenas na interface;
-   Proibição de ranking público;
-   Separação entre feedback privado e reputação agregada;
-   Integração opcional com StackTaken para avaliação específica.
