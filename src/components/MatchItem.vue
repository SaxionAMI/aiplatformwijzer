<template>
  <div v-if="match.hasOwnProperty('matches') && match.matches.length > 0">
    <div class="text-h6">
      <q-chip color="primary" text-color="white">{{
        props.question_number + 1
      }}</q-chip
      >{{ match.question_text }}
    </div>

    <div :key="rule_index" v-for="(rule, rule_index) in match.matches">
      <q-card class="q-my-md">
        <q-card-section
          class="text-weight-bold text-white"
          :class="props.isMatch ? 'bg-positive ' : 'bg-negative '"
          >{{
            match.answers.find((answer) => answer.id === rule.answer_id)
              .answer_text
          }}</q-card-section
        >
        <q-card-section class="text-left">
          <div v-html="rule.explanation"></div
        ></q-card-section>

        <q-card-section class="flex">
          <div
            class="flex q-ma-sm cursor-pointer"
            :key="tool.id"
            v-for="(tool, index) in findMatchingTools(
              rule.question_id,
              rule.answer_id
            )"
          >
            <div class="q-ma-sm" v-if="index === 0">Zie:</div>
            <question-tool-icon
              :tool="tool"
              @click="showTool(tool.id)"
            ></question-tool-icon>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, defineExpose } from "vue";
import { useAnswerStore } from "../stores/answerStore";
import QuestionToolIcon from "./QuestionToolIcon.vue";

export default defineComponent({
  name: "MatchItem",
  props: [
    "isMatch",
    "match",
    "tools",
    "tool_id",
    "question_number",
    "question_id",
  ],
  components: { QuestionToolIcon },
  emits: ["showTool"],
  setup(props, { emit }) {
    const showTool = (index) => {
      emit("showTool", index);
    };

    const findMatchingTools = (question_id, answer_id) => {
      const matching_tools = [];
      props.tools.forEach((ref_tool) => {
        let match = ref_tool.good_compatible.find((question) => {
          return (
            question.question_id === question_id &&
            question.answer_id === answer_id
          );
        });
        if (match && ref_tool.id !== props.tool_id) {
          let matched_tool = JSON.parse(JSON.stringify(ref_tool)); // Copy tool
          matched_tool.match = match;
          matching_tools.push(matched_tool);
        }
      });
      return matching_tools;
    };

    return { props, findMatchingTools, showTool };
  },
});
</script>
