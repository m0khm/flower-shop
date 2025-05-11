# ─────── Build Stage ───────
FROM node:lts AS build

WORKDIR /app

# Копируем манифесты и lock-файл (если есть)
COPY package.json yarn.lock ./

# Устанавливаем зависимости
RUN yarn install --frozen-lockfile

# Копируем весь проект и собираем
COPY . .
RUN yarn build

# ───── Production Stage ────
FROM nginx:alpine

# Копируем собранную статику в папку Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Экспонируем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
