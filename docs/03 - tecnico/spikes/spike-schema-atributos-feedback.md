# Spike — Estrutura dos atributos de Feedback

**Classificação:** Documento Técnico / Spike
**Camada:** 3 — Documentos Técnicos
**Status do documento:** concluído
**Data:** 19/08/2026
**Origem:** seção 12.1 de [`feedback-reputacao.md`](../../02%20-%20produto/feedback/feedback-reputacao.md)

---

## 1. A pergunta

O documento de produto propõe uma tabela relacional para os atributos, mas
registra a decisão como pendente:

> Este bloco é **proposta de produto**, não especificação técnica final. A decisão
> entre tabela relacional e array de enum deve sair da spike, considerando o
> custo da query de agregação por perfil.

---

## 2. As duas opções

**A — Tabela relacional**

```prisma
model Feedback {
  attributes FeedbackAttribute[]
}

model FeedbackAttribute {
  feedbackId String
  attribute  FeedbackAttrEnum
  feedback   Feedback @relation(fields: [feedbackId], references: [id], onDelete: Cascade)

  @@unique([feedbackId, attribute])
  @@index([attribute])
}
```

**B — Array de enum**

```prisma
model Feedback {
  attributes FeedbackAttrEnum[]
}
```

---

## 3. Resultado

**As duas são válidas no Prisma 7.9.1** — `prisma validate` passa em ambas. A
decisão não é sobre viabilidade.

### 3.1 O que o SQL gerado mostra

Comparando `prisma migrate diff` das duas:

| | Opção A | Opção B |
|---|---|---|
| Restrição de atributo repetido | `UNIQUE (feedbackId, attribute)` | **nenhuma** |
| Índice por atributo | `INDEX (attribute)` | **nenhum** |
| Exclusão em cascata | `ON DELETE CASCADE` | implícita na linha |
| Tabelas | 2 | 1 |

A diferença decisiva está na primeira linha. Na opção B, o Postgres aceita
`{APOIA_A_EQUIPE, APOIA_A_EQUIPE, APOIA_A_EQUIPE}` sem reclamar — **o mesmo eixo
contado três vezes na mesma avaliação**.

Isso não é detalhe de implementação. A regra da seção 5.2 — no máximo 3 eixos por
pessoa avaliada — existe para impedir que o sinal seja esvaziado por marcação de
cortesia. Com array, a integridade dessa regra depende inteiramente do código da
aplicação; um bug ou uma rota nova esquecendo a validação corrompe a agregação em
silêncio. Com a tabela, o banco recusa.

### 3.2 Custo da agregação

A consulta pública precisa, por eixo: contagem de avaliadores distintos e de
projetos distintos.

**Nenhuma das duas opções é expressável no `groupBy` do Prisma**, porque ele não
suporta `COUNT(DISTINCT)` sobre coluna de tabela relacionada. Em ambas o caminho
é o mesmo: buscar os feedbacks do perfil e agregar em memória, ou usar SQL cru.

**Estimativa de volume por perfil:**

```
10 projetos concluídos × 4 colegas   =  ~40 feedbacks recebidos
40 feedbacks × até 3 eixos           = ~120 linhas de atributo
```

Nessa ordem de grandeza, agregar em memória é irrelevante em custo. O argumento
de desempenho — que motivava a spike — **não diferencia as opções**.

Se o volume crescer a ponto de importar, SQL cru resolve nos dois casos. Na
opção B ele exige `unnest`, que é menos legível; na A é um `GROUP BY` comum.

---

## 4. Decisão

**Opção A — tabela relacional.**

O critério que decide não é desempenho, e sim **integridade**: só ela impede, no
banco, que o mesmo eixo seja contado mais de uma vez na mesma avaliação. Como o
valor público da corroboração vem justamente da contagem, um dado duplicado
corrompe exatamente aquilo que a funcionalidade entrega.

Fatores secundários que reforçam:

- índice por atributo, útil para a métrica da seção 17 (distribuição por eixo);
- `onDelete: Cascade` explícito, relevante para a exclusão de conta (seção 13);
- consulta de agregação mais legível se um dia precisar de SQL cru;
- adicionar um eixo novo é alterar o enum nos dois casos — sem diferença.

O custo é uma tabela a mais. É pouco pelo que se ganha.

---

## 5. O que isto destrava

A etapa 3 da ordem de execução (seção 20 do documento de produto): migration e
rotas. A estrutura de `FeedbackAttribute` proposta na seção 12.1 fica confirmada
como especificação técnica.

**Continuam em aberto**, e não dependiam desta spike:

- prazo do blind duplo (14 dias é proposta);
- N mínimo para exibição (3 é proposta);
- manutenção ou remoção do `rating` legado;
- existência de fluxo de denúncia pelo avaliado.

---

## 6. Como este resultado foi obtido

```bash
prisma validate    --schema opcao-a.prisma   # e opcao-b
prisma migrate diff --from-empty --to-schema opcao-a.prisma --script
```

Executado com Prisma CLI 7.9.1, mesma versão do projeto.
