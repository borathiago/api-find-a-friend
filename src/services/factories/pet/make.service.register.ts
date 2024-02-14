import { PrismaPetsRepository } from '@/repositories/prisma/prisma.pets.repository'
import { RegisterPetService } from '../../pet/service.register'
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma.orgs.repository'

export function makeRegisterPetService() {
    const petsRepository = new PrismaPetsRepository()
    const organizationsRepository = new PrismaOrganizationsRepository()
    const registerPetservice = new RegisterPetService(
        petsRepository,
        organizationsRepository,
    )
    return registerPetservice
}
