import { Router } from "express";
import { createTicket, getTickets } from "@/controllers";
import { authenticateToken } from "@/middlewares";


const ticketsRouter = Router();

ticketsRouter.post("/", authenticateToken, createTicket);
ticketsRouter.get("/", authenticateToken, getTickets);

export { ticketsRouter };
