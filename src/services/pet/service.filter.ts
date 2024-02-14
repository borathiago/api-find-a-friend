import { PetsRepository } from '@/repositories/pets.repository'
import { Pet } from '@prisma/client'

interface FilterPetServiceRequest {
    state: string
    city: string
    energy?: string
    size?: string
    page: number
}

interface FilterPetServiceResponse {
    pets: Pet[]
}

export class FilterPetService {
    constructor(private petsRepository: PetsRepository) {}

    async execute({
        state,
        city,
        energy,
        size,
        page,
    }: FilterPetServiceRequest): Promise<FilterPetServiceResponse> {
        const pets = await this.petsRepository.filterMany(
            state,
            city,
            page,
            energy,
            size,
        )
        return {
            pets,
        }
    }
}
