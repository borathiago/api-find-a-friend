import { Organization, Prisma, Role } from '@prisma/client'
import { OrganizationsRepository } from '../orgs.repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrganizationsRepository
    implements OrganizationsRepository
{
    public items: Organization[] = []
    async create(data: Prisma.OrganizationUncheckedCreateInput) {
        const organization = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            whatsapp: data.whatsapp,
            address: data.address,
            cep: data.cep,
            created_at: new Date(),
            role: Role.ADMIN,
        }
        this.items.push(organization)
        return organization
    }

    async findByEmail(email: string) {
        const organization = this.items.find((item) => item.email === email)
        if (!organization) {
            return null
        }
        return organization
    }

    async findById(id: string) {
        const organization = this.items.find((item) => item.id === id)
        if (!organization) {
            return null
        }
        return organization
    }
}
