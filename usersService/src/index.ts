import startServer from "./server.ts";
import resolvers from "./resolver.ts";
import typeDefs from "./typeDefs.ts";
// import { psqlClient } from "./database.ts";

startServer(typeDefs, resolvers);
