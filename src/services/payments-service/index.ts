import { badRequestError, notFoundError, unauthorizedError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import userRepository from "@/repositories/user-repository";
import { TicketStatus } from "@prisma/client";
import ticketRepository from "@/repositories/ticket-repository";
import paymentRepository from "@/repositories/payment-repository";

type CardDataType = { issuer: string, number: number, 
    name: string,
    expirationDate: Date,
    cvv: number }  
type ProcessPaymentType = { ticketId: number, userId: number, cardData: CardDataType }

async function processPayment( { ticketId, userId, cardData } : ProcessPaymentType) {
    if(!ticketId || !cardData){
        throw badRequestError()
    }

    const ticket = await ticketRepository.findWithTicketTypeByTicketId(ticketId)

    if(!ticket){
        throw notFoundError()
        
    }

    const enrollment = await enrollmentRepository.findByUserId(userId)
    if(!enrollment){
        throw notFoundError()
        
    }
    
    if(ticket.enrollmentId !== enrollment.id){
        throw unauthorizedError()
    }
    
    await ticketRepository.updateStatusByTicketId(ticketId, TicketStatus.PAID)
    return await paymentRepository.create({
        ticketId, value : ticket.TicketType.price, cardIssuer: cardData.issuer, cardLastDigits: `${cardData.number}`.slice(-4)
    })
        
}

const paymentsService = {
    processPayment
};

export default paymentsService
