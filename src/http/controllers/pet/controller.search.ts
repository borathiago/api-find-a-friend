import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { makeSearchPetService } from '@/services/factories/pet/make.service.search'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchPetsByStateAndCity(
    request: FastifyRequest,
    response: FastifyReply,
) {
    const searchPetsBodySchema = z.object({
        state: z.string(),
        city: z.string(),
    })
    const { state, city } = searchPetsBodySchema.parse(request.params)
    const searchPetService = makeSearchPetService()
    const { pets } = await searchPetService.execute({
        state,
        city,
    })
    if (!pets) {
        throw new ResourceNotFoundError()
    }
    return response.status(200).send({ pets })
}
