# Documento de Produto --- Estrutura UX da página /how-to-join

Classificação: Documento de Produto / UX\
Camada: 2 --- Produto\
**Status do documento:** Estrutura proposta para validação de UX baseada na issue #570  
**Status da implementação:** 🟡 parcial — página pública existe; onboarding pós-cadastro não  
**Estado consolidado:** ver [estado-das-funcionalidades.md](../estado-das-funcionalidades.md)

------------------------------------------------------------------------

## 1. Identificação

-   Página: /how-to-join
-   Nome da experiência: Jornada de Entrada / How-to-Join
-   Domínio do produto: Participação, onboarding e comunicação
    institucional
-   Documentos relacionados: Jornada de Entrada / How-to-Join;
    Diretrizes de Identidade Visual; Textos Institucionais da Home;
    Textos Institucionais de CTAs; Permissões e Papéis

------------------------------------------------------------------------

## 2. Objetivo

Definir oficialmente a estrutura de UX da página /how-to-join, mantendo
coerência com o padrão visual das páginas Home e Sobre.

A página deve orientar novos visitantes sobre as formas de participação
no TryCatch, reduzindo ambiguidade entre:

-   Contribuir com a plataforma open source;
-   Cadastrar um projeto;
-   Participar como membro;
-   Participar como mentor.

Esta documentação define hierarquia, seções, comportamento esperado,
regras de escaneabilidade e preparação para evolução futura.

------------------------------------------------------------------------

## 3. Princípios de UX

A experiência da página deve priorizar:

-   Clareza: o visitante deve entender rapidamente quais caminhos
    existem;
-   Escaneabilidade: títulos, descrições curtas e CTAs devem permitir
    leitura rápida;
-   Consistência visual: a composição deve seguir a linguagem já usada
    na Home e na página Sobre;
-   Responsividade: a experiência deve funcionar primeiro em telas
    pequenas e escalar para desktop;
-   Acessibilidade: hierarquia semântica, contraste, foco visível e
    textos de ação claros;
-   Honestidade de promessa: nenhum texto ou CTA deve prometer aprovação,
    vaga, remuneração ou acesso automático;
-   Coerência com regras de negócio: os caminhos devem respeitar
    convites, papéis e permissões documentados.

------------------------------------------------------------------------

## 4. Estrutura Geral da Página

A página /how-to-join deve conter quatro blocos principais:

1.  Hero Section
2.  Seção "Escolha seu caminho"
3.  Seção detalhada explicativa
4.  Área reservada para FAQ futura

A ordem deve ser mantida para preservar a progressão de entendimento:
contexto geral, escolha inicial, aprofundamento e suporte.

------------------------------------------------------------------------

## 5. Hero Section

### 5.1 Objetivo

Apresentar a finalidade da página e contextualizar que o TryCatch possui
mais de uma forma de participação.

### 5.2 Conteúdo Obrigatório

-   Título: "Como participar do TryCatch"
-   Subtítulo institucional explicando que o usuário pode escolher como
    deseja contribuir;
-   Texto curto contextualizando as formas de participação na comunidade
    e na construção de projetos reais.

### 5.3 Diretrizes Visuais

-   Usar hierarquia tipográfica compatível com Home e Sobre;
-   Priorizar texto direto, sem excesso de parágrafos;
-   Manter espaçamento generoso no topo e entre elementos;
-   Usar cores da identidade visual oficial;
-   Evitar elementos visuais que concorram com a compreensão do caminho
    de entrada;
-   Em mobile, manter leitura em coluna única.

### 5.4 Critérios de Qualidade

-   O título deve ser o primeiro H1 da página;
-   O visitante deve entender o objetivo da página sem precisar rolar;
-   O texto não deve explicar detalhes de regras internas ou permissões
    técnicas.

------------------------------------------------------------------------

## 6. Seção "Escolha seu caminho"

### 6.1 Objetivo

Permitir que o visitante compare rapidamente as quatro formas oficiais
de participação e identifique o caminho mais adequado.

### 6.2 Estrutura da Seção

A seção deve conter:

-   Título de seção: "Escolha seu caminho";
-   Texto curto de apoio;
-   Quatro cards de participação;
-   Um CTA específico por card.

### 6.3 Cards Obrigatórios

#### Contribuir com a Plataforma (Open Source)

-   Representa colaboração no desenvolvimento da própria plataforma;
-   Deve comunicar contribuição com código, documentação, testes ou
    melhorias de processo;
-   CTA deve apontar para contribuição open source, repositório oficial
    ou página de contribuição definida.

#### Cadastrar um Projeto

-   Representa a submissão de uma ideia, demanda ou projeto;
-   Deve comunicar formação de equipe e desenvolvimento estruturado;
-   CTA deve apontar para o fluxo real de cadastro de projetos quando
    disponível.

#### Participar como Membro

-   Representa entrada na comunidade para integrar equipes;
-   Deve comunicar prática, colaboração e uso de habilidades em projetos
    reais;
-   CTA deve apontar para o fluxo de convite, solicitação de entrada ou
    cadastro definido pela plataforma.

#### Participar como Mentor

-   Representa apoio técnico a equipes e projetos;
-   Deve comunicar orientação, revisão de arquitetura e direcionamento
    técnico;
-   CTA deve respeitar o fluxo de solicitação ou aprovação do papel
    MENTOR.

### 6.4 Diretrizes dos Cards

Cada card deve conter:

-   Título claro;
-   Descrição curta;
-   CTA específico;
-   Área clicável previsível;
-   Estado visual de foco e hover;
-   Contraste suficiente entre texto, fundo e botão.

Os cards devem evitar:

-   Textos longos;
-   Linguagem promocional;
-   Promessas de resultado;
-   Termos técnicos como role quando o contexto for público;
-   Ambiguidade entre "participar da plataforma" e "cadastrar projeto".

### 6.5 Comportamento Responsivo

-   Mobile: cards em coluna única;
-   Tablet: cards em duas colunas quando houver espaço suficiente;
-   Desktop: cards em grid equilibrado, preferencialmente com quatro
    cards visíveis sem quebra de leitura;
-   Alturas devem ser estáveis para evitar desalinhamento visual entre
    cards.

------------------------------------------------------------------------

## 7. Seção Detalhada Explicativa

### 7.1 Objetivo

Complementar os cards com informações mais completas para usuários que
precisam entender responsabilidades e expectativas antes de escolher um
caminho.

### 7.2 Conteúdo Esperado

Para cada modalidade, a seção deve apresentar:

-   Explicação do papel;
-   Responsabilidades esperadas;
-   Expectativa de participação;
-   Relação com fluxos reais da plataforma;
-   Limites claros do que aquele caminho não garante.

### 7.3 Organização Recomendada

A seção pode usar blocos empilhados, abas, acordeões ou layout em duas
colunas, desde que preserve:

-   Leitura simples em mobile;
-   Boa separação entre modalidades;
-   Ordem igual à seção "Escolha seu caminho";
-   Coerência textual com o documento de Jornada de Entrada.

### 7.4 Regras de Conteúdo

-   Não duplicar integralmente o documento de produto;
-   Usar linguagem resumida e orientada ao visitante;
-   Linkar ou referenciar documentos mais completos quando necessário;
-   Evitar termos internos de implementação.

------------------------------------------------------------------------

## 8. Área Preparada para FAQ

### 8.1 Objetivo

Reservar espaço conceitual para dúvidas frequentes sobre participação,
sem tornar a FAQ obrigatória na primeira implementação.

### 8.2 Possíveis Perguntas Futuras

-   Preciso de convite para participar?
-   Posso contribuir apenas com documentação?
-   Como um projeto é avaliado?
-   Qual a diferença entre membro e mentor?
-   Participar garante vaga, contratação ou remuneração?

### 8.3 Diretrizes

-   A FAQ deve aparecer após as seções principais;
-   A ausência da FAQ não deve impedir a compreensão da página;
-   As respostas devem respeitar regras de convites, permissões e
    governança já documentadas.

------------------------------------------------------------------------

## 9. Hierarquia de Informação

A hierarquia visual deve seguir a ordem:

1.  Entender a proposta da página;
2.  Identificar os quatro caminhos;
3.  Comparar rapidamente cada caminho;
4.  Aprofundar responsabilidades e expectativas;
5.  Resolver dúvidas adicionais, se houver FAQ.

Prioridade de leitura:

-   H1 e subtítulo;
-   Título da seção de escolha;
-   Títulos dos cards;
-   Descrições curtas;
-   CTAs;
-   Conteúdo detalhado;
-   FAQ futura.

------------------------------------------------------------------------

## 10. Consistência com Home e Sobre

A página deve reaproveitar padrões já existentes:

-   Espaçamentos responsivos semelhantes aos usados nas páginas públicas;
-   Tipografia Poppins e hierarquia definida na identidade visual;
-   Paleta com `#35343C`, `#5C5C65`, `#3B38A0`, `#D9D9ED`, `#EAEAEB` e
    branco;
-   Cards com cantos arredondados e fundos suaves;
-   CTAs com texto objetivo;
-   Layout mobile-first;
-   Uso moderado de ícones ou elementos visuais apenas quando ajudarem a
    compreensão.

Não deve haver redesign completo da área pública para implementar esta
página. A experiência deve parecer parte natural do site existente.

------------------------------------------------------------------------

## 11. Acessibilidade

A implementação futura deve garantir:

-   Um único H1 na página;
-   Ordem semântica de headings;
-   Botões ou links com nomes acessíveis;
-   Estados de foco visíveis;
-   Contraste adequado;
-   Áreas clicáveis com tamanho confortável;
-   Conteúdo compreensível sem depender apenas de cor ou ícone;
-   Textos que não quebrem o layout em telas pequenas.

------------------------------------------------------------------------

## 12. Fora de Escopo

Este documento não define:

-   Texto final de marketing ou copy institucional detalhada;
-   URLs finais de redirecionamento dos botões;
-   Implementação frontend da página;
-   Mudanças em autenticação, convites ou permissões;
-   Novos fluxos administrativos.

Esses pontos devem ser tratados em issues específicas relacionadas à
página /how-to-join.

------------------------------------------------------------------------

## 13. Critérios de Aceite

Esta definição atende à issue #570 quando:

-   A estrutura UX da página /how-to-join está documentada;
-   Hero Section, cards de escolha, seção detalhada e FAQ futura estão
    previstos;
-   A hierarquia de informação está formalizada;
-   A proposta mantém consistência com Home e Sobre;
-   As diretrizes respeitam identidade visual, acessibilidade e regras
    de negócio existentes;
-   O documento está criado na pasta docs.

------------------------------------------------------------------------

## 14. Histórico

Versão inicial criada para formalizar a estrutura UX da página
/how-to-join e orientar a implementação frontend futura.
