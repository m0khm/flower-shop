### The web site of flower shop
# Цветочница Анюта 🌿🛒
```
 ПОЛНАЯ СТРУКТУРА
└─ flower-shop/
   ├─ .github/workflows/deploy.yml      # CI + деплой через SSH
   ├─ .gitignore
   ├─ Dockerfile                        # multi‑stage build (Vite → Nginx)
   ├─ docker-compose.yml                # prod‑стек
   ├─ README.md                         # как развернуть
   ├─ .env.example                      # переменные окружения
   ├─ vite.config.js
   ├─ tailwind.config.js
   ├─ postcss.config.js
   ├─ index.html                        # точка входа Vite
   ├─ package.json                      # фронт‑часть
   ├─ public/
   │   └─ plants.json                   # каталог (фейк‑CMS)
   ├─ src/
   │   ├─ main.jsx
   │   ├─ App.jsx
   │   └─ components/
   │       └─ FlowerShopSite.jsx        # основной UI (верс. 2.0)
   └─ server/
       ├─ package.json                  # backend
       ├─ index.js                      # Express сервер + API routes
       └─ api/
           └─ checkout.js               # Stripe Checkout session
```

```
Фронт: Vite + React + Tailwind + Zustand + framer‑motion.
Бэкенд: Express + Stripe.
Контейнеризация: Docker / docker‑compose.
```
