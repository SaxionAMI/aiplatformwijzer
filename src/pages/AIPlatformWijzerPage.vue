<template>
  <q-page>
    <div class="row">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-card class="q-ma-md card q-pa-md">
          <q-card-section class="text-h5 text-weight-bolder"
            >De Quiz</q-card-section
          >
          <q-separator inset />
          <q-card-section
            ><p>
              Welkom bij de AI platformwijzer! Als u hier bent beland, dan bent
              u hoogstwaarschijnlijk op zoek naar dé datapipeline tool voor uw
              organisatie. Goed nieuws, daarvoor bent u hier aan het goede
              adres!
            </p>
            <p>
              Als u op onderstaande knop klikt, krijg je een aantal vragen die
              ons helpen te bepalen wat je nodig hebt. De vragen variëren van de
              aard van de dataverwerking, schaalbaarheid, gewenste
              functionaliteiten tot de mate van ervaring met verschillende tools
              en programmeertalen. Op basis van de verzamelde antwoorden en een
              geavanceerd algoritme, wordt een gedetailleerde aanbeveling
              gegenereerd die aangeeft welk dataplatform het beste aansluit bij
              de specifieke kenmerken en vereisten van de gebruiker. De
              aanbeveling omvat toonaangevende dataplatformen, zoals Amazon
              SageMaker, Databricks, Microsoft Azure Machine Learning, en andere
              relevante platforms. U krijgt niet alleen een passend dataplatform
              aangereikt, maar ook nuttige informatie en richtlijnen over waarom
              dit platform het beste bij uw behoefte past, waardoor u
              weloverwogen beslissingen kunt nemen voor uw data-analyse- en
              machine learning-projecten.
            </p>
            <p>Succes!</p>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn
              push
              rounded
              no-caps
              class="float-center"
              color="accent"
              label="Start de quiz"
              @click="router.push('/quiz')"
            />
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-card class="q-ma-md card q-pa-md">
          <q-card-section class="text-h5 text-weight-bolder"
            >Over het Ambient Intelligence Lectoraat</q-card-section
          ><q-separator inset />
          <q-card-section>
            Deze tool is ontwikkeld door de onderzoeksgroep Ambient
            Intelligence. Ambiente Intelligentie maakt omgevingen slim. De
            onderzoeksgroep richt zich voornamelijk op toepassingen die verband
            houden met veiligheid, sport en slimme industrie.
            Veiligheidsprojecten worden vaak in samenwerking met de brandweer
            uitgevoerd. In deze projecten zijn oplossingen ontwikkeld om te
            bepalen waar een brandweerman zich bevindt in gebouwen zonder
            infrastructuur met sensoren.</q-card-section
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
              label="Meer informatie" /></q-card-actions
        ></q-card>

        <div class="col-md-6 col-sm-12 col-xs-12">
          <q-card class="q-ma-md card q-pa-md">
            <q-card-section class="text-h5 text-weight-bolder"
              >Resultaten</q-card-section
            ><q-separator inset />
            <q-card-section v-if="answerStore.results.length === 0">
              Nog geen resultaten!</q-card-section
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
            >De Tools</q-card-section
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
export default defineComponent({
  name: "AIPlatformWijzerPage",
  components: {ResultCard},
  setup() {
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
      getImgUrl,
      answerStore,
      openLink,
    };
  },
});
</script>
