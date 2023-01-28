import { Router } from "express";
import { createTicket, getTickets } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { ticketsTypesRouter } from "./tickets-types-router";


const ticketsRouter = Router();

ticketsRouter.post("/", authenticateToken, createTicket);
ticketsRouter.get("/", authenticateToken, getTickets);
ticketsRouter.use('/types', ticketsTypesRouter)

export { ticketsRouter };
