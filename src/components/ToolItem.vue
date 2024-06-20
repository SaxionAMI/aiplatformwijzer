<template>
  <div class="cursor-pointer">
    <q-card
      @click="openDialog"
      class="text-center card row circle"
      @mouseover="isHovered = true"
      @mouseleave="isHovered = false"
      :class="{
        enlarged: isHovered,
      }"
    >
      <div class="col-2">
        <div>
          <q-knob
            show-value
            v-model="props.tool.percentage"
            color="positive"
            :size="props.size"
            readonly
            track-color="negative"
          >
            <!-- <div v-if="props.flat" class="text-black">
            {{ props.tool.percentage.toFixed(0) }}%
          </div> -->
            <q-icon square>
              <img :src="getImgUrl(props.tool.img_link)" />
            </q-icon>
          </q-knob>
        </div>
      </div>
      <div class="col-8">
        <div class="text-weight-bolder text-center text-h6">
          {{ props.tool.title }}
        </div>
        <i class="Text-center text-h6">
          {{ props.tool.percentage.toFixed(1) }}% Match
        </i>
      </div>
      <div class="text-weight-bolder col-2 flex flex-center">
        <!-- <q-avatar> {{ props.tool.rank }}</q-avatar> -->
        <q-icon
          size="lg"
          v-if="props.tool.rank === 1"
          name="emoji_events"
          color="yellow"
        />
        <div v-else>
          <q-icon
            v-if="props.tool.rank === 2 || props.tool.rank === 3"
            size="lg"
            name="military_tech"
            :color="props.tool.rank === 2 ? 'grey' : 'brown'"
          />
          <i v-else>{{ `${props.tool.rank}de` }}</i>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, ref, computed, defineExpose } from "vue";
import { useAnswerStore } from "../stores/answerStore";
export default defineComponent({
  name: "ToolItem",
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

    return {
      props,
      goTo,
      emit,
      getImgUrl,
      openDialog,
      isHovered,
    };
  },
});
</script>
