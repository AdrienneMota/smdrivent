import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function createTicket(_req: AuthenticatedRequest, res: Response) {
  try {
    const ticket = await ticketsService.createTicket({..._req.body, userId: _req.userId});
    return res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    if(error.name === 'badRequestError'){
      return res.status(httpStatus.BAD_REQUEST).send({});
      }
    
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}
