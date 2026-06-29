<template>
  <header class="header">
    <div class="header-top">
      <!-- 左 -->
      <div class="header-left">
        <h1 class="site-title" @click="goHome">管理画面</h1>
        <p class="site-description">Admin Panel</p>
      </div>

      <!-- 右 -->
      <div class="header-right">
        <div class="header-links" v-if="route.path !== '/'">
          <a @click="go('/orders')">注文管理</a>
          <a @click="go('/products')">商品管理</a>
          <a @click="go('/users')">ユーザー管理</a>
        </div>
      </div>
    </div>
  </header>
  <hr />
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const go = (path) => {
  router.push(path);
};

const goHome = () => {
  router.push("/");
};
</script>
