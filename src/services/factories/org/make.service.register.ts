import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma.orgs.repository'
import { RegisterOrganizationService } from '../../org/service.register'

export function makeRegisterOrganizationService() {
    const organizationsRepository = new PrismaOrganizationsRepository()
    const registerOrganizationService = new RegisterOrganizationService(
        organizationsRepository,
    )
    return registerOrganizationService
}
