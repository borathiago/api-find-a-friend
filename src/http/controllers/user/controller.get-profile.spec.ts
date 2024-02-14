import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('User Profile Controller E2E', () => {
    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })
    it('Should get user profile', async () => {
        await request(app.server).post('/users').send({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        })
        const authenticationResponse = await request(app.server)
            .post('/users/sessions')
            .send({
                email: 'johndoe@example.com',
                password: '123456',
            })
        const { token } = authenticationResponse.body
        const response = await request(app.server)
            .get('/users/profile')
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.user).toEqual(
            expect.objectContaining({
                email: 'johndoe@example.com',
            }),
        )
    })
})
