<template>
  <q-page class="flex flex-center row q-col-gutter-sm">
    <div :key="tool.id" v-for="tool in tools" class="col-10">
      <div class="text-h5 text-weight-bolder row">
        <q-input
          filled
          rounded
          v-model="tool.title"
          label="Tool name"
          class="col-8"
        />
        <div class="col-4">
          <q-btn
            color="negative"
            dense
            round
            flat
            class="float-right"
            icon="delete"
            @click="removeTool(tool.id)"
          />
        </div>
      </div>
      <div>
        <q-card class="q-mb-sm questioncard"
          ><q-card-section>
            <q-input
              label="description"
              v-model="tool.description"
              clearable
              rounded
              outlined=""
              autogrow
          /></q-card-section>
          <q-card-section>
            <q-input
              label="link"
              v-model="tool.link"
              clearable
              rounded
              outlined
              autogrow
          /></q-card-section>
        </q-card>
      </div>

      <div class="row q-col-gutter-sm">
        <div
          :key="question.id"
          v-for="(question, index) in answerStore.questions"
          class="col-12"
        >
          <q-card class="card">
            <q-card-section class="text-center text-h6"
              ><q-chip color="primary text-white">{{ index + 1 }}</q-chip
              >{{ question.question_text }}</q-card-section
            >
            <q-card-section
              :key="answer.id"
              v-for="answer in question.answers"
              class="row col-12"
            >
              <q-input
                class="col-5"
                clearable
                rounded
                outlined
                autogrow
                :disable="
                  tool.good_compatible.find(
                    (match) =>
                      match.question_id === question.id &&
                      match.answer_id === answer.id
                  ).explanation?.length > 0
                "
                label="Bad match"
                v-model="
                  tool.bad_compatible.find(
                    (match) =>
                      match.question_id === question.id &&
                      match.answer_id === answer.id
                  ).explanation
                "
              />
              <div class="col-2 text-center">{{ answer.answer_text }}</div>
              <q-input
                class="col-5"
                clearable
                rounded
                outlined
                autogrow
                label="Good match"
                v-model="
                  tool.good_compatible.find(
                    (match) =>
                      match.question_id === question.id &&
                      match.answer_id === answer.id
                  ).explanation
                "
                :disable="
                  tool.bad_compatible.find(
                    (match) =>
                      match.question_id === question.id &&
                      match.answer_id === answer.id
                  ).explanation?.length > 0
                "
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
      <q-btn
        class="q-ma-sm"
        rounded
        color="primary"
        no-caps
        label="Copy all JSON"
        @click="copyJson()"
      />
      <!-- {{ answerStore.questions }} -->
    </div>
    <div class="col-12">
      <q-btn
        rounded
        color="primary"
        no-caps
        label="add new tool"
        @click="addTool()"
      />
    </div>
  </q-page>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAnswerStore } from "../stores/answerStore";
import { uuid } from "vue-uuid";
export default defineComponent({
  name: "ToolsMakerPage",
  setup() {
    const uuidGenerator = uuid;
    const router = useRouter();
    const answerStore = useAnswerStore();
    const getImgUrl = (link) => {
      return new URL(`../assets/${link}`, import.meta.url).href;
    };
    let ts = ref(JSON.parse(JSON.stringify(answerStore.tools)));
    const tools = computed(() => {
      let tools = ts.value;
      let questions = JSON.parse(JSON.stringify(answerStore.questions));
      tools.forEach((tool) => {
        console.log("tool", tool);
        questions.forEach((question) => {
          question.answers.forEach((answer) => {
            let findQuestionBad = tool.bad_compatible.find(
              (match) =>
                answer.id === match.answer_id && question.id === match.question
            );
            let findQuestionGood = tool.good_compatible.find(
              (match) =>
                answer.id === match.answer_id && question.id === match.question
            );
            if (!findQuestionGood) {
              tool.good_compatible.push({
                question_id: question.id,
                answer_id: answer.id,
                explanation: "",
              });
            }
            if (!findQuestionBad) {
              tool.bad_compatible.push({
                question_id: question.id,
                answer_id: answer.id,
                explanation: "",
              });
            }
          });
        });
      });
      return tools;
    });

    const copyJson = async () => {
      const copy = JSON.parse(JSON.stringify(tools.value));
      copy.forEach((tool) => {
        tool.good_compatible = tool.good_compatible.filter(
          (answer) => answer.explanation !== "" && answer.explanation !== null
        );
        tool.bad_compatible = tool.bad_compatible.filter(
          (answer) => answer.explanation !== "" && answer.explanation !== null
        );
      });

      await navigator.clipboard.writeText(JSON.stringify({ tools: copy }));
    };

    const addTool = () => {
      ts.value.push({
        id: uuidGenerator.v4(),
        title: "temp",
        description: "temp",
        link: "https://cloud.google.com/vertex-ai?hl=nl",
        img_link: "vertex_logo.png",
        bad_compatible: [],
        good_compatible: [],
      });
    };

    const removeTool = (id) => {
      const find = ts.value.findIndex((tool) => tool.id === id);
      if (find > -1) {
        ts.value.splice(find, 1);
      }
    };

    return {
      router,
      copyJson,
      removeTool,
      addTool,
      tools,
      ts,
      getImgUrl,
      answerStore,
    };
  },
});
</script>
