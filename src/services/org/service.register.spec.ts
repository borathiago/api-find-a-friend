import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory.orgs.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterOrganizationService } from './service.register'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exists.error'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: RegisterOrganizationService

describe('Register Organization Service', () => {
    beforeEach(() => {
        organizationsRepository = new InMemoryOrganizationsRepository()
        sut = new RegisterOrganizationService(organizationsRepository)
    })
    it('Should register an organization', async () => {
        const { organization } = await sut.execute({
            name: 'JavaScript Organization',
            email: 'javascriptorg@example.com',
            password: '123456',
            whatsapp: '41998902414',
            address: 'Deputado Nilson Ribas, 122',
            cep: '05740-510',
        })
        expect(organization.id).toEqual(expect.any(String))
    })
    it('Should hash password upon registration', async () => {
        const { organization } = await sut.execute({
            name: 'JavaScript Organization',
            email: 'javascriptorg@example.com',
            password: '123456',
            whatsapp: '41998902414',
            address: 'Deputado Nilson Ribas, 122',
            cep: '05740-510',
        })
        const isPasswordCorrectlyHashed = await compare(
            '123456',
            organization.password_hash,
        )
        expect(isPasswordCorrectlyHashed).toBe(true)
    })
    it('Should NOT register same e-mail twice', async () => {
        const email = 'javascriptorg@example.com'
        await sut.execute({
            name: 'JavaScript Organization',
            email,
            password: '123456',
            whatsapp: '41998902414',
            address: 'Deputado Nilson Ribas, 122',
            cep: '05740-510',
        })
        await expect(() =>
            sut.execute({
                name: 'TypeScript Organization',
                email,
                password: '123456',
                whatsapp: '41998902414',
                address: 'Deputado Nilson Ribas, 122',
                cep: '05740-510',
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})
