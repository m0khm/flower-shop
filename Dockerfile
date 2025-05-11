# ─────── Build Stage ───────
FROM node:lts AS build

# Рабочая директория
WORKDIR /app

# Копируем только package.json
COPY package.json ./

# Устанавливаем зависимости через npm
RUN npm install

# Копируем весь остальной код и собираем
COPY . .
RUN npm run build

# ─── Production Stage ───
FROM nginx:alpine

# Копируем собранную статику
COPY --from=build /app/dist /usr/share/nginx/html

# Экспонируем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
