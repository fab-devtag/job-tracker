import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./lib/validations/auth";
import { prisma } from "./lib/prisma";

export const { auth, handlers, signIn, signOut, } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: 'Email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                const validatedFields = loginSchema.safeParse(credentials)

                if (!validatedFields.success) {
                    return null
                }

                const user = await prisma.user.findUnique({
                    where: { email: validatedFields.data.email }
                })

                if (!user) {
                    return null;
                }

                const comparePassword = await bcrypt.compare(validatedFields.data.password, user.hashedPassword);

                if (!comparePassword) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name
                };
            }
        })
    ]
})