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

  await createConnection();
  
  server.applyMiddleware({ app }); // app is from an existing express app
  
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  )
};

startServer();