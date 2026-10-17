# Documento de Produto — Sistema de Feedback e Reputação
 
**Classificação:** Documento de Produto / Funcionalidade
**Camada:** 2 — Documentos de Produto e Funcionalidades
**Status do documento:** Versão 2 — modelo de reputação definido, pendente de migration
**Status da implementação:** 🔴 não iniciada — API antiga (`rating`) existe; modelo desta versão exige mudança de schema
**Estado consolidado:** ver [estado-das-funcionalidades.md](../estado-das-funcionalidades.md)
 
> ⚠️ **Esta versão substitui a v1.** A v1 previa `rating` numérico agregado como
> média simples exibida publicamente. Essa decisão foi revertida — o motivo está
> na seção 15.
 
---
 
## 1. Identificação da Funcionalidade
 
- **Nome da funcionalidade:** Sistema de Feedback e Reputação
- **Domínio do produto:** Reputação, Qualidade e Governança
- **Entidade principal:** `Feedback`
- **Entidades relacionadas:** `Project`, `User`, `StackTaken`, `FeedbackAttribute` (nova)
- **Documentos relacionados:** Gestão de Projetos; Perfis de Usuário; Portfólio;
  Permissões e Papéis; Governança de Dados e LGPD
---
 
## 2. Contexto e Objetivo
 
### 2.1 O problema que esta funcionalidade resolve
 
Código deixou de ser evidência confiável de competência. Uma ferramenta de IA
escreve um projeto inteiro em uma tarde, e o repositório resultante não distingue
quem sabe trabalhar em equipe de quem apenas soube pedir.
 
O que uma IA **não** faz:
 
- avisar a equipe que vai atrasar;
- revisar o trabalho de outra pessoa;
- perguntar antes de decidir uma regra de negócio que não estava escrita;
- aparecer na semana seguinte.
**A funcionalidade existe para registrar exatamente o que sobra quando o código
deixa de provar alguma coisa: comportamento colaborativo observável.**
 
Isso reposiciona a feature. Não é avaliação de competência técnica — para isso
existem os projetos concluídos e as skills no portfólio. É **atestado de conduta
em trabalho real, dado por quem estava lá.**
 
### 2.2 Quando é acionada
 
Exclusivamente após um projeto atingir status `CONCLUIDO`.
 
> 🔗 **Dependência bloqueante.** O encerramento manual de projeto (épico #553)
> ainda não está implementado. Nenhum projeto alcança `CONCLUIDO` hoje, portanto
> **nenhum feedback pode ser gerado até que aquele épico seja concluído.**
> Ver `docs/02 - produto/projetos/gestao-projetos.md`.
 
---
 
## 3. Princípios que governam esta funcionalidade
 
Derivados do Documento Estratégico — Plano Geral de Comunicação e dos Textos
Institucionais de Qualidade, Avaliação e Feedback:
 
1. **Não existe lado negativo público.** A camada pública registra apenas o que
   foi observado de positivo. Ausência de atestado significa ausência de
   evidência, nunca avaliação ruim.
2. **Sem ranking, sem nota, sem média pública.** Duas médias lado a lado são um
   ranking, independentemente de como sejam rotuladas.
3. **Sem teto.** Nenhum indicador comunica "70% preenchido". Quem tem poucos
   atestados aparece com poucos, não aparece incompleto.
4. **Comportamento, não personalidade.** "Avisa antes de travar" é testemunhável.
   "É comunicativo" não é.
5. **Anonimato público, identificação interna.** Ver seção 7.
6. **Iniciante nunca aparece pior por ser iniciante.** Quem entrou agora tem
   poucos sinais — o que é honesto — e nunca um sinal de baixa qualidade.
---
 
## 4. Arquitetura da funcionalidade: duas camadas
 
A funcionalidade tem **duas camadas de natureza diferente**. A separação não é um
toggle de visibilidade: são coisas distintas, com finalidade, formato e regras
próprias.
 
| | Camada A — Corroborações | Camada B — Feedback de desenvolvimento |
|---|---|---|
| **O que é** | Atestados de comportamento observado | Texto livre construtivo |
| **Formato** | Seleção de até 3 eixos | Texto aberto |
| **Onde vive** | Portfólio público (agregado) | Área privada do avaliado |
| **Quem vê** | Qualquer visitante, se habilitado | Só o avaliado — e só ele decide publicar |
| **Tem lado negativo?** | Não. Só existe atestado positivo | Sim, pode conter crítica construtiva |
| **Vira número?** | Nunca | Nunca |
 
---
 
## 5. Camada A — Corroborações
 
### 5.1 Os eixos
 
Seis eixos fixos, todos redigidos como **comportamento observável em projeto
real**. A lista é fechada por decisão de produto: eixo livre viraria elogio
genérico e destruiria a comparabilidade entre perfis.
 
| Chave interna | Selo público | O que a pessoa atesta ao marcar |
|---|---|---|
| `COMUNICA_IMPEDIMENTOS` | 🗣️ Avisa antes de travar | Comunicou bloqueio ou atraso com antecedência útil |
| `ENTREGA_O_COMBINADO` | 📦 Entrega o que assume | Cumpriu o escopo da stack que assumiu |
| `ENTREGA_NO_PRAZO` | ⏱️ Entrega no prazo | Cumpriu o prazo acordado, não apenas o escopo |
| `APOIA_A_EQUIPE` | 🤝 Puxa a equipe junto | Ajudou colega, revisou trabalho de outro, destravou alguém |
| `PERGUNTA_ANTES_DE_DECIDIR` | 🧭 Pergunta antes de decidir | Não inventou regra de negócio por conta própria |
| `RECEBE_REVISAO` | 🔄 Recebe revisão sem travar o time | Absorveu crítica técnica e seguiu, sem parar o fluxo |
| `ADAPTA_A_MUDANCA` | 🛠️ Se ajusta quando o plano muda | Seguiu produzindo quando escopo ou prazo mudaram |
 
**Regra dos rótulos:** todo selo começa com verbo na terceira pessoa e descreve
ação. É proibido rótulo com superlativo (*"Mestre em..."*), com traço inato
(*"...nato"*) ou que implique escala (*"nível avançado em..."*). Superlativo
pressupõe hierarquia, e hierarquia é ranking.

#### Eixos avaliados e não incluídos — 19/08/2026

Registrado para não serem repropostos sem contexto.

| Proposta | Por que ficou de fora |
|---|---|
| **Criatividade** | Não testemunhável — como se comprova? Julgamento de criatividade carrega viés documentado: a mesma ideia é lida como criativa ou estranha conforme quem propôs |
| **Disciplina** | Sinônimo de comprometimento no uso corrente, já coberto por *Entrega o que assume*. Carrega julgamento moral |
| **Trabalha bem em equipe** | Já coberto por *Puxa a equipe junto*, que diz a mesma coisa como ação observada em vez de qualidade da pessoa |
| **Comprometimento** | Idem — *Entrega o que assume* é a versão testemunhável |
| **Domínio da stack** | "Domínio" implica escala, e escala é nível. O portfólio já exibe as stacks assumidas por projeto — isso é registro factual, não precisa de atestado |
| **Aprende rápido** | Único eixo comparativo proposto: rápido em relação a quem? Fere o princípio 6 com mais força que qualquer outro, porque quem está começando *está aprendendo por definição*. Há ainda o efeito perverso de que "aprende rápido" costuma significar "já sabia" |
| **Encara stack que não conhecia** | Versão comportamental do anterior, e viável. Ficou de fora para não passar de sete eixos — com limite de 3, cada eixo a mais dilui a escolha. Primeiro candidato a entrar se algum eixo se mostrar morto pela métrica da seção 17 |
| **Autonomia na stack** *(existia na v2)* | Substituído por *Se ajusta quando o plano muda*. A frase original — "Resolve sem ser conduzido" — definia a pessoa pela ausência de ajuda e colidia com *Pergunta antes de decidir*, podendo ensinar a quem chega que pedir ajuda custa um selo |

> 💡 **Critério que guiou a lista:** adjetivo é opinião, comportamento é
> testemunho. Como aval profissional, *"Entrega o que assume · 5 pessoas ·
> 3 projetos"* vale mais que *"é comprometida"* — todo perfil se diz
> comprometido, e recrutador desconta adjetivo.
 
### 5.2 Como se avalia
 
- O avaliador seleciona **no máximo 3 eixos** por pessoa avaliada.
- O limite de 3 é deliberado: obriga escolha e impede marcar tudo por gentileza,
  o que esvaziaria o sinal.
- Selecionar zero eixos é permitido — ver seção 5.6.
### 5.3 Como aparece no portfólio
 
Formato de exibição:
 
```
🗣️  Avisa antes de travar        4 pessoas · 3 projetos
📦  Entrega o que assume         5 pessoas · 3 projetos
🤝  Puxa a equipe junto          3 pessoas · 2 projetos
```
 
Regras de exibição:
 
1. **N mínimo de 3.** Um eixo só aparece publicamente a partir de **3 atestados
   de pessoas distintas**. Abaixo disso, o eixo não é exibido. Isso impede que
   uma avaliação isolada vire rótulo permanente.
2. **Duplo denominador obrigatório.** Sempre exibir *pessoas* **e** *projetos*.
   Atestado espalhado por projetos diferentes é muito mais difícil de combinar
   que quatro do mesmo time — é o que devolve credibilidade ao sinal anônimo.
3. **Intensidade sem teto.** O selo pode ganhar destaque visual conforme acumula
   (peso tipográfico, opacidade, tamanho), mas **nunca exibe percentual, barra
   preenchida, termômetro, estrelas ou qualquer elemento com máximo implícito.**
4. **Ordenação por volume de atestados**, nunca por "força" ou "pontuação".
5. Exibição condicionada a `showFeedback = true` no perfil.
### 5.4 Antipadrões visuais explicitamente proibidos
 
- Barra de progresso, termômetro, medidor ou gauge;
- Estrelas, notas, percentuais;
- Comparação com média da plataforma ("acima da média");
- Badge de nível (bronze/prata/ouro, iniciante/avançado);
- Qualquer elemento que sugira que falta algo para completar.
### 5.5 O que a corroboração **não** faz
 
- Não gera nota única;
- Não gera ranking nem listagem ordenada de pessoas;
- Não é usada para bloquear participação em projeto;
- Não expira nem decai com o tempo (mas o contexto — projeto e data — fica
  registrado).
### 5.6 Avaliação sem atestado
 
O avaliador pode concluir o fluxo sem marcar nenhum eixo para determinada pessoa.
Nesse caso o registro existe internamente (com os campos de contexto), mas não
produz sinal público. **Isso é intencional:** obrigar atestado positivo produziria
atestado de cortesia, que é ruído.
 
---
 
## 6. Camada B — Feedback de desenvolvimento
 
### 6.1 Natureza
 
Texto livre, escrito para a pessoa avaliada. É aqui que cabe o construtivo — o
que poderia ter sido melhor, o que travou, o que ela pode observar na próxima.
 
### 6.2 Onde vive
 
**Fonte da verdade: área privada no dashboard do membro** (`/dashboard/feedbacks`,
aba "Recebidos"). Somente o avaliado acessa.
 
O e-mail é **notificação, não canal de entrega**:
 
> Assunto: Você recebeu um feedback do projeto [Nome]
>
> Corpo: aviso de que existe feedback novo + link para a área privada.
> **O conteúdo do feedback não vai no corpo do e-mail.**
 
Motivos para não entregar por e-mail:
 
- e-mail some, cai em spam, a pessoa troca de endereço — e o feedback é o
  instrumento de desenvolvimento, precisa continuar acessível;
- conteúdo pessoal sobre alguém trafegando só por e-mail é difícil de auditar e
  impossível de excluir a pedido (ver LGPD);
- o Documento Estratégico de Comunicação Transacional determina que e-mail
  comunica ação e contexto, sem excesso de narrativa.
### 6.3 Publicação do texto: consentimento na origem
 
O avaliado **pode** exibir feedback escrito no portfólio, mas apenas textos que o
autor autorizou previamente.
 
Fluxo:
 
1. Ao escrever, o avaliador marca (opcional, desmarcado por padrão):
   ☐ *Este texto pode ser exibido no portfólio dele/dela*
2. Textos **não** marcados: permanecem privados para sempre. Nem o avaliado nem
   um ADMIN podem publicá-los.
3. Textos marcados: entram no conjunto publicável. O avaliado escolhe quais
   exibir no portfólio.
4. O texto público é exibido **sem identificar o autor**, com contexto de projeto.
**Por que consentimento na origem e não no destino:** o texto foi escrito sob
expectativa de privacidade. Publicá-lo depois muda o acordo após o fato. Além
disso, a identidade do autor fica registrada internamente — publicar sem seu
conhecimento é exposição indireta.
 
**Limitação assumida e registrada:** como o avaliado escolhe o que publicar, o
texto público é uma vitrine selecionada e tem menos valor probatório que as
corroborações. Ele é complemento narrativo, não evidência. **As corroborações não
são selecionáveis individualmente** — o toggle `showFeedback` liga ou desliga o
bloco inteiro. É isso que preserva o valor do sinal.
 
---
 
## 7. Anonimato e responsabilização
 
**Decisão:** anonimato **na exibição pública**, identificação **completa e
permanente no banco**.
 
| Camada | Identidade do avaliador |
|---|---|
| Banco de dados (`fromUserId`) | Sempre registrada, obrigatória, nunca nula em registro ativo |
| Painel administrativo | Visível para ADMIN em caso de denúncia ou apuração |
| Área privada do avaliado | **Não exibida** |
| Portfólio público | **Não exibida** |
 
**Justificativa:** avaliador que teme ser julgado por ser sincero não é sincero.
O anonimato na interface protege a honestidade do feedback; o registro interno
impede que ele vire escudo para desrespeito.
 
**Consequência assumida:** para um observador externo, o sinal anônimo é menos
verificável. A mitigação é o duplo denominador (seção 5.3) e o N mínimo, não a
quebra do anonimato.
 
**Regra de comunicação:** a interface deve deixar explícito para o avaliador, no
momento da avaliação, que a identidade dele não aparece publicamente **mas fica
registrada na plataforma**. Omitir isso seria enganoso.
 
---
 
## 8. Blind duplo (anti-retaliação)
 
O documento v1 listava "retaliação entre participantes" como risco sem mitigação
real. Esta versão define uma:
 
**O avaliado só vê o que recebeu quando qualquer uma destas condições se cumpre:**
 
1. ele enviou as próprias avaliações daquele projeto; **ou**
2. passaram-se **14 dias** do encerramento do projeto.
Antes disso, o dashboard mostra apenas a contagem de feedbacks pendentes de
liberação, sem conteúdo.
 
Isso impede o padrão "vi que me avaliaram mal, agora avalio mal de volta", que é
o principal vetor de distorção em sistemas de avaliação recíproca.
 
O prazo de 14 dias existe para que quem não avalia não fique bloqueado
indefinidamente de receber seu próprio retorno — a avaliação é um direito da
pessoa avaliada, não uma recompensa por participação.
 
---
 
## 9. Usuários envolvidos e permissões
 
| Papel | Pode |
|---|---|
| Participante confirmado de projeto `CONCLUIDO` | Avaliar os demais participantes do mesmo projeto |
| Pessoa avaliada | Ver os próprios feedbacks (respeitado o blind duplo); escolher publicar textos autorizados; ligar/desligar `showFeedback` |
| ADMIN | Consultar autoria em caso de denúncia; ocultar feedback que viole as regras da plataforma |
| Visitante | Ver corroborações agregadas e textos publicados, se `showFeedback = true` |
 
Restrições:
 
- Ninguém avalia a si mesmo;
- Somente participantes confirmados (com `StackTaken` no projeto) avaliam;
- Um avaliador produz **no máximo um registro de feedback por pessoa avaliada por
  projeto**;
- Feedback não é editável pelo autor após envio;
- ADMIN não edita conteúdo de feedback — apenas oculta, com registro do motivo.
---
 
## 10. Fluxo de uso (UX)
 
### 10.1 Avaliar
 
1. Owner marca o projeto como `CONCLUIDO`;
2. Todos os participantes recebem notificação por e-mail e pendência no dashboard;
3. A pessoa acessa `/dashboard/feedbacks`, aba "Pendentes";
4. Vê a lista dos colegas daquele projeto, com a stack que cada um assumiu;
5. Para cada colega:
   - seleciona até 3 eixos (ou nenhum),
   - opcionalmente escreve o feedback de desenvolvimento,
   - se escreveu, decide se autoriza publicação;
6. Envia. **Não há edição depois.** A interface deve avisar disso antes do envio.
### 10.2 Receber
 
1. Notificação por e-mail: existe feedback novo (sem conteúdo);
2. Acessa `/dashboard/feedbacks`, aba "Recebidos";
3. Se o blind duplo ainda bloqueia, vê apenas a contagem e a condição para
   liberar;
4. Liberado: lê os textos e vê os eixos que recebeu;
5. Escolhe quais textos autorizados exibir no portfólio;
6. Controla a exibição do bloco inteiro via `showFeedback`.
### 10.3 Estados relevantes
 
- Projeto concluído com avaliações pendentes;
- Avaliação enviada, aguardando liberação por blind duplo;
- Feedback liberado;
- Eixo com atestados abaixo do N mínimo (existe internamente, não exibe);
- Projeto concluído sem nenhuma avaliação enviada.
---
 
## 11. Regras de negócio
 
1. Feedback só pode ser criado se `Project.status = CONCLUIDO`.
2. Feedback é sempre vinculado a `projectId`.
3. Avaliador e avaliado devem ter participação registrada no mesmo projeto.
4. `fromUserId ≠ toUserId`.
5. Máximo um registro por par (avaliador, avaliado, projeto).
6. Máximo 3 atributos por registro de feedback.
7. Atributos pertencem à lista fechada da seção 5.1.
8. Um eixo só é exibido publicamente com ≥ 3 atestados de pessoas distintas.
9. `anonymous` deixa de ser opcional do avaliador: **a exibição pública é sempre
   anônima**. O campo passa a ser irrelevante para o público (ver seção 14).
10. `publicationAllowed = false` por padrão no texto escrito.
11. Texto só pode ser publicado pelo avaliado se `publicationAllowed = true`.
12. Feedback não é editável nem excluível pelo autor.
13. Exclusão de conta segue a regra de anonimização da seção 13.
14. `stackTakenId` é opcional; se informado, deve pertencer ao mesmo projeto.
15. Todas as regras aplicadas no backend e testáveis.
---
 
## 12. Impactos em dados
 
### 12.1 Mudança de schema necessária
 
O modelo atual não comporta os eixos. É necessária migration.
 
**Estrutura proposta** (a validar em spike técnico — ver seção 16):
 
```prisma
model Feedback {
  id                  String   @id @default(cuid())
  projectId           String
  fromUserId          String
  toUserId            String
  stackTakenId        String?
 
  comment             String?  // Camada B
  publicationAllowed  Boolean  @default(false)
  publishedByReceiver Boolean  @default(false)
 
  rating              Int?     // legado — ver seção 14
  anonymous           Boolean  @default(true) // legado — ver seção 14
 
  hiddenByAdmin       Boolean  @default(false)
  hiddenReason        String?
 
  attributes          FeedbackAttribute[]
 
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
 
  @@unique([projectId, fromUserId, toUserId])
}
 
model FeedbackAttribute {
  id         String            @id @default(cuid())
  feedbackId String
  attribute  FeedbackAttrEnum
  feedback   Feedback @relation(fields: [feedbackId], references: [id], onDelete: Cascade)
 
  @@unique([feedbackId, attribute])
}
 
enum FeedbackAttrEnum {
  COMUNICA_IMPEDIMENTOS
  ENTREGA_O_COMBINADO
  APOIA_A_EQUIPE
  PERGUNTA_ANTES_DE_DECIDIR
  RECEBE_REVISAO_BEM
  AUTONOMIA_NA_STACK
}
```
 
> ✅ **Decidido em 19/08/2026** pela
> [spike de schema](../../03%20-%20tecnico/spikes/spike-schema-atributos-feedback.md):
> **tabela relacional**, como proposto acima. O critério não foi desempenho — em
> memória, agregar ~120 linhas por perfil é irrelevante — e sim **integridade**:
> só a tabela impede, no banco, que o mesmo eixo seja contado duas vezes na mesma
> avaliação. Com array de enum o Postgres aceita repetição, e a contagem pública
> — que é o valor da corroboração — fica à mercê de um bug de aplicação.
 
### 12.2 Agregação para o portfólio
 
A consulta pública precisa devolver, por eixo:
 
- contagem de avaliadores distintos;
- contagem de projetos distintos;
- filtrando `hiddenByAdmin = false`;
- aplicando o corte de N mínimo **no backend**, nunca no frontend.
---
 
## 13. Privacidade, LGPD e exclusão de conta
 
Esta seção existe porque a v1 continha contradição direta com o Documento
Estratégico de Governança de Dados: lá se garante exclusão de conta, aqui se
determinava que feedback é imutável e indelével.
 
**Resolução adotada — anonimização assimétrica.** Ao excluir a conta:
 
| Dado | Destino |
|---|---|
| Feedbacks **recebidos** pela pessoa | Excluídos. São dados sobre ela. |
| Corroborações **recebidas** | Excluídas junto. |
| Feedbacks **dados** por ela a terceiros | **Preservados**, com `fromUserId` substituído por marcador de conta removida. São dados sobre outras pessoas — a saída dela não pode apagar a reputação alheia. |
| Contadores de outras pessoas | Recalculados: aquele atestado continua contando como "1 pessoa", agora sem vínculo. |
 
**Consequência a comunicar:** os textos e atestados que a pessoa deixou para
outras permanecem. Isso deve estar explícito nos termos de uso e na FAQ, **antes**
de a pessoa avaliar — não é aceitável descobrir isso na hora de sair.
 
Detalhamento completo em
`docs/01 - estrategia/governanca/governanca-dados-lgpd.md`.
 
---
 
## 14. Destino dos campos legados
 
### `rating`
 
**Decisão: despublicado, não removido.**
 
- Deixa de ser exibido publicamente;
- Deixa de ser agregado como média em qualquer superfície pública;
- A afirmação de `modelagem-dados.md` — *"a reputação é calculada como média
  simples dos ratings recebidos"* — **fica revogada por este documento**;
- Permanece no schema como sinal operacional interno, consultável por ADMIN, útil
  para detectar equipe em conflito;
- Passa a ser opcional (`Int?`).
Manter em vez de dropar evita migration destrutiva sobre dados já existentes.
 
> 🔓 **Decisão em aberto:** se após dois ou três ciclos o `rating` interno não
> gerar decisão operacional real, ele deve ser removido. Reavaliar formalmente.
 
### `anonymous`
 
O anonimato deixa de ser escolha do avaliador e passa a ser regra fixa da camada
pública. O campo perde função de produto. Mantido apenas por compatibilidade com
registros existentes; **código novo não deve lê-lo para decidir exibição.**
 
---
 
## 15. Por que a v1 não fechava
 
Registro do raciocínio, para que a decisão não seja revertida sem contexto.
 
A v1 declarava, simultaneamente:
 
- "não cria ranking público";
- "não gera nota pública única";
- "foco em aprendizado, não em nota";
- e um campo `rating` agregado como **média simples exibida no portfólio**.
**Uma média de notas é uma nota. Duas médias lado a lado são um ranking.** Os
princípios eram bons e o mecanismo os contradizia — por isso o formato de
exibição nunca fechava. A v2 não muda os princípios; troca o mecanismo por um que
os sustenta.
 
---
 
## 16. Riscos identificados e mitigações
 
| Risco | Mitigação |
|---|---|
| Retaliação | Blind duplo (seção 8) |
| Conluio em grupo fechado | Duplo denominador pessoas × projetos; N mínimo |
| Atestado de cortesia (marcar tudo) | Limite de 3 eixos por pessoa |
| Desrespeito sob anonimato | Identidade registrada; denúncia; ocultação por ADMIN |
| Vitrine selecionada no texto público | Corroborações não são selecionáveis; texto é complemento, não evidência |
| Viés inconsciente | Eixos comportamentais e observáveis, não traços de personalidade |
| Iniciante desmotivado | Não existe sinal negativo público; ausência ≠ nota baixa |
| Encerramento prematuro para gerar feedback | Regra de encerramento em `gestao-projetos.md` (todas as stacks assumidas) |
 
---
 
## 17. Métricas relacionadas
 
- Taxa de envio de feedback por projeto concluído;
- Distribuição de atestados por eixo (eixo que ninguém marca deve ser revisto ou
  removido);
- Número médio de eixos marcados por avaliação (se convergir para 3, o limite
  está sendo tratado como formulário a preencher e precisa de revisão);
- Percentual de textos com `publicationAllowed = true`;
- Percentual de avaliados que publicam texto;
- Tempo entre conclusão do projeto e envio da avaliação.
Nenhuma dessas métricas deve ser exibida publicamente por usuário.
 
---
 
## 18. Relação com implementação técnica
 
- Depende de `Project.status = CONCLUIDO` → **bloqueado pelo épico #553**;
- Depende de `StackTaken` para validar participação;
- Integra-se ao portfólio via `showFeedback`;
- Exige migration (seção 12.1);
- Exige nova rota de agregação por eixo;
- Notificação por e-mail segue `docs/03 - tecnico/adrs.md` (ADR-004, React Email).
Documentos técnicos relacionados:
 
- `docs/03 - tecnico/modelagem/modelagem-dados.md`
- `docs/03 - tecnico/arquitetura/arquitetura-geral.md`
- `docs/02 - produto/portfolio/portfolio.md`
---
 
## 19. Antipadrões evitados
 
- Média pública de notas (v1) — vira ranking;
- Termômetro, barra ou gauge — implicam teto e "incompletude";
- Rótulos com superlativo ou traço inato ("Mestre em...", "...nato") — reintroduzem
  hierarquia e não são testemunháveis;
- Eixo de texto livre — vira elogio genérico, destrói comparabilidade;
- Entrega de feedback só por e-mail — perde-se, não se audita, não se exclui;
- Publicação de texto sem consentimento do autor;
- Corte de N mínimo aplicado no frontend;
- Avaliação obrigatória com atestado obrigatório — produz cortesia, não sinal.
---
 
## 20. Status e próximos passos
 
**Status:** modelo de produto definido; implementação bloqueada.
 
**Ordem de execução:**
 
1. ⛔ **Encerramento manual de projeto** (épico #553) — bloqueia tudo
2. ✅ ~~Spike de schema~~ — concluída em 19/08/2026: tabela relacional
3. 🛠️ Migration + rotas (criação, agregação, publicação de texto)
4. 🖥️ Tela `/dashboard/feedbacks` (abas Pendentes e Recebidos)
5. 🎨 Bloco de corroborações no portfólio público
6. ✉️ E-mail de notificação (sem conteúdo)
7. 📄 FAQ e termos: o que acontece com o feedback ao excluir a conta
**Decisões ainda em aberto:**
 
- Prazo do blind duplo — 14 dias é proposta, não validada;
- N mínimo = 3 — proposta, revisar com dados reais;
- Manutenção ou remoção definitiva do `rating` interno;
- Existe fluxo de denúncia de feedback pelo avaliado? (afeta painel admin)
---
 
## 21. Histórico de decisões
 
| Data | Decisão |
|---|---|
| v1 | Rating contextualizado; anonimato opcional; proibição de ranking; separação entre feedback privado e reputação agregada |
| v2 | **Revogada** a média pública de ratings — contradizia os princípios do próprio documento |
| v2 | Adotado modelo de corroborações por eixos comportamentais fechados |
| v2 | Rótulos com verbo e lastro; proibidos superlativos e traços inatos |
| v2 | Proibida representação com teto (termômetro, barra, estrelas) |
| v2 | Anonimato público fixo; identificação interna permanente |
| 19/08/2026 | Schema dos atributos: **tabela relacional**, por integridade — ver [spike](../../03%20-%20tecnico/spikes/spike-schema-atributos-feedback.md) |
| v2 | Blind duplo como mitigação de retaliação |
| v2 | N mínimo de 3 atestados para exibição pública |
| v2 | Duplo denominador (pessoas × projetos) |
| v2 | Feedback escrito entregue na área privada; e-mail apenas notifica |
| v2 | Publicação de texto por consentimento na origem |
| v2 | Anonimização assimétrica na exclusão de conta |
| v2 | `rating` despublicado; `anonymous` sem função de produto |