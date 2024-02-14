import { PrismaPetsRepository } from '@/repositories/prisma/prisma.pets.repository'
import { SearchPetService } from '../../pet/service.search'

export function makeSearchPetService() {
    const petsRepository = new PrismaPetsRepository()
    const searchPetService = new SearchPetService(petsRepository)
    return searchPetService
}
