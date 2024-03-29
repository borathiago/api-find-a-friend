import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { OrganizationsRepository } from '../orgs.repository'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
    async create(data: Prisma.OrganizationCreateInput) {
        const organization = await prisma.organization.create({
            data,
        })
        return organization
    }

    async findById(id: string) {
        const organization = await prisma.organization.findFirstOrThrow({
            where: {
                id,
            },
        })
        return organization
    }

    async findByEmail(email: string) {
        const organization = await prisma.organization.findUnique({
            where: {
                email,
            },
        })
        return organization
    }
}
