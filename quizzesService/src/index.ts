import startServer from "./server.ts";
import resolvers from "./resolver.ts";
import typeDefs from "./typeDefs.ts";

startServer(typeDefs, resolvers);
