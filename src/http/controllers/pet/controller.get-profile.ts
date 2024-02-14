import { makeGetPetProfileService } from '@/services/factories/pet/make.service.get-profile'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPetProfile(
    request: FastifyRequest,
    response: FastifyReply,
) {
    const getProfileBodySchema = z.object({
        petId: z.string(),
    })
    const { petId } = getProfileBodySchema.parse(request.params)
    const getPetProfile = makeGetPetProfileService()
    await getPetProfile.execute({
        petId,
    })
    return response.status(200).send()
}
