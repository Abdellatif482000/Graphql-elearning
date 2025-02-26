export interface QuizType {
  quizID: string;
  questions: [QuestionType];
}

export interface QuestionType {
  questionID: string;
  questionType: string;
  questionText: string;
  answers: AnsewersType;
}
export interface AnsewersType {
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  optionE: string;
}

// ---------------------------------
export type AnswerInput = {
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  optionE: string;
};

export type QuestionInput = {
  questionType: string;
  questionText: string;
  answers: AnswerInput;
};

export type QuizInput = {
  quizID: string;
  title: string;
  difficulty: string;
  questionsNum: number;
  totalScore: number;
  questions: QuestionInput[];
};

// Type for the resolver args
export type createQuizArgs = {
  quizData: QuizInput;
  role: "admin";
};

export type editQuizArgs = {
  input: QuizInput;
  quizID: string;
};
