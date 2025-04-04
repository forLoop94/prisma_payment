import { PrismaClient } from "@prisma/client";
import axios from "axios";

import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

// Paystack Initialize Payment API
export const processPayment = async (req, res) => {
  console.log("Request Body:", req.body); // Debugging
  try {
    const { email, items } = req.body;

    if (!Array.isArray(items)) {
      return res
        .status(400)
        .json({ message: "Invalid request: 'items' must be an array" });
    }

    let totalAmount = 0; // Fix: Use let instead of const

    for (const item of items) {
      const dbItem = await prisma.studyMaterials.findUnique({
        where: { id: item.id },
      });

      if (!dbItem) {
        return res
          .status(404)
          .json({ message: `Item with ID ${item.id} not found` });
      }

      totalAmount += dbItem.price * item.quantity;
    }

    const paystackResponse = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: totalAmount, // Paystack uses kobo (1 NGN = 100 kobo)
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

// Paystack verify payment API

export const verifyPayment = async (req, res) => {
  console.log(req.body);
  try {
    const { reference } = req.body;

    const paystackResponse = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    if (paystackResponse.data.data.status === "success") {
      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      res.json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error verifying payment" });
  }
};
