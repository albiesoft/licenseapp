import {gql} from "apollo-server-express";

export const typeDefs = gql`

  type User {
    id: ID!
    firstname: String!
    lastname: String!
    email: String!
  }

  type License {
    id: ID!
    domain: String!
    license: String!
    used: Boolean!
  }

  type Query {
    me: User
    mylicense(domain: String!): License
  }

  type Mutation {
    register(firstname: String!, lastname: String!, email: String!, password: String!): Boolean!
    login(email: String!, password: String!): User
    createlicense(domain: String!): License
    signlicense(domain: String!, license: String!): Boolean!
  }

`;
