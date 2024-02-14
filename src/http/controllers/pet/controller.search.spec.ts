import request from 'supertest'
import { app } from '@/app'
import { jwtDecode } from 'jwt-decode'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Pet Search Controller E2E', () => {
    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })
    it('Should search a pet from given City and State', async () => {
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
        await request(app.server)
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
        await request(app.server)
            .post('/pets')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'PetScript',
                description: 'Another Coder Dog',
                energy: 'REGULAR',
                size: 'TINY',
                state: 'PR',
                city: 'Curitiba',
                organization_id: organization.sub,
            })
        const response = await request(app.server)
            .get('/pets/PR/Curitiba')
            .set('Authorization', `Bearer ${token}`)
            .send()
        expect(response.statusCode).toEqual(200)
        expect(response.body.pets).toHaveLength(2)
        expect(response.body.pets).toEqual([
            expect.objectContaining({
                name: 'JavaScriPet',
            }),
            expect.objectContaining({
                name: 'PetScript',
            }),
        ])
    })
})
