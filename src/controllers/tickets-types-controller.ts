import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import ticketsTypesService from "@/services/tickets-types-service";
import { Response } from "express";
import httpStatus from "http-status";


export async function getTicketsTypes(_req: AuthenticatedRequest, res: Response) {
    try {
      const ticketsTypes = await ticketsTypesService.getTicketsTypes();
      return res.status(httpStatus.OK).send(ticketsTypes);
    } catch (error) {
      return res.status(httpStatus.NOT_FOUND).send({});
    }
}