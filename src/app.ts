import fastify from 'fastify'
import { userRoutes } from './http/controllers/user/routes'
import { organizationRoutes } from './http/controllers/org/routes'
import { petRoutes } from './http/controllers/pet/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false,
    },
    sign: {
        expiresIn: '1d',
    },
})

app.register(fastifyCookie)

app.register(userRoutes)
app.register(organizationRoutes)
app.register(petRoutes)

app.setErrorHandler((err, _request, response) => {
    if (err instanceof ZodError) {
        return response
            .status(400)
            .send({ message: 'Validation error', issues: err.format() })
    }
    if (env.NODE_ENV !== 'production') {
        console.error(err)
    } else {
        /* err */
    }
    return response.status(500).send({ message: 'Internal server error' })
})
