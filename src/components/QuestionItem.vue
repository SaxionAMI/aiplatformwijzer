<template>
  <div class="row justify-center self-start">
    <div class="col-12 self-start text-center ">
      <!-- <q-chip color="primary" text-color="white">{{
        props.question_number
      }}</q-chip> -->
      <span class="text-h5 text-center text-weight-bolder">
        {{ props.question.question_text }}
      </span>
      <q-btn
        icon="info"
        color="accent"
        v-if="!isMobile"
        no-caps
        @mouseover="showTooltip"
        @mouseleave="hideTooltip"
        push
        rounded
        round
        size="md"
        class="q-my-sm"
      ></q-btn>
      <div>
        <q-card
          v-if="tooltipVisible"
          @mouseover="showTooltip"
          @mouseleave="hideTooltip"
          class="tooltip"
          ref="tooltip"
        >
          <q-card-section>
            {{ props.question.explanation_text }}</q-card-section
          >
        </q-card>
      </div>
    </div>
    <div v-if="fullscreen">
      <b>Vraag uitleg:</b> {{ props.question.explanation_text }}
    </div>
    <div class=" col-md-6 col-sm-10 col-xs-12 self-start">
      <q-card class="row q-pa-lg-lg q-pa-md-md q-pa-xs-xs q-pa-sm-sm card">
        <q-card-section
          class="col-6"
          :key="answer.id"
          v-for="answer in props.question.answers"
        >
          <AnswerItem
            :answer="answer"
            :fullscreen="fullscreen"
            @selectAnswer="selectAnswer"
            @unselectAnswer="unselectAnswer"
          ></AnswerItem>
          <div v-if="expanded" class="row q-pa-sm">
            <div :class="fullscreen ? 'col-12' : 'col-5'">
              <b class="text-positive">Match</b>
              <div :class="fullscreen ? '' : 'flex'">
                <question-tool-icon
                  :key="tool.id"
                  :tool="tool"
                  v-for="tool in matched_tools(answer.id)"
                  class="q-ma-sm cursor-pointer"
                />
              </div>
            </div>
            <div class="col-2" style="height: auto"></div>
            <div :class="fullscreen ? 'col-12' : 'col-5'">
              <b class="text-negative">Clash</b>
              <div :class="fullscreen ? '' : 'flex'">
                <question-tool-icon
                  :tool="tool"
                  :key="tool.id"
                  v-for="tool in clashed_tools(answer.id)"
                  class="q-ma-sm cursor-pointer"
                />
              </div>
            </div>
          </div>
        </q-card-section>
        <div class="text-right col-12 q-pr-lg q-pb-md">
          <b>
            {{
              props.question.type === "single"
                ? "Selecteer één antwoord"
                : "Meerdere antwoorden mogelijk"
            }}
          </b>
        </div>
      </q-card>
      <div class="q-pa-sm col-12">
        <q-btn
          color="accent"
          no-caps
          class="float-left"
          push
          rounded
          icon="arrow_back"
          @click="previousQuestion"
        />
        <q-btn
          color="accent"
          no-caps
          class="float-right"
          push
          rounded
          label="Volgende vraag"
          @click="submitAnswer"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { Notify, useQuasar } from "quasar";
import { useAnswerStore } from "../stores/answerStore";
import AnswerItem from "./AnswerItem.vue";
import QuestionToolIcon from "./QuestionToolIcon.vue";
export default defineComponent({
  name: "QuestionItem",
  props: {
    question: {
      type: Object,
    },
    question_number: {
      type: Number,
    },
  },
  emits: ["submitAnswer", "previousQuestion", "updateAnswer"],
  setup(props, { emit }) {
    const answerStore = useAnswerStore();
    const q = useQuasar();
    const isMobile = computed(() => q.platform.is.mobile);
    const tools = answerStore.tools;
    const expanded = ref(false);
    const fullscreen = ref(false);
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

    const previousQuestion = () => {
      emit("previousQuestion");
    };
    const getImgUrl = (link) => {
      return new URL(`../assets/small/${link}`, import.meta.url).href;
    };
    const matched_tools = (answer_id) => {
      const matching_tools = [];
      tools.forEach((ref_tool) => {
        let match = ref_tool.good_compatible.find((question) => {
          return (
            question.question_id === props.question.id &&
            question.answer_id === answer_id
          );
        });
        if (match) {
          let matched_tool = JSON.parse(JSON.stringify(ref_tool)); // Copy tool
          matched_tool.match = match;
          matching_tools.push(matched_tool);
        }
      });
      return matching_tools;
    };

    const clashed_tools = (answer_id) => {
      const matching_tools = [];
      tools.forEach((ref_tool) => {
        let match = ref_tool.bad_compatible.find((question) => {
          return (
            question.question_id === props.question.id &&
            question.answer_id === answer_id
          );
        });
        if (match) {
          let matched_tool = JSON.parse(JSON.stringify(ref_tool)); // Copy tool
          matched_tool.match = match;
          matching_tools.push(matched_tool);
        }
      });
      return matching_tools;
    };

    const submitAnswer = () => {
      const answers = answerStore.selectedAnswers;
      if (answers.length > 0) {
        emit("submitAnswer", props.question.id, answers);
      } else {
        Notify.create({
          position: "center",
          message: "Selecteer minimaal 1 antwoord!",
          color: "negative",
          timeout: 200,
        });
      }
    };

    const unselectAnswer = (answer_id) => {
      answerStore.selectedAnswers = answerStore.selectedAnswers.filter(
        (id) => id !== answer_id
      );
      emit("updateAnswer", answerStore.selectedAnswers);
    };
    const selectAnswer = (answer_id) => {
      if (
        props.question.type === "single" &&
        answerStore.selectedAnswers.length > 0
      ) {
        answerStore.selectedAnswers.pop();
        answerStore.selectedAnswers.push(answer_id);
      } else {
        answerStore.selectedAnswers.push(answer_id);
      }
      emit("updateAnswer", answerStore.selectedAnswers);
    };

    const expandFull = () => {
      expanded.value = !expanded.value;
      fullscreen.value = !fullscreen.value;
    };

    return {
      selectAnswer,
      clashed_tools,
      expandFull,
      getImgUrl,
      matched_tools,
      submitAnswer,
      unselectAnswer,
      fullscreen,
      answerStore,
      q,
      previousQuestion,
      showTooltip,
      hideTooltip,
      isMobile,
      tooltipVisible,
      props,
      expanded,
    };
  },
  components: { AnswerItem, QuestionToolIcon },
});
</script>
