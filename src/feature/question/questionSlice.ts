import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { RootState } from "../../app/store";

const QuestionSchema = z.object({
  type: z.string(),
  difficulty: z.string(),
  category: z.string(),
  question: z.string(),
  correct_answer: z.string(),
  incorrect_answers: z.array(z.string()),
});

export type TQuestion = z.infer<typeof QuestionSchema>;

const QuestionListSchema = z.array(QuestionSchema);

export type TQuestionList = z.infer<typeof QuestionListSchema>;

export type TQuestionListState = {
  questionList: TQuestionList;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

export const initialState: TQuestionListState = {
  questionList: [],
  status: "idle",
  error: null,
};

export type TQuestionQuery = {
  category: string;
  difficulty: string;
};

export const fetchQuestionList = createAsyncThunk(
  "/fetchQuestionList",
  async (query: TQuestionQuery) => {
    try {
      const { category, difficulty } = query;
      const getQuestionListURL = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`;
      const response = await axios.get(getQuestionListURL);
      const validateResponse = QuestionListSchema.safeParse(
        response.data.results
      );
      if (!validateResponse.success)
        return fromZodError(validateResponse.error).toString();
      return validateResponse.data;
    } catch (err) {
      if (err instanceof Error) {
        return err.message;
      }
      return "An error occurred";
    }
  }
);

const questionListSlice = createSlice({
  name: "questionList",
  initialState,
  reducers: {
    clearQuestion() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchQuestionList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestionList.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.questionList = action.payload;
        }
      })
      .addCase(fetchQuestionList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const questionAction = questionListSlice.actions;
export default questionListSlice.reducer;
export const getQuestionList = (state: RootState) => state.questionList;
