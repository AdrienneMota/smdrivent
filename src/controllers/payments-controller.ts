import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function processPayment(req: AuthenticatedRequest, res: Response) { 
  try {
    const payment = await paymentsService.processPayment({...req.body, userId: req.userId});
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if(error.name === 'badRequestError'){
      return res.status(httpStatus.BAD_REQUEST).send({});
      }

    if(error.name === 'UnauthorizedError'){
      return res.status(httpStatus.UNAUTHORIZED).send({});
    }
    
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function getPaymentByTicketId(req: AuthenticatedRequest, res: Response) { 
  try {
    const payment = await paymentsService.getPaymentByTicketId({ticketId: +req.query.ticketId, userId: req.userId});
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if(error.name === 'badRequestError'){
      return res.status(httpStatus.BAD_REQUEST).send({});
      }

    if(error.name === 'UnauthorizedError'){
      return res.status(httpStatus.UNAUTHORIZED).send({});
    }
    
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}