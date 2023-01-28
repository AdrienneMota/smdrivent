import { Router } from "express";
import { createTicket } from "@/controllers";
import { authenticateToken } from "@/middlewares";


const ticketsRouter = Router();

ticketsRouter.post("/", authenticateToken, createTicket);

export { ticketsRouter };
