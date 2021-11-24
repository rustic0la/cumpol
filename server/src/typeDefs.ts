import { gql } from 'apollo-server';

export const typeDefs = gql`
    type User {
        _id: ID
        name: String
        email: String
    }

    type Query {
        me: User
    }
`;