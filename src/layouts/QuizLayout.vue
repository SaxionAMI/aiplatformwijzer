<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
export default defineComponent({
  name: "MainLayout",
  setup() {
    const router = useRouter();

    const goToRoute = (route_name) => {
      router.push({ name: route_name });
    };

    return { goToRoute };
  },
});
</script>
