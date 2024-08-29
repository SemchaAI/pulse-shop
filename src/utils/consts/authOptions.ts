import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/prisma/prisma-client';
import { compare, hashSync } from 'bcrypt';
import { Role } from '@prisma/client';
import { randomUUID } from 'crypto';
import { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: 'USER' as Role,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: 'USER' as Role,
        };
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const values = {
          email: credentials.email,
        };
        const findUser = await prisma.user.findFirst({
          where: values,
        });
        console.log(findUser);

        if (!findUser) {
          return null;
        }
        const isPassValid = await compare(
          credentials.password,
          findUser.password
        );

        if (!isPassValid) {
          return null;
        }

        if (!findUser.verified) {
          return null;
        }
        return {
          id: findUser.id,
          name: findUser.name,
          email: findUser.email,
          role: findUser.role,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === 'credentials') {
          return true;
        }
        if (!user.email) {
          return false;
        }

        const findUser = await prisma.user.findFirst({
          where: {
            OR: [
              {
                provider: account?.provider,
                providerId: account?.providerAccountId,
              },
              {
                email: user.email,
              },
            ],
          },
        });
        if (findUser) {
          await prisma.user.update({
            where: {
              id: findUser.id,
            },
            data: {
              provider: account?.provider,
              providerId: account?.providerAccountId,
            },
          });
          return true;
        }

        const userCreated = await prisma.user.create({
          data: {
            name: user.name || 'User #' + user.id,
            email: user.email,
            password: hashSync(randomUUID(), 10),
            verified: new Date(),

            provider: account?.provider,
            providerId: account?.providerAccountId,
          },
        });
        if (!userCreated) {
          throw new Error('User not created');
        }
        return true;
      } catch (error) {
        console.log('Error [signIn]: ', error);
        return false;
      }
    },
    async jwt({ token }) {
      if (!token.email) {
        return token;
      }
      const user = await prisma.user.findUnique({
        where: {
          email: token.email,
        },
      });
      if (user) {
        token.id = String(user.id);
        token.role = user.role;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
};
