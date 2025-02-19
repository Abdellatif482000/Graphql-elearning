export const fakeData = {
  quizzes: [
    {
      quizID: "1",
      questions: [
        {
          questionID: "1",
          questionType: "MCQ",
          questionText: "What is the capital of France?",
          answers: {
            optionA: "Berlin",
            optionB: "Madrid",
            optionC: "Paris",
            optionD: "Rome",
            optionE: "Lisbon",
          },
        },
        {
          questionID: "2",
          questionType: "True/False",
          questionText: "The Earth is flat.",
          answers: {
            quizID: "1",
            optionA: "True",
            optionB: "False",
          },
        },
      ],
    },
    {
      quizID: "2",
      questions: [
        {
          questionID: "1",
          questionType: "MCQ",
          questionText: "What is 2 + 2?",
          answers: {
            optionA: "3",
            optionB: "4",
            optionC: "5",
            optionD: "6",
            optionE: "7",
          },
        },
      ],
    },
    {
      quizID: "3",
      questions: [
        {
          questionID: "1",
          questionType: "T&F",
          questionText: "What is 2 + 2 = 3?",
          answers: {
            optionA: "true",
            optionB: "false",
          },
        },
      ],
    },
  ],
};
