import { boot } from "quasar/wrappers";
import { useAnswerStore } from "../stores/answerStore";
import { useI18n } from 'vue-i18n'
import tools from "../assets/tools.nl.json";
import questions from "assets/questions.nl.json";
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  // something to do
  const answerStore = useAnswerStore();
  answerStore.loadTools(answerStore.defaultLocale)
});
