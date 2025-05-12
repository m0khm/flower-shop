# ─── Build Stage ───
FROM node:lts AS build
WORKDIR /app

# 1) Копируем только манифесты и lock-файл
COPY package.json package-lock.json ./

# 2) Устанавливаем зависимости
RUN npm ci

# 3) Копируем Prisma-схему, чтобы prisma generate её увидел
COPY prisma ./prisma

# 4) Генерируем Prisma Client
RUN npx prisma generate

# 5) Копируем остальной исходник
COPY . .

# 6) Собираем Next.js
RUN npm run build

# ─── Runtime Stage ───
FROM node:lts-alpine
WORKDIR /app
ENV NODE_ENV=production

# Переносим весь результат сборки
COPY --from=build /app .

EXPOSE 3000
CMD ["npm", "start"]
