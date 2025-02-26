import { injectable, inject } from "inversify";
import { QuizService } from "./serviceClass.js";

import prismaPkg from "@prisma/client";
import { log } from "console";
const { PrismaClient } = prismaPkg;

const prisma = new PrismaClient();

@injectable()
export class QuizResolver {
  public quizService: QuizService;

  constructor(@inject(QuizService) quizService: QuizService) {
    if (!quizService) {
      throw new Error("QuizService is not injected");
    }
    this.quizService = quizService;
  }

  async createQuiz(role: string, quizData: any) {
    if (role === "admin") {
      let questionData = quizData.questions.map((q: any) => ({
        questionID: q.questionID,
        questionType: q.questionType,
        questionText: q.questionText,
        answers: {
          create: {
            quizID: quizData.quizID,
            optionA: q.answers.optionA,
            optionB: q.answers.optionB,
            optionC: q.answers.optionC,
            optionD: q.answers.optionD,
            optionE: q.answers.optionE,
            optionF: q.answers.optionF,
            correctAnswer: q.answers.correctAnswer,
          },
        },
      }));

      const newQuiz = await prisma.quiz.create({
        data: {
          quizID: quizData.quizID,
          title: quizData.title,
          difficulty: quizData.difficulty,
          questionsNum: quizData.questionsNum,
          totalScore: quizData.totalScore,
          questions: {
            create: questionData,
          },
        },
        include: {
          questions: {
            include: {
              answers: true,
            },
          },
        },
      });
      log(questionData);
      log(newQuiz);
      return quizData;
    }
  }
}
