import { prisma } from "@/config";
import { Ticket, TicketStatus } from "@prisma/client";


async function findFirst() {
  return prisma.ticket.findFirst();
}

async function findWithTicketTypeByTicketId(id:number) {
  return prisma.ticket.findFirst({
    where: {id},
    include: {TicketType: true}
  })
}

async function findFirstWithTicketTypeByEnrollmentId(enrollmentId : number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
    include: {TicketType: true}
  })
}

async function create( params :CreateTicketParams) {
  const ticket = await prisma.ticket.create({
    data: {...params }
  })

  return findWithTicketTypeByTicketId(ticket.id)
}

async function updateStatusByTicketId(ticketId: number, status: TicketStatus) {
  return await prisma.ticket.update({
    where: {
      id: ticketId
    },
    data: {
      status
    }

  })
}

export type CreateTicketParams = Omit<Ticket, "id" | "createdAt" | "updatedAt">;
export type UpdateTicketParams = Omit<CreateTicketParams, "userId">;

const ticketRepository = {
  findFirst,
  create,
  findWithTicketTypeByTicketId,
  findFirstWithTicketTypeByEnrollmentId,
  updateStatusByTicketId
};


export default ticketRepository;
