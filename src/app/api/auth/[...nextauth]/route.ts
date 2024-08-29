import { authOptions } from '@/utils/consts/authOptions';
import NextAuth from 'next-auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
