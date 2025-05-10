# ---------- build stage ----------
FROM node:lts AS build
WORKDIR /app

# Копируем только package.json (без lock-файла)
COPY package.json ./

# Ставим зависимости через npm (создаст внутрии контейнера свой lock-файл, но нам это не критично)
RUN npm install

# Копируем весь остальной код и собираем
COPY . .
RUN npm run build

# ---------- production stage ----------
FROM nginx:alpine

# Копируем собранную статику
COPY --from=build /app/dist /usr/share/nginx/html

# (опционально) свой конфиг nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
