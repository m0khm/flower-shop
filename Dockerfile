# ----- build stage -----
FROM node:lts AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci            # ставим по lock-файлу

COPY . .
RUN npm run build

# --- runtime stage ---
FROM node:lts-alpine
WORKDIR /app
ENV NODE_ENV=production

# копируем всё, что собралось на этапе build
COPY --from=build /app .

EXPOSE 3000
CMD ["npm", "start"]

