"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const typeDefs_1 = require("./typeDefs");
const resolvers_1 = require("./resolvers");
const startServer = () => __awaiter(this, void 0, void 0, function* () {
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: typeDefs_1.typeDefs,
        resolvers: resolvers_1.resolvers,
        context: ({ req }) => ({ req })
    });
    const app = express_1.default();
    app.use(express_session_1.default({
        secret: "dfawfawfgargagva",
        resave: false,
        saveUninitialized: false
    }));
    yield typeorm_1.createConnection({
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
    server.applyMiddleware({ app });
    app.listen({ port: process.env.PORT || 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
});
startServer();
//# sourceMappingURL=index.js.map