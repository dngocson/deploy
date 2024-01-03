import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { RootState } from "../../app/store";

const QUESTION_CATEGORY_URL = "https://opentdb.com/api_category.php";

const categorySchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
  })
);

type TQuestion = z.infer<typeof categorySchema>;

type TCategories = {
  trivia_categories: TQuestion;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: TCategories = {
  trivia_categories: [],
  status: "idle",
  error: null,
};

export const fetchCategories = createAsyncThunk("/fetchTrivia", async () => {
  try {
    const response = await axios.get(QUESTION_CATEGORY_URL);
    const validateResponse = categorySchema.safeParse(
      response.data.trivia_categories
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
});

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.trivia_categories = action.payload;
        }
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default categorySlice.reducer;
export const getCategory = (state: RootState) => state.category;
