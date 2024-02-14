import { UserAlreadyExistsError } from '@/services/errors/user-already-exists.error'
import { makeRegisterOrganizationService } from '@/services/factories/org/make.service.register'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerOrganization(
    request: FastifyRequest,
    response: FastifyReply,
) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        whatsapp: z.string(),
        address: z.string(),
        cep: z.string(),
    })
    const { name, email, password, whatsapp, address, cep } =
        registerBodySchema.parse(request.body)
    try {
        const registerOrganizationService = makeRegisterOrganizationService()
        await registerOrganizationService.execute({
            name,
            email,
            password,
            whatsapp,
            address,
            cep,
        })
    } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
            return response.status(409).send({ message: err.message })
        }
        throw err
    }
    return response.status(201).send()
}
