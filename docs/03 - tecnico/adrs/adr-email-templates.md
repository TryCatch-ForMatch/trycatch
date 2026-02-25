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
- Instância única de `resend`

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