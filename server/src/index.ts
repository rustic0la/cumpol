import { ApolloServer } from 'apollo-server-express';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

import { getUserId } from './utils';

const prisma = new PrismaClient();

const resolvers = {};

(async function startApolloServer(resolvers) {
  config();

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
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req }) => {
      return {
        ...req,
        prisma,
        userId: req && req.headers.authorization ? getUserId(req, '') : null,
      };
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  httpServer.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
  );
})(resolvers);
