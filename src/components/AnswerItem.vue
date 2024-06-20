<template>
  <q-btn-group rounded class="full-width">
    <q-btn
      class="full-width"
      no-caps
      push
      rounded
      :color="
        answerStore.selectedAnswers.includes(props.answer.id)
          ? 'accent'
          : 'primary'
      "
      @click.stop="
        !answerStore.selectedAnswers.includes(props.answer.id)
          ? selectAnswer(props.answer.id)
          : unselectAnswer(props.answer.id)
      "
      :label="props.answer.answer_text"
    />
    <q-btn
      icon="info"
      v-if="props.answer.explanation_text && !isMobile"
      :color="
        answerStore.selectedAnswers.includes(props.answer.id)
          ? 'accent'
          : 'secondary'
      "
      no-caps
      push
      rounded
      @mouseover="showTooltip"
      @mouseleave="hideTooltip"
      round
      size="md"
    />
    <q-btn
      icon="info"
      v-else-if="props.answer.explanation_text"
      :color="
        answerStore.selectedAnswers.includes(props.answer.id)
          ? 'accent'
          : 'secondary'
      "
      no-caps
      push
      rounded
      @click="tooltipVisible = !tooltipVisible"
      round
      size="md"
    />
  </q-btn-group>
  <q-card
    v-if="props.answer.explanation_text && tooltipVisible"
    @mouseover="showTooltip"
    @mouseleave="hideTooltip"
    style=""
    class="bg-white text-black tooltip"
    ref="tooltip"
  >
    <q-card-section> {{ props.answer.explanation_text }}</q-card-section>
  </q-card>

  <div v-if="props.fullscreen && props.answer.explanation_text">
    <b>Antwoord uitleg:</b> {{ props.answer.explanation_text }}
  </div>
  <div></div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useAnswerStore } from "../stores/answerStore";
import { useQuasar } from "quasar";
export default defineComponent({
  name: "AnswerItem",
  props: {
    fullscreen: {
      type: Boolean,
    },
    answer: {
      type: Object,
    },
  },
  emits: ["selectAnswer", "unselectAnswer"],
  setup(props, { emit }) {
    const q = useQuasar();
    const answerStore = useAnswerStore();
    const isMobile = computed(() => q.platform.is.mobile);
    const tooltipVisible = ref(false);
    const hideTimeoutId = ref(null);
    const showTooltip = () => {
      clearTimeout(hideTimeoutId.value);
      tooltipVisible.value = true;
    };
    const hideTooltip = () => {
      hideTimeoutId.value = setTimeout(() => {
        tooltipVisible.value = false;
      }, 50); // Adjust the delay time as needed
    };

    const unselectAnswer = (answer_id) => {
      emit("unselectAnswer", answer_id);
    };

    const selectAnswer = (answer_id) => {
      emit("selectAnswer", answer_id);
    };
    return {
      selectAnswer,
      unselectAnswer,
      showTooltip,
      hideTooltip,
      tooltipVisible,
      answerStore,
      isMobile,
      props,
    };
  },
});
</script>
