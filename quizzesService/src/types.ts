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
  questions: QuestionInput[];
};

// Type for the resolver args
export type createQuizArgs = {
  input: QuizInput;
};

export type editQuizArgs = {
  input: QuizInput;
  quizID: string;
};
