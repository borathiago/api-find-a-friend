import { PrismaUsersRepository } from '@/repositories/prisma/prisma.users.repository'
import { GetUserProfileService } from '@/services/user/service.get-profile'

export function makeGetUserProfileService() {
    const usersRepository = new PrismaUsersRepository()
    const getUsersProfileService = new GetUserProfileService(usersRepository)
    return getUsersProfileService
}
