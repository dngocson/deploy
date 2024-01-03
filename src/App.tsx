import CategorySelect from "./component/CategorySelect";
import { useAppDispatch } from "./app/store";
import {
  TQuestionQuery,
  fetchQuestionList,
} from "./feature/question/questionSlice";
import QuestionSelect from "./component/QuestionSelect";

function App() {
  const dispatch = useAppDispatch();

  const handleCreateQuestion = ({ category, difficulty }: TQuestionQuery) => {
    if (category === "default" || difficulty === "default") return;
    dispatch(fetchQuestionList({ category: category, difficulty: difficulty }));
  };

  return (
    <div>
      <CategorySelect onCreate={handleCreateQuestion} />
      <QuestionSelect />
    </div>
  );
}

export default App;
