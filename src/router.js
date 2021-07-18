import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/",
        alias: "/tutoriais",
        name: "tutoriais",
        component: () => import("./components/TutoriaisLista")
    },

    {
        path: "/tutoriais/:id",
        name: "tutoriais-detalhe",
        component: () => import("./components/Tutorial")
    },

    {
        path: "/add",
        name: "add",
        component: () => import("./components/AddTutorial")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;