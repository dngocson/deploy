import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { TUserAnswer } from "../../component/Answer";
import { TQuestionExtended } from "../../component/Questions";

export type TShuffledAnswerList = {
  question: string;
  shuffledAnswerList: { id: number; question: string }[];
};

type TUserAnswersState = {
  userAnswers: TUserAnswer[];
  shuffledQuestionList: TQuestionExtended[];
};

const initialState: TUserAnswersState = {
  userAnswers: [],
  shuffledQuestionList: [],
};

const answerSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {
    addAnswer(state, action: PayloadAction<TUserAnswer>) {
      const newAnswer = action.payload;
      const existingAnswer = state.userAnswers.find(
        (answer) => answer.question === newAnswer.question
      );
      if (!existingAnswer) {
        state.userAnswers.push(action.payload);
      } else {
        existingAnswer.answer = newAnswer.answer;
      }
    },
    addQuestionList(state, action: PayloadAction<TQuestionExtended[]>) {
      state.shuffledQuestionList = action.payload;
    },
    clearAnswer() {
      return initialState;
    },
  },
});

export default answerSlice.reducer;

export const answerActions = answerSlice.actions;
export const getAnswer = (state: RootState) => state.answer.userAnswers;
export const getShuffledQuestionList = (state: RootState) =>
  state.answer.shuffledQuestionList;
