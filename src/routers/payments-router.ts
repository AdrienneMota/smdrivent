import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getPaymentByTicketId, processPayment } from "@/controllers/payments-controller";

const paymentsRouter = Router();

paymentsRouter.post("/process", authenticateToken, processPayment);
paymentsRouter.get("/", authenticateToken, getPaymentByTicketId)

export { paymentsRouter };