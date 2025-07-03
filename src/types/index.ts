import type { Request } from 'express';
import type { Token, TokenType, User, UserRole } from 'generated/prisma';
import type { JwtPayload as BaseJwtPayload } from 'jsonwebtoken';

// Central export to prisma-client types
export type { User, Token, TokenType };

export type SafeUser = Omit<User, 'password'>;

export interface PaginationOptions {
  page?: number | string;
  limit?: number | string;
  sortBy?: string;
  include?: string;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type PaginationFilters = Record<string, string | any>;

export interface PaginateResult<T> {
  results: T[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

export interface AppJwtPayload extends BaseJwtPayload {
  sub: string;
  type: string;
}

export interface AuthedReq extends Request {
  user: SafeUser;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}
