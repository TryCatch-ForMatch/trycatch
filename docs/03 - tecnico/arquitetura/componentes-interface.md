# Documento Técnico — Componentes de Interface (shadcn/ui)

**Classificação:** Documento Técnico
**Camada:** 3 — Técnico
**Status:** Adotado

---

## 1. Identificação

- **Nome do documento:** Componentes de Interface (shadcn/ui)
- **Domínio técnico:** Arquitetura de front-end
- **Documentos relacionados:** `arquitetura-geral.md`, `docs/05 - contribuicao/IA-REGRAS.md`
- **Data de criação:** 20/10/2026
- **Última atualização:** 20/10/2026

---

## 2. Contexto Técnico

O projeto usa o **shadcn/ui** desde o início: o `components.json` está
configurado (estilo `new-york`, Server Components, ícones `lucide`) e os
componentes ficam em `src/components/ui/`.

Com o tempo, parte do código passou a usar elementos HTML diretamente
(`<input>`, `<select>`, `<button>`…) ou componentes próprios feitos do zero,
mesmo quando já existe o equivalente no shadcn. Isso gera interfaces com
comportamento e acessibilidade diferentes para a mesma função, e cada correção
precisa ser feita em vários lugares.

A padronização foi proposta em 20/10/2026 e adotada pela mantenedoria.

---

## 3. Objetivo Técnico

**Este documento define:** qual componente usar ao construir interface, como
adicionar componentes do shadcn e quando um componente próprio é aceito.

**Não cobre:** identidade visual e cores (ver `docs/01 - estrategia/marca/` e
os tokens de `src/app/globals.css`) nem a estrutura de páginas e layouts (ver
`arquitetura-geral.md`).

---

## 4. Descrição Técnica da Solução

### 4.1 A regra

1. **Se existe componente do shadcn para a função, use o do shadcn.**
2. **Se o componente não está instalado, adicione pelo CLI** (seção 4.2) em vez
   de escrever um do zero.
3. **Componente próprio só compondo o shadcn.** Quando a interface precisa de
   algo que o shadcn não oferece pronto, o componente próprio deve ser montado
   a partir dos componentes do shadcn. Exemplos que já seguem o padrão:

   | Componente próprio | Composto a partir de |
   |---|---|
   | `ui/modal.tsx` | `ui/dialog.tsx` |
   | `ui/confirm-dialog.tsx` | `ui/alert-dialog.tsx` |
   | `ui/toggle-field.tsx` | `ui/switch.tsx` |

4. **Não use elemento HTML interativo direto** quando houver equivalente:

   | Em vez de | Use |
   |---|---|
   | `<button>` | `Button` (`ui/button.tsx`) |
   | `<input>` | `Input` (`ui/input.tsx`) |
   | `<textarea>` | `Textarea` (`ui/textarea.tsx`) |
   | `<select>` | `Select` (`ui/select.tsx`) |
   | `<label>` | `Label` (`ui/label.tsx`) |
   | `<table>` | `Table` (adicionar com o CLI) |
   | `window.confirm()` | `ConfirmDialog` (`ui/confirm-dialog.tsx`) |
   | Esqueleto de carregamento próprio | `Skeleton` (adicionar com o CLI) |

**Exceções aceitas**, explicadas na descrição do PR:

- `<input type="hidden">`, que não tem componente visual;
- elementos com visual que o shadcn não cobre, como os cartões de pergunta do
  FAQ da Home. Mesmo nesses casos, o componente deve ser acessível pelo teclado.

### 4.2 Como adicionar um componente do shadcn

```bash
npx shadcn@latest add <componente>
```

O comando cria o arquivo em `src/components/ui/`. Antes de commitar:

- confira se ele **adicionou dependência** no `package.json` (em geral, um
  pacote `@radix-ui/*`). Dependência nova precisa ser combinada antes, e o
  `package-lock.json` só pode ser gerado em Linux (regra 7 de `IA-REGRAS.md`);
- troque cores fixas pelos tokens do projeto, se houver.

### 4.3 Como personalizar

- **Variação usada em vários lugares:** acrescente uma *variant* no próprio
  componente (os componentes do shadcn usam `cva`), como as variantes do
  `Button`.
- **Ajuste pontual:** use `className` na chamada, com os tokens do projeto.
- **Não altere o comportamento** de um componente do shadcn para atender um
  único caso. Crie um componente próprio que o componha.

### 4.4 Onde ficam os arquivos

| Tipo | Pasta |
|---|---|
| Componentes do shadcn e componentes genéricos que os compõem | `src/components/ui/` |
| Componentes de uma funcionalidade (ex.: lista de skills do painel) | `src/components/<Área>/` |

---

## 5. Alternativas Avaliadas

| Alternativa | Por que não foi adotada |
|---|---|
| Componentes próprios feitos do zero | Cada pessoa resolve acessibilidade, foco e estados de um jeito; a correção de um problema não chega aos outros componentes |
| Outra biblioteca de componentes (ex.: MUI, Chakra) | O projeto já usa o shadcn em dezenas de arquivos; trocar exigiria reescrever a interface e traria uma dependência pesada. O shadcn copia o código para o projeto, que pode ser lido e ajustado |

---

## 6. Impacto Arquitetural

- **Manutenibilidade:** uma correção no componente base chega a todas as telas.
- **Consistência:** a mesma função tem o mesmo comportamento em todo o sistema.
- **Acessibilidade:** os componentes do shadcn usam o Radix, que já trata foco,
  teclado e atributos ARIA.
- **Performance:** sem impacto relevante; os componentes são leves e só os
  usados entram no bundle.

---

## 7. Impacto em Segurança

Sem impacto relevante: a regra trata da camada de apresentação e não altera
autenticação, autorização ou dados. Novas dependências seguem a regra 7 de
`IA-REGRAS.md`.

---

## 8. Impacto em Dados

Nenhum.

---

## 9. Dependências Técnicas

- `shadcn` (CLI, executado com `npx`, sem instalação)
- Pacotes `@radix-ui/*` já instalados: `react-alert-dialog`, `react-dialog`,
  `react-label`, `react-select`, `react-slot`, `react-switch`
- `class-variance-authority` (variantes), Tailwind CSS e `lucide-react` (ícones)

---

## 10. Riscos Técnicos Identificados

| Risco | Mitigação |
|---|---|
| Adicionar um componente traz dependência nova | Conferir o `package.json` antes do commit e combinar com a mantenedoria (regra 7) |
| Reexecutar o `add` sobrescreve personalizações | Personalizar por *variant* ou compondo o componente, não editando o comportamento base |

---

## 11. Critérios de Validação

- Na revisão do PR: nenhum elemento HTML da seção 4.1 usado diretamente, salvo
  exceção explicada na descrição.
- Assistentes de IA configurados no projeto alertam quando o código foge da
  regra (`IA-REGRAS.md`, tabela "O que a IA deve alertar sempre").

---

## 12. Relação com Documentos de Produto

Não há funcionalidade específica: a regra vale para toda a interface.

---

## 13. Histórico de Decisões Técnicas

| Data | Decisão |
|---|---|
| 20/10/2026 | Adotado o shadcn/ui como padrão obrigatório de componentes de interface |

---

## 14. Status e Próximos Passos

- **Status atual:** adotado. A migração do código existente é acompanhada no
  épico "Padronização dos componentes de interface com shadcn/ui".
- **Pendências técnicas:**
  - substituir os elementos HTML usados diretamente em 15 arquivos;
  - refazer os componentes próprios feitos do zero (`skeleton-card`,
    `SkeletonProjetcs`);
  - remover componentes sem uso (`role-badge`, `command`).
