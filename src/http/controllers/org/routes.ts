import { FastifyInstance } from 'fastify'
import { registerOrganization } from './controller.register'
import { authenticateOrganization } from './controller.authenticate'
import { getOrganizationProfile } from './controller.get-profile'
import { verifyJWT } from '@/http/middlewares/verify.jwt'
import { refreshOrganization } from './controller.refresh'

export async function organizationRoutes(app: FastifyInstance) {
    app.post('/organizations', registerOrganization)
    app.post('/organizations/sessions', authenticateOrganization)
    app.patch('/organizations/token/refresh', refreshOrganization)
    app.get(
        '/organizations/profile',
        { onRequest: [verifyJWT] },
        getOrganizationProfile,
    )
}
