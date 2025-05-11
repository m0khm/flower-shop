import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { items } = req.body;
  const line_items = items.map((p) => ({
    price_data: {
      currency: 'rub',
      product_data: { name: p.name },
      unit_amount: Math.round(p.price * 100),
    },
    quantity: p.qty,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    locale: 'ru',
    line_items,
    mode: 'payment',
    success_url: `${process.env.NEXTAUTH_URL}/account?success=true`,
    cancel_url: `${process.env.NEXTAUTH_URL}/`,
  });

  res.status(200).json({ url: session.url });
}
