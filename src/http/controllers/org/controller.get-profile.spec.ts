import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Organization Profile Controller E2E', () => {
    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })
    it('Should get organization profile', async () => {
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
        const response = await request(app.server)
            .get('/organizations/profile')
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.organization).toEqual(
            expect.objectContaining({
                email: 'javascriptorg@example.com',
            }),
        )
    })
})
