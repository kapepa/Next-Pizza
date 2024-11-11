import NextAuth, { AuthOptions, Session } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/db";
import bcrypt, { hashSync } from 'bcrypt';
import { FormLoginSchema } from "@/components/shared/modals/auth-modal/forms/schemas";
import { JWT } from "next-auth/jwt";
import { Role } from "@prisma/client";

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name || profile.email,
          email: profile.email,
          image: profile.avatar_url,
          role: "USER" as Role,
        };
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const validate = FormLoginSchema.safeParse(credentials)

        if (!validate.success) return null;
        const { email, password } = validate.data;

        const existUser = await prisma.user.findFirst({
          where: { email }
        })
        if (!existUser) return null;

        const compareHash = bcrypt.compareSync(password, existUser.password);
        if (!compareHash) return null;

        return { id: existUser.id, email: existUser.email, name: existUser.name, role: existUser.role }
      }
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "credentials") return true;
        if (!user.email) return false;

        const existUser = await prisma.user.findFirst({
          where: {
            OR: [
              { email: user.email },
              { provider: account?.provider, providerId: account?.providerAccountId },
            ]
          }
        });

        if (existUser) {
          await prisma.user.update({
            where: {
              id: existUser.id
            },
            data: {
              provider: account?.provider,
              providerId: account?.providerAccountId
            }
          })

          return true;
        }

        await prisma.user.create({
          data: {
            name: user.name || `User #${user.id}`,
            email: user.email,
            password: hashSync(user.id.toString(), 10),
            verified: true,
            provider: account?.provider,
            providerId: account?.providerAccountId,
          }
        })

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async jwt({ token }: { token: JWT }) {
      if (!token.email) return token;

      const existUser = await prisma.user.findFirst({
        where: { email: token.email }
      })

      token.id = existUser?.id;
      token.name = existUser?.name;
      token.role = existUser?.role;

      return token;
    },
    async session({ session, token }: { session: Session, token: JWT }) {
      if (!session.user) return session;
      session.user.id = token.id;
      session.user.role = token.role;

      return session
    },
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }