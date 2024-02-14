import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Organization Register Controller E2E', () => {
    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })
    it('Should register an organization', async () => {
        const response = await request(app.server).post('/organizations').send({
            name: 'JavaScript Organization',
            email: 'javascriptorg@example.com',
            password: '123456',
            whatsapp: '41998902414',
            address: 'Deputado Nilson Ribas, 122',
            cep: '05740-510',
        })
        expect(response.statusCode).toEqual(201)
    })
})
