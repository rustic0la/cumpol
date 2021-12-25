import { PrismaClient } from '@prisma/client';
import { Request } from 'express';

export interface Context extends Request {
  prisma: PrismaClient;
  userId: string;
}
