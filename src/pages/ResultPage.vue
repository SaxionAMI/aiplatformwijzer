<template>
  <q-page>
    <div class="q-ma-md">
      <!-- <transition appear enter-active-class="animated fadeIn delay-1s"> -->
      <div class="flex">
        <div class="text-h3 text-weight-bolder text-primary">
          {{$t('results.ranking.title')}} -

          <span class="text-weight-bolder">
            {{
              new Date(timestamp).toLocaleDateString("en-CA", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
            }}
          </span>
          <div style="font-size: small">{{ id }}</div>
        </div>
      </div>
      <span v-html="$t('results.ranking.explanation')"/>
      <div class="row q-col-gutter-md items-center q-my-md">
        <tool-item
          :style="{ transitionDelay: index * delay + 'ms' }"
          :class="{ show_tool: currentIndex >= index }"
          class="col-xl-2 col-lg-3 col-md-3 col-xs-12 col-sm-6 hide_tool"
          :tool="tool"
          :size="'60px'"
          :key="tool.id"
          v-for="(tool, index) in sortedTools"
          ref="itemRefs"
          @openDialog="openDialog"
        />
      </div>
      <div class="text-h3 text-weight-bolder text-primary q-my-md">
        {{$t('results.ranking.graph')}}
      </div>
      <q-card class="card q-my-md">
        <q-card-section>
          <q-table flat :rows="sortedRows" :columns="columns" row-key="name" />
        </q-card-section>
      </q-card>
      <!-- </transition> -->
      <tool-dialog
        v-model="showDialog"
        :answers="answers"
        :tool="chosenTool"
        @showPreviousTool="showPreviousTool"
        @showNextTool="showNextTool"
        @showTool="showTool"
      ></tool-dialog>
      <div class="row q-ma-sm">
        <q-btn
          no-caps
          @click="router.push({ name: 'index' })"
          label="Doe de quiz opnieuw"
          rounded
          push
          color="accent"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import ToolItem from "src/components/ToolItem.vue";
import { defineComponent, ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAnswerStore } from "../stores/answerStore";
import ToolDialog from "src/components/ToolDialog.vue";
import {useI18n} from "vue-i18n";
const columns = [
  {
    name: "name",
    required: true,
    label: "Tools",
    align: "left",
    field: (row) => row.name,
    format: (val, row) => {
      return `${val}`;
    },
  },
  {
    name: "rbac",
    align: "center",
    label: "RBAC",
    field: "rbac",
    sortable: true,
  },
  {
    name: "notebook",
    align: "center",
    label: "Notebook omgeving",
    field: "notebook",
    sortable: true,
  },
  {
    name: "experiment",
    align: "center",
    label: "Experiment-tracking",
    field: "experiment",
    sortable: true,
  },
  {
    name: "model",
    align: "center",
    label: "Model-tracking",
    field: "model",
    sortable: true,
  },
  {
    name: "annotator",
    align: "center",
    label: "Data-labeler",
    field: "annotator",
    sortable: true,
  },
  {
    name: "llmops",
    align: "center",
    label: "LLMOps",
    field: "llmops",
    sortable: true,
  },
  {
    name: "datadrift",
    align: "center",
    label: "Data-drift detectie",
    field: "datadrift",
    sortable: true,
  },
  {
    name: "modeldrift",
    align: "center",
    label: "Model-drift detectie",
    field: "modeldrift",
    sortable: true,
  },
  {
    name: "hyperparameter",
    align: "center",
    label: "Hyperparameter optimalisatie",
    field: "hyperparameter",
    sortable: true,
  },
  {
    name: "dataversioning",
    align: "center",
    label: "Data-versiebeheer",
    field: "dataversioning",
    sortable: true,
  },
  {
    name: "etl",
    align: "center",
    label: "ETL",
    field: "etl",
    sortable: true,
  },
  {
    name: "automl",
    align: "center",
    label: "AutoML",
    field: "automl",
    sortable: true,
  },
  {
    name: "vendorlock",
    align: "center",
    label: "Vendorlock",
    field: "vendorlock",
    sortable: true,
  },
  {
    name: "open-source",
    align: "center",
    label: "Opensource",
    field: "opensource",
    sortable: true,
  },
];

export default defineComponent({
  name: "ResultPage",
  setup() {
    const rows = ref([
      {
        name: "Databricks",
        rbac: "✓",
        notebook: "✓",
        experiment: "✓",
        model: "✓",
        annotator: "x",
        llmops: "✓",
        datadrift: "x",
        modeldrift: "✓",
        hyperparameter: "x",
        dataversioning: "~",
        etl: "✓",
        automl: "✓",
        vendorlock: "Databricks, Azure, AWS, GCP",
        opensource: "x",
      },
      {
        name: "Sagemaker",
        rbac: "✓",
        notebook: "✓",
        experiment: "✓",
        model: "✓",
        annotator: "✓",
        llmops: "✓",
        datadrift: "✓",
        modeldrift: "✓",
        hyperparameter: "x",
        dataversioning: "~",
        etl: "✓",
        automl: "✓",
        vendorlock: "AWS",
        opensource: "x",
      },
      {
        name: "Azure ML",
        rbac: "✓",
        notebook: "✓",
        experiment: "✓",
        model: "✓",
        annotator: "✓",
        llmops: "✓",
        datadrift: "✓",
        modeldrift: "✓",
        hyperparameter: "x",
        dataversioning: "✓",
        etl: "✓",
        automl: "✓",
        vendorlock: "Azure",
        opensource: "x",
      },
      {
        name: "KubeFlow",
        rbac: "✓",
        notebook: "✓",
        experiment: "✓",
        model: "✓",
        annotator: "x",
        llmops: "x",
        datadrift: "x",
        modeldrift: "x",
        hyperparameter: "✓",
        dataversioning: "~",
        etl: "~",
        automl: "✓",
        vendorlock: "Kubernetes cluster",
        opensource: "✓",
      },
      {
        name: "H2O.AI",
        rbac: "✓",
        notebook: "✓",
        experiment: "✓",
        model: "✓",
        annotator: "✓",
        llmops: "✓",
        datadrift: "✓",
        modeldrift: "✓",
        hyperparameter: "x",
        dataversioning: "✓",
        etl: "x",
        automl: "✓",
        vendorlock: "Nee",
        opensource: "✓",
      },
      {
        name: "Vertex ai",
        rbac: "✓",
        notebook: "✓",
        experiment: "✓",
        model: "✓",
        annotator: "✓",
        llmops: "~",
        datadrift: "✓",
        modeldrift: "✓",
        hyperparameter: "x",
        dataversioning: "x",
        etl: "✓",
        automl: "✓",
        vendorlock: "GCP",
        opensource: "x",
      },
      {
        name: "Datarobot",
        rbac: "✓",
        notebook: "✓",
        experiment: "✓",
        model: "✓",
        annotator: "✓",
        llmops: "✓",
        datadrift: "✓",
        modeldrift: "✓",
        hyperparameter: "✓",
        dataversioning: "~",
        etl: "x",
        automl: "✓",
        vendorlock: "Ja",
        opensource: "x",
      },
      {
        name: "Weights and biases",
        rbac: "✓",
        notebook: "x",
        experiment: "✓",
        model: "✓",
        annotator: "✓",
        llmops: "✓",
        datadrift: "x",
        modeldrift: "✓",
        hyperparameter: "✓",
        dataversioning: "✓",
        etl: "✓",
        automl: "✓",
        vendorlock: "Nee",
        opensource: "✓",
      },
      {
        name: "MLflow",
        rbac: "x",
        notebook: "x",
        experiment: "✓",
        model: "✓",
        annotator: "✓",
        llmops: "✓",
        datadrift: "x",
        modeldrift: "x",
        hyperparameter: "x",
        dataversioning: "x",
        etl: "x",
        automl: "x",
        vendorlock: "Nee",
        opensource: "✓",
      },
      {
        name: "Dagshub",
        rbac: "✓",
        notebook: "x",
        experiment: "✓",
        model: "✓",
        annotator: "✓",
        llmops: "✓",
        datadrift: "x",
        modeldrift: "x",
        hyperparameter: "x",
        dataversioning: "✓",
        etl: "x",
        automl: "x",
        vendorlock: "Ja",
        opensource: "x",
      },
      {
        name: "ClearML",
        rbac: "✓",
        notebook: "x",
        experiment: "✓",
        model: "✓",
        annotator: "✓",
        llmops: "✓",
        datadrift: "✓",
        modeldrift: "✓",
        hyperparameter: "✓",
        dataversioning: "✓",
        etl: "x",
        automl: "x",
        vendorlock: "Nee",
        opensource: "✓",
      },
    ]);
    const router = useRouter();
    const { t } = useI18n()
    const route = useRoute();
    const answerStore = useAnswerStore();
    let result = answerStore.results[answerStore.results.length - 1];
    if (route.query.hasOwnProperty("result_id")) {
      result = answerStore.results.find(
        (item) => item.id === route.query.result_id
      );
    }

    if (result.length === 0) {
      router.push("/");
    }
    const answers = result.answers;
    const id = result.id;
    const timestamp = result.timestamp;
    const tools = answerStore.tools;
    const questions = answerStore.questions;
    const currentIndex = ref(-1);

    const sortedTools = ref([]);

    const sortTools = (tools) => {
      let static_tools = JSON.parse(JSON.stringify(tools));
      static_tools.forEach((tool) => {
        tool.matches = calculateMatches(tool);
        tool.clashes = calculateClaches(tool);
        tool.numberOfMatches = numberOfMatches(tool);
        tool.numberOfClashes = numberOfClashes(tool);
        tool.percentage =
          (tool.numberOfMatches /
            (tool.numberOfMatches + tool.numberOfClashes)) *
          100;
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
    };

    const delay = 200; //
    onMounted(() => {
      sortedTools.value = sortTools(tools);
      sortedTools.value.forEach((_, index) => {
        setTimeout(() => {
          currentIndex.value = index;
        }, index * delay);
      });
    });

    const calculateMatches = (tool) => {
      let matching_questions = JSON.parse(JSON.stringify(questions));
      tool.good_compatible.forEach((rule) => {
        let matching_question = matching_questions.find(
          (match) => match.id === rule.question_id
        );
        answers.forEach((answer) => {
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

    const sortedRows = computed(() => {
      return rows.value.slice().sort((a, b) => {
        let toolA = sortedTools.value.find((tool) => tool.title === a.name);
        let toolB = sortedTools.value.find((tool) => tool.title === b.name);

        if (
          toolA &&
          toolA.hasOwnProperty("percentage") &&
          toolB &&
          toolB.hasOwnProperty("percentage")
        ) {
          if (toolB.percentage === toolA.percentage) {
            return toolB.numberOfMatches - toolA.numberOfMatches;
          } else {
            return toolB.percentage - toolA.percentage;
          }
        } else {
          return -1;
        }
      });
    });
    const calculateClaches = (tool) => {
      let matching_questions = JSON.parse(JSON.stringify(questions));
      tool.bad_compatible.forEach((rule) => {
        let matching_question = matching_questions.find(
          (match) => match.id === rule.question_id
        );
        answers.forEach((answer) => {
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

    const itemRefs = ref([]);

    const chosenTool = ref(null);
    const showDialog = ref(false);

    const openDialog = (tool) => {
      chosenTool.value = tool;
      showDialog.value = true;
    };

    const showPreviousTool = (tool) => {
      if (chosenTool.value.rank - 1 >= 1) {
        chosenTool.value = sortedTools.value.find(
          (tool) => tool.rank === chosenTool.value.rank - 1
        );
      }
    };

    const showNextTool = (tool) => {
      if (chosenTool.value.rank + 1 <= sortedTools.value.length) {
        chosenTool.value = sortedTools.value.find(
          (tool) => tool.rank === chosenTool.value.rank + 1
        );
      }
    };

    const showTool = (id) => {
      chosenTool.value = sortedTools.value.find((tool) => tool.id === id);
    };

    return {
      router,
      tools,
      answers,
      showPreviousTool,
      showNextTool,
      showTool,
      chosenTool,
      showDialog,
      openDialog,
      t,
      sortedTools,
      rows,
      columns,
      itemRefs,
      currentIndex,
      delay,
      sortedRows,
      id,
      timestamp,
    };
  },
  components: { ToolItem, ToolDialog },
});
</script>
