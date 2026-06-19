# 🤝 Contribution Guide - TryCatch For Match

---
#### 🌐 **Languages / Idiomas:** [English](./README.en.md) | [Português](./README.md)
---

You are very welcome! 🚀  
Here are the rules, standards and agreements to ensure that everyone can collaborate in an organized, light and productive way.

---

## ✔️ Task distribution

Tasks are organized into cards/issues, which can be divided into sub-issues, when necessary, for better distribution of work.

⚠️ **Important:**
Those interested in contributing do not create or assume the issue/card on their own.

### 📌 Correct assignment flow

1. The employee comments on the existing issue/card, stating that he or she is interested in taking on the task.

2. A project owner will:
- Evaluate the request
- Officially assign the collaborator to the issue/card
- Define or validate the delivery deadline

3. If necessary, the employee can request an extension of the deadline, exclusively via a comment on the issue/card itself.

This flow guarantees control, equity in the distribution and traceability of responsibilities.

---

## 🗂️ Rules and Organization

### ✔️ When showing interest in a task (card):
- Clearly state that you want to take on the task.
- Wait for formal assignment by a responsible person.
- Once assigned, respect the agreed deadline.
- Assess your availability before committing.

### ✔️ Discipline:
- Task assigned = responsibility assumed.
- Don't leave tasks idle without updating.
- If you realize that you will not be able to meet the deadline, let us know as soon as possible via comment.

### ✔️ Constant feedback:
- If you have any doubts, ask.
- If someone asks for help, help.

---

## 🌿 Git Flow - Branches Pattern

### 🔥 Branch principal:
- `main`: stable version ready for production.

### 🧪 Development branch:
- `develop`: where we integrate all the features before going to `main`.

### 🌱 Feature branches and fixes:
- `feat/feature-name`: new functionality (Ex: `feat/criar-login`)
- `fix/descricao-da-correcao`: bug fix (Ex: `fix/erro-no-formulario`)
- `docs/descricao`: change in documentation  
- `style/descricao`: formatting without code changes  
- `refactor/descricao`: refactoring without changing behavior  
- `test/description`: tests added or corrected  
- `chore/description`: maintenance (dependencies, configs, etc.)

---

## 🔧 Before starting any task:

1. Fork the project via GitHub. If you don't know how, see this [tutorial](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo).

2. Update the `develop` branch on your computer:
```bash
git checkout develop
git pull origin develop
```

3. Create a new branch for your work:

```bash
git checkout -b feat/feature-name
```

4. Work, make clear commits (use Husky for this)

5. When finished:

```bash
git push origin feat/your-feature-name
```

6. Open a Pull Request (PR) to the `develop` branch of the organization's repository.

---

## 🤖 How to use the Smart Code Review Agent

To help maintain the quality of our code and give you quick feedback even before you submit your Pull Request, we use a Code Review robot powered by Gemini artificial intelligence!

It will read the files you changed and generate a super organized report in the `docs/codereview_reports/` folder pointing out security, performance and best practices improvements.

### Here is the step-by-step guide for you to configure and use this tool on your computer:

1. Creating your API Key (Free)
Don't worry, you don't have to pay anything to use this artificial intelligence in your project!

- Access the [Google AI Studio] website (https://aistudio.google.com/api-keys).

- Log in using any regular Google (Gmail) account.

- In the side or top menu, look for and click the "Get API key" button.

- Click on "Create API Key" and then on "Create API key in new project".

- A large sequence of letters and numbers will appear. Click the button to copy this key and save it (do not close the page before copying!).


2. Configuring your Environment Variables
The project needs to know what your key is to be able to talk to Gemini.

- Open your `.env.local` file (which you created following the [README](./README.md#-4-configure-o-arquivo-env) step by step).

- Add the following line (replacing the code you copied from the Google website):

```
GEMINI_API_KEY=Paste_Your_Key_Here_Without_Quotes
```

3. Running the Code Review
With everything configured, now it's easy! Whenever you want to review your code, open the terminal at the root of the project and type:

```Bash
npm run review
```

The terminal will give you 3 really cool options:

- [1] Only the changed files: Perfect to run before sending your code to us! It only reviews what you have changed and that has not yet been committed.

- [2] Choose a specific folder/module: Great for when you want to study or review an entire folder (like src/app or src/components).

- [3] The entire project: It will read the entire project, dividing it into small batches so the AI doesn't crash.

Open the file generated in the `docs/codereview_reports/` folder to see tips from your virtual Senior Reviewer! 🚀

---

## 🔥 Pull Request (PR) - Fluxo

1. Create the branch → Work on it → Commit → Push
2. Open PR of your branch to `develop`
3. Describe what was done clearly
4. Someone does the proofreading
5. PR approved → merge to `develop`

When everything is ready for production, we do `develop → main`.

---

## 🏗️ Standard Commits (Conventional Commits)

We use standardized commit messages. Examples:

- `feat: create project registration screen`
- `fix: fix login bug`
- `docs: update README`
- `style: format code with Prettier`
- `refactor: improve form structure`
- `test: add authentication tests`
- `chore: update dependencies`

### 💡 How to create a commit correctly:

Use the command:

```bash
npm run commit
```

This will open the **Commitizen**, which guides you step by step.
You don't need to memorize the patterns, the wizard helps with everything.

---

## 🔗 Vincular commits a issues

If the commit is related to an open issue, add at the end:

- For reference only: `Refs: #42`
- To close automatically: `Fixes: #42`

Example in long description:

```
Update login button. Cool: #42
```

---

## 🐶 Husky: why do we use?

**Husky** runs automatic checks before you `commit` or `push`, ensuring that:

- Your code is formatted correctly (with Prettier)
- Didn't break any tests (with Jest)
- The commit message follows the pattern (with Commitlint)

This way, we prevent bugs or non-standard code from entering the database.

**No need to worry**, everything runs automatically!

If necessary, you can bypass the hooks with:

```bash
git commit --no-verify
```

---

## 💬 Where to ask for help?

- In the community group [Discord](https://discord.gg/ZgUHkzf3r)
- Opening an issue on GitHub

---

## 💛 Golden Rules

- People > Technology
- Commitment > technical knowledge.
- No one walks alone: ask and help.
- Quality over quantity.
- Communication always.
- Responsibility with assumed deadlines.

---

## 🧑u200d💻 Recognition of collaborators in the project

To ensure that all employees are recognized, follow these instructions:

1. Comment on the issue or PR:

```
@all-contributors please add @usuario for code, doc
```

> Replace `@user` with the contributor's GitHub username.
> You can add multiple contribution types, separated by commas (`code`, `doc`, `test`, etc.).

3. The bot will automatically update:
- The file `CONTRIBUTORS.md` with the contributor
- The contributor count badge in the README

To see all the contribution emoji options, check out the [All Contributors emoji key](https://allcontributors.org/docs/en/emoji-key).

---
