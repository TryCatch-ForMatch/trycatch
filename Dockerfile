FROM node:20-alpine

WORKDIR /app

# Copia apenas os arquivos de dependências para otimizar o cache
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Gere o Prisma Client para o ambiente do container
RUN npx prisma generate

# Garante que as variáveis de ambiente estejam disponíveis
ENV NODE_ENV=development

EXPOSE 3000