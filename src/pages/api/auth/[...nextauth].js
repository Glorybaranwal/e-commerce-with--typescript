// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
    providers: [
        Providers.Credentials({
            async authorize(credentials) {
                const user = { id: 1, name: 'User' }; // Implement your own authentication logic here
                if (user) {
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        jwt: async (token, user) => {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        session: async (session, token) => {
            session.user.id = token.id;
            return session;
        },
    },
});
