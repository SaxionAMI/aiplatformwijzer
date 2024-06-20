import { boot } from "quasar/wrappers";
import { useAnswerStore } from "../stores/answerStore";

import tools from "../assets/tools.json";
import questions from "../assets/questions.json";
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  // something to do

  const answerStore = useAnswerStore();

  console.log("Loaded tools.json");
  answerStore.tools = tools.tools;
  console.log("Loaded questions.json");
  answerStore.questions = questions.questions;
});
