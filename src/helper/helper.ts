import { TQuestion } from "../feature/question/questionSlice";

export function createQuestionArray(questionObject: TQuestion) {
  const questionArray = [];
  questionArray.push({ id: 0, question: questionObject.correct_answer });
  for (let i = 0; i < questionObject.incorrect_answers.length; i++) {
    questionArray.push({
      id: i + 1,
      question: questionObject.incorrect_answers[i],
    });
  }
  return questionArray;
}
