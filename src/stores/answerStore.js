import { defineStore } from "pinia";

import tools_nl from "../assets/tools.nl.json";
import questions_nl from "assets/questions.nl.json";
import tools_en from "../assets/tools.en.json";
import questions_en from "assets/questions.en.json";
export const useAnswerStore = defineStore("answer", {
  state: () => ({
    results: [],
    selectedAnswers: [],
    answers: [],
    questions: [],
    tools: [],
    defaultLocale: 'nl'
  }),
  persist: true,
  getters: {},

  actions: {
    loadTools(locale) {
      this.defaultLocale = locale
      console.log(locale)
      if(locale === "en-US"){
      console.log("Load english questions + answers");
        this.tools = tools_en.tools;
        this.questions = questions_en.questions;
      } else {
        console.log("Load dutch questions + answers");
        this.tools = tools_nl.tools;
        this.questions = questions_nl.questions;
      }

    },
    resetQuiz(){
      this.selectedAnswers = []
      this.answers = []
    }
  },
});
