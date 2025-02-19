import { log } from "console";
import { fakeUsers } from "./datasource.ts";
import { AuthService } from "./service.ts";
import { PrismaClient } from "@prisma/client";

const services = new AuthService();

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    users: (_: any, args: any, context: any, info: any) => {
      log(context);
      return fakeUsers;
    },
    score: (_: any, args: any, context: any, info: any) => {
      log(context);
      // return fakeUsers;
    },
    signin: (_: any, args: any) => log(args),
  },

  Mutation: {
    signup: async (_: any, args: any) => {
      const userModel = await services.register(args.userData);
      const saveModel = await prisma.user.create({
        data: {
          email: userModel.email,
          username: userModel.username,
          password: userModel.password,
          role: userModel.role,
        },
      });
      log(saveModel);

      return userModel;
    },
  },
};

export default resolvers;
