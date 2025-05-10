import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import checkoutRoute from './api/checkout.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/checkout', checkoutRoute);
app.get('/', (_, res) => res.json({ ok: true }));
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
