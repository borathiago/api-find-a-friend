import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { GetUserProfileService } from './service.get-profile'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory.users.repository'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileService

describe('Get Organization Profile Service', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserProfileService(usersRepository)
    })
    it('Should get organizations profile', async () => {
        const createdUser = await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6),
        })
        const { user } = await sut.execute({
            userId: createdUser.id,
        })
        expect(user.id).toEqual(expect.any(String))
        expect(user.name).toEqual('John Doe')
    })
    it('Should NOT get an organizations profile with wrong id', async () => {
        await expect(() =>
            sut.execute({
                userId: 'non-existing-id',
            }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})
