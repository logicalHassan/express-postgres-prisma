import { UserRole } from '@/types';
import { z } from 'zod';
import { isPassword } from './custom.validation';

const createUser = {
  body: z.object({
    email: z.string().email(),
    password: isPassword,
    name: z.string(),
    role: z.nativeEnum(UserRole),
  }),
};

const getUsers = {
  query: z.object({
    name: z.string().optional(),
    role: z.string().optional(),
    sortBy: z.string().optional(),
    limit: z.string().optional(),
    page: z.string().optional(),
  }),
};

const updateProfile = {
  body: z
    .object({
      name: z.string().optional(),
      newPassword: isPassword.optional(),
      oldPassword: isPassword.optional(),
    })
    .refine((data) => (!data.newPassword && !data.oldPassword) || (data.newPassword && data.oldPassword), {
      message: 'Both oldPassword and newPassword must be provided together',
      path: ['newPassword'],
    }),
};

const getUser = {
  params: z.object({
    userId: z.string().uuid(),
  }),
};

const updateUser = {
  params: z.object({
    userId: z.string().uuid(),
  }),
  body: z
    .object({
      email: z.string().email().optional(),
      password: isPassword.optional(),
      name: z.string().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field must be provided',
    }),
};

const deleteUser = {
  params: z.object({
    userId: z.string().uuid(),
  }),
};

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updateProfile,
};
