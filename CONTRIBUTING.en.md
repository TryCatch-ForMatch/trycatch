# 🤝 Contributing Guide - TryCatch For Match

---
#### 🌐 **Languages / Idiomas:** [English](./CONTRIBUTING.en.md) | [Português](./CONTRIBUTING.md)
---

Welcome aboard! 🚀

This project exists to help people **learn how to contribute to open source**.
It doesn't matter whether this is your first contribution ever or you have years
of experience — there is room and there are tasks for both.

This guide walks you through the whole journey: picking up a task, setting up
your environment, doing the work and opening the pull request.

> 💡 **First time contributing to open source?** You don't need to know
> everything. Read through the *Getting started* section and ask for help on
> [Discord](https://discord.gg/ZgUHkzf3r) whenever you get stuck. Asking is part
> of the process.

> 🌍 **A note on language:** most of this project's documentation is written in
> Portuguese, since the community is Brazilian. **You do not need to speak
> Portuguese to contribute.** This guide is kept in English, and if you use an
> AI assistant in your editor it will talk to you in your own language and
> translate the rest as needed — see
> [Using AI? Set it up before you start](#-using-ai-set-it-up-before-you-start).

---

## 📖 Table of contents

1. [How tasks are assigned](#-how-tasks-are-assigned)
2. [Getting started: from fork to running project](#-getting-started-from-fork-to-running-project)
3. [Using AI? Set it up before you start](#-using-ai-set-it-up-before-you-start)
4. [The workflow: branch, commit and PR](#-the-workflow-branch-commit-and-pr)
5. [Working with dependencies](#-working-with-dependencies)
6. [AI code review agent](#-ai-code-review-agent)
7. [Husky and Continuous Integration](#-husky-and-continuous-integration)
8. [Task tracking](#-task-tracking)
9. [Where to ask for help](#-where-to-ask-for-help)
10. [Golden rules](#-golden-rules)
11. [Contributor recognition](#-contributor-recognition)

---

## ✔️ How tasks are assigned

Work is organised as **cards/issues** on GitHub Projects, which may be split
into sub-issues when needed.

⚠️ **Important:** you don't create or assign yourself to an issue on your own.

### 📌 The assignment flow

1. Comment on the issue/card saying you'd like to take the task.
2. A project maintainer will:
   - review your request;
   - officially assign you to the issue/card;
   - set or confirm the delivery deadline.
3. If you need more time, ask for an extension **on the issue itself**.

This keeps the workload fair, traceable and under control.

### ✔️ Before you volunteer

- Check your availability **before** committing to a task.
- Wait for the formal assignment before you start coding.
- Assigned task = responsibility accepted.
- If you realise you won't make the deadline, say so as early as you can.

> 💡 **First contribution?** Look for issues labelled `good first issue`. They
> were picked because they're a safe place to start.

---

## 🚀 Getting started: from fork to running project

Follow these in order. Each step depends on the previous one.

### 1. Fork the project

Click **Fork** at the top of the repository page on GitHub. This creates a copy
of the project under your account.

> Never worked with forks before? See the
> [official GitHub tutorial](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo).

### 2. Clone your fork

```bash
git clone https://github.com/YOUR-USERNAME/trycatch.git
cd trycatch
```

Replace `YOUR-USERNAME` with your GitHub username.

> ⚠️ **On Windows:** don't put the project inside a synced folder (OneDrive,
> Google Drive, Dropbox). Sync locks files and git fails when switching
> branches. Prefer something like `C:\projects\trycatch`.

### 3. Connect to the original repository

This lets you pull updates from the main project into your fork:

```bash
git remote add upstream https://github.com/TryCatch-ForMatch/trycatch.git
```

Check it with `git remote -v`. You should see both `origin` (your fork) and
`upstream` (the original project).

### 4. Install dependencies

```bash
npm run setup
```

This runs `npm ci`, which installs **exactly** what's in `package-lock.json`.

> ⚠️ **Don't use `npm install` just to set up your environment.** It can rewrite
> `package-lock.json` and break continuous integration for everyone. Details in
> [Working with dependencies](#-working-with-dependencies).

**Node version:** the project runs on **Node 24**, the same version used by CI
and production. If you use `nvm` or `fnm`, run `nvm use` in the project root.

> The Prisma Client is generated automatically by `postinstall`. You do **not**
> need to run `npx prisma generate` yourself.

### 5. Set up your environment variables

Copy the template and fill it in:

```bash
cp .env.example .env
```

Every variable is documented inside the file. At a minimum you'll need
`DATABASE_URL`, `NEXTAUTH_SECRET` and `JWT_SECRET`. Ask on
[Discord](https://discord.gg/ZgUHkzf3r) if you're unsure about any of them.

> 🔒 Your `.env` **never** goes into the repository. It's already in
> `.gitignore` — don't force-add it under any circumstances.

### 6. Run the project

```bash
npm run dev
```

Open <http://localhost:3000>. If the page loads, your environment is ready. 🎉

### 7. Check that everything works

```bash
npm test            # tests
npm run lint        # code standards
npx tsc --noEmit    # type checking
```

> ℹ️ The project has **known type errors** that are being fixed gradually. If
> `npx tsc --noEmit` reports errors in files you didn't touch, they're not
> yours — move on and don't try to fix them.

---

## 🤖 Using AI? Set it up before you start

Plenty of people use an AI assistant in their editor, and that's **welcome
here**. The project ships its own instructions for those tools: they cover the
rules, the conventions and the workflow, and they adapt the level of explanation
to your experience.

**You don't need AI to contribute.** If you'd rather work without it, skip this
section — the rest of the guide is enough on its own.

### How it works

The content lives in `docs/05 - contribuicao/`, and each tool automatically
reads an "entry point" file in the project root:

| Tool | File it reads automatically |
|---|---|
| GitHub Copilot | `.github/copilot-instructions.md` |
| Claude Code | `CLAUDE.md` |
| Cursor | `.cursor/rules/trycatch.mdc` |

In other words: **just open the project with the tool installed.** It finds the
instructions on its own and starts following the project's workflow.

### Step by step

**1. Pick and install a tool**

| Tool | How to install | Cost |
|---|---|---|
| **GitHub Copilot** | *GitHub Copilot* extension in VS Code → sign in with your GitHub account | Free tier with a monthly limit; free for students and open source maintainers |
| **Claude Code** | VS Code extension, or from the terminal — see the [official docs](https://docs.claude.com/en/docs/claude-code/overview) | Free tier with a limit; paid plans available |
| **Cursor** | Standalone editor built on VS Code — [cursor.com](https://cursor.com) | Free tier with a limit; paid plans available |

If you've never used any of them, **Copilot** is usually the easiest starting
point: it installs like any other VS Code extension and has a free tier.

**2. Open the project in your tool**

Nothing else to configure. When you open the project folder, the AI reads the
entry file and follows it to the full instructions.

**3. Tell it what you want to do**

Start with something simple. Use **the number of the issue assigned to you**:

> I want to pick up issue #NUMBER. Where do I start?

> ⚠️ `#NUMBER` is a placeholder, not a command. Replace it with the real number
> — for example, `#487`. If you paste the text as-is, the AI will go looking for
> an issue that doesn't exist.
>
> No issue assigned yet? Just say so: *"I haven't picked up a task yet, can you
> help me choose one?"*

The AI will ask you two things: **which language you'd like to talk in** and
**how much experience** you have contributing to open source. From there it
adjusts how much it explains — more detail if you're starting out, straight to
the point if you already know the flow.

> 🌍 **The project's documentation is in Portuguese, but you don't need to speak
> Portuguese to contribute.** The AI talks to you in your language and
> translates the documents as needed. Just write in English, Spanish or whatever
> you're comfortable with — it will follow.

**4. (Optional) Save your preferences**

So you don't answer the same questions every time:

```bash
cp "docs/05 - contribuicao/MINHAS-PREFERENCIAS.example.md" "docs/05 - contribuicao/MINHAS-PREFERENCIAS.md"
```

Then edit the file with your language, experience level, tool and how you prefer
to work. It stays **on your machine only** — it's in `.gitignore`, just like
`.env`.

### What to expect from AI on this project

- **It teaches before it does.** When you ask for something you'd learn by doing
  — a git command, running a test, reading an error message — it shows you the
  way and waits. If you insist, it does it and explains what it did. The point
  here is for you to learn, not just for the code to get written.
- **`git commit`, `git push` and opening the PR are always yours.** The AI helps
  draft the message, but you run the commands.
- **It warns you when something breaks the project's rules**, even if you asked
  for it. When that happens, read the warning — it's usually about security or
  real people's data.

### Documents, if you want to dig deeper

These are written in Portuguese. Your AI assistant can translate them for you,
or read them and explain in your language.

| File | Contents |
|---|---|
| [`IA-REGRAS.md`](docs/05%20-%20contribuicao/IA-REGRAS.md) | Non-negotiable rules: security, authorisation, personal data, git flow |
| [`IA-GUIA.md`](docs/05%20-%20contribuicao/IA-GUIA.md) | The complete workflow, step by step |
| [`IA-NIVEIS.md`](docs/05%20-%20contribuicao/IA-NIVEIS.md) | How the AI adapts to your experience level and language |

> 💡 If the AI does something different from what's documented, **the
> documentation wins**. Let us know on Discord or open an issue.

---

## 🌿 The workflow: branch, commit and PR

This is the full cycle of a contribution, start to finish.

### The project's branches

| Branch | What it's for |
|---|---|
| `main` | Stable, production version. **Never** work on it directly |
| `develop` | Where everything is integrated. **Your branch starts here, and your PR goes back here** |
| `feat/`, `fix/`, … | Your working branch |

Prefixes:

| Prefix | When to use it | Example |
|---|---|---|
| `feat/` | new feature | `feat/criar-login` |
| `fix/` | bug fix | `fix/erro-no-formulario` |
| `docs/` | documentation | `docs/atualizar-readme` |
| `style/` | formatting, no behaviour change | `style/ajustar-espacamento` |
| `refactor/` | refactoring, no behaviour change | `refactor/extrair-service` |
| `test/` | tests | `test/cobertura-de-login` |
| `chore/` | maintenance, dependencies, config | `chore/atualizar-eslint` |

### 1. Update develop before you start

**Every time**, at the beginning of a task:

```bash
git checkout develop
git pull upstream develop
git push origin develop
```

`pull upstream` brings in changes from the original project; `push origin`
updates your fork.

### 2. Create your working branch

```bash
git checkout -b feat/your-feature-name
```

`-b` creates the branch and switches to it.

### 3. Work and commit

Use [Conventional Commits](https://www.conventionalcommits.org/) for your
messages:

```
feat: criar tela de cadastro de projeto
fix: corrigir bug no login
docs: atualizar guia de contribuição
```

> ℹ️ Commit messages in this project are usually written in Portuguese, matching
> the rest of the codebase. The **type prefix** (`feat`, `fix`, `docs`…) is
> always in English. If you're not comfortable writing in Portuguese, English is
> fine — just be consistent within your PR.

If you'd rather be guided step by step:

```bash
npm run commit
```

That opens **Commitizen**, which builds the message with you. No need to
memorise the format.

**Linking to an issue** — at the end of the message:

- `Refs: #42` just references the issue;
- `Fixes: #42` closes it automatically when the PR is merged.

### 4. Check before you push

```bash
npm test
npm run lint
npx tsc --noEmit
```

### 5. Push and open the pull request

```bash
git push origin feat/your-feature-name
```

On GitHub, open the PR **from your branch to `develop`** on the organisation's
repository — never to `main`.

Fill in the template that shows up: what you did, the related issue, how to test
it. A good description speeds up review.

### 6. Review

Someone from the team reviews it and may ask for changes. **That's normal and
it's not personal criticism** — it's how the code gets better and how we all
learn. Reply to the comments, adjust and push a new commit.

Once approved, your PR is merged into `develop`. When everything is ready for
production, we merge `develop → main`.

---

## 📦 Working with dependencies

This section matters even if you're not touching any package — because it's easy
to change `package-lock.json` by accident.

### Just installing the project

```bash
npm run setup
```

Never `npm install`. `npm ci` installs exactly what's in the lockfile without
rewriting it.

### 🔴 `package-lock.json` can only be generated on Linux

If you're on **Windows or macOS**, **do not run `npm install`** in this project.

**Why:** some dependencies ship platform-specific compiled builds. npm resolves
the dependency tree differently on each operating system, and the CI's `npm ci`
— which runs on Linux — rejects a lockfile generated elsewhere. This has already
taken the project's CI down for hours.

**So how do you add or update a package?**

| Situation | What to do |
|---|---|
| Bumping a package version | Let **Dependabot** handle it — it runs on Linux |
| Adding a new dependency | Use **GitHub Codespaces** (Linux, in the browser), WSL or Docker |
| Just installing to work | `npm run setup` — doesn't touch the lockfile |

In Codespaces:

```bash
npm install <package>
npm ci                              # validate on the same platform as CI
git add package.json package-lock.json
```

> ⚠️ **Talk to the team before adding any dependency.** Every new dependency is
> attack surface, bundle weight and future maintenance.

### If `package-lock.json` shows up modified by accident

If you **didn't touch any dependency** and it shows as changed, you ran
`npm install` by mistake. Restore it:

```bash
git checkout -- package-lock.json
npm run setup
```

> ⚠️ **Only do this if the change really was accidental.** If you were fixing
> the lockfile on purpose, this command throws your work away. When in doubt,
> ask first.

---

## 🔍 AI code review agent

Beyond the instructions for your editor assistant, the project has a **code
review bot** that analyses your changed files and writes a report to
`docs/codereview_reports/`, pointing out improvements in security, performance
and best practices.

It's optional, free, and runs on your machine.

### 1. Create your API key (free)

- Go to [Google AI Studio](https://aistudio.google.com/api-keys).
- Sign in with a regular Google account.
- Click **Get API key** → **Create API Key** → **Create API key in new project**.
- Copy the key that appears (don't close the page before copying!).

### 2. Set the environment variable

Open your `.env` file (the one from step 5 of *Getting started*) and add:

```
GEMINI_API_KEY=paste_your_key_here_without_quotes
```

> 🔒 The key is personal and yours. `.env` never goes into the repository —
> never share the key in an issue, a PR or a message.

### 3. Run the review

```bash
npm run review
```

The terminal offers three options:

- **[1] Changed files only** — ideal right before opening your PR;
- **[2] A specific folder** — good for studying a module;
- **[3] The whole project** — in batches, to avoid overloading the model.

Then open the generated report in `docs/codereview_reports/`. 🚀

---

## 🐶 Husky and Continuous Integration

### Husky: automatic checks before commits

**Husky** runs automatic checks before `commit` and `push`:

- formatting with Prettier;
- tests related to your changed files, with Jest;
- commit message format, with Commitlint;
- a guard against unintended `package-lock.json` changes.

**Nothing to configure** — it works automatically after `npm run setup`.

If a hook blocks your commit, **read the message**: it almost always tells you
what to do. There is an escape hatch:

```bash
git commit --no-verify
```

> ⚠️ Use it **only** when you know exactly why the hook is wrong, and explain
> your reasoning in the PR description. Skipping checks out of impatience
> usually just moves the problem onto someone else.

### CI: what runs when you open a PR

Automatically: **build**, **lint**, **tests**, **coverage**, **dependency
audit**, and then the **SonarCloud** analysis.

### 🟥 Seeing red on your PR? It's probably not your fault

This is the part that scares most people opening their first pull request. Some
jobs can fail for reasons **unrelated to your code**:

- **Your PR comes from a fork.** For security, GitHub **does not hand repository
  secrets to pull requests from forks** — that's what stops someone from opening
  a malicious PR just to capture keys. Jobs that depend on those values may fail
  or be skipped, and that's expected.
- **The dependency audit job** may be red because of vulnerabilities in
  development tooling that have no published fix yet. That predates your PR.
- **SonarCloud runs in a separate workflow**, triggered after CI — precisely to
  work around the fork/secrets limitation. If it takes a while to show up, wait.

**What to do:** don't try to "fix" those failures. Check that the **build**,
**lint** and **test** jobs passed — those do depend on your code. If one of them
fails, that's worth investigating.

When in doubt, **ask in the PR**. Nobody will mind, and the answer is very likely
"you can ignore that one, it's on our side".

Full details in
[`docs/04 - processo/ci-e-validacao.md`](docs/04%20-%20processo/ci-e-validacao.md)
(in Portuguese).

---

## 🧭 Task tracking

Once a task is assigned to you, keep the card up to date so the team knows the
real state of the work.

### Card status

| Status | When to use it |
|---|---|
| **In progress** | when you start implementing or reviewing |
| **Blocked** | when you need a decision, access, scope change or technical help |
| **Done** | only after opening the PR, validating locally and leaving the link on the card |

### Communication

- State the agreed deadline before you start.
- Record any deadline change on the card itself.
- Explain blockers with enough context for someone else to help.
- When you open the PR, share the link and say which checks you ran.

---

## 💬 Where to ask for help

- On our community [Discord](https://discord.gg/ZgUHkzf3r)
- By commenting on the issue itself
- By opening a new issue, if it's something that doesn't exist yet

**Don't stay stuck on your own.** Asking early saves everyone's time, and nobody
here will think your question is silly.

---

## 💛 Golden rules

- People > Technology
- Commitment > technical knowledge
- Nobody walks alone: ask, and help
- Quality over quantity
- Always communicate
- Own the deadlines you accept

---

## 🧑‍💻 Contributor recognition

To make sure everyone gets credited, comment on the issue or PR:

```
@all-contributors please add @username for code, doc
```

> Replace `@username` with the GitHub username. You can list several
> contribution types separated by commas (`code`, `doc`, `test`, etc.).

The bot automatically updates:

- the `CONTRIBUTORS.md` file;
- the contributor count badge in the README.

See all the types in the
[All Contributors emoji key](https://allcontributors.org/docs/en/emoji-key).

---

**Thank you for contributing to TryCatch For Match!** 💛
