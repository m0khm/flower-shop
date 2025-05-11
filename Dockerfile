# ───── Build Stage ──────
FROM node:lts AS build
WORKDIR /app

# Копируем package.json + lock-файл
COPY package.json package-lock.json ./

# Ставим зависимости по lock-файлу
RUN npm ci

# Копируем весь остальной код и билдим Next.js
COPY . .
RUN npm run build

# ─── Runtime Stage ──────
FROM node:lts-alpine
WORKDIR /app
ENV NODE_ENV=production

# Копируем из build-образа всё содержимое /app
COPY --from=build /app .

# Экспонируем порт, на котором Next.js будет слушать
EXPOSE 3000

# Стартуем сервер
CMD ["npm", "start"]
