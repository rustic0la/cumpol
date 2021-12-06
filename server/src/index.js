import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import cors from 'cors';

import typeDefs from './typeDefs';
import resolvers from './resolvers';
import User from './models/User';

(async function startApolloServer(typeDefs, resolvers) {
  config();

  const app = express();

  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('DB connected'))
    .catch((err) => console.error(err));

  app.use(cors());
  app.use(express.json());

  app.post('/api/register', async (req, res) => {
    try {
      await User.create({
        username: req.body.username,
        password: req.body.password,
      });
      res.json({ status: 'ok' });
    } catch (err) {
      res.json({ status: 'error', error: 'Duplicate username' });
    }
  });

  app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (user) {
      return res.json({ status: 'ok', user: true });
    }
    return res.json({ status: 'error', user: false });
  });

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });

  httpServer.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
  );
})(typeDefs, resolvers);
