## Documento de Produto — Sistema de Feedback e Reputação
#### Classificação: Documento de Produto / Funcionalidade
#### Camada: 2 — Documentos de Produto e Funcionalidades
#### Status: Em desenvolvimento / Documento em evolução
________________________________________
### 1. Identificação da Funcionalidade
-	Nome da funcionalidade: Sistema de Feedback e Reputação (Feedback)
-	Domínio do produto: Reputação, Qualidade e Governança
-	Documentos relacionados: Gestão de Projetos; Perfis de Usuário; Participação em Projetos e Papéis
________________________________________
### 2. Contexto e Objetivo
O TryCatch é uma plataforma colaborativa onde desenvolvedores participam de projetos reais em equipe. Ao final de cada projeto, os participantes podem avaliar uns aos outros com base em comportamentos observáveis durante a execução do trabalho.
#### A funcionalidade de Feedback e Reputação existe para:
-	Incentivar aprendizado contínuo;
-	Valorizar colaboração e postura profissional;
-	Construir confiança real para recrutadores;
-	Proteger usuários iniciantes;
-	Escalar a avaliação de forma justa e sustentável.

O sistema é acionado após a conclusão de projetos, nunca durante sua execução.
________________________________________
### 3. Escopo da Funcionalidade
#### 3.1 O que a funcionalidade faz
-	Permite que participantes de um mesmo projeto avaliem uns aos outros;
-	Registra feedback sempre de forma contextual, vinculado a projetos concluídos;
-	Utiliza um modelo de feedback multidimensional;
-	Consolida feedbacks privados em sinais públicos de reputação;
-	Prioriza leitura de evolução ao longo do tempo;
-	Protege usuários contra exposição pública de feedback sensível.
#### 3.2 O que a funcionalidade não faz
-	Não atribui nota única de reputação;
-	Não cria rankings de usuários;
-	Não permite comparação direta entre perfis;
-	Não expõe feedback negativo de forma pública;
-	Não permite curadoria manual do que se torna público;
-	Não utiliza percentuais ou pontuações absolutas.
________________________________________
### 4. Usuários Envolvidos e Permissões
-	Avaliador: participante confirmado de um projeto concluído;
-	Avaliado: participante do mesmo projeto;
-	Sistema: consolida feedbacks, controla visibilidade e gera sinais de reputação.
#### Restrições:
-	Apenas participantes confirmados podem avaliar;
-	Feedbacks não podem ser editados ou excluídos;
-	Usuários não avaliam a si mesmos.
________________________________________
### 5. Fluxo de Uso (UX)
1.	Um projeto é marcado como concluído;
2.	Participantes recebem acesso ao fluxo de feedback;
3.	O usuário avalia outros participantes do projeto;
4.	O feedback é registrado de forma privada;
5.	O sistema consolida dados ao longo do tempo;
6.	Sinais agregados são exibidos publicamente no perfil;
7.	Feedback detalhado permanece acessível apenas ao usuário avaliado.
#### Estados relevantes:
-	Feedback disponível;
-	Feedback enviado;
-	Feedback pendente;
-	Projeto sem feedbacks.
________________________________________
### 6. Regras de Negócio
-	Feedback só pode ocorrer após conclusão do projeto;
-	Feedback é sempre vinculado a um projeto específico;
-	Um usuário pode receber múltiplos feedbacks por projeto;
-	Comentários textuais são opcionais;
-	O avaliador pode optar por anonimato no frontend;
-	A identidade do avaliador é sempre registrada internamente;
-	Feedbacks não podem ser editados nem excluídos;
-	Escalas são curtas e sem nota geral consolidada.
________________________________________
### 7. Impactos em Dados
-	Criação de registros de feedback por projeto;
-	Associação com usuários avaliadores e avaliados;
-	Vínculo com skills e stacks utilizadas (quando aplicável);
-	Consolidação histórica para leitura de evolução;
-	Uso de janelas móveis para análise temporal.
#### Os dados são utilizados exclusivamente para:
-	Desenvolvimento do usuário;
-	Consolidação de reputação;
-	Auditoria e rastreabilidade.
________________________________________
### 8. Impactos em Reputação e Confiança
A reputação no TryCatch não é uma nota.

Ela representa um sinal de confiabilidade profissional, construído a partir de evidências reais de participação em projetos.
#### Decisões adotadas:
-	Separação entre feedback privado e reputação pública;
-	Uso de estados qualitativos em vez de números;
-	Ênfase em evolução individual ao longo do tempo;
-	Redução de vieses e competição direta entre usuários.
________________________________________
### 9. Comunicação com o Usuário
-	Feedback detalhado é acessado exclusivamente dentro da plataforma;
-	E-mails, quando utilizados, contêm apenas notificações neutras;
-	Não há envio de conteúdo sensível por e-mail;
-	Linguagem clara, respeitosa e não punitiva.
________________________________________
### 10. Antipadrões Evitados
-	Nota única de reputação;
-	Rankings públicos de usuários;
-	Percentuais comparativos;
-	Exposição pública de feedback negativo;
-	Competição direta entre perfis;
-	Comparações absolutas entre habilidades.
________________________________________
### 11. Relação com Implementação Técnica
-	Relaciona-se a entidades de Feedback, ProjectSkill e StackTaken;
-	Depende do estado de conclusão do projeto;
-	Integrado aos fluxos de perfil e projetos.

Este documento descreve comportamento esperado e decisões de produto, não detalhes de implementação técnica.
________________________________________
### 12. Histórico de Decisões
-	Adoção de feedback multidimensional;
-	Separação explícita entre feedback privado e reputação pública;
-	Decisão por estados qualitativos em vez de notas;
-	Proibição consciente de rankings e comparações diretas.
________________________________________
Este documento está alinhado ao Documento 0 — Visão Geral, Governança e Arquitetura da Documentação.
