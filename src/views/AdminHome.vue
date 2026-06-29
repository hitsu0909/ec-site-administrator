<template>
  <div class="container">
    <!-- <h1 class="site-title">管理画面</h1> -->
    <AdminHeaderBar />
    <div class="menu">
      <button class="menu-btn" @click="go('/orders')">注文管理</button>

      <button class="menu-btn" @click="go('/products')">商品管理</button>

      <button class="menu-btn" @click="go('/users')">ユーザー管理</button>
    </div>
    <AdminFooterBar />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import AdminHeaderBar from "@/components/AdminHeaderBar.vue";
import AdminFooterBar from "@/components/AdminFooterBar.vue";
const router = useRouter();

const go = (path) => {
  router.push(path);
};
</script>
