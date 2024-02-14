import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma.orgs.repository'
import { AuthenticateOrganizationService } from '../../org/service.authenticate'

export function makeAuthenticateOrganizationService() {
    const organizationsRepository = new PrismaOrganizationsRepository()
    const authenticateOrganizationService = new AuthenticateOrganizationService(
        organizationsRepository,
    )
    return authenticateOrganizationService
}
