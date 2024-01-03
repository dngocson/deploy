import { useSelector } from "react-redux";
import {
  answerActions,
  getAnswer,
  getShuffledQuestionList,
} from "../feature/answer/answerSlice";
import style from "./ResultPage.module.scss";
import he from "he";
import { TUserAnswer } from "../component/Answer";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/store";
import { questionAction } from "../feature/question/questionSlice";

const findAnswer = (userAnswers: TUserAnswer[], question: string) => {
  const currentQuestion = userAnswers.find(
    (answer) => answer.question === question
  );
  return currentQuestion?.answer;
};

const getClassName = (score: number) => {
  if (score <= 1) {
    return style.red;
  } else if (score <= 3) {
    return style.yellow;
  } else {
    return style.green;
  }
};

export default function ResultPage() {
  const shuffledQuestionList = useSelector(getShuffledQuestionList);
  const userAnswers = useSelector(getAnswer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const displayResult = shuffledQuestionList.map((question) => ({
    shuffledAnswerList: question.shuffledAnswerList,
    question: question.question,
    userSelect: findAnswer(userAnswers, question.question),
    correctAnswer: question.correct_answer,
  }));

  const score = displayResult.reduce(
    (acc, cur) => (cur.correctAnswer === cur.userSelect ? acc + 1 : acc),
    0
  );

  const createNewQuizHandler = () => {
    dispatch(questionAction.clearQuestion());
    dispatch(answerActions.clearAnswer());
    navigate("/");
  };

  if (userAnswers.length === 0) {
    return (
      <button className={style.newQuiz} onClick={createNewQuizHandler}>
        Create a new quiz
      </button>
    );
  }

  return (
    <div className={style.container}>
      <h2 className={style.heading}>Result</h2>
      <div>
        {displayResult.map((question) => (
          <div key={question.question}>
            <h2>{he.decode(question.question)}</h2>
            <div className={style.answerContainer}>
              {question.shuffledAnswerList.map((answer) => {
                let className;
                if (answer.question === question.correctAnswer)
                  className = style.correct;
                else if (
                  answer.question !== question.correctAnswer &&
                  answer.question === question.userSelect
                )
                  className = style.wrong;
                else className = style.notChoose;
                return (
                  <button
                    key={answer.id}
                    className={`${style.answer} ${className}`}
                  >
                    {he.decode(answer.question)}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <p className={`${style.result} ${getClassName(score)}`}>
        You scored {score} out of 5
      </p>
      <button className={style.newQuiz} onClick={createNewQuizHandler}>
        Create a new quiz
      </button>
    </div>
  );
}
