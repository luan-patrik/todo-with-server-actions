import { PrismaAdapter } from "@auth/prisma-adapter";
import bcryptjs from "bcryptjs";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { getServerSession } from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./db";

export const config = {
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      id: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Credenciais inválidas.");
        }

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.password) {
          throw new Error("Credenciais inválidas.");
        }

        const isCorrectPassword = await bcryptjs.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
          throw new Error("Credenciais inválidas.");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token && session.user) {
        (session.user.id = token.id), (session.user.email = token.email);
      }
      return session;
    },
    async jwt({ token, user }) {
      const db = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!db) {
        token.id = user.id;
        return token;
      }

      return {
        id: db.id,
        email: db.email,
      };
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
    signOut: "/",
  },

  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions;

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
