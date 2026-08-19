import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL!;
  const adapter = new PrismaPg({ connectionString });

  return new PrismaClient({
    adapter,

    // O hash da senha nunca sai do banco por padrão. Sem isto, qualquer rota
    // que devolva um User devolve o hash junto — e basta uma esquecer o
    // `select` para vazar. Quem realmente precisa do campo pede explicitamente
    // com `omit: { password: false }`, como faz a validação de login.
    omit: {
      user: { password: true },
    },

    // Em produção, registrar toda query gera custo de I/O, polui os logs e
    // espalha dado de usuário pelo provedor.
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'warn', 'error']
        : ['error'],
  });
}

// O tipo vem da própria fábrica: com `omit` configurado, o cliente tem um tipo
// mais específico que o PrismaClient padrão.
type ClientePrisma = ReturnType<typeof createPrismaClient>;

const globalForPrisma = global as unknown as {
  prisma: ClientePrisma | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
