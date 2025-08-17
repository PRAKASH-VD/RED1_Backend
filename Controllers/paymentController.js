import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckout = async (req, res) => {
  try {
    const { items } = req.body;
      if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Invalid or missing items array" });
    }

    const line_items = items.map((item) => {
      if (!item.property || !item.property.price) {
        throw new Error(
          "Invalid Property Details,Missing Property,Property Price"
        );
      }
      return {
        price_data: {
          currency: "usd",
          product_data: { name: item.property.name },

          unit_amount: Math.round(item.property.price * 100), // Convert to cents
        },
        quantity: item.quantity || 1,
      };
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });
    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Checkout Error:", error);
    res.status(500).json({ error: error.message });
  }
};
