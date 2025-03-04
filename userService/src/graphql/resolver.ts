import { error, log } from "console";
import { ScoreCreateInput } from "../types.js";
import { UserResolver } from "../resolverClass.js";

import { UserContainer } from "../inversify.config.js";
import { validate } from "uuid";
const resolverClass = UserContainer.get(UserResolver);

const resolvers = {
  Query: {
    usersListForAdmin: async (_: any, args: any, context: any) =>
      await resolverClass.usersListForAdmin(context.token),

    userByIDForAdmin: async (_: any, args: any, context: any) =>
      await resolverClass.userByIDForAdmin(
        context.token,

        args.targetUserID
      ),
    signin: async (_: any, args: any) =>
      await resolverClass.signin(args.role, args.singinData),
  },

  Mutation: {
    registerUser: async (_: any, args: any) =>
      await resolverClass.registerUser(args.role, args.userData),
    // deleteUser:async (_: any, args: any) =>await
  },
};

// resolverClass.signin("user", { email: "Ecmcacil1", password: "pass" });

export default resolvers;
