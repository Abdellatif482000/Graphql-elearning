import Controller from "./controller.ts";
import type { User } from "./types.ts";
import { fakeTUT } from "./datasource.ts";
import { log } from "console";

const resolvers = {
  Query: {
    tutorials: () => fakeTUT,
    getTutById: (id: string) => fakeTUT.find((tut) => tut.id === id),
  },

  Mutation: {
    createTut: (_: any, args: any) => args.tutData,
  },
};

export default resolvers;
