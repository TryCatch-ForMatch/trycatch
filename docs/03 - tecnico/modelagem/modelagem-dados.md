# Documento Técnico --- Modelagem de Dados

Classificação: Documento Técnico\
Camada: 3 --- Técnico

## 1. Entidades Principais

### User

Campos relevantes adicionados para controle de identidade pública e visibilidade:

- userName: identificador público único (@unique)
- showEmail: controla exibição do email
- showGithub: controla exibição do GitHub
- showLinkedin: controla exibição do LinkedIn
- showCertificates: controla exibição de certificados
- showProjects: controla exibição de projetos
- showFeedback: controla exibição de feedbacks
- portfolioPublic: define se o portfólio é público ou privado

O campo emailVisible foi removido para padronização.
### Project
### Feedback
### Invite
### Stack
### Skill

## 2. Relações

-   Usuários participam de Projetos.
-   Feedback está vinculado a Projeto e Usuários.
-   Invite vincula criação de User.

## 3. Princípios

-   Integridade referencial.
-   Rastreamento histórico.
-   Separação entre dados públicos e privados.
