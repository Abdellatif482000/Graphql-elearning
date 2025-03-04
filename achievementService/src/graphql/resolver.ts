import { log } from "console";
import { AchievmentContainer } from "../inversify.config.js";
import { AchievmentResolver } from "../resolverClass.js";
const resolverClass = AchievmentContainer.get(AchievmentResolver);

const resolvers = {
  User: {
    scores: async (asd: any, args: any) => {
      return [
        {
          scoreID: "1",
          score: 95,
          userID:"userID",
          quizID:"quizID",
          quizName:"quizName",
          date:"date"
        },
        {
          scoreID: "2",
          score: 80,
          userID:"userID",
          quizID:"quizID",
          quizName:"quizName",
          date:"date"
        },
      ];
    },
  },
  Query: {},

  Mutation: {},
};

export default resolvers;
