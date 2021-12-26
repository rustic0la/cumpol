import { PrismaClient } from '@prisma/client';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import http from 'http';
import path from 'path';

import { Context } from './interfaces';
import resolvers from './resolvers';
import { getUserId } from './utils';

const prisma = new PrismaClient();

const startServer = async () => {
  dotenv.config();

  const app = express();

  app.use(cors());
  app.use(express.json());

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
    resolvers,
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req }): Context => {
      const token = (req.headers.authorization || '') as string;

      return {
        ...req,
        prisma,
        userId: token ? getUserId(token, '') : null,
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
