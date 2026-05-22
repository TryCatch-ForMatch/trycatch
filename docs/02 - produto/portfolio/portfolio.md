# Documento de Produto --- Portfólio Público

**Classificação:** Documento de Produto / Funcionalidade\
**Camada:** 2 --- Documentos de Produto e Funcionalidades\
**Status:** Implementado (primeira versão consolidada)

------------------------------------------------------------------------

## 1. Identificação da Funcionalidade

-   **Nome da funcionalidade:** Portfólio Público por Username\
-   **Domínio do produto:** Usuários / Reputação / Exposição
    Profissional\
-   **Documento relacionado:** Documento 0 --- Visão Geral, Governança e
    Arquitetura da Documentação

------------------------------------------------------------------------

## 2. Contexto e Objetivo

O Portfólio Público permite que usuários exponham suas informações
profissionais dentro da plataforma TryCatch.

Resolve os seguintes problemas:

-   Permite apresentação estruturada de habilidades e experiências;
-   Facilita formação de equipes por meio de transparência profissional;
-   Possibilita compartilhamento externo do perfil via link público.

A funcionalidade é acessada por meio da rota pública:

/portfolio/{username}

Não exige autenticação.

------------------------------------------------------------------------

## 3. Escopo da Funcionalidade

### 3.1 O que a funcionalidade faz

-   Exibe dados públicos configurados pelo usuário;
-   Permite controle granular de visibilidade por meio de toggles;
-   Exibe apenas projetos com status **CONCLUIDO**;
-   Agrupa múltiplas stacks assumidas pelo usuário dentro de um mesmo
    projeto;
-   Permite listagem pública resumida em `/portfolios`;
-   Permite compartilhamento externo via URL baseada em username;
-   Retorna 404 quando o portfólio não deve ser exibido.

### 3.2 O que a funcionalidade não faz

-   Não exibe projetos em andamento ou buscando equipe;
-   Não exibe email no resumo público;
-   Não expõe dados privados quando toggles estão desativados;
-   Não permite edição pública (edição apenas via `/portfolio/me`);
-   Não permite descobrir se um usuário existe quando o portfólio é
    privado.

------------------------------------------------------------------------

## 4. Usuários Envolvidos e Permissões

### Usuário Visitante (não autenticado)

-   Pode acessar `/portfolio/{username}`;
-   Pode acessar `/portfolios`.

### Usuário Autenticado

-   Pode acessar `/portfolio/me`;
-   Pode alterar dados e configurações de visibilidade.

### Restrições

-   Se `portfolioPublic = false`, a rota pública retorna 404.
-   Apenas usuários `isActive = true` podem ter portfólio público.

------------------------------------------------------------------------

## 5. Fluxo de Uso (UX)

### Fluxo principal público

1.  Usuário acessa `/portfolios`;
2.  Visualiza cards resumidos;
3.  Clica em um card;
4.  É direcionado para `/portfolio/{username}`;
5.  Visualiza apenas dados permitidos pelos toggles.

### Estrutura da página pública

A página pública é composta pelas seguintes seções:

1.  Identidade (avatar, nome, bio, links)
2.  Tecnologias
3.  Projetos Concluídos
4.  Certificados
5.  Feedback

### Estados

-   404 se usuário inexistente;
-   404 se portfólio privado;
-   Exibição parcial caso toggles desativem campos.

------------------------------------------------------------------------

## 6. Regras de Negócio

1.  O portfólio público é identificado exclusivamente por `username`.
2.  O campo `username` é único no sistema.
3.  Se `portfolioPublic = false`, retornar 404.
4.  Se `isActive = false`, retornar 404.
5.  Email só é exibido se `showEmail = true`.
6.  Github só é exibido se `showGithub = true`.
7.  Linkedin só é exibido se `showLinkedin = true`.
8.  Certificados só são exibidos se `showCertificates = true`.
9.  Feedback só é exibido se `showFeedback = true`.
10. Projetos exibidos apenas se:

-   `showProjects = true`
-   `ProjectStatus = CONCLUIDO`

11. Resumo (`/portfolios`) nunca exibe email.
12. Resumo não exibe certificados ou projetos.
13. Feedback exibe identificação do avaliador no frontend, mantendo
    rastreabilidade completa no backend.
14. O sistema utiliza logging estruturado para registrar acessos e
    eventos relevantes.
15. Quando um usuário assume múltiplas stacks em um mesmo projeto, o
    sistema deve agrupá-las em um único card de projeto.

Todas as regras são testáveis.

------------------------------------------------------------------------

## 7. Impactos em Dados

### Entidades impactadas

-   User
-   UserSkill
-   UserCertificate
-   Feedback
-   StackTaken
-   Project

### Dados sensíveis

-   Email (controlado por toggle)
-   Links externos
-   Feedback

O sistema evita exposição indevida via:

-   Toggles granulares;
-   Política de 404 para portfólio privado.

------------------------------------------------------------------------

## 8. Impactos em Reputação e Confiança

O portfólio público impacta diretamente:

-   Percepção de competência;
-   Formação de equipes;
-   Confiança entre membros;
-   Exposição profissional externa.

Riscos mitigados:

-   Controle granular de visibilidade;
-   Exibição apenas de projetos concluídos;
-   Impossibilidade de detectar existência de usuário privado;
-   Logging estruturado para rastreabilidade.

------------------------------------------------------------------------

## 9. Comunicação com o Usuário

### Mensagens

-   404 para portfólio inexistente ou privado;
-   Mensagens de erro padronizadas via `MESSAGES`.

Não há comunicação transacional associada nesta versão.

------------------------------------------------------------------------

## 10. Antipadrões Evitados

-   Uso de ID interno na URL pública (substituído por username);
-   Exposição automática de dados pessoais;
-   Exposição de projetos em andamento;
-   Uso de `console.log` (substituído por logger estruturado);
-   Retorno 403 para portfólio privado (substituído por 404 por
    segurança);
-   Lógica de agrupamento de projetos no frontend (realizada no
    backend).

------------------------------------------------------------------------

## 11. Relação com Implementação Técnica

### Documentos técnicos relacionados

-   docs/03-tecnico/modelagem-dados.md
-   docs/03-tecnico/arquitetura-geral.md

### Templates relacionados

-   docs/templates/02 - template-dados-portfolio.md

### Pontos técnicos relevantes

-   `username` é identificador público;
-   Filtro `ProjectStatus.CONCLUIDO` aplicado na query;
-   Uso de logger estruturado (timestamp, nível, contexto e metadados);
-   Uso de toggles no modelo `User`;
-   A resposta pública da API retorna projetos já agrupados, evitando
    lógica de agregação no frontend.

------------------------------------------------------------------------

## 12. Histórico de Decisões

-   Substituição de busca por ID para username;
-   Retorno 404 para portfólio privado;
-   Implementação de toggles de visibilidade;
-   Restrição a projetos concluídos;
-   Adoção de logging estruturado;
-   Agrupamento de stacks por projeto no backend.

------------------------------------------------------------------------

## 13. Status e Próximos Passos

### Status atual:

Implementado (versão consolidada)

### Próximos passos:

-   Criar geração automática de `username` no cadastro;
-   Permitir edição de username pelo usuário;
-   Definir modelo definitivo de reputação;
-   Implementar versão interna ampliada para formação de equipes;
-   Revisar logging em todas as rotas;
-   Implementar SEO e metadados públicos;
-   Revisar padronização visual do portfólio.
