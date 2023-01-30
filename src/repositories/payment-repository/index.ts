import { prisma } from "@/config"

type CreatePaymentType = { ticketId: number, value: number, cardIssuer: string, cardLastDigits: string  }

async function create(params:CreatePaymentType) {
    return await prisma.payment.create({
        data: {
            ...params
        }
    })
}

async function findPaymentByTicketId(ticketId: number) {
    return prisma.payment.findFirst({
        where: {
            ticketId
        }
    })
}

const paymentRepository = {
    create,
    findPaymentByTicketId
}

export default paymentRepository