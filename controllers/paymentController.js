import { PrismaClient } from "@prisma/client";
import axios from "axios";

import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

// Paystack Initialize Payment API
export const processPayment = async (req, res) => {
  try {
    const { id, email } = req.body;

    const dbItem = await prisma.studyMaterials.findFirst({
      where: {
        id: id,
      },
    });

    const paystackResponse = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: dbItem.price, // Paystack uses kobo (1 NGN = 100 kobo)
        currency: "NGN",
        callback_url: `${process.env.FRONTEND_URL_REACT}/success`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({
      authorizationUrl: paystackResponse.data.data.authorization_url,
    });
  } catch (error) {
    console.error("Payment processing error:", error);

    if (error.response) {
      res.status(500).json({ message: error.response.data.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};
