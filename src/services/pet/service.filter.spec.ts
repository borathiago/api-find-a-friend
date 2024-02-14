import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory.pets.repository'
import { hash } from 'bcryptjs'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory.orgs.repository'
import { FilterPetService } from './service.filter'

let petsRepository: InMemoryPetsRepository
let organizationsRepository: InMemoryOrganizationsRepository
let sut: FilterPetService

describe('Filter Pet Service', () => {
    beforeEach(() => {
        petsRepository = new InMemoryPetsRepository()
        organizationsRepository = new InMemoryOrganizationsRepository()
        sut = new FilterPetService(petsRepository)
    })
    it('Should filter pets', async () => {
        const organization = await organizationsRepository.create({
            name: 'JavaScript Organization',
            email: 'javascriptorg@example.com',
            password_hash: await hash('123456', 6),
            whatsapp: '41998902414',
            address: 'Deputado Nilson Ribas, 122',
            cep: '05740-510',
        })
        await petsRepository.create({
            name: 'JavaScriPet',
            description: 'Coder Dog',
            energy: 'REGULAR',
            size: 'TINY',
            state: 'PR',
            city: 'Curitiba',
            organization_id: organization.id,
        })
        await petsRepository.create({
            name: 'PetScript',
            description: '<Dog/>',
            energy: 'REGULAR',
            size: 'TINY',
            state: 'PR',
            city: 'Curitiba',
            organization_id: organization.id,
        })
        await petsRepository.create({
            name: 'TypeScriPet',
            description: 'Another Coder Dog',
            energy: 'REGULAR',
            size: 'TINY',
            state: 'SP',
            city: 'São Paulo',
            organization_id: organization.id,
        })
        const { pets } = await sut.execute({
            state: 'PR',
            city: 'Curitiba',
            energy: 'REGULAR',
            size: 'TINY',
            page: 1,
        })
        expect(pets).toHaveLength(2)
        expect(pets).toEqual([
            expect.objectContaining({ name: 'JavaScriPet' }),
            expect.objectContaining({ name: 'PetScript' }),
        ])
    })
    it('Should filter paginated pets', async () => {
        const organization = await organizationsRepository.create({
            name: 'JavaScript Organization',
            email: 'javascriptorg@example.com',
            password_hash: await hash('123456', 6),
            whatsapp: '41998902414',
            address: 'Deputado Nilson Ribas, 122',
            cep: '05740-510',
        })
        for (let i = 1; i <= 22; i++) {
            await petsRepository.create({
                id: `pet-${i}`,
                name: `JavaScriPet ${i}`,
                description: 'Coder Dog',
                energy: 'REGULAR',
                size: 'TINY',
                state: 'PR',
                city: 'Curitiba',
                organization_id: organization.id,
            })
        }
        const { pets } = await sut.execute({
            state: 'PR',
            city: 'Curitiba',
            energy: 'REGULAR',
            size: 'TINY',
            page: 2,
        })
        expect(pets).toHaveLength(2)
        expect(pets).toEqual([
            expect.objectContaining({ name: 'JavaScriPet 21' }),
            expect.objectContaining({ name: 'JavaScriPet 22' }),
        ])
    })
})
