import { createRouter, createWebHistory } from "vue-router";

import AdminHome from "@/views/AdminHome.vue";
import AdminOrders from "@/views/AdminOrders.vue";
import AdminProducts from "@/views/AdminProducts.vue";
import AdminUsers from "@/views/AdminUsers.vue";

const routes = [
  { path: "/", component: AdminHome },
  { path: "/orders", component: AdminOrders },
  { path: "/products", component: AdminProducts },
  { path: "/users", component: AdminUsers },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
