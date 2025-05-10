# server/Dockerfile

# Используем Node.js LTS
FROM node:lts

# Рабочая директория внутри контейнера
WORKDIR /app

# Копируем только манифесты и ставим зависимости
COPY package.json ./
# Если у вас есть package-lock.json, добавьте его:
# COPY package-lock.json ./
RUN npm install

# Копируем весь код сервера
COPY . .

# Экспонируем порт (должен совпадать с тем, что вы указали в .env и docker-compose.yml)
EXPOSE 4000

# Запускаем приложение
CMD ["node", "index.js"]
