import request from 'supertest'
import { app } from '@/app'
import { jwtDecode } from 'jwt-decode'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Pet Register Controller E2E', () => {
    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })
    it('Should register a pet', async () => {
        await request(app.server).post('/organizations').send({
            name: 'JavaScript Organization',
            email: 'javascriptorg@example.com',
            password: '123456',
            whatsapp: '41998902414',
            address: 'Deputado Nilson Ribas, 122',
            cep: '05740-510',
        })
        const authenticationResponse = await request(app.server)
            .post('/organizations/sessions')
            .send({
                email: 'javascriptorg@example.com',
                password: '123456',
            })
        const { token } = authenticationResponse.body
        const organization = jwtDecode(token)
        const response = await request(app.server)
            .post('/pets')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'JavaScriPet',
                description: 'Coder Dog',
                energy: 'REGULAR',
                size: 'TINY',
                state: 'PR',
                city: 'Curitiba',
                organization_id: organization.sub,
            })
        expect(response.statusCode).toEqual(201)
    })
})
