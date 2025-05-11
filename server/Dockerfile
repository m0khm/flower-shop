# server/Dockerfile

FROM node:lts
WORKDIR /app

# Копируем манифест зависимостей
COPY package.json ./

# Ставим зависимости
RUN npm install

# Копируем весь остальной код
COPY . .

# Экспонируем порт (должен совпадать с тем, что слушает index.js)
EXPOSE 4000

# Запускаем сервер
CMD ["node", "index.js"]
