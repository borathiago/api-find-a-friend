import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { makeFilterPetService } from '@/services/factories/pet/make.service.filter'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function filterPets(
    request: FastifyRequest,
    response: FastifyReply,
) {
    const filterPetsBodySchema = z.object({
        state: z.string(),
        city: z.string(),
    })
    const filterPetsQuerySchema = z.object({
        energy: z.string().optional(),
        size: z.string().optional(),
        page: z.coerce.number().min(1).default(1),
    })
    const { state, city } = filterPetsBodySchema.parse(request.params)
    const { energy, size, page } = filterPetsQuerySchema.parse(request.query)
    const filterPetService = makeFilterPetService()
    const { pets } = await filterPetService.execute({
        state,
        city,
        energy,
        size,
        page,
    })
    if (!pets) {
        throw new ResourceNotFoundError()
    }
    return response.status(200).send({ pets })
}
