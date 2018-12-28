// import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer }  from "apollo-server-express";
import express from "express";
import session from "express-session";

import { typeDefs} from "./typeDefs";
import { resolvers } from "./resolvers";

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req } : any) => ({ req })
  });

  const app = express();

  app.use(
    session({
      secret: "dfawfawfgargagva",
      resave: false,
      saveUninitialized: false
    })
  );

  await createConnection({
    url: 'postgres://wsbfdrgewkyloc:953a2f573166cdb11d2b1eb5274df4b89f37603342f88515a7720d514345cbda@ec2-54-247-74-131.eu-west-1.compute.amazonaws.com:5432/df7jcffv482igb',
    type: 'postgres',
    extra: {
      ssl: true,
    },
    entities: [
      "src/entity/**/*.ts"
    ],
    migrations: [
      "src/migration/**/*.ts"
    ],
    subscribers: [
      "src/subscriber/**/*.ts"
    ],
    cli: {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
    }
  });
  
  server.applyMiddleware({ app }); // app is from an existing express app
  
  app.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  )
};

startServer();
