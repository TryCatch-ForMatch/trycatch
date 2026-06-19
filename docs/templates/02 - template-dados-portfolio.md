# Template de Dados do Portfólio

**Classificação:** Template de Produto  
**Camada:** 2 - Documentos de Produto e Funcionalidades  
**Status:** Template oficial

------------------------------------------------------------------------

## 1. Objetivo

Padronizar os dados usados para criar, revisar e publicar o portfólio de
um membro na plataforma TryCatch.

Este template ajuda a manter portfólios claros, completos e consistentes,
sem expor dados privados sem consentimento.

------------------------------------------------------------------------

## 2. Identificação do Membro

| Campo | Descrição | Obrigatório | Visibilidade |
| --- | --- | --- | --- |
| Nome público | Nome exibido no portfólio. | Sim | Pública |
| Username | Identificador usado na rota `/portfolio/{username}`. | Sim | Pública |
| Email | Email do usuário cadastrado na plataforma. | Sim | Condicional |
| Avatar | Imagem de perfil ou avatar. | Não | Pública |
| Bio | Resumo profissional curto. | Sim | Pública |
| Função | Papel atual na plataforma, como membro, mentor ou administrador. | Sim | Pública |
| Localização | Cidade, região ou atuação remota. | Não | Pública |

### Regras

- O username deve ser único.
- O email só deve aparecer publicamente quando `showEmail = true`.
- A bio deve explicar atuação, interesses e tipo de contribuição sem
  incluir dados sensíveis.

------------------------------------------------------------------------

## 3. Resumo Profissional

Preencher com uma descrição objetiva sobre a pessoa.

| Campo | Orientação |
| --- | --- |
| Título profissional | Exemplo: Desenvolvedor Frontend, UX Designer, Product Manager. |
| Sobre | Texto curto com experiência, foco de atuação e interesses. |
| Objetivo na plataforma | Como a pessoa deseja contribuir ou participar. |
| Disponibilidade | Horários, carga estimada ou forma de contato preferida. |
| Idiomas | Idiomas relevantes para colaboração. |

### Critérios de qualidade

- O texto deve ser escrito em primeira pessoa ou terceira pessoa de forma
  consistente.
- A descrição deve ser clara para visitantes externos.
- Evitar promessas vagas sem evidências, como especialista em tudo.

------------------------------------------------------------------------

## 4. Habilidades e Tecnologias

Registrar habilidades técnicas, de produto, design, gestão ou colaboração.

| Campo | Descrição |
| --- | --- |
| Habilidade | Nome da habilidade ou tecnologia. |
| Categoria | Técnica, produto, design, gestão, comunicação ou outra categoria clara. |
| Nível | Iniciante, intermediário, avançado ou mentor. |
| Evidência | Projeto, certificado, experiência ou link que sustenta a habilidade. |
| Observação | Contexto de uso, preferência ou limitação relevante. |

### Exemplo

| Habilidade | Categoria | Nível | Evidência | Observação |
| --- | --- | --- | --- | --- |
| React | Técnica | Intermediário | Projeto público concluído | Atua em interfaces responsivas. |

------------------------------------------------------------------------

## 5. Projetos Concluídos

Registrar apenas projetos elegíveis para exibição pública.

| Campo | Descrição |
| --- | --- |
| Nome do projeto | Nome público do projeto. |
| Descrição | Problema resolvido e resultado principal. |
| Papel exercido | Função da pessoa no projeto. |
| Tecnologias usadas | Stacks ou ferramentas utilizadas. |
| Contribuições | Entregas realizadas pela pessoa. |
| Resultado | Impacto, entrega final ou aprendizado. |
| Link público | Repositório, deploy, case ou material permitido. |
| Status | Deve ser `CONCLUIDO` para aparecer no portfólio público. |

### Regras

- Projetos em andamento ou buscando equipe não entram no portfólio
  público.
- Se `showProjects = false`, os projetos não devem ser exibidos.
- Quando a pessoa atuar em múltiplas stacks no mesmo projeto, o projeto
  deve aparecer como um único item com as stacks agrupadas.

------------------------------------------------------------------------

## 6. Certificados e Evidências

| Campo | Descrição |
| --- | --- |
| Nome | Nome do certificado, curso ou evidência. |
| Instituição | Organização emissora. |
| Data | Data de emissão ou conclusão. |
| Link | URL pública quando existir. |
| Relação com o perfil | Como o certificado reforça o portfólio. |

### Regras

- Certificados só aparecem se `showCertificates = true`.
- Links devem ser públicos e válidos.
- Não incluir documentos pessoais, comprovantes privados ou arquivos com
  dados sensíveis.

------------------------------------------------------------------------

## 7. Links e Contato

| Campo | Descrição | Regra de exibição |
| --- | --- | --- |
| Github | Perfil com repositórios ou contribuições. | Exibir se `showGithub = true`. |
| Linkedin | Perfil profissional. | Exibir se `showLinkedin = true`. |
| Site pessoal | Portfólio externo, blog ou página profissional. | Exibir se for público. |
| Email | Canal direto de contato. | Exibir se `showEmail = true`. |

### Critérios

- Links devem abrir corretamente.
- Links devem representar a pessoa ou sua produção profissional.
- Não usar links temporários, privados ou sem relação com o perfil.

------------------------------------------------------------------------

## 8. Configurações de Visibilidade

| Campo | Valor padrão | Descrição |
| --- | --- | --- |
| `portfolioPublic` | `true` | Define se o portfólio pode ser acessado publicamente. |
| `showEmail` | `false` | Controla a exibição pública do email. |
| `showGithub` | `true` | Controla a exibição pública do Github. |
| `showLinkedin` | `true` | Controla a exibição pública do Linkedin. |
| `showCertificates` | `true` | Controla a exibição pública de certificados. |
| `showProjects` | `true` | Controla a exibição pública de projetos concluídos. |
| `showFeedback` | `false` | Controla a exibição pública de feedbacks. |

### Regras

- Se `portfolioPublic = false`, a rota pública deve retornar 404.
- Visitantes só veem dados permitidos pelas configurações de visibilidade.
- O resumo público em `/portfolios` nunca deve exibir email.

------------------------------------------------------------------------

## 9. Feedback e Reputação

| Campo | Descrição |
| --- | --- |
| Projeto relacionado | Projeto em que o feedback foi recebido. |
| Nota | Avaliação numérica quando aplicável. |
| Comentário | Texto do feedback recebido. |
| Origem | Usuário que registrou o feedback, preservado para rastreabilidade. |
| Exibição pública | Controlada por `showFeedback`. |

### Regras

- Feedback só aparece publicamente se `showFeedback = true`.
- O backend deve manter rastreabilidade completa.
- A interface pública deve evitar exposição excessiva de quem avaliou.

------------------------------------------------------------------------

## 10. Privacidade e Segurança

Não incluir no portfólio:

- Senhas, tokens, chaves de API ou credenciais.
- Documentos pessoais.
- Dados de clientes sem autorização.
- Links privados.
- Informações internas de projetos que não podem ser divulgadas.
- Email público sem consentimento explícito.

------------------------------------------------------------------------

## 11. Modelo Preenchível

### Identificação

- Nome público:
- Username:
- Email:
- Avatar:
- Função:
- Localização:

### Bio

- Título profissional:
- Sobre:
- Objetivo na plataforma:
- Disponibilidade:
- Idiomas:

### Habilidades

| Habilidade | Categoria | Nível | Evidência | Observação |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

### Projetos concluídos

| Projeto | Papel | Tecnologias | Contribuições | Resultado | Link |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

### Certificados

| Nome | Instituição | Data | Link | Relação com o perfil |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

### Links

- Github:
- Linkedin:
- Site pessoal:
- Email público: sim ou não

### Visibilidade

- `portfolioPublic`:
- `showEmail`:
- `showGithub`:
- `showLinkedin`:
- `showCertificates`:
- `showProjects`:
- `showFeedback`:

------------------------------------------------------------------------

## 12. Checklist de Revisão

- Nome público e username preenchidos.
- Bio clara e sem dados sensíveis.
- Habilidades organizadas por categoria e nível.
- Projetos listados apenas quando concluídos.
- Links públicos testados.
- Certificados revisados e com origem clara.
- Configurações de visibilidade confirmadas.
- Email público autorizado quando `showEmail = true`.
- Texto revisado para clareza, respeito e consistência.
- Nenhuma informação privada ou interna foi exposta.
