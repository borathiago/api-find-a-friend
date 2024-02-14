import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory.orgs.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateOrganizationService } from './service.authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: AuthenticateOrganizationService

describe('Authenticate Organization Service', () => {
    beforeEach(() => {
        organizationsRepository = new InMemoryOrganizationsRepository()
        sut = new AuthenticateOrganizationService(organizationsRepository)
    })
    it('Should authenticate an organization', async () => {
        await organizationsRepository.create({
            name: 'JavaScript Organization',
            email: 'javascriptorg@example.com',
            password_hash: await hash('123456', 6),
            whatsapp: '41998902414',
            address: 'Deputado Nilson Ribas, 122',
            cep: '05740-510',
        })
        const { organization } = await sut.execute({
            email: 'javascriptorg@example.com',
            password: '123456',
        })
        expect(organization.id).toEqual(expect.any(String))
    })
    it('Should NOT authenticate an organization with wrong e-mail', async () => {
        await expect(() =>
            sut.execute({
                email: 'javascriptorg@example.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
    it('Should NOT authenticate an organization with wrong password', async () => {
        await organizationsRepository.create({
            name: 'JavaScript Organization',
            email: 'javascriptorg@example.com',
            password_hash: await hash('123456', 6),
            whatsapp: '41998902414',
            address: 'Deputado Nilson Ribas, 122',
            cep: '05740-510',
        })
        await expect(() =>
            sut.execute({
                email: 'javascriptorg@example.com',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})
