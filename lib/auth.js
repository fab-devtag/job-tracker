import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./validations/auth";
import { prisma } from "./prisma";

export const { auth, handlers, signIn, signOut, } = NextAuth({
    session: {
        strategy: 'jwt'
    },
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
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.userId = user.id
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.userId
            }
            return session;
        }
    }
})