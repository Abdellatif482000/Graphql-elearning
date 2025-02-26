import { fileURLToPath } from "url";
import path from "path";
import { readFileSync } from "fs";
import { gql } from "graphql-tag";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemaPath = path.join(__dirname, "user.graphql");
const schemaSDL = readFileSync(schemaPath, "utf-8").toString();
const typeDefs = gql(schemaSDL);

export default typeDefs;
