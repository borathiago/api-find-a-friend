import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory.orgs.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { GetOrganizationProfileService } from './service.get-profile'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: GetOrganizationProfileService

describe('Get Organization Profile Service', () => {
    beforeEach(() => {
        organizationsRepository = new InMemoryOrganizationsRepository()
        sut = new GetOrganizationProfileService(organizationsRepository)
    })
    it('Should get organizations profile', async () => {
        const createdOrganization = await organizationsRepository.create({
            name: 'JavaScript Organization',
            email: 'javascriptorg@example.com',
            password_hash: await hash('123456', 6),
            whatsapp: '41998902414',
            address: 'Deputado Nilson Ribas, 122',
            cep: '05740-510',
        })
        const { organization } = await sut.execute({
            organizationId: createdOrganization.id,
        })
        expect(organization.id).toEqual(expect.any(String))
        expect(organization.name).toEqual('JavaScript Organization')
    })
    it('Should NOT get an organizations profile with wrong id', async () => {
        await expect(() =>
            sut.execute({
                organizationId: 'non-existing-id',
            }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})
