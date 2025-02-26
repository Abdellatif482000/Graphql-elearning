import "reflect-metadata";
import { Container } from "inversify";
import { QuizService } from "./serviceClass.js";
import { QuizResolver } from "./resolverClass.js";
import { log } from "console";

const QuizContainer = new Container();
QuizContainer.bind<QuizService>(QuizService).toSelf();
QuizContainer.bind<QuizResolver>(QuizResolver).toSelf();

export { QuizContainer };
