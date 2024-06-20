const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "index",
        component: () => import("pages/AIPlatformWijzerPage.vue"),
      },
      {
        name: "aiplatformwijzer",
        path: "aiplatformwijzer",
        component: () => import("pages/AIPlatformWijzerPage.vue"),
      },
      {
        name: "datawijzer",
        path: "datawijzer",
        component: () => import("pages/QuizPage.vue"),
      },

      {
        name: "standaardenwijzer",
        path: "standaardenwijzer",
        component: () => import("pages/QuizPage.vue"),
      },

      {
        name: "result",
        path: "result",
        component: () => import("pages/ResultPage.vue"),
      },
      {
        name: "toolsmaker",
        path: "toolsmaker",
        component: () => import("pages/ToolsMakerPage.vue"),
      },
      {
        name: "questionmaker",
        path: "questionmaker",
        component: () => import("pages/QuestionMakerPage.vue"),
      },
      // Always leave this as last one,
      // but you can also remove it
      {
        path: "/:catchAll(.*)*",
        component: () => import("pages/ErrorNotFound.vue"),
      },
    ],
  },
  {
    path: "/quiz",
    component: () => import("layouts/QuizLayout.vue"),
    children: [
      {
        name: "quiz",
        path: "",
        component: () => import("pages/QuizPage.vue"),
      },
      {
        name: "intro",
        path: "intro",
        component: () => import("pages/IntroPage.vue"),
      },
    ],
  },
];

export default routes;
