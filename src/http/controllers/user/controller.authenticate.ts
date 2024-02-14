import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthenticateUserService } from '@/services/factories/user/make.authenticate.service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticateUser(
    request: FastifyRequest,
    response: FastifyReply,
) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })
    const { email, password } = authenticateBodySchema.parse(request.body)
    try {
        const authenticateUserService = makeAuthenticateUserService()
        const { user } = await authenticateUserService.execute({
            email,
            password,
        })
        const token = await response.jwtSign(
            {},
            {
                sign: {
                    sub: user.id,
                },
            },
        )
        return response.status(200).send({
            token,
        })
    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return response.status(400).send({ message: err.message })
        }
        throw err
    }
}
