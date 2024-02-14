import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma.orgs.repository'
import { GetOrganizationProfileService } from '../../org/service.get-profile'

export function makeGetOrganizationProfileService() {
    const organizationsRepository = new PrismaOrganizationsRepository()
    const getOrganizationProfileService = new GetOrganizationProfileService(
        organizationsRepository,
    )
    return getOrganizationProfileService
}
