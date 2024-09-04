import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/prisma/prisma-client';
import { compare, hashSync } from 'bcrypt';
import { Role } from '@prisma/client';
import { randomUUID } from 'crypto';
import { AuthOptions } from 'next-auth';
import { registerGuest } from '../helpers';
import { getUserSession } from '../helpers/getUserSession';

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
      async authorize(credentials, req) {
        console.log('credentials', credentials);
        if (req.query && req.query.anon === 'true') {
          //multiple anonymous sessions if user will delete cookies
          //abd will have 2 or more open tabs
          console.log('req.query', req.query);
          return await registerGuest();
        }
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
        const session = await getUserSession();
        if (!session) {
          const userCreated = await prisma.user.create({
            data: {
              name: user.name || 'User #' + user.id,
              email: user.email,
              password: hashSync(randomUUID(), 10),
              verified: new Date(),

              provider: account?.provider,
              providerId: account?.providerAccountId,
              // token: randomUUID(),
            },
          });
          if (!userCreated) {
            throw new Error('User not created');
          }
          return true;
        }
        console.log('signIn', user, account);

        const findUserByEmail = await prisma.user.findFirst({
          where: {
            email: user.email,
          },
        });
        if (findUserByEmail) return true;

        const findUser = await prisma.user.findFirst({
          where: {
            id: Number(session.id),
          },
        });

        if (findUser) {
          const providerUser = await prisma.user.update({
            where: {
              id: findUser.id,
            },
            data: {
              email: user.email,
              name: user.name || 'User #' + user.id,
              role: 'USER' as Role,
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
            // token: randomUUID(),
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
