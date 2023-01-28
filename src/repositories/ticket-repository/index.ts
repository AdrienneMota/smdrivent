import { prisma } from "@/config";
import { Ticket } from "@prisma/client";


async function findFirst() {
  return prisma.ticket.findFirst();
}

async function findWithTicketTypeByTicketId(id:number) {
  return prisma.ticket.findFirst({
    where: {id},
    include: {TicketType: true}
  })
}

async function create( params :CreateTicketParams) {
  const ticket = await prisma.ticket.create({
    data: {...params }
  })

  return findWithTicketTypeByTicketId(ticket.id)
}

export type CreateTicketParams = Omit<Ticket, "id" | "createdAt" | "updatedAt">;
export type UpdateTicketParams = Omit<CreateTicketParams, "userId">;

const ticketRepository = {
  findFirst,
  create,
  findWithTicketTypeByTicketId
};


export default ticketRepository;
