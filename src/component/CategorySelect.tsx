import { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../app/store";
import { answerActions } from "../feature/answer/answerSlice";
import { getCategory } from "../feature/categories/categorySlice";
import {
  TQuestionQuery,
  getQuestionList,
} from "../feature/question/questionSlice";
import style from "./Category.module.scss";

type TCategorySelect = {
  onCreate: (value: TQuestionQuery) => void;
};

export default function CategorySelect({ onCreate }: TCategorySelect) {
  const [selectedCategory, setSelectedCategory] = useState("default");
  const [selectedDifficulty, setSelectedDifficulty] = useState("default");

  const dispatch = useAppDispatch();
  const {
    trivia_categories,
    status: categoryStatus,
    error,
  } = useSelector(getCategory);
  const { status: questionListStatus } = useSelector(getQuestionList);

  const selectCategoryOption = (
    <div>
      <select
        onChange={(e) => setSelectedCategory(e.target.value)}
        className={style.input}
        name="category"
        id="categorySelect"
      >
        <option value="default">Select a category</option>
        {trivia_categories.map((category) => (
          <option value={category.id} key={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );

  const difficultyOption = (
    <div>
      <select
        onChange={(e) => setSelectedDifficulty(e.target.value)}
        className={style.input}
        name="difficulty"
        id="difficultySelect"
      >
        <option className={style.input} value="default">
          Select difficulty
        </option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );

  const onCreateHandler = () => {
    dispatch(answerActions.clearAnswer());
    onCreate({
      category: selectedCategory,
      difficulty: selectedDifficulty,
    });
  };

  if (categoryStatus === "loading")
    return <h1 className={style.heading}>Loading Data</h1>;
  if (categoryStatus === "failed")
    return <h1 className={style.heading}>{error}</h1>;

  return (
    <div className={style.inputContainer}>
      <div>{selectCategoryOption}</div>
      <div>{difficultyOption}</div>
      <button
        disabled={questionListStatus === "loading"}
        onClick={onCreateHandler}
        id="createBtn"
        className={style.button}
      >
        Create
      </button>
    </div>
  );
}
