# Documento Técnico — Schemas de Validação (Zod)

**Classificação:** Documento Técnico
**Camada:** 3 — Técnico
**Status:** Adotado

---

## 1. Identificação

- **Nome do documento:** Schemas de Validação (Zod)
- **Domínio técnico:** Arquitetura
- **Documentos relacionados:** `arquitetura-geral.md`, `dados-no-cliente.md`, `docs/05 - contribuicao/IA-REGRAS.md`
- **Data de criação:** 04/11/2026
- **Última atualização:** 04/11/2026

---

## 2. Contexto Técnico

Os schemas do Zod definem se um dado é válido (por exemplo, "título obrigatório"
ou "URL válida"). Até aqui, cada rota da API e cada formulário escrevia o próprio
schema dentro do arquivo. Isso deixa a mesma regra repetida em mais de um lugar,
e as cópias podem divergir: o formulário aceita um dado que a API recusa.

---

## 3. Padrão adotado

**Todo schema do Zod fica em `src/lib/validations/`**, em um arquivo por domínio.

```
src/lib/validations/
├── certificate.schema.ts
├── portfolio.schema.ts
└── <dominio>.schema.ts
```

Cada arquivo exporta os schemas e os tipos inferidos deles:

```ts
import { z } from 'zod';

export const certificateSchema = z.object({
  title: z.string().trim().min(1, 'Título obrigatório'),
});

export type CertificateFormData = z.infer<typeof certificateSchema>;
```

Regras:

1. **Importe com o alias:** `@/lib/validations/certificate.schema`.
2. **Mesma regra, mesmo schema.** Se o formulário e a API validam os mesmos dados,
   os dois usam o mesmo schema.
3. **Regras diferentes, schemas separados no mesmo arquivo**, com nomes claros.
   Por exemplo, quando o formulário trabalha com `Date` e a API recebe texto.
4. **O arquivo só depende do Zod.** Nada de Prisma, `next/server` ou outro código
   de servidor: o schema também é importado por componentes que rodam no navegador.
5. **A validação continua acontecendo no início do handler.** Validar no formulário
   melhora a experiência, mas não protege o servidor (`IA-REGRAS.md`, regra 4).

---

## 4. Situação atual

Código novo já segue este padrão. Os schemas que ainda estão dentro de rotas e
formulários são movidos por domínio, em issues próprias, sem mudar comportamento.

---

## 5. Histórico

| Data | Alteração |
|---|---|
| 04/11/2026 | Versão inicial, a partir da pasta criada no PR #909 |
