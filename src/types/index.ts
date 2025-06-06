import type { User } from '@prisma/client';
import type { Request } from 'express';

export type SafeUser = Omit<User, 'password'>;

export interface PaginationOptions {
  page?: number | string;
  limit?: number | string;
  sortBy?: string;
  include?: string;
}

export type PaginationFilters = Record<string, string | any>;

export interface PaginateResult<T> {
  results: T[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

export interface AuthedReq extends Request {
  user: SafeUser;
}
