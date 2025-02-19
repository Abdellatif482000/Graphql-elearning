import type {
  createQuizArgs,
  editQuizArgs,
  QuizType,
  QuestionType,
} from "./types.ts";
import { fakeData } from "./datasource.ts";
import { log } from "console";

const quizzes = fakeData.quizzes;

const resolvers = {
  Query: {
    quizzes: () => quizzes,
    getQuizById: (id: string) => {
      for (let i in quizzes) {
        if (id === quizzes[i].quizID) return quizzes[i];
      }
    },
  },

  Mutation: {
    createQuiz: (_: any, args: createQuizArgs) => {
      const inputs = args.input;

      return inputs;
    },

    editQuestion: async (_: any, args: editQuizArgs) => {
      const { input, quizID } = args;
      const targetQuiz: Quiz = quizzes.find((quiz) => quiz.quizID === quizID);

      for (let i in targetQuiz.questions) {
        if (targetQuiz.questions[i].questionID === input.questionID) {
          targetQuiz.questions[i] = input;
          return targetQuiz;
        }
      }
    },
  },
};

export default resolvers;

// const asd = {
//   input: {
//     quizID: "1",
//     question: {
//       questionID: "1",
//       questionType: "MCQ",
//       questionText: "What is 2 + 2?",
//       answers: {
//         optionA: "3",
//         optionB: "4",
//         optionC: "5",
//         optionD: "6",
//         optionE: "7",
//       },
//     },
//   },
// };
