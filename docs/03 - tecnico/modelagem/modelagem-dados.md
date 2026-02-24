# Documento Técnico --- Modelagem de Dados

Classificação: Documento Técnico\
Camada: 3 --- Técnico\
Status: Atualizado após implementação do Portfólio Público por Username

------------------------------------------------------------------------

## 1. Entidades Principais

### User

#### Identificadores

-   **id**: Identificador interno único (uso exclusivo do sistema).
-   **userName**: Identificador público único (`@unique`).
    -   Utilizado como chave pública na rota `/portfolio/{username}`.
    -   Substitui o uso de `id` para exposição externa.
    -   Pode ser alterado pelo usuário (regra de produto).
    -   Deve ser único no sistema.

#### Campos de Controle de Visibilidade

-   **showEmail**: controla exibição pública do email.
-   **showGithub**: controla exibição pública do GitHub.
-   **showLinkedin**: controla exibição pública do LinkedIn.
-   **showCertificates**: controla exibição pública de certificados.
-   **showProjects**: controla exibição pública de projetos.
-   **showFeedback**: controla exibição pública de feedbacks.
-   **portfolioPublic**: define se o portfólio pode ser acessado
    publicamente.

#### Campos de Controle Sistêmico

-   **isActive**: define se o usuário está ativo na plataforma.

#### Observações Arquiteturais

-   O campo `emailVisible` foi removido para padronização.
-   O `id` nunca deve ser utilizado como identificador público.
-   A separação entre identificador interno (`id`) e público
    (`userName`) é obrigatória.

------------------------------------------------------------------------

### Project

-   Possui enumeração **ProjectStatus**:
    -   `BUSCANDO`
    -   `EM_ANDAMENTO`
    -   `CONCLUIDO`

#### Regra de Exposição Pública

-   Apenas projetos com status **CONCLUIDO** podem ser exibidos no
    portfólio público.
-   Projetos em `BUSCANDO` ou `EM_ANDAMENTO` não são elegíveis para
    exposição pública.

------------------------------------------------------------------------

### Feedback

-   Relaciona dois usuários (avaliador e avaliado).
-   O campo `fromUser` é persistido no banco para rastreabilidade.
-   No frontend público, a identificação do avaliador é anonimizada.
-   A reputação atualmente é calculada como média simples dos ratings
    recebidos.

------------------------------------------------------------------------

### Invite

Entidade responsável pelo controle de convites para criação de usuários.

------------------------------------------------------------------------

### Stack

Representa tecnologias associadas a projetos e usuários.

------------------------------------------------------------------------

### Skill

Representa habilidades individuais associadas a usuários.

------------------------------------------------------------------------

## 2. Relações

-   Usuários participam de Projetos via `StackTaken`.
-   Feedback está vinculado a Projeto e Usuários.
-   Invite vincula criação de User.
-   User possui múltiplas Skills.
-   User possui múltiplos Certificados.

------------------------------------------------------------------------

## 3. Regras de Exposição Pública

As seguintes regras são aplicadas nas rotas públicas:

1.  A URL pública utiliza exclusivamente `userName`.
2.  Se o usuário não existir → retornar 404.
3.  Se `isActive = false` → retornar 404.
4.  Se `portfolioPublic = false` → retornar 404.
5.  Campos são exibidos apenas se seus respectivos toggles estiverem
    ativos.
6.  Apenas projetos com `ProjectStatus.CONCLUIDO` são exibidos.
7.  Email nunca é exibido no resumo público (`/portfolios`).
8.  Certificados e projetos não aparecem na listagem resumida.
9.  Feedback é exibido apenas se `showFeedback = true`.

Essas regras devem ser mantidas consistentes entre backend e frontend.

------------------------------------------------------------------------

## 4. Logging e Auditoria

-   As rotas públicas utilizam logger estruturado.
-   `console.log` não deve ser utilizado em produção.
-   Logs devem registrar:
    -   Tentativas de acesso.
    -   Tentativas de acesso a portfólio privado.
    -   Erros inesperados.
-   O logging é parte da estratégia de rastreabilidade e suporte.

------------------------------------------------------------------------

## 5. Princípios Arquiteturais

-   Integridade referencial garantida via Prisma.
-   Separação clara entre dados públicos e privados.
-   Minimização de exposição de dados sensíveis.
-   Não exposição de identificadores internos.
-   Rastreamento histórico e auditabilidade.
-   Aplicação consistente de regras de negócio no backend.
