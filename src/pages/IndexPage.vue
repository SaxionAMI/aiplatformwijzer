<template>
  <q-page class="flex flex-center">
    <q-card class="q-ma-md card q-pa-md">
      <q-card-section class="text-h5 text-weight-bolder"
        >Toolbox</q-card-section
      >
      <q-card-section>Introductie</q-card-section>
      <q-card-actions align="center">
        <q-btn
          rounded
          push
          class="float-center"
          color="primary"
          label="Start AI-platformwijzer"
          no-caps
          @click="router.push('/aiplatformwijzer')"
        />
        <q-btn
          rounded
          push
          class="float-center"
          color="primary"
          label="Start datawijzer"
          no-caps
          @click="router.push('/datawijzer')"
        />
        <q-btn
          class="float-center"
          color="primary"
          rounded
          push
          label="Start standaardenwijzer"
          no-caps
          @click="router.push('/standaardenwijzer')"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAnswerStore } from "../stores/answerStore";
export default defineComponent({
  name: "IndexPage",
  setup() {
    const router = useRouter();
    const answerStore = useAnswerStore();
    const getImgUrl = (link) => {
      return new URL(`../assets/${link}`, import.meta.url).href;
    };

    return {
      router,
      getImgUrl,
      answerStore,
    };
  },
});
</script>
