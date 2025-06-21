# Components

Componentes reutilizáveis da interface. Cada componente fica em sua própria pasta, se necessário, contendo arquivo de estilo, teste e documentação, se aplicável.

## FormInput

Um input de formulário reutilizável que possa ser usado em cadastros, login, criação de projetos etc. Deve aceitar:

- name, type, label, placeholder

- value, onChange

- opção de mostrar erro (útil com Zod)

- outros props padrão (required, disabled, etc.)

- Reutilizável para qualquer campo de texto, senha, email, número etc.

- Já vem pronto para exibir mensagens de erro (do Zod, por exemplo).

- Com ...props, aceita tudo de um input normal (required, min, maxLength, autoFocus, etc.)

### 🧪 Exemplo de uso:

``` tsx
<FormInput
  label="E-mail"
  name="email"
  type="email"
  placeholder="Digite seu e-mail"
  value={form.email}
  onChange={handleChange}
  required
  error={errors.email}
/>
```

## NavBar

- Exibe links públicos: Portfólios e Sobre

- Se usuário não está logado, mostra: Registrar / Login

- Se usuário está logado, mostra: Dashboard / Sair

- Usa useSession() do NextAuth para detectar estado da sessão

- Usa signOut() do NextAuth para logout

### 🧪 Exemplo de uso:

``` tsx
import { Navbar } from '@/components/navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
```

## ProtectedLayout

Um wrapper reutilizável para proteger qualquer trecho da aplicação (página, seção ou layout) que exija:

- Usuário logado (sessão válida)

- Verificação de role (ex: admin, user)

- Redirecionamento caso não autorizado

- Centraliza a lógica de sessão e permissões

- Pode ser usado tanto em page.tsx quanto em layout.tsx

- Flexível: protege por login ou por role


### 🧪 Exemplo de uso em página protegida (ex: admin):

``` tsx
import ProtectedLayout from '@/components/protected-layout';

export default function AdminRegistersPage() {
  return (
    <ProtectedLayout roles={['admin']}>
      <h2>Cadastro de Skills e Stacks</h2>
      {/* Conteúdo da página */}
    </ProtectedLayout>
  );
}
```