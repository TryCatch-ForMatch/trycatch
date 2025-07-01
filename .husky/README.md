# Husky 🐶 - Git Hooks

Configuração dos Git Hooks do projeto usando Husky para automatizar verificações durante o processo de desenvolvimento.

## O que é o Husky ?

O **Husky** permite executar scripts automaticamente em hooks do Git (pre-commit, pre-push, etc.), garantindo qualidade do código antes que ele seja commitado ou enviado ao repositório.

## Hooks Configurados 🪝

### `pre-commit`

Executado antes de cada commit. Roda o **lint-staged** que:

- Executa ESLint com correção automática nos arquivos modificados
- Formata o código com Prettier
- Executa testes relacionados aos arquivos alterados

```bash
npx lint-staged --allow-empty
```

### `commit-msg`

Valida se a mensagem do commit segue o padrão estabelecido usando **commitlint**:

- Deve seguir o formato: `type(scope): description`
- Tipos válidos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

```bash
npx --no -- commitlint --edit "$1"
```

### `pre-push`

Executado antes de fazer push. Roda a suíte completa de testes com coverage:

```bash
npm run test:push
```

## Ferramentas Integradas

### **Lint-staged**

Executa linters e formatadores apenas nos arquivos que estão no staging area, otimizando o processo. Configurado em `.lintstagedrc.json`.

### **Commitlint + Commitizen**

- **Commitlint**: Valida se as mensagens de commit seguem padrões definidos
- **Commitizen**: Ajuda a criar commits padronizados interativamente

## Scripts Disponíveis

```bash
# Fazer commit usando commitizen (recomendado)
npm run commit


## Configurações

- **Husky**: Configurado no `package.json` com script `prepare`
- **Lint-staged**: `.lintstagedrc.json`
- **Commitlint**: `commitlint.config.js`
- **Commitizen**: `package.json` seção `config.commitizen`

## Como usar

1. **Desenvolvimento normal**: Os hooks rodam automaticamente
2. **Commits padronizados**: Use `npm run commit` em vez de `git commit`
3. **Bypass hooks** (emergência): Use `git commit --no-verify`

> ⚠️ **Importante**: Não modifique os arquivos de hook diretamente. Eles são gerenciados pelo Husky.
