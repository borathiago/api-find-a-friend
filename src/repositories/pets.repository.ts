import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
    searchManyByStateAndCity(state: string, city: string): Promise<Pet[]>
    filterMany(
        state: string,
        city: string,
        page: number,
        energy?: string,
        size?: string,
    ): Promise<Pet[]>
    findById(id: string): Promise<Pet | null>
}
