import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUserService } from './service.authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory.users.repository'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUserService

describe('Authenticate Organization Service', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new AuthenticateUserService(usersRepository)
    })
    it('Should authenticate an organization', async () => {
        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6),
        })
        const { user } = await sut.execute({
            email: 'johndoe@example.com',
            password: '123456',
        })
        expect(user.id).toEqual(expect.any(String))
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
        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6),
        })
        await expect(() =>
            sut.execute({
                email: 'johndoe@example.com',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})
