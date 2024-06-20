<template>
  <q-page class="flex flex-center row q-col-gutter-sm row">
    <div :key="question.id" v-for="question in questions" class="col-10">
      <div class="text-h5 text-weight-bolder row">
        <q-input
          v-model="question.question_text"
          label="Question"
          rounded
          filled
          class="col-8"
        />
        <q-input
          v-model="question.explanation_text"
          label="Explanation"
          rounded
          filled
          class="col-8"
        />
        <div class="col-4">
          <q-btn
            color="negative"
            class="float-right"
            icon="delete"
            round
            @click="removeQuestion(question.id)"
          />
        </div>
      </div>
      <q-card class="questioncard">
        <q-card-section>
          <q-btn
            rounded
            color="primary"
            @click="
              question.type === 'single'
                ? (question.type = 'multi')
                : (question.type = 'single')
            "
            :label="question.type"
          ></q-btn>
        </q-card-section>
        <q-card-section class="row q-col-gutter-sm">
          <div
            :key="answer.id"
            v-for="answer in question.answers"
            class="col-6 row"
          >
            <q-input
              class="col-10"
              outlined
              rounded
              v-model="answer.answer_text"
              label="Question"
            />
            <q-input
              class="col-10"
              outlined
              rounded
              v-model="answer.explanation_text"
              label="explanation"
            />
            <div class="col-2">
              <q-btn
                flat
                color="negative"
                icon="delete"
                round
                @click="removeAnswer(question.id, answer.id)"
              />
            </div>
          </div>
          <q-btn
            rounded
            color="primary"
            class="q-ma-sm"
            @click="addAnswer(question.id)"
            label="Add answer"
            no-caps
          />
        </q-card-section>
      </q-card>
    </div>
    <div class="col-12">
      <q-btn
        class="q-ma-sm"
        rounded
        color="primary"
        no-caps
        label="Add question"
        @click="addQuestion()"
      />
      <q-btn
        class="q-ma-sm"
        rounded
        color="primary"
        no-caps
        label="Copy all JSON"
        @click="copyJson()"
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
  name: "QuestionsMakerPage",
  setup() {
    const uuidGenerator = uuid;
    const router = useRouter();
    const answerStore = useAnswerStore();
    const qs = ref(JSON.parse(JSON.stringify(answerStore.questions)));

    const copyJson = async () => {
      await navigator.clipboard.writeText(
        JSON.stringify({ questions: questions.value })
      );
    };

    const questions = computed(() => {
      let questions = qs.value;
      return questions;
    });

    const addAnswer = (question_id) => {
      let question = qs.value.find((question) => question.id === question_id);
      question.answers.push({
        id: uuidGenerator.v4(),
        answer_text: "",
        explanation_text: "",
      });
    };

    const addQuestion = () => {
      qs.value.push({
        id: uuidGenerator.v4(),
        question_text: "TEMP",
        explanation_text: "TEMP",
        type: "multi",
        answers: [],
      });
    };

    const removeQuestion = (id) => {
      const foundQuestion = qs.value.findIndex(
        (question) => question.id === id
      );
      if (foundQuestion > -1) {
        qs.value.splice(foundQuestion, 1);
      }
    };

    const removeAnswer = (question_id, answer_id) => {
      const foundQuestion = qs.value.find(
        (question) => question.id === question_id
      );
      if (foundQuestion) {
        const foundAnswerIndex = foundQuestion.answers.findIndex(
          (answer) => answer.id === answer_id
        );
        if (foundAnswerIndex > -1) {
          foundQuestion.answers.splice(foundAnswerIndex, 1);
        }
      }
    };

    return {
      router,
      copyJson,
      qs,
      questions,
      removeQuestion,
      removeAnswer,
      addQuestion,
      addAnswer,
      answerStore,
    };
  },
});
</script>
