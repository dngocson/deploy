import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import categorySlice from "../feature/categories/categorySlice";
import questionSlice from "../feature/question/questionSlice";
import answerSlice from "../feature/answer/answerSlice";

export const store = configureStore({
  reducer: {
    category: categorySlice,
    questionList: questionSlice,
    answer: answerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
