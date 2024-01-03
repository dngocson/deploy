import he from "he";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../app/store";
import { answerActions, getAnswer } from "../feature/answer/answerSlice";
import style from "./Answer.module.scss";

export type TUserAnswer = {
  answer: string;
  question: string;
};

export default function Answer({ answer, question }: TUserAnswer) {
  const dispatch = useAppDispatch();
  const onSelectHandle = () => {
    dispatch(answerActions.addAnswer({ question, answer }));
  };
  const userAnswers = useSelector(getAnswer);
  const currentQueston = userAnswers.find(
    (answer) => answer.question === question
  );
  return (
    <button
      onClick={onSelectHandle}
      className={`${style.button} ${
        currentQueston?.answer === answer ? style.active : ""
      }`}
    >
      {he.decode(answer)}
    </button>
  );
}
