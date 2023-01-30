import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTicketsTypes } from "@/controllers/tickets-types-controller";


const ticketsTypesRouter = Router();

ticketsTypesRouter.get("/", authenticateToken, getTicketsTypes);

export { ticketsTypesRouter };
