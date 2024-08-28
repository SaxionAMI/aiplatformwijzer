<template>
  <q-dialog v-model="value" maximized>
    <q-card>
      <div>
        <div style="position: absolute; left: 1em; top: 1em; z-index: 100">
          <q-btn
            color="negative"
            class="q-mr-sm"
            round
            push
            icon="close"
            v-close-popup
          />
          <q-btn
            color="primary"
            round
            push
            v-if="props.tool.rank > 1"
            icon="navigate_before"
            @click="emit('showPreviousTool')"
          />
        </div>

        <q-btn
          color="primary"
          round
          push
          icon="navigate_next"
          v-if="props.tool.rank < answerStore.tools.length"
          @click="emit('showNextTool')"
          style="position: absolute; right: 1em; top: 1em; z-index: 100"
        />
        <div class="flex flex-center q-ma-md">
          <!-- <q-card class="card"> -->
          <!-- <q-card-section> -->
          <img
            :src="getImgUrlLarge(props.tool.img_link)"
            style="max-height: 30vh; max-width: 100%; width: auto; height: auto"
            ref="ScrollToMe"
          />

          <!-- </q-card-section> -->
          <!-- </q-card> -->

          <q-card-section>
            <div class="text-weight-bolder text-center text-h5">
              {{ percentage }} % Match
            </div>
            <!-- <q-card class="card"> -->
            <q-card-section class="text-center">
              <div class="text-h5 text-weight-bolder">
                <a :href="props.tool.link" target="_blank">{{
                  props.tool.title
                }}</a>
              </div></q-card-section
            >
            <q-card-section> {{ props.tool.description }}</q-card-section>
            <!-- </q-card> -->
          </q-card-section>
          <q-card-actions align="around">
            <q-chip class="float-right" text-color="white" color="negative"
              >Clashes {{ props.tool.numberOfClashes }}
              <q-icon class="q-ma-sm" size="md" name="close"
            /></q-chip>
            <q-chip cl text-color="white" color="positive"
              >Matches {{ props.tool.numberOfMatches }}
              <q-icon class="q-ma-sm" size="md" name="done"
            /></q-chip>
          </q-card-actions>
        </div>
        <!-- <q-separator class="q-my-md" /> -->
        <div class="row q-col-gutter-md q-ma-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div class="text-h3 text-weight-bolder text-negative text-center">
              Clashes
            </div>

            <div
              v-if="
                !props.tool.clashes.find((e) => e.hasOwnProperty('matches'))
              "
            >
              {{$t('tool.no_clashes_found')}}
            </div>
            <div v-else>
              <match-item
                :match="clash"
                :isMatch="false"
                @showTool="showTool"
                :tool_id="props.tool.id"
                :question_number="index"
                :key="index"
                :tools="tools"
                v-for="(clash, index) in props.tool.clashes"
              >
              </match-item>
            </div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div class="text-h3 text-weight-bolder text-positive text-center">
              Matches
            </div>

            <div
              v-if="
                !props.tool.matches.find((e) => e.hasOwnProperty('matches'))
              "
            >
              {{$t('tool.no_matches_found')}}
            </div>
            <div v-else>
              <match-item
                :match="match"
                :isMatch="true"
                :tools="tools"
                :key="index"
                :tool_id="props.tool.id"
                @showTool="showTool"
                v-for="(match, index) in props.tool.matches"
                :question_number="index"
                class="q-my-md"
              >
              </match-item>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useQuasar } from "quasar";
import { useAnswerStore } from "../stores/answerStore";

import MatchItem from "./MatchItem.vue";
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: "ToolDialog",
  props: ["modelValue", "tool", "answers"],
  emits: ["update:modelValue", "showNextTool", "showPreviousTool", "showTool"],
  components: { MatchItem },
  setup(props, { emit }) {
    const q = useQuasar();
    const { t } = useI18n()
    const answerStore = useAnswerStore();
    const tools = ref(answerStore.tools);
    const ScrollToMe = ref();

    const showTool = (index) => {
      emit("showTool", index);
      const el = ScrollToMe.value;
      el.scrollIntoView({ behavior: "smooth" });
    };
    const getImgUrlLarge = (link) => {
      return new URL(`../assets/large/${link}`, import.meta.url).href;
    };
    const getImgUrlSmall = (link) => {
      return new URL(`../assets/small/${link}`, import.meta.url).href;
    };
    const value = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
      },
    });

    const percentage = computed(() => {
      return (
        (props.tool.numberOfMatches /
          (props.tool.numberOfMatches + props.tool.numberOfClashes)) *
        100
      ).toFixed(2);
    });

    return {
      props,
      t,
      getImgUrlLarge,
      q,
      getImgUrlSmall,
      emit,
      percentage,
      tools,
      value,
      ScrollToMe,
      showTool,
      answerStore,
    };
  },
});
</script>
