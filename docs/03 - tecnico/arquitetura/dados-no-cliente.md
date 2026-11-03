# Documento Técnico — Dados no Cliente (hooks e TanStack Query)

**Classificação:** Documento Técnico
**Camada:** 3 — Técnico
**Status:** Adotado

---

## 1. Identificação

- **Nome do documento:** Dados no Cliente (hooks e TanStack Query)
- **Domínio técnico:** Arquitetura de front-end
- **Documentos relacionados:** `arquitetura-geral.md`, `componentes-interface.md`, `docs/05 - contribuicao/IA-REGRAS.md`
- **Data de criação:** 23/10/2026
- **Última atualização:** 23/10/2026

---

## 2. Contexto Técnico

O `@tanstack/react-query` já está instalado e o `QueryProvider` existe em
`src/providers/query.provider.tsx`, mas até outubro de 2026 só a página
`/portfolios` o usava.

No resto do front, cada componente buscava os dados do seu jeito, com
`useEffect` + `apiTryCatch`. Isso gerava:

- a mesma lista (skills, stacks) buscada várias vezes ao navegar;
- listas que não se atualizavam depois de criar ou excluir um item;
- estados de carregamento e erro controlados à mão em cada tela;
- hooks espalhados em `src/hooks/`, `src/hooks/api/`, pastas `hooks/` dentro
  das páginas e `src/lib/`.

A padronização foi proposta em 22/10/2026 e adotada pela mantenedoria. A
migração do código existente é acompanhada no épico #858.

---

## 3. Objetivo Técnico

**Este documento define:** onde ficam os hooks de dados, como buscar e alterar
dados no cliente e como manter as telas atualizadas depois de uma alteração.

**Não cobre:** dados buscados no servidor (Server Components e services, ver
`arquitetura-geral.md`, seção 7) nem estado de interface que não vem da API
(abrir modal, aba ativa), que continua com `useState`.

---

## 4. Descrição Técnica da Solução

### 4.1 A regra

1. **Componente não busca dados com `useEffect` + `apiTryCatch`.** Ele usa um
   hook de `src/hooks/api/`.
2. **Leitura com `useQuery`** (ou `useInfiniteQuery`, para listas paginadas).
3. **Alteração com `useMutation`**, que **invalida** as queries afetadas ao dar
   certo. É isso que atualiza as listas sem recarregar a página.
4. **As chaves vêm de `src/hooks/api/query-keys.ts`**, nunca escritas à mão no
   componente.

### 4.2 Onde ficam os hooks

| Tipo | Local | Exemplo |
|---|---|---|
| Hook de dados (fala com a API) | `src/hooks/api/use<Domínio>.ts` | `useSkills`, `useTechStacks`, `useProjects` |
| Hook genérico, sem domínio | `src/hooks/use<Nome>.ts` | `useInfiniteScroll`, `useCurrentUser` |
| Chaves das queries | `src/hooks/api/query-keys.ts` | `queryKeys.skills` |

Hooks **não** ficam em `src/lib/` (que é para funções comuns, não de React)
nem em pastas `hooks/` dentro das páginas.

### 4.3 Query keys

```ts
export const queryKeys = {
  skills: ['skills'] as const,
  projects: {
    all: ['projects'] as const,
    detail: (id: string) => ['projects', id] as const,
  },
};
```

- Chaves de detalhe começam com a chave da lista. Assim,
  `invalidateQueries({ queryKey: queryKeys.projects.all })` invalida a lista e
  todos os detalhes.
- Filtros e parâmetros entram na chave (`['portfolios', filtros]`), para a query
  ser refeita quando eles mudam.

### 4.4 Leitura

```ts
export function useSkills() {
  return useQuery({
    queryKey: queryKeys.skills,
    queryFn: async () => (await apiTryCatch.get<Skill[]>('/skill')).data,
  });
}
```

O componente usa `data`, `isLoading` e `error` do hook e mostra o erro com
`getApiErrorMessage` (padrão de mensagens do projeto).

### 4.5 Alteração e invalidação

```ts
export function useCreateSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (skill: NewSkill) => apiTryCatch.post('/skill', skill),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.skills }),
  });
}
```

Os toasts de sucesso e erro ficam na mutação (`onSuccess` e `onError`) ou no
componente que a chama. Não duplique nos dois.

### 4.6 Configuração do cache

A configuração global fica em `src/providers/query.provider.tsx`:

- `staleTime` de 1 minuto: dados buscados há menos de 1 minuto não são buscados
  de novo ao trocar de tela.
- O provider está disponível no dashboard (`DashboardProviders`) e em
  `/portfolios`.

Mude o `staleTime` de uma query só quando houver motivo, e explique no PR.

---

## 5. Alternativas Avaliadas

| Alternativa | Por que não foi adotada |
|---|---|
| Manter `useEffect` + `useState` em cada componente | Sem cache, sem atualização automática e com carregamento e erro reescritos em cada tela |
| SWR | O TanStack Query já estava instalado e em uso no projeto, com suporte a mutações e paginação infinita |
| Buscar tudo no servidor (Server Components) | Continua sendo o padrão para páginas sem interação; as telas do dashboard editam dados e precisam de estado no cliente |

---

## 6. Impacto Arquitetural

- **Performance:** menos requisições repetidas; dados reaproveitados ao navegar.
- **Manutenibilidade:** cada endpoint é chamado em um só lugar.
- **Consistência:** carregamento, erro e atualização seguem o mesmo padrão em
  todas as telas.

---

## 7. Impacto em Segurança

Sem impacto relevante: as rotas continuam verificando autenticação e
autorização em cada chamada. O cache vive só no navegador da pessoa e é
descartado ao sair da sessão.

---

## 8. Impacto em Dados

Nenhum no banco. Os dados no cliente podem ficar até 1 minuto sem nova busca
(`staleTime`), o que é aceitável para as telas atuais.

---

## 9. Dependências Técnicas

- `@tanstack/react-query` (já instalado)
- `apiTryCatch` (`src/lib/axios/axiosTryCatch.ts`) e `getApiErrorMessage`

---

## 10. Riscos Técnicos Identificados

| Risco | Mitigação |
|---|---|
| Esquecer de invalidar uma query após alterar dados | Toda mutação declara as chaves que invalida; a revisão confere |
| Chave escrita à mão, diferente da central | Só usar `queryKeys`; a IA alerta (`IA-REGRAS.md`) |
| Componente usar o hook fora do provider | O provider está no layout do dashboard e de `/portfolios` |

---

## 11. Critérios de Validação

- Nenhum componente com `apiTryCatch.get` dentro de `useEffect`.
- Depois de criar, editar ou excluir, a lista correspondente se atualiza sem
  recarregar a página.
- Assistentes de IA configurados no projeto alertam quando o código foge da
  regra.

---

## 12. Relação com Documentos de Produto

Não há funcionalidade específica: a regra vale para todas as telas que buscam
dados no navegador.

---

## 13. Histórico de Decisões Técnicas

| Data | Decisão |
|---|---|
| 23/10/2026 | Adotado o TanStack Query como padrão para dados no cliente, com hooks centralizados em `src/hooks/api/` |

---

## 14. Status e Próximos Passos

- **Status atual:** adotado. A migração é acompanhada no épico #858.
- **Pendências técnicas:** disponibilizar o provider no dashboard, criar as
  query keys centrais e migrar os hooks e componentes listados no épico.
