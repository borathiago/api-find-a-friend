import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthenticateOrganizationService } from '@/services/factories/org/make.service.authenticate'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticateOrganization(
    request: FastifyRequest,
    response: FastifyReply,
) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })
    const { email, password } = authenticateBodySchema.parse(request.body)
    try {
        const authenticateOrganizationService =
            makeAuthenticateOrganizationService()
        const { organization } = await authenticateOrganizationService.execute({
            email,
            password,
        })
        const token = await response.jwtSign(
            {
                role: organization.role,
            },
            {
                sign: {
                    sub: organization.id,
                },
            },
        )
        const refreshToken = await response.jwtSign(
            {
                role: organization.role,
            },
            {
                sign: {
                    sub: organization.id,
                    expiresIn: '4d',
                },
            },
        )
        return response
            .status(200)
            .setCookie('refreshToken', refreshToken, {
                path: '/',
                secure: true,
                sameSite: true,
                httpOnly: true,
            })
            .send({
                token,
            })
    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return response.status(400).send({ message: err.message })
        }
        throw err
    }
}
