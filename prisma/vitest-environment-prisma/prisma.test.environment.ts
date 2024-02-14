import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import { Environment } from 'vitest'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateDatabaseURL(schema: string) {
    const databaseURL = process.env.DATABASE_URL
    if (!databaseURL) {
        throw new Error('Please provide a DATABASE_URL environment variable')
    }
    const url = new URL(databaseURL)
    url.searchParams.set('schema', schema)
    return url.toString()
}

export default <Environment>{
    name: 'prisma',
    transformMode: 'ssr',
    async setup() {
        const schema = randomUUID()
        const databaseURL = generateDatabaseURL(schema)
        process.env.DATABASE_URL = databaseURL
        execSync('npx prisma migrate deploy')
        return {
            async teardown() {
                await prisma.$executeRawUnsafe(
                    `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
                )
                await prisma.$disconnect()
            },
        }
    },
}
