import { Router } from "express";
import {
  processPayment,
  verifyPayment,
} from "../../controllers/paymentController.js";

const router = Router();

router.post("/", processPayment);
router.post("/verify-payment", verifyPayment);

export default router;
