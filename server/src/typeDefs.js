import { gql } from 'apollo-server';

export default gql`
  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type Domain {
    _id: ID!
    title: String!
    createdAt: String!
    collections: [Collection]!
  }

  type Collection {
    _id: ID!
    title: String!
    createdAt: String!
    dueDate: String
    todos: [Todo]!
    domain: Domain
  }

  type Todo {
    _id: ID!
    title: String!
    createdAt: String!
    dueDate: String
    links: [Link]!
    collection: Collection
    domain: Domain
  }

  type Link {
    _id: ID!
    url: String
    title: String!
    createdAt: String!
    isWatched: Boolean!
    dueDate: String
    watchedAt: String
    todo: Todo
    collection: Collection
    domain: Domain
  }

  type Query {
    me: User
    getDomains: [Domain]!
    getCollections(domainId: ID!): [Collection]!
    getTodos(collectionId: ID!): [Todo]!
    getLinks(todoId: ID!): [Link]!
  }
`;
