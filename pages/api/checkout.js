import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET);

export default async function handler(req, res) {
  const { items } = req.body;
  // тут могла бы быть Stripe-логика…
  res.status(200).json({ ok: true });
}
