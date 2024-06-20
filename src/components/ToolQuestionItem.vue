<template>
  <div>
    <div
      class="q-pa-md text-center circle"
      @mouseover="isHovered = true"
      @mouseleave="isHovered = false"
      :class="{
        enlarged: isHovered & !props.noHover,
      }"
    >
      <div class="cursor-pointer">
        <q-knob
          @click="openDialog"
          show-value
          v-model="props.tool.percentage"
          color="positive"
          :size="props.size"
          readonly
          track-color="negative"
        >
          <q-icon square>
            <img :src="getImgUrl(props.tool.img_link)" />
          </q-icon>
          <q-menu
            v-if="props.question"
            style="height: fit-content !important"
            class="card q-pa-lg"
          >
            <div class="text-h5 text-weight-bolder">
              {{ props.tool.title }}
            </div>

            <div v-if="currentClashes">
              De volgende
              <span class="text-negative text-weight-bold">clashes</span> zijn
              gevonden:
              <ul>
                <li :key="index" v-for="(clash, index) in currentClashes">
                  <div v-html="clash.explanation"></div>
                </li>
              </ul>
            </div>
            <div v-if="currentMatches">
              De volgende
              <span class="text-positive text-weight-bold">matches</span> zijn
              gevonden:
              <ul>
                <li :key="index" v-for="(match, index) in currentMatches">
                  {{ match.explanation }}
                </li>
              </ul>
            </div>
            <div v-if="!currentMatches && !currentClashes">
              <b><i>Selecteer</i></b> een vraag om een beschrijving per tool te
              kunnen zien
            </div>
            <b> Tusssenstand</b>
            <div>
              Clashes:
              {{ props.tool.numberOfClaches ? props.tool.numberOfClaches : 0 }}
            </div>
            <div>
              Matches:
              {{ props.tool.numberOfMatches ? props.tool.numberOfMatches : 0 }}
            </div>
            <div>Score: {{ props.tool.percentage.toFixed(0) }}%</div>
          </q-menu>
        </q-knob>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, defineExpose } from "vue";
import { useAnswerStore } from "../stores/answerStore";
export default defineComponent({
  name: "ToolQuestionItem",
  props: {
    tool: {
      type: Object,
    },
    rank: {
      type: Number,
    },
    size: {
      type: String,
    },
    question: {
      type: Object,
    },
    noHover: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["openDialog"],
  setup(props, { emit }) {
    const answerStore = useAnswerStore();
    const isHovered = ref(false);

    const getImgUrl = (link) => {
      return new URL(`../assets/small/${link}`, import.meta.url).href;
    };

    const openDialog = () => {
      emit("openDialog", props.tool);
    };

    const goTo = () => {
      window.open(props.tool.link, "_blank").focus();
    };

    const currentMatches = computed(() => {
      if (props.question) {
        return props.tool.matches.find(
          (match) => match.id === props.question.id
        ).matches;
      }
      return null;
    });

    const currentClashes = computed(() => {
      if (props.question) {
        return props.tool.clashes.find(
          (clash) => clash.id === props.question.id
        ).matches;
      }
      return null;
    });

    return {
      props,
      goTo,
      emit,
      currentMatches,
      currentClashes,
      answerStore,
      getImgUrl,
      openDialog,
      isHovered,
    };
  },
});
</script>
