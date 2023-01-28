import ticketTypeRepository from "@/repositories/ticket-type-repository";

async function getTicketsTypes() {
    return ticketTypeRepository.findMany()
}

const ticketsTypesService = {
    getTicketsTypes
}

export default ticketsTypesService