# ----- build stage -----
FROM node:lts AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci            # ставим по lock-файлу

COPY . .
RUN npm run build

# ----- runtime -----
FROM node:lts-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app .        # копируем .next, public и т.д.

EXPOSE 3000
CMD ["npm", "start"]
