import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

// export const processPayment = async (req, res) => {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: req.body.items.map(async (item) => {
//         const dbItem = await prisma.studyMaterials.findFirst({
//           where: {
//             id: item.id,
//           },
//         });
//         return {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: dbItem.title,
//             },
//             unit_amount: dbItem.price,
//           },
//           quantity: item.quantity,
//         };
//       }),
//       success_url: `${process.env.FRONTEND_URL}/success`,
//       cancel_url: `${process.env.FRONTEND_URL}/cancel`,
//     });
//     res.json({ url: session.url });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const processPayment = async (req, res) => {
  try {
    // Ensure all database queries complete before proceeding
    const lineItems = await Promise.all(
      req.body.items.map(async (item) => {
        const dbItem = await prisma.studyMaterials.findFirst({
          where: { id: item.id },
        });

        if (!dbItem) {
          throw new Error(`Item with ID ${item.id} not found`);
        }

        return {
          price_data: {
            currency: "usd",
            product_data: { name: dbItem.title },
            unit_amount: dbItem.price, // Stripe uses cents
          },
          quantity: item.quantity,
        };
      })
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.FRONTEND_URL}/success.html`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel.html`,
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
