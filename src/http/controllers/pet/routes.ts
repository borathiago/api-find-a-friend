import { FastifyInstance } from 'fastify'
import { registerPet } from './controller.register'
import { getPetProfile } from './controller.get-profile'
import { searchPetsByStateAndCity } from './controller.search'
import { verifyJWT } from '@/http/middlewares/verify.jwt'
import { filterPets } from './controller.filter'
import { verifyRole } from '@/http/middlewares/verify.role'

export async function petRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)
    app.post('/pets', { onRequest: [verifyRole('ADMIN')] }, registerPet)
    app.get('/pets/:petId', getPetProfile)
    app.get('/pets/:state/:city', searchPetsByStateAndCity)
    app.get('/pets/:state/:city/filter', filterPets)
}
