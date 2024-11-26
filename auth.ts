import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { Role } from "@prisma/client";

import GoogleProvider from "next-auth/providers/google"


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update ,
} = NextAuth({
  pages: {
    signIn: "/sign-in",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      //Allow OAuth without email verification
      // if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user?.id ?? '');

      //Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;
      return true;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.userId = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as Role;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email ?? '';
        // session.user.phoneNumber = token.phoneNumber;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      // token.phoneNumber = existingUser.phoneNumber;
      // token.image = existingUser.image;
      // token.inviteToken = existingUser.inviteToken;
      // token.bio = existingUser.bio;
      // token.twitter = existingUser.twitter;
      // token.facebook = existingUser.facebook;
      // token.linkedin = existingUser.linkedin;
      // token.youtube = existingUser.youtube;
      // token.instagram = existingUser.instagram;


      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});