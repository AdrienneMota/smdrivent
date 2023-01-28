import { Router } from "express";
import { createTicket, getTickets } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { getTicketsTypes } from "@/controllers/tickets-types-controller";


const ticketsTypesRouter = Router();

ticketsTypesRouter.get("/", authenticateToken, getTicketsTypes);

export { ticketsTypesRouter };
