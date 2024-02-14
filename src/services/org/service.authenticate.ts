import { OrganizationsRepository } from '@/repositories/orgs.repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { Organization } from '@prisma/client'

interface AuthenticateOrganizationServiceRequest {
    email: string
    password: string
}

interface AuthenticateOrganizationServiceResponse {
    organization: Organization
}

export class AuthenticateOrganizationService {
    constructor(private organizationsRepository: OrganizationsRepository) {}

    async execute({
        email,
        password,
    }: AuthenticateOrganizationServiceRequest): Promise<AuthenticateOrganizationServiceResponse> {
        const organization =
            await this.organizationsRepository.findByEmail(email)
        if (!organization) {
            throw new InvalidCredentialsError()
        }
        const doesPasswordMatches = await compare(
            password,
            organization.password_hash,
        )
        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError()
        }
        return {
            organization,
        }
    }
}
