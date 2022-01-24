import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import { execute, subscribe } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
import { createServer } from 'http';
import { join } from 'path';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import { Context } from './interfaces';
import prisma from './prismaClient';
import resolvers from './resolvers';
import { getUserId } from './utils/getUserId';

const startServer = async () => {
  const app = express();

  dotenv.config();

  app.use(cors());
  app.use(express.json());

  const httpServer = createServer(app);

  const schema = makeExecutableSchema({
    typeDefs: fs.readFileSync(join(__dirname, 'schema.graphql'), 'utf8'),
    resolvers,
  });

  const PORT = 4000;
  const pubsub = new PubSub();

  const subscriptionServer = new SubscriptionServer(
    {
      execute,
      subscribe,
      schema,
      onConnect: (connectionParams: { authToken?: string }) => {
        const { authToken = '' } = connectionParams;

        return {
          userId: authToken ? getUserId(authToken, '') : null,
          pubsub,
        };
      },
    },
    {
      server: httpServer,
      path: '/graphql',
    },
  );

  const server = new ApolloServer({
    schema,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
    context: ({ req }): Context => {
      const token = (req.headers.authorization || '') as string;

      return {
        ...req,
        prisma,
        pubsub,
        userId: token ? getUserId(token, '') : null,
      };
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  httpServer.listen(PORT, () => console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`));
};

startServer();
