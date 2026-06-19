FROM node:20-alpine

WORKDIR /app

# Copia apenas os arquivos de dependências para otimizar o cache
COPY package.json package-lock.json* ./

# Instala as dependências
RUN npm ci

# Copia o restante do código
COPY . .

# Gere o Prisma Client para o ambiente do container
RUN npx prisma generate && npm run build

# Garante que as variáveis de ambiente estejam disponíveis
ENV NODE_ENV=development \
RESEND_API_KEY=${RESEND_API_KEY} \
GEMINI_API_KEY=${GEMINI_API_KEY} \
SONAR_TOKEN=${SONAR_TOKEN}

EXPOSE 3000