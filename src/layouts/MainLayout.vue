<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <!-- <q-btn flat @click="drawer = !drawer" round dense icon="menu" /> -->
        <img
          class="q-ma-sm"
          src="../assets/lg_saxion_wit.png"
          style="height: 6vh"
          @click="goToRoute('index')"
        />
        <q-toolbar-title v-if="!q.screen.lt.sm" class="absolute-center text-h5">
          AI-Platformwijzer
        </q-toolbar-title>
        <div  style="position:absolute; right: 0">
        <locale-switcher class="q-ma-md"/>
        </div>
      </q-toolbar>
    </q-header>

    <!-- <q-drawer
      v-model="drawer"
      show-if-above
      :width="200"
      :breakpoint="500"
      bordered
      :class="q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item
              clickable
              :active="menuItem.label === 'Outbox'"
              v-ripple
              @click="goToRoute(menuItem.route_name)"
            >
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from 'vue-i18n'
import LocaleSwitcher from "components/LocaleSwitcher.vue";
export default defineComponent({
  name: "MainLayout",
  components: {LocaleSwitcher},
  setup() {
    const router = useRouter();
    const q = useQuasar();
    const menuList = [
      {
        icon: "home",
        label: "Hoofdscherm",
        route_name: "index",
        separator: true,
      },
      {
        icon: "quiz",
        label: "AI-Platformwijzer",
        route_name: "aiplatformwijzer",
        separator: false,
      },
      {
        icon: "quiz",
        label: "Data wijzer",
        route_name: "datawijzer",
        separator: false,
      },
      {
        icon: "quiz",
        label: "Standaarden wijzer",
        route_name: "standaardenwijzer",
        separator: false,
      },
    ];

    const goToRoute = (route_name) => {
      router.push({ name: route_name });
    };

    return { drawer: ref(false), menuList, goToRoute, q };
  },
});
</script>
