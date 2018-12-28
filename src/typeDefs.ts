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
    ip: String!
    license: String!
    used: Boolean!
  }

  type Query {
    me: User
    mylicense: License
  }

  type Mutation {
    register(firstname: String!, lastname: String!, email: String!, password: String!): Boolean!
    login(email: String!, password: String!): User
    createlicense(domain: String!, ip: String): License
    signlicense(domain: String!, ip: String!, license: String!): Boolean!
  }

`;
