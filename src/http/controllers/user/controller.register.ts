import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists.error'
import { makeRegisterUserService } from '@/services/factories/user/make.service.register'

export async function registerUser(
    request: FastifyRequest,
    response: FastifyReply,
) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    })
    const { name, email, password } = registerBodySchema.parse(request.body)
    try {
        const registerUserService = makeRegisterUserService()
        await registerUserService.execute({
            name,
            email,
            password,
        })
    } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
            return response.status(409).send({ message: err.message })
        }
        throw err
    }
    return response.status(201).send()
}
