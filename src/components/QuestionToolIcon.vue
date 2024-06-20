<template>
  <div>
    <q-avatar
      square
      v-if="!isMobile"
      @mouseover="showTooltip"
      @mouseleave="hideTooltip"
    >
      <img :src="getImgUrl(tool.img_link)" />
    </q-avatar>
    <q-avatar square v-else @click="tooltipVisible = !tooltipVisible">
      <img :src="getImgUrl(tool.img_link)" />
    </q-avatar>
    <q-card
      v-if="tooltipVisible"
      class="tooltip"
      @mouseover="showTooltip"
      @mouseleave="hideTooltip"
      ><q-card-section
        ><div v-html="tool.match.explanation"></div></q-card-section
    ></q-card>
  </div>
</template>

<script>
import { defineComponent, ref, computed, defineExpose } from "vue";
import { useAnswerStore } from "../stores/answerStore";
import { useQuasar } from "quasar";
export default defineComponent({
  name: "QuestionToolItem",
  props: {
    tool: {
      type: Object,
    },
  },
  emits: ["tool"],
  setup(props, { emit }) {
    const q = useQuasar();
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
    const getImgUrl = (link) => {
      return new URL(`../assets/small/${link}`, import.meta.url).href;
    };
    return { getImgUrl, hideTooltip, showTooltip, tooltipVisible, isMobile };
  },
});
</script>
