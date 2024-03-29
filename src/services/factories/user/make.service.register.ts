import { PrismaUsersRepository } from '@/repositories/prisma/prisma.users.repository'
import { RegisterUserService } from '../../user/service.register'

export function makeRegisterUserService() {
    const usersRepository = new PrismaUsersRepository()
    const registerUserService = new RegisterUserService(usersRepository)
    return registerUserService
}
