import { PrismaPetsRepository } from '@/repositories/prisma/prisma.pets.repository'
import { FilterPetService } from '@/services/pet/service.filter'

export function makeFilterPetService() {
    const petsRepository = new PrismaPetsRepository()
    const filterPetService = new FilterPetService(petsRepository)
    return filterPetService
}
