import { makeGetUserProfileService } from '@/services/factories/user/make.service.get-profile'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getUserProfile(
    request: FastifyRequest,
    response: FastifyReply,
) {
    const getUserProfile = makeGetUserProfileService()
    const { user } = await getUserProfile.execute({
        userId: request.user.sub,
    })
    return response.status(200).send({
        user: {
            ...user,
            password_hash: undefined,
            created_at: undefined,
            role: undefined,
        },
    })
}
