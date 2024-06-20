<template>
  <q-page>
    <div class="q-ma-md">Introduction here</div>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "IntroPage",
  setup() {
    const router = useRouter();
    const route = useRoute();

    return {};
  },
});
</script>
