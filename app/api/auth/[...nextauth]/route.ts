// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { prisma } from '@/lib/prisma'

const handler = NextAuth({
  // L'adapter Prisma gère tout en BDD automatiquement
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId:     process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    GithubProvider({
      clientId:     process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  callbacks: {
    // Ajoute le provider dans la session pour l'afficher côté client
    async session({ session, user }) {
      if (session.user) {
        (session.user as any).id       = user.id
        // Récupère le provider depuis la table Account
        const account = await prisma.account.findFirst({
          where: { userId: user.id },
          select: { provider: true },
        })
        ;(session.user as any).provider = account?.provider ?? ''
      }
      return session
    },
  },

  pages: {
    signIn: '/',   // notre page de login custom
  },
})

export { handler as GET, handler as POST }