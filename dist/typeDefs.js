"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = apollo_server_express_1.gql `

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
    mylicense: License
  }

  type Mutation {
    register(firstname: String!, lastname: String!, email: String!, password: String!): Boolean!
    login(email: String!, password: String!): User
    createlicense(domain: String!): License
    signlicense(domain: String!, license: String!): Boolean!
  }

`;
//# sourceMappingURL=typeDefs.js.map