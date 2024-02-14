import { Prisma, Pet, PetEnergy, PetSize } from '@prisma/client'
import { PetsRepository } from '../pets.repository'

export class InMemoryPetsRepository implements PetsRepository {
    public items: Pet[] = []
    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = {
            id: 'pet-1',
            name: data.name,
            description: data.description,
            energy: PetEnergy.REGULAR,
            size: PetSize.REGULAR,
            state: data.state,
            city: data.city,
            organization_id: data.organization_id,
        }
        this.items.push(pet)
        return pet
    }

    async findById(id: string) {
        const pet = this.items.find((item) => item.id === id)
        if (!pet) {
            return null
        }
        return pet
    }

    async searchManyByStateAndCity(state: string, city: string) {
        return this.items.filter(
            (item) => item.state.includes(state) && item.city.includes(city),
        )
    }

    async filterMany(
        state: string,
        city: string,
        page: number,
        energy: string,
        size: string,
    ) {
        return this.items
            .filter(
                (item) =>
                    item.state.includes(state) &&
                    item.city.includes(city) &&
                    (item.energy.includes(energy) || item.size.includes(size)),
            )
            .slice((page - 1) * 20, page * 20)
    }
}
