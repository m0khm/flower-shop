# ---------- build stage ----------
FROM node:lts AS build
WORKDIR /app

# Копируем только package.json и устанавливаем зависимости
COPY package.json ./
RUN npm ci   # или `npm install` если вы не используете package-lock.json

# Копируем весь остальной код и собираем
COPY . .
RUN npm run build

# ---------- production stage ----------
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
