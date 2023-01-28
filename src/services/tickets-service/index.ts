import { badRequestError, notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import userRepository from "@/repositories/user-repository";
import { TicketStatus } from "@prisma/client";
import ticketRepository from "@/repositories/ticket-repository";

type CreateTicketType = { ticketTypeId: number, userId: number }  

async function createTicket( { ticketTypeId, userId } : CreateTicketType) {
    if(!ticketTypeId){
        throw badRequestError()
    }

    const user = await userRepository.findByUserId(userId)
    if(!user){
        throw notFoundError()
    }

    const enrollment = await enrollmentRepository.findByUserId(userId)
    if(!enrollment){
        throw notFoundError()
    }
    const ticket = { 
        ticketTypeId,
        enrollmentId: enrollment.id,
        status: TicketStatus.RESERVED
     }
    return await ticketRepository.create(ticket)
}

  

const ticketsService = {
    createTicket
};

export default ticketsService
