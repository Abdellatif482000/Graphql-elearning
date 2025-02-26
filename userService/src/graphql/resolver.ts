import { error, log } from "console";
import { ScoreCreateInput } from "../types.js";
import { UserResolver } from "../resolverClass.js";

import { UserContainer } from "../inversify.config.js";
import { validate } from "uuid";
const resolverClass = UserContainer.get(UserResolver);

const resolvers = {
  Query: {
    userByID: async (_: any, args: any) => {
      return {
        userID: "userID",
        username: "username",
        email: "email",
        role: "role",
        // scores: [],
      };
    },
    signin: async (_: any, args: any) =>
      await resolverClass.signin(args.role, args.singinData),
  },

  Mutation: {
    signup: async (_: any, args: any) =>
      await resolverClass.signup(args.userData),
  },
};

// resolverClass.signin("user", { email: "Ecmcacil1", password: "pass" });

export default resolvers;
