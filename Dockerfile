# ---------- build stage ----------
FROM node:lts AS build
WORKDIR /app

# Копируем только манифесты и lock-файл Yarn
COPY package.json yarn.lock ./

# Устанавливаем зависимости через Yarn
RUN yarn install --frozen-lockfile

# Копируем весь остальной код и собираем
COPY . .
RUN yarn build

# ---------- production stage ----------
FROM nginx:alpine
# Отдаём готовую статику
COPY --from=build /app/dist /usr/share/nginx/html
# Ваш кастомный конфиг nginx, если есть
COPY nginx.conf /etc/nginx/conf.d/default.conf
