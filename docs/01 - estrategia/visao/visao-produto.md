# Documento Estratégico — Visão e Hipótese do Produto
 
**Classificação:** Documento Estratégico
**Camada:** 1 — Documentos Estruturais
**Status:** Versão 2 — escopo negativo esclarecido
 
---
 
## 1. Objetivo do Documento
 
Este documento define a visão estratégica do TryCatch e formaliza sua hipótese
principal de produto.
 
Ele estabelece:
 
- O problema central que o produto busca resolver;
- O público prioritário;
- A proposta de valor;
- As hipóteses que deverão ser validadas por meio de métricas.
Este documento é estrutural e orienta todas as decisões de produto, arquitetura,
comunicação e qualidade.
 
---
 
## 2. Visão do Produto
 
O TryCatch é uma plataforma colaborativa que conecta desenvolvedores em diferentes
níveis de experiência para desenvolver projetos reais de forma estruturada, com
mentoria, rastreabilidade e foco em qualidade.
 
A plataforma busca unir:
 
- Desenvolvedores iniciantes;
- Desenvolvedores intermediários;
- Mentores experientes;
- Projetos reais com propósito claro.
A visão é criar um ambiente onde aprendizado prático, colaboração profissional e
desenvolvimento técnico coexistam com governança e documentação estruturada.
 
---
 
## 3. Público Prioritário
 
- Desenvolvedores iniciantes em busca de experiência prática;
- Desenvolvedores intermediários que desejam evoluir tecnicamente;
- Desenvolvedores experientes interessados em mentoria;
- Organizações interessadas em acompanhar talentos em formação.
---
 
## 4. Problema Central Identificado
 
Desenvolvedores iniciantes frequentemente enfrentam dificuldade para:
 
- Encontrar projetos reais para praticar;
- Trabalhar em equipe com processos organizados;
- Receber feedback estruturado e confiável;
- Demonstrar evolução profissional com evidências concretas.
Simultaneamente, mentores carecem de ambientes estruturados para orientar
iniciantes com rastreabilidade e critérios claros.
 
### 4.1 Agravante recente — a erosão do código como evidência
 
Ferramentas de IA generativa produzem projetos completos com pouco esforço. O
repositório deixou de distinguir quem sabe colaborar de quem soube pedir.
 
Isso **aumenta** a relevância da hipótese do produto: o que passa a ter valor
demonstrável não é o artefato, é a **conduta observável em trabalho conjunto** —
comunicar impedimento, cumprir o combinado, apoiar a equipe, perguntar antes de
decidir. Nada disso uma ferramenta faz pela pessoa.
 
O sistema de reputação da plataforma existe para registrar exatamente isso. Ver
`docs/02 - produto/feedback/feedback-reputacao.md`.
 
---
 
## 5. Hipótese Principal do Produto
 
Acreditamos que desenvolvedores em diferentes níveis de experiência precisam de um
ambiente estruturado para colaborar em projetos reais, e que ao utilizar o
TryCatch conseguirão desenvolver habilidades técnicas e comportamentais com maior
evidência prática, medido por:
 
- Participação recorrente em projetos;
- Acúmulo de evidências de conduta colaborativa ao longo do tempo;
- Retenção ativa na plataforma;
- Volume e consistência de corroborações relacionadas a colaboração e entrega.
> ⚠️ **Correção de linguagem.** A v1 falava em "evolução de reputação" e
> "feedbacks positivos", o que sugeria escala e nota. O modelo adotado não produz
> nota. A métrica é acúmulo de evidência, não elevação de pontuação.
 
---
 
## 6. Escopo Estratégico (o que o TryCatch é)
 
- Plataforma colaborativa para desenvolvimento de projetos reais;
- Ambiente estruturado com governança e documentação;
- Modelo replicável de organização de projetos colaborativos.
---
 
## 7. Escopo Negativo (o que o TryCatch não é)
 
- Não é uma plataforma freelance aberta;
- Não é uma rede social genérica;
- Não é um marketplace de vagas;
- Não é um curso formal ou LMS tradicional.
### 7.1 Esclarecimento sobre projetos remunerados
 
Havia divergência entre este documento e o produto: aqui se declarava que o
TryCatch não é marketplace, enquanto a entidade `Project` possui `totalValue` e o
template de cadastro externo pergunta forma de pagamento e responsabilidade por
custos.
 
**Não é contradição, é falta de distinção. A distinção é esta:**
 
| O TryCatch faz | O TryCatch não faz |
|---|---|
| Registra que um projeto tem valor associado, quando tem | Intermediar pagamento |
| Torna transparente se há remuneração, mentoria ou apoio | Garantir remuneração a participante |
| Permite divisão transparente de responsabilidades | Processar transação financeira |
| Deixa a negociação entre as partes, com regras visíveis | Atuar como marketplace ou empregador |
 
**Regras derivadas:**
 
1. `totalValue` é **informação declarada**, não transação;
2. A plataforma não processa pagamento nem retém valor;
3. Nenhuma comunicação pode prometer remuneração, contratação ou vaga;
4. A ausência de remuneração é o caso comum e deve ser tratada como normal, nunca
   como projeto inferior;
5. Responsabilidade por custos externos é declarada no cadastro e é das partes.
Isso mantém o escopo negativo válido: registrar valor não é intermediar valor.
 
---
 
## 8. Relação com Outros Documentos
 
Orienta diretamente:
 
- Documento 0 — Visão Geral e Governança da Documentação;
- Planejamento de Qualidade de Software;
- Documentos de Produto (Camada 2);
- Documentos Técnicos (Camada 3);
- Plano Geral de Comunicação.
---
 
## 9. Evolução do Documento
 
Pode evoluir caso o público prioritário mude, o modelo estratégico se altere ou a
hipótese principal seja invalidada ou refinada por métricas. Mudanças estruturais
exigem registro formal.
 
---
 
## 10. Histórico
 
| Versão | Alteração |
|---|---|
| v1 | Versão inicial consolidada |
| v2 | Esclarecida a relação entre `totalValue` e o escopo negativo de marketplace |
| v2 | Registrado o agravante da erosão do código como evidência |
| v2 | Corrigida a linguagem de métrica: acúmulo de evidência, não elevação de nota |