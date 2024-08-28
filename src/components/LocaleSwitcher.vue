<template>
  <div>
    <q-select
      v-model="locale"
      label-color="white"
      :options="localeOptions"
      :label="$t('language_picker')"
      dense
      borderless
      emit-value
      map-options
      options-dense
      style="min-width: 120px"
    />

  </div>
</template>

<script>
import {defineComponent, ref, computed, watch} from "vue";
import { useQuasar } from "quasar";
import { useAnswerStore } from "../stores/answerStore";

import MatchItem from "./MatchItem.vue";
import {useI18n} from "vue-i18n";
export default defineComponent({
  name: "LocaleSwitcher",
  setup(props, {emit}) {
    const {t, locale} = useI18n();
    const answerStore = useAnswerStore()
    watch(locale, () => {
      console.log('locale', locale.value);
      answerStore.loadTools(locale.value)
    });

    return {
      locale,
      t,
      localeOptions: [
        {value: 'en-US',  label: '🇬🇧 English'},
        {value: 'nl', label: '🇳🇱 Nederlands'}
      ]
    }
  }
});
</script>
