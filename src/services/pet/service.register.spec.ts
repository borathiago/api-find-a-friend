import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory.pets.repository'
import { RegisterPetService } from './service.register'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory.orgs.repository'
import { hash } from 'bcryptjs'

let petsRepository: InMemoryPetsRepository
let organizationsRepository: InMemoryOrganizationsRepository
let sut: RegisterPetService

describe('Register Pet Service', () => {
    beforeEach(() => {
        petsRepository = new InMemoryPetsRepository()
        organizationsRepository = new InMemoryOrganizationsRepository()
        sut = new RegisterPetService(petsRepository, organizationsRepository)
    })
    it('Should register a pet', async () => {
        const organization = await organizationsRepository.create({
            name: 'JavaScript Organization',
            email: 'javascriptorg@example.com',
            password_hash: await hash('123456', 6),
            whatsapp: '41998902414',
            address: 'Deputado Nilson Ribas, 122',
            cep: '05740-510',
        })
        const { pet } = await sut.execute({
            name: 'JavaScriPet',
            description: 'Coder Dog',
            energy: 'REGULAR',
            size: 'TINY',
            state: 'PR',
            city: 'Curitiba',
            organization_id: organization.id,
        })
        expect(pet.id).toEqual(expect.any(String))
    })
})
