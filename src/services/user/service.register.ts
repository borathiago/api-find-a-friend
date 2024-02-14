import { UsersRepository } from '@/repositories/users.repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exists.error'
import { User } from '@prisma/client'

interface RegisterUserServiceRequest {
    name: string
    email: string
    password: string
}

interface RegisterUserServiceResponse {
    user: User
}

/* Classes de método único, com um construtor que recebe as dependências como parâmetro */
export class RegisterUserService {
    constructor(private usersRepository: UsersRepository) {}
    async execute({
        name,
        email,
        password,
    }: RegisterUserServiceRequest): Promise<RegisterUserServiceResponse> {
        const password_hash = await hash(password, 6)
        const userWithSameEmail = await this.usersRepository.findByEmail(email)
        if (userWithSameEmail) {
            throw new UserAlreadyExistsError()
        }
        const user = await this.usersRepository.create({
            name,
            email,
            password_hash,
        })
        return {
            user,
        }
    }
}
