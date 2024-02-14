import { PrismaPetsRepository } from '@/repositories/prisma/prisma.pets.repository'
import { GetPetProfileService } from '../../pet/service.get-profile'

export function makeGetPetProfileService() {
    const petsRepository = new PrismaPetsRepository()
    const getPetProfileService = new GetPetProfileService(petsRepository)
    return getPetProfileService
}
