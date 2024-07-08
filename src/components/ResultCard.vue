

<template>
  <q-card class="card">
    <div>
      <q-btn
        style="position: absolute; z-index: 100"
        push
        @click="removeResult(result.id)"
        color="negative"
        icon="clear"
        round
        size="sm"
      ></q-btn>
      <q-btn
        round
        style="position: absolute; z-index: 100; right: 0"
        no-caps
        @click="goToResult(result.id)"
        push
        color="primary"
        icon="arrow_right"
      />
    </div>
    <div class="text-center full-width q-mt-sm">
      <div class="text-weight-bolder">
        {{
          new Date(result.timestamp).toLocaleDateString(
            "en-CA",
            {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }
          )
        }}
      </div>
      <span style="font-size: x-small"> {{ result.id }}</span>
      <q-separator inset dense />
    </div>
    <q-card-section class="row justify-around" :disable="true">
      <div
        :key="index"
        v-for="(tool, index) in result.top_3"
        class=" col-md-3 col-sm-6 col-xs-6 text-center justify-center"
      >
        <tool-question-item
          :tool="tool"
          no-hover
          :size="'70px'"
        />
        <div class="text-weight-bolder ">{{ index + 1 }}</div>
      </div>
    </q-card-section>
  </q-card>
</template>


<script>
import { defineComponent, ref, computed, defineExpose } from "vue";
import { useAnswerStore } from "stores/answerStore";
import ToolQuestionItem from "components/ToolQuestionItem.vue";
import {useRouter} from "vue-router";
export default defineComponent({
  name: "ResultCard",
  components: {ToolQuestionItem},
  props: {
    result: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    const answerStore = useAnswerStore();
    const router = useRouter();

    const removeResult = (id) => {
      answerStore.results = answerStore.results.filter(
        (item) => item.id !== id
      );
    };

    const goToResult = (id) => {
      router.push({ name: "result", query: { result_id: id } });
    };


    return {
      props,
      emit,
      router,
      removeResult,
      goToResult
    };
  },
});
</script>
