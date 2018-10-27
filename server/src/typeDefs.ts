import {gql} from "apollo-server-express";

export const typeDefs = gql`

  type User {
    id: ID!
    firstname: String!
    lastname: String!
    email: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    register(firstname: String!, lastname: String!, email: String!, password: String!): Boolean!
    login(email: String!, password: String!): User
  }
`;
