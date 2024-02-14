import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUserService } from './service.register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory.users.repository'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exists.error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUserService

describe('Register User Service', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new RegisterUserService(usersRepository)
    })
    it('Should register an user', async () => {
        const { user } = await sut.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        })
        expect(user.id).toEqual(expect.any(String))
    })
    it('Should hash password upon registration', async () => {
        const { user } = await sut.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        })
        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash,
        )
        expect(isPasswordCorrectlyHashed).toBe(true)
    })
    it('Should NOT register same e-mail twice', async () => {
        const email = 'johndoe@example.com'
        await sut.execute({
            name: 'John Doe',
            email,
            password: '123456',
        })
        await expect(() =>
            sut.execute({
                name: 'John Doe',
                email,
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})
