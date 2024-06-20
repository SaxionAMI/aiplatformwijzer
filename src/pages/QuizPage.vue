<template>
  <q-page class="q-ma-sm flex-center flex">
    <q-header>
      <!-- Readding the toolbar here is an ugly hack but whatever -->
      <q-toolbar>
        <img
          @click="goToRoute('/')"
          class="q-ma-sm"
          src="../assets/lg_saxion_wit.png"
          style="height: 6vh"
        />
        <q-toolbar-title
          class="absolute-center text-h5"
          v-if="!q.screen.lt.sm"
          @click="goToRoute('/')"
        >
          AI-Platformwijzer Quiz
        </q-toolbar-title>
      </q-toolbar>
      <q-linear-progress
        size="50px"
        stripe
        :value="progress"
        color="accent"
        track-color="white"
        ><div class="absolute-full flex flex-center">
          <div class="text-h4 text-white">
            {{ `${currentQuestion + 1}/${questions.length} vragen` }}
          </div>
        </div></q-linear-progress
      >
    </q-header>
    <!-- <div id="space" style="height: 6h"></div> -->
    <question-item
      :question="questions[currentQuestion]"
      :question_number="currentQuestion + 1"
      @update-answer="updateAnswer"
      @submit-answer="nextQuestion"
      @previousQuestion="previousQuestion"
    />
    <q-footer elevated bordered class="bg-white text-black" v-if="!isMobile">
      <q-btn
        no-caps
        :label="'Meer info per tool'"
        flat
        v-if="!expanded"
        :icon-right="'keyboard_arrow_up'"
        @click="expanded = !expanded"
      />
      <div v-if="expanded" class="flex flex-center">
        <q-btn
          no-caps
          :label="''"
          flat
          :icon-right="'keyboard_arrow_down'"
          @click="expanded = !expanded"
        />
        <div class="text-h5 text-weight-bolder">Match</div>
        <transition-group
          name="tool-list"
          tag="tool-item"
          class="flex flex-center"
        >
          <tool-question-item
            :tool="tool"
            :question="questions[currentQuestion]"
            :size="'80px'"
            :key="idx"
            v-for="(tool, idx) in sortedTools"
          />
        </transition-group>
      </div>
    </q-footer>
  </q-page>
</template>

<script>
import QuestionItem from "src/components/QuestionItem.vue";
import { defineComponent, ref, computed, onMounted } from "vue";
import { date, useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";
import { useAnswerStore } from "../stores/answerStore";
import ToolQuestionItem from "src/components/ToolQuestionItem.vue";
import { uuid } from "vue-uuid";
export default defineComponent({
  name: "QuizPage",
  setup() {
    const q = useQuasar();
    const uuidGenerator = uuid;
    const router = useRouter();
    const answerStore = useAnswerStore();
    const questions = answerStore.questions;
    // const answers = JSON.parse(JSON.stringify(answerStore.answers)); //ref([]);
    const expanded = ref(true);
    const currentQuestion = ref(answerStore.answers.length);
    const isMobile = computed(() => q.platform.is.mobile);
    const route = useRoute();

    if (route.query.hasOwnProperty("question_id")) {
      currentQuestion.value = parseInt(route.query.question_id);
    }

    const progress = computed(() => {
      return (currentQuestion.value + 1) / questions.length;
    });

    /////////////////////

    const previousQuestion = () => {
      if (currentQuestion.value - 1 >= 0) {
        currentQuestion.value--;
        answerStore.answers.pop();
        answerStore.selectedAnswers =
          answerStore.answers[answerStore.answers.length - 1].answers;

        // updateAnswer(answerStore.selectedAnswers);
      } else {
        // answerStore.results.pop();
        answerStore.answers = [];
        router.push("/");
      }
    };

    const goToRoute = (route_name) => {
      router.push(route_name);
    };

    const nextQuestion = (question_id, selectedAnswers) => {
      answerStore.selectedAnswers = [];
      if (currentQuestion.value + 1 < questions.length) {
        currentQuestion.value++;
        answerStore.answers.push({
          question_id: questions[currentQuestion.value].id,
          answers: [],
        });
      } else {
        answerStore.results.push({
          id: uuidGenerator.v4(),
          timestamp: Date.now(),
          top_3: sortedTools.value.slice(0, 3),
          answers: answerStore.answers,
        });
        answerStore.answers = [];
        router.push({
          name: "result",
        });
      }
    };

    const updateAnswer = (selectedAnswers) => {
      answerStore.answers[answerStore.answers.length - 1].answers =
        selectedAnswers;
    };

    onMounted(() => {
      if (answerStore.answers.length === 0) {
        answerStore.answers.push({
          question_id: questions[currentQuestion.value].id,
          answers: [],
        });
      }
    });

    ///////////////////////////////////////////////
    const tools = answerStore.tools;

    const sortedTools = computed(() => {
      let static_tools = JSON.parse(JSON.stringify(tools));
      static_tools.forEach((tool) => {
        tool.matches = calculateMatches(tool);
        tool.clashes = calculateClaches(tool);
        tool.numberOfMatches = numberOfMatches(tool);
        tool.numberOfClashes = numberOfClashes(tool);
        if (tool.numberOfClashes && tool.numberOfClashes) {
          tool.percentage =
            (tool.numberOfMatches /
              (tool.numberOfMatches + tool.numberOfClashes)) *
            100;
        } else {
          tool.percentage = 100;
        }
      });
      return static_tools
        .sort((a, b) => {
          if (b.percentage === a.percentage) {
            return b.numberOfMatches - a.numberOfMatches;
          } else {
            return b.percentage - a.percentage;
          }
        })
        .map((el, index) => {
          return { ...el, rank: index + 1 };
        });
    });

    const calculateMatches = (tool) => {
      let matching_questions = JSON.parse(JSON.stringify(questions));
      tool.good_compatible.forEach((rule) => {
        let matching_question = matching_questions.find(
          (match) => match.id === rule.question_id
        );
        answerStore.answers.forEach((answer) => {
          if (
            answer.question_id === rule.question_id &&
            answer.answers.includes(rule.answer_id) &&
            rule.explanation !== ""
          ) {
            if (!matching_question.hasOwnProperty("matches")) {
              matching_question.matches = [];
            }
            matching_question.matches.push(rule);
          }
        });
      });
      return matching_questions;
    };

    const calculateClaches = (tool) => {
      let matching_questions = JSON.parse(JSON.stringify(questions));
      tool.bad_compatible.forEach((rule) => {
        let matching_question = matching_questions.find(
          (match) => match.id === rule.question_id
        );
        answerStore.answers.forEach((answer) => {
          if (
            answer.question_id === rule.question_id &&
            answer.answers.includes(rule.answer_id) &&
            rule.explanation !== ""
          ) {
            if (!matching_question.hasOwnProperty("matches")) {
              matching_question.matches = [];
            }
            matching_question.matches.push(rule);
          }
        });
      });
      return matching_questions;
    };

    const numberOfMatches = (tool) => {
      let count = 0;
      tool.matches.forEach((match) => {
        if (match.hasOwnProperty("matches")) {
          count += match.matches.length;
        }
      });
      return count;
    };

    const numberOfClashes = (tool) => {
      let count = 0;
      tool.clashes.forEach((clash) => {
        if (clash.hasOwnProperty("matches")) {
          count += clash.matches.length;
        }
      });
      return count;
    };

    return {
      router,
      // answers,
      isMobile,
      updateAnswer,
      previousQuestion,
      questions,
      expanded,
      goToRoute,
      progress,
      nextQuestion,
      q,
      sortedTools,
      currentQuestion,
    };
  },
  components: { QuestionItem, ToolQuestionItem },
});
</script>
