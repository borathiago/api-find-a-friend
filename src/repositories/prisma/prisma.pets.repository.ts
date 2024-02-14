import { PetEnergy, PetSize, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets.repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = prisma.pet.create({
            data,
        })
        return pet
    }

    async findById(id: string) {
        const pet = await prisma.pet.findFirstOrThrow({
            where: {
                id,
            },
        })
        return pet
    }

    async searchManyByStateAndCity(state: string, city: string) {
        const pets = await prisma.pet.findMany({
            where: {
                state,
                city,
            },
        })
        return pets
    }

    async filterMany(
        state: string,
        city: string,
        page: number,
        energy?: PetEnergy,
        size?: PetSize,
    ) {
        const pets = await prisma.pet.findMany({
            where: {
                state,
                city,
                energy,
                size,
            },
            take: 20,
            skip: (page - 1) * 20,
        })
        return pets
    }
}
