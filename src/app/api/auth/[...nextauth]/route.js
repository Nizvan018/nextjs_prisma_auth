import NextAuth from "next-auth/next";
// import CredentialsProvider from "next-auth/providers";
import CredentialsProvider from "next-auth/providers/credentials";
import db from '@/libs/db';
import bcrypt from 'bcrypt';

const auth_options = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials, req) {
                const userFound = await db.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if (!userFound) {
                    throw new Error('User not found, check your email');
                }

                const match_password = bcrypt.compareSync(credentials.password, userFound.password);

                if (!match_password) {
                    throw new Error('Wrong password');
                }


                return {
                    id: userFound.id,
                    name: userFound.username,
                    email: userFound.email
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/login'
    }
}

const handler = NextAuth(auth_options);

export { handler as GET, handler as POST }