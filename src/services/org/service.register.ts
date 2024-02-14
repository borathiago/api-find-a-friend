import { OrganizationsRepository } from '@/repositories/orgs.repository'
import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exists.error'

interface RegisterOrganizationServiceRequest {
    name: string
    email: string
    password: string
    whatsapp: string
    address: string
    cep: string
}

interface RegisterOrganizationServiceResponse {
    organization: Organization
}

export class RegisterOrganizationService {
    constructor(private organizationsRepository: OrganizationsRepository) {}
    async execute({
        name,
        email,
        password,
        whatsapp,
        address,
        cep,
    }: RegisterOrganizationServiceRequest): Promise<RegisterOrganizationServiceResponse> {
        const password_hash = await hash(password, 6)
        const organizationWithSameEmail =
            await this.organizationsRepository.findByEmail(email)
        if (organizationWithSameEmail) {
            throw new UserAlreadyExistsError()
        }
        const organization = await this.organizationsRepository.create({
            name,
            email,
            password_hash,
            whatsapp,
            address,
            cep,
        })
        return {
            organization,
        }
    }
}
