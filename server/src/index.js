import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import { config } from 'dotenv';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB connected'))
  .catch((err) => console.error(err));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`Listening on ${url}`));
