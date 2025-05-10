# ──────────── Build Stage ────────────
FROM node:lts AS build

# Рабочая директория
WORKDIR /app

# Копируем package.json и yarn.lock (фиксируем версии)
COPY package.json yarn.lock ./

# Устанавливаем зависимости через Yarn
RUN yarn install --frozen-lockfile

# Копируем весь исходный код и собираем статику
COPY . .
RUN yarn build

# ───────── Production Stage ─────────
FROM nginx:alpine

# Копируем собранную статику в папку, из которой Nginx отдаёт файлы
COPY --from=build /app/dist /usr/share/nginx/html

# (Опционально) Если у вас есть свой nginx.conf — заменяем им дефолтный
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Экспонируем порт 80 (по умолчанию)
EXPOSE 80

# Запускаем Nginx в форграунд-режиме
CMD ["nginx", "-g", "daemon off;"]
