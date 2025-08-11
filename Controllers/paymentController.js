import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createChechout = async (req, res) => {
  try {
    const { item } = req.body;
    const line_items = item.map((item) => {
      if (!item.property || !item.property.price) {
        throw new Error(
          "Invalid Property Details,Missing Property,Property Price"
        );
      }
      return {
        price_data: {
          currency: "usd",
          property_data: { name: item.property.name },
          unit_amount: Math.round(item.property.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      };
    });
    const session = await await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });
    res.status(200).json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
