import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
});

// prisma.$on('query', (e) => {
//   console.log('\n');
//   console.log(`Query: ${e.query}`);
//   console.log(`Duration: ${e.duration}ms`);
// });

// prisma.$use(async (params, next) => {
//   const before = Date.now();

//   const result = await next(params);

//   const after = Date.now();

//   console.log(`Query ${params.model}.${params.action} took ${after - before}ms`);
//   console.log('__________________\n');

//   return result;
// });

export default prisma;
