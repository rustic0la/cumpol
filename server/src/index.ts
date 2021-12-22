import { PrismaClient } from '@prisma/client';
import { ApolloServerPluginDrainHttpServer, AuthenticationError } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import http from 'http';
import path from 'path';

// import resolvers from './resolvers';
import { getUserId } from './utils';

const prisma = new PrismaClient();

const startServer = async () => {
  dotenv.config();

  const app = express();

  app.use(cors());
  app.use(express.json());

  // app.post('/api/register', async (req, res) => {
  //   try {
  //     await User.create({
  //       username: req.body.username,
  //       password: req.body.password,
  //     });
  //     res.json({ status: 'ok' });
  //   } catch (err) {
  //     res.json({ status: 'error', error: 'Duplicate username' });
  //   }
  // });

  // app.post('/api/login', async (req, res) => {
  //   const user = await User.findOne({
  //     username: req.body.username,
  //     password: req.body.password,
  //   });

  //   if (user) {
  //     return res.json({ status: 'ok', user: true });
  //   }
  //   return res.json({ status: 'error', user: false });
  // });

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
    resolvers: {},
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req }) => {
      const token = (req.headers.authentication || '') as string;
      const userId = getUserId(token, '');
      console.log('userId', userId);

      if (!userId) throw new AuthenticationError('you must be logged in');

      return {
        ...req,
        prisma,
        userId,
      };
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  httpServer.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
  );
};

startServer();
