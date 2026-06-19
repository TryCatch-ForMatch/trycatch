# ADR-XXX — Padronização de Templates de Email com React Email

## Status
Aprovado

## Contexto

O sistema TryCatch possui múltiplos emails transacionais:

- Solicitação de convite (admin)
- Confirmação de solicitação (usuário)
- Reset de senha
- Contato

Inicialmente alguns emails utilizavam HTML inline diretamente no service,
o que gerava:

- Duplicação de estrutura
- Dificuldade de manutenção
- Inconsistência visual
- Acoplamento entre layout e lógica

## Decisão

Adotar **React Email** como padrão oficial para criação de templates.

Definições adotadas:

- Todos os templates devem usar `EmailLayout`
- Nenhum HTML inline será utilizado em services
- Envio centralizado via `lib/mail`
- Utilização do SDK Resend
- Cliente Resend instanciado via factory `getResend()` (lazy initialization)

Estrutura definida:

```
lib/
  mail/
    templates/
      layout/
         layout.tsx
         emails-styles.ts
      contact-sender.tsx      
      invite-request-confirmation.tsx
      invite-request-receiver.tsx
      invite-request-sender.tsx      
      reset-password.tsx
    resend.ts
    send-invite-request-confirmation-email.ts
    send-invite-request-email.ts
    send-reset-password-email.ts
```

### Inicialização do cliente Resend

O cliente Resend **não** é instanciado no nível do módulo. Em vez disso,
`resend.ts` exporta uma factory `getResend()` que cria a instância sob
demanda na primeira chamada durante o runtime de uma requisição:

```ts
export function getResend(): Resend {
  // inicializa apenas quando chamado, não no import
}
```

Isso evita que a verificação de `RESEND_API_KEY` ocorra durante o build
do Next.js (fase de coleta de dados das páginas), que causava crash quando
a variável de ambiente não estava disponível em build time.

Os helpers de envio de email chamam `getResend()` internamente. Testes
devem mockar `getResend` em vez de uma instância global `resend`.

## Consequências

### Positivas

- Padronização visual
- Reutilização de layout
- Melhor testabilidade
- Melhor separação de responsabilidades
- Facilidade de manutenção futura

### Negativas

- Pequeno aumento de complexidade inicial
- Dependência adicional (React Email)

## Alternativas consideradas

- Manter HTML inline
- Utilizar templates do próprio Resend
- Utilizar apenas string HTML simples

Todas descartadas por menor escalabilidade e padronização.

## Impacto arquitetural

Camada afetada:
Infraestrutura / Comunicação

Não impacta:
- Banco de dados
- Domínio
- Regras de negócio

## Data
2026-02-25