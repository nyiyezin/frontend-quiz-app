import { createSlice } from "@reduxjs/toolkit";

interface QuizState {
  title: string;
  score: number;
  started: boolean;
  currentQuestionIndex: number | null;
}

const initialState: QuizState = {
  title: "",
  score: 0,
  started: false,
  currentQuestionIndex: null,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setStartQuiz(state, action) {
      state.title = action.payload;
      state.started = false;
      state.currentQuestionIndex = 0;
    },
    setCurrentQuestionIndex(state, action) {
      state.currentQuestionIndex = action.payload;
    },
    incrementScore(state) {
      state.score += 1;
    },
    decrementScore(state) {
      state.score -= 1;
    },
    setFinishQuiz(state) {
      state.started = false;
    },
    resetQuiz(state) {
      state.title = "";
      state.score = 0;
      state.currentQuestionIndex = null;
    },
  },
});

export const {
  setStartQuiz,
  setCurrentQuestionIndex,
  incrementScore,
  decrementScore,
  setFinishQuiz,
  resetQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;
