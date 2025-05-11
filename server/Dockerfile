FROM node:lts

WORKDIR /app

# Копируем package.json и lock-файл (если есть)
COPY package.json yarn.lock ./

# Устанавливаем зависимости
RUN yarn install --frozen-lockfile

# Копируем весь код бэкенда
COPY . .

# Экспонируем порт (должен совпадать с вашим server/index.js)
EXPOSE 4000

# Запускаем сервер
CMD ["node", "index.js"]
