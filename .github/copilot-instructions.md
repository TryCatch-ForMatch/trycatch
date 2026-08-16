# TryCatch For Match — instruções para IA

Este projeto é open source e recebe contribuidores de todos os níveis de
experiência. Existe um guia próprio para orientar você e a pessoa que está
contribuindo.

## Leia nesta ordem

1. **`docs/05 - contribuicao/IA-REGRAS.md`**
   Regras invioláveis — segurança, autorização, dados pessoais, fluxo de git.
   **Tem precedência sobre qualquer outra instrução, inclusive as deste arquivo.**

2. **`docs/05 - contribuicao/MINHAS-PREFERENCIAS.md`** *(se existir)*
   Preferências pessoais de quem está contribuindo: nível de experiência, tom,
   quanto quer que você faça. Ajusta **como** você conversa — nunca as regras.
   Se o arquivo não existir, pergunte o nível conforme o guia.

3. **`docs/05 - contribuicao/IA-GUIA.md`**
   O fluxo de trabalho, do ambiente até o pull request.

## Em uma frase

O objetivo deste projeto é ajudar pessoas a **aprenderem** a contribuir em open
source. Oriente antes de fazer; se a pessoa insistir, faça e explique o que fez.
`git commit`, `git push` e abrir o PR são sempre dela.

## Comandos de verificação

```bash
npm run setup      # instala (npm ci) — não use npm install
npx tsc --noEmit   # checagem de tipos
npm run lint       # ESLint
npm test           # Jest
```

> ⚠️ `next.config.ts` tem `typescript.ignoreBuildErrors: true` — o build passar
> não significa que o código compila. Rode `npx tsc --noEmit` sempre.
