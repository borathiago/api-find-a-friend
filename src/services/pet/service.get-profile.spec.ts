import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory.pets.repository'
import { GetPetProfileService } from './service.get-profile'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory.orgs.repository'

let petsRepository: InMemoryPetsRepository
let organizationsRepository: InMemoryOrganizationsRepository
let sut: GetPetProfileService

describe('Get Organization Profile Service', () => {
    beforeEach(() => {
        petsRepository = new InMemoryPetsRepository()
        organizationsRepository = new InMemoryOrganizationsRepository()
        sut = new GetPetProfileService(petsRepository)
    })
    it('Should get pet profile', async () => {
        const organization = await organizationsRepository.create({
            name: 'JavaScript Organization',
            email: 'javascriptorg@example.com',
            password_hash: await hash('123456', 6),
            whatsapp: '41998902414',
            address: 'Deputado Nilson Ribas, 122',
            cep: '05740-510',
        })
        const createdPet = await petsRepository.create({
            name: 'JavaScriPet',
            description: 'Coder Dog',
            energy: 'REGULAR',
            size: 'TINY',
            state: 'PR',
            city: 'Curitiba',
            organization_id: organization.id,
        })
        const { pet } = await sut.execute({
            petId: createdPet.id,
        })
        expect(pet.id).toEqual(expect.any(String))
        expect(pet.name).toEqual('JavaScriPet')
    })
    it('Should NOT get pet profile with wrong id', async () => {
        await expect(() =>
            sut.execute({
                petId: 'non-existing-id',
            }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})
