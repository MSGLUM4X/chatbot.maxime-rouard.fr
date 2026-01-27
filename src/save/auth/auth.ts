import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { db } from "@/lib/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        // autres providers...
    ],

    session: {
        strategy: "jwt", // JWT session (pas de database adapter nécessaire)
    },

    callbacks: {
        async signIn({ user, account, profile }) {
            // Créer ou récupérer l'utilisateur dans votre DB
            if (user.email) {
                const existingUser = await db.user.findUnique({
                    where: { email: user.email }
                })

                if (!existingUser) {
                    // Créer un nouvel utilisateur
                    await db.user.create({
                        data: {
                            id: user.id, // ou générez un ID custom
                            email: user.email,
                            name: user.name,
                            image: user.image,
                        }
                    })
                }
            }
            return true
        },

        async jwt({ token, user, account }) {
            // Première connexion : user est disponible
            if (user) {
                // Récupérer l'ID depuis votre DB
                const dbUser = await db.user.findUnique({
                    where: { email: user.email }
                })

                if (dbUser) {
                    token.userId = dbUser.id // Ajouter votre user_id au token
                }
            }
            return token
        },

        async session({ session, token }) {
            // Ajouter le userId à la session
            if (token.userId) {
                session.user.id = token.userId
            }
            return session
        }
    }
})