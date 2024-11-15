import { Role } from '@prisma/client';
import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: Role,
    } & DefaultSession['user'];
  }
  interface User extends DefaultUser {
    id: string;
    role: Role,
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    role: Role;
  }
}