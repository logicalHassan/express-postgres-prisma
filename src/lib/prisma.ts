import paginate from '@/utils/paginate';
import { PrismaClient } from '@root/generated/prisma';

const prisma = new PrismaClient().$extends({
  model: {
    $allModels: {
      paginate,
    },
  },
});

export default prisma;
