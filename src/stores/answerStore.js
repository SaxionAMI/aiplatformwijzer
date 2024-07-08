import { defineStore } from "pinia";

export const useAnswerStore = defineStore("answer", {
  state: () => ({
    results: [],
    selectedAnswers: [],
    answers: [],
    questions: [],
    tools: [],
  }),
  persist: true,
  getters: {},

  actions: {
    resetQuiz(){
      this.selectedAnswers = []
      this.answers = []
    }
  },
});
