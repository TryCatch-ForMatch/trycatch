# Etapa 1 - Instalação de dependências
FROM node:23-alpine AS deps

WORKDIR /app

# Copia apenas os arquivos necessários para instalar as dependências
COPY package.json package-lock.json* ./

RUN npm install --frozen-lockfile

# Etapa 2 - Build da aplicação
FROM node:23-alpine AS builder

WORKDIR /app

COPY . .

COPY --from=deps /app/node_modules ./node_modules

RUN npm run build

# Etapa 3 - Imagem final, otimizada
FROM node:23-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copia node_modules da etapa de deps
COPY --from=deps /app/node_modules ./node_modules

# Copia arquivos necessários para rodar Next.js
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["npm", "run", "start"]
