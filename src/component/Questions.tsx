import he from "he";
import { TQuestion } from "../feature/question/questionSlice";
import style from "./Question.module.scss";
import Answer from "./Answer";

type TAnswer = {
  id: number;
  question: string;
};

export type TQuestionExtended = TQuestion & {
  shuffledAnswerList: TAnswer[];
};

type TQuestionProps = {
  data: TQuestionExtended;
};

export default function Questions({ data }: TQuestionProps) {
  return (
    <div>
      <h2>{he.decode(data.question)}</h2>
      <div className={style.answerContainer}>
        {data.shuffledAnswerList.map((answer) => (
          <Answer
            question={data.question}
            key={answer.id}
            answer={answer.question}
          />
        ))}
      </div>
    </div>
  );
}
