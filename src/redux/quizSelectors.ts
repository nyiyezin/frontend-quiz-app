import { RootState } from "./store";

export const selectTitle = (state: RootState): string => state.quiz.title;
export const selectScore = (state: RootState): number => state.quiz.score;
export const selectStartedStatus = (state: RootState): boolean =>
  state.quiz.started;
export const selectCurrentQuestionIndex = (state: RootState): number | null =>
  state.quiz.currentQuestionIndex;
