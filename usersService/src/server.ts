// *************** Graphql *******************
import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { expressMiddleware } from "@apollo/server/express4";
import { express as voyagerMiddleware } from "graphql-voyager/middleware/index.js";
import crypto from "crypto";

// **********************************

// **************** node&express  ******************
import express from "express";
import type { RequestHandler } from "express";
import { log } from "console";
import { fileURLToPath } from "url";
import path from "path";
import { readFileSync } from "fs";
import { readFile } from "fs/promises";
import { createServer } from "http";
// ********************************
import dotenv from "dotenv";
dotenv.config();
// ********************************

// ********************************

// ****** Server *************
const startServer = async (typeDefs: any, resolvers: any) => {
  // ************* Express app *******************
  const app = express();
  const expressServer = createServer(app);
  expressServer.listen(process.env.PORT, () => {
    log(
      `Users service is running http://localhost:${process.env.PORT}/usersGraphql`
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
    "/usersGraphql",

    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => ({}),
    }) as unknown as RequestHandler
  );
  app.use("/graphVisuals", voyagerMiddleware({ endpointUrl: "/usersGraphql" }));
};

export default startServer;
