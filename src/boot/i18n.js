import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'
import { useAnswerStore } from "../stores/answerStore";
export default ({ app }) => {
  // Create I18n instance
  const answerStore = useAnswerStore()
  const i18n = createI18n({
    locale: answerStore.defaultLocale,
    legacy: false, // comment this out if not using Composition API
    messages
  })

  // Tell app to use the I18n instance
  app.use(i18n)
}
