import { makeGetOrganizationProfileService } from '@/services/factories/org/make.service.get-profile'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getOrganizationProfile(
    request: FastifyRequest,
    response: FastifyReply,
) {
    const getOrganizationProfile = makeGetOrganizationProfileService()
    const { organization } = await getOrganizationProfile.execute({
        organizationId: request.user.sub,
    })
    return response.status(200).send({
        organization: {
            ...organization,
            password_hash: undefined,
            created_at: undefined,
            role: undefined,
        },
    })
}
