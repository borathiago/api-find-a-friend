import { PetsRepository } from '@/repositories/pets.repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetPetProfileServiceRequest {
    petId: string
}

interface GetPetProfileServiceResponse {
    pet: Pet
}

export class GetPetProfileService {
    constructor(private petsRepository: PetsRepository) {}
    async execute({
        petId,
    }: GetPetProfileServiceRequest): Promise<GetPetProfileServiceResponse> {
        const pet = await this.petsRepository.findById(petId)
        if (!pet) {
            throw new ResourceNotFoundError()
        }
        return {
            pet,
        }
    }
}
