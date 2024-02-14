import { makeRegisterPetService } from '@/services/factories/pet/make.service.register'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerPet(
    request: FastifyRequest,
    response: FastifyReply,
) {
    const registerBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        energy: z.enum(['TINY', 'SMALL', 'REGULAR', 'BIG', 'ENORMOUS']),
        size: z.enum(['TINY', 'REGULAR', 'BIG']),
        state: z.string(),
        city: z.string(),
        organization_id: z.string(),
    })
    const { name, description, energy, size, state, city, organization_id } =
        registerBodySchema.parse(request.body)
    const registerPetService = makeRegisterPetService()
    await registerPetService.execute({
        name,
        description,
        energy,
        size,
        state,
        city,
        organization_id,
    })
    return response.status(201).send()
}
