import { Role } from '@prisma/client';

export interface IUserSession {
  id: string;
  role: Role;
  name: string;
  image: string;
}
