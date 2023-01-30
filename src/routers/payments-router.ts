import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { processPayment } from "@/controllers/payments-controller";

const paymentsRouter = Router();

paymentsRouter.post("/process", authenticateToken, processPayment);

export { paymentsRouter };