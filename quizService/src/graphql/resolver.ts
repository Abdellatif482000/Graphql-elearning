import {
  createQuizArgs,
  editQuizArgs,
  QuizType,
  QuestionType,
} from "../types.js";

import { log } from "console";
import { QuizContainer } from "../inversify.config.js";
import { QuizResolver } from "../resolverClass.js";
const resolverClass = QuizContainer.get(QuizResolver);

const resolvers = {

  Query: {
    quizzes: () => [
      {
        quizID: "123",
      },
      {
        quizID: "546",
      },
    ],

    getQuizById: (id: string) => {
      // for (let i in quizzes) {
      //   if (id === quizzes[i].quizID) return quizzes[i];
      // }
    },
  },

  Mutation: {
    createQuiz: async (_: any, args: createQuizArgs) =>
      await resolverClass.createQuiz(args.role, args.quizData),

    editQuestion: async (_: any, args: editQuizArgs) => {
      // const { input, quizID } = args;
      // const targetQuiz: Quiz = quizzes.find((quiz) => quiz.quizID === quizID);
      // for (let i in targetQuiz.questions) {
      //   if (targetQuiz.questions[i].questionID === input.questionID) {
      //     targetQuiz.questions[i] = input;
      //     return targetQuiz;
      //   }
      // }
    },
  },
};

export default resolvers;
