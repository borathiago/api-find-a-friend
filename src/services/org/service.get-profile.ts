import { OrganizationsRepository } from '@/repositories/orgs.repository'
import { Organization } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetOrganizationProfileServiceRequest {
    organizationId: string
}

interface GetOrganizationProfileServiceResponse {
    organization: Organization
}

export class GetOrganizationProfileService {
    constructor(private organizationsRepository: OrganizationsRepository) {}
    async execute({
        organizationId,
    }: GetOrganizationProfileServiceRequest): Promise<GetOrganizationProfileServiceResponse> {
        const organization =
            await this.organizationsRepository.findById(organizationId)
        if (!organization) {
            throw new ResourceNotFoundError()
        }
        return {
            organization,
        }
    }
}
