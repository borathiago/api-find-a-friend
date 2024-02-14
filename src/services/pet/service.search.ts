import { PetsRepository } from '@/repositories/pets.repository'
import { Pet } from '@prisma/client'

interface SearchPetServiceRequest {
    state: string
    city: string
}

interface SearchPetServiceResponse {
    pets: Pet[]
}

export class SearchPetService {
    constructor(private petsRepository: PetsRepository) {}

    async execute({
        state,
        city,
    }: SearchPetServiceRequest): Promise<SearchPetServiceResponse> {
        const pets = await this.petsRepository.searchManyByStateAndCity(
            state,
            city,
        )
        return {
            pets,
        }
    }
}
