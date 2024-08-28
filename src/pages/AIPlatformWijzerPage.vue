<template>
  <q-page>
    <div class="row">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-card class="q-ma-md card q-pa-md">
          <q-card-section class="text-h5 text-weight-bolder"
            >{{$t('home.introduction.title')}}</q-card-section
          >
          <q-separator inset />
          <q-card-section
            ><p>
            {{$t('home.introduction.text')}}

            </p>
            <p>
              {{$t('home.introduction.tutorial')}}
            </p>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn
              push
              rounded
              no-caps
              class="float-center"
              color="accent"
              :label="$t('home.introduction.btn.start')"
              @click="router.push('/quiz')"
            />
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-card class="q-ma-md card q-pa-md">
          <q-card-section class="text-h5 text-weight-bolder"
            >{{$t('home.about.title')}}</q-card-section
          ><q-separator inset />
          <q-card-section>
            {{$t('home.about.text')}}
          </q-card-section
          >
          <q-card-actions
            ><q-btn
              rounded
              push
              no-caps
              color="primary"
              @click="
                openLink(
                  'https://www.saxion.edu/business-and-research/research/smart-industry/ambient-intelligence'
                )
              "
              :label="$t('home.about.btn.more_info')"/></q-card-actions
        ></q-card>

        <div class="col-md-6 col-sm-12 col-xs-12">
          <q-card class="q-ma-md card q-pa-md">
            <q-card-section class="text-h5 text-weight-bolder"
              >{{$t('home.results.title')}}</q-card-section
            ><q-separator inset />
            <q-card-section v-if="answerStore.results.length === 0">
              {{$t('home.results.no_results')}}</q-card-section
            >
            <q-card-section v-else class="row q-col-gutter-sm">
              <div
                :key="result.id"
                class="col-md-6 col-sm-12 col-xs-12"
                v-for="result in answerStore.results"
              >
                <div class="flex justify-center">
                  <result-card :result="result"/>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <q-card class="q-ma-md card q-pa-md">
          <q-card-section class="text-h5 text-weight-bolder"
            >{{$t('home.tools.title')}}</q-card-section
          >
          <q-separator inset />
          <q-card-section>
            <div class="flex">
              <div
                :key="tool.id"
                v-for="tool in answerStore.tools"
                class="q-ma-sm text-weight-bolder cursor-pointer"
                @click="openLink(tool.link)"
              >
                <q-avatar square>
                  <img :src="getImgUrl(tool.img_link)" />
                </q-avatar>
                {{ tool.title }}
              </div>
            </div></q-card-section
          ></q-card
        >
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAnswerStore } from "../stores/answerStore";
import ToolQuestionItem from "src/components/ToolQuestionItem.vue";
import ResultCard from "components/ResultCard.vue";
import { useI18n } from 'vue-i18n'


export default defineComponent({
  name: "AIPlatformWijzerPage",
  components: {ResultCard},
  setup() {
    const { t } = useI18n()
    const router = useRouter();
    const answerStore = useAnswerStore();
    // Reset answers/ results when coming on this page
    answerStore.resetQuiz()
    const getImgUrl = (link) => {
      return new URL(`../assets/small/${link}`, import.meta.url).href;
    };

    const openLink = (link) => {
      window.open(link, "_blank");
    };




    return {
      router,
      t,
      getImgUrl,
      answerStore,
      openLink,
    };
  },
});
</script>
