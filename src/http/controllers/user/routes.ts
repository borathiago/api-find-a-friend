import { FastifyInstance } from 'fastify'
import { registerUser } from './controller.register'
import { authenticateUser } from './controller.authenticate'
import { getUserProfile } from './controller.get-profile'
import { verifyJWT } from '@/http/middlewares/verify.jwt'

export async function userRoutes(app: FastifyInstance) {
    app.post('/users', registerUser)
    app.post('/users/sessions', authenticateUser)
    app.get('/users/profile', { onRequest: [verifyJWT] }, getUserProfile)
}
