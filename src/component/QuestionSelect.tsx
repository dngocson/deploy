import { useSelector } from "react-redux";
import style from "./QuestionSelect.module.scss";
import { getQuestionList } from "../feature/question/questionSlice";
import Questions from "./Questions";
import { answerActions, getAnswer } from "../feature/answer/answerSlice";
import { createQuestionArray } from "../helper/helper";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/store";

export default function QuestionSelect() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { questionList, status, error } = useSelector(getQuestionList);
  const userAnswers = useSelector(getAnswer);
  const shuffledQuestionList = useMemo(
    () =>
      questionList.map((question) => {
        const shuffledQuestion = {
          ...question,
          shuffledAnswerList: createQuestionArray(question).sort(
            () => Math.random() - 0.5
          ),
        };
        return shuffledQuestion;
      }),
    [questionList]
  );

  const onSubmitHandler = () => {
    dispatch(answerActions.addQuestionList(shuffledQuestionList));
    navigate("/results");
  };

  if (status === "loading")
    return <h1 className={style.heading}>Loading Question list</h1>;
  if (status === "failed") return <h1 className={style.heading}>{error}</h1>;

  return (
    <div className={style.container}>
      {shuffledQuestionList.map((question) => {
        return <Questions data={question} key={question.question} />;
      })}

      {userAnswers.length === questionList.length &&
        userAnswers.length !== 0 && (
          <button onClick={onSubmitHandler} className={style.submitBtn}>
            Submit Answers
          </button>
        )}
    </div>
  );
}
