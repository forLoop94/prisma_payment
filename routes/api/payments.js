import { Router } from "express";
import { processPayment } from "../../controllers/paymentController.js";

const router = Router();

router.post("/", processPayment);

export default router;
