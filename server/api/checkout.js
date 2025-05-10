import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET);

router.post('/', async (req, res) => {
  const { items } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((p) => ({
        price_data: {
          currency: 'rub',
          product_data: { name: p.name },
          unit_amount: p.price * 100,
        },
        quantity: p.qty,
      })),
      mode: 'payment',
      success_url: `${process.env.PUBLIC_URL}/success`,
      cancel_url: `${process.env.PUBLIC_URL}/cancel`,
    });
    res.json({ sessionId: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'stripe error' });
  }
});

export default router;
