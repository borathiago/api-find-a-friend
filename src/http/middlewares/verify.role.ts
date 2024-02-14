import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyRole(verify: 'ADMIN' | 'MEMBER') {
    return async (request: FastifyRequest, response: FastifyReply) => {
        const { role } = request.user
        if (role !== verify) {
            return response.status(401).send({ message: 'Unauthorized' })
        }
    }
}
