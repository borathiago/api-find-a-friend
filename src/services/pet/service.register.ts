import { OrganizationsRepository } from '@/repositories/orgs.repository'
import { PetsRepository } from '@/repositories/pets.repository'
import { Pet, PetEnergy, PetSize } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface RegisterPetServiceRequest {
    name: string
    description: string
    energy: PetEnergy
    size: PetSize
    state: string
    city: string
    organization_id: string
}

interface RegisterPetServiceResponse {
    pet: Pet
}

export class RegisterPetService {
    constructor(
        private petsRepository: PetsRepository,
        private organizationsRepository: OrganizationsRepository,
    ) {}

    async execute({
        name,
        description,
        energy,
        size,
        state,
        city,
        organization_id,
    }: RegisterPetServiceRequest): Promise<RegisterPetServiceResponse> {
        const organization =
            await this.organizationsRepository.findById(organization_id)
        if (!organization) {
            throw new ResourceNotFoundError()
        }
        const pet = await this.petsRepository.create({
            name,
            description,
            energy,
            size,
            state,
            city,
            organization_id,
        })
        return {
            pet,
        }
    }
}
