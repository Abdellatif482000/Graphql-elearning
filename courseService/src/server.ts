// *************** Graphql *******************
import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { expressMiddleware } from "@apollo/server/express4";
import { express as voyagerMiddleware } from "graphql-voyager/middleware/index.js";
import resolvers from "./graphql/resolver.js";
import typeDefs from "./graphql/typeDefs.js";
// **********************************

// **************** node&express  ******************
import express from "express";
import type { RequestHandler } from "express";
import { log } from "console";
import { fileURLToPath } from "url";
import path from "path";
import { readFileSync } from "fs";
import { readFile } from "fs/promises";
import dotenv from "dotenv";
import { createServer } from "http";
// ********************************

dotenv.config();

const startServer = async () => {
  // ************* Express app *******************
  const app = express();
  const expressServer = createServer(app);
  expressServer.listen(process.env.PORT, () => {
    log(
      `Tutorial service is running http://localhost:${process.env.PORT}/courseGraphql`
    );
  });
  // **********************************

  // ************ Apollo server ***************
  const apolloServer = new ApolloServer({
    schema: buildSubgraphSchema({
      typeDefs,
      resolvers,
    }),
  });
  await apolloServer.start();
  // **********************************

  // *************app.use**************
  app.use(express.json());

  app.use(
    "/courseGraphql",
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => {
        return { token: req.headers.authorization };
      },
    }) as unknown as RequestHandler
  );
  app.use(
    "/graphVisuals",
    voyagerMiddleware({ endpointUrl: "/courseGraphql" })
  );
};

startServer();
