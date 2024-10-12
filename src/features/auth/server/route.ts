import { ID } from 'node-appwrite'
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { deleteCookie, setCookie } from 'hono/cookie'

import { createAdminClient } from '@/lib/appwrite'

import { loginSchema, signUpSchema } from '../schemas'
import { AUTH_COOKIE } from '../constants'

const app = new Hono()
    .post('/login', zValidator('json', loginSchema), async (c) => {
        const { email, password } = c.req.valid('json')

        const { account } = await createAdminClient()
        const session = await account.createEmailPasswordSession(
            email,
            password,
        )

        if (!session) {
            return c.json({ error: 'Invalid credentials' }, 401)
        }

        setCookie(c, AUTH_COOKIE, session.secret, {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 30,
        })

        return c.json({ success: true })
    })
    .post('/signup', zValidator('json', signUpSchema), async (c) => {
        const { name, email, password } = c.req.valid('json')

        const { account } = await createAdminClient()
        await account.create(ID.unique(), email, password, name)
        const session = await account.createEmailPasswordSession(
            email,
            password,
        )

        setCookie(c, AUTH_COOKIE, session.secret, {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 30,
        })

        return c.json({ success: true })
    })
    .post('/logout', async (c) => {
        const { account } = await createAdminClient()
        await account.deleteSession('current')

        deleteCookie(c, AUTH_COOKIE)

        return c.json({ success: true })
    })

export default app
