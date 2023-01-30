import { prisma } from "@/config"

type CreatePaymentType = { ticketId: number, value: number, cardIssuer: string, cardLastDigits: string  }

async function create(params:CreatePaymentType) {
    return await prisma.payment.create({
        data: {
            ...params
        }
    })
}

const paymentRepository = {
    create
}

export default paymentRepository