# ─────── Build stage ───────
FROM node:lts AS build
WORKDIR /app

# Копируем манифесты и lock-файл
COPY package.json package-lock.json ./

# Ставим зависимости строго по lock-файлу
RUN npm ci

# Копируем весь код и собираем
COPY . .
RUN npm run build

# ─── Production stage ──────
FROM nginx:alpine
COPY --from=build /app/.next /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
