<template>
  <main>
    <page-layout></page-layout>
  </main>
  <van-tabbar v-model="activeTabbar">
    <van-tabbar-item name="home" to="/">
      ้ฆ้กต
      <template #icon="props">
        <van-icon name="wap-home" v-show="props.active" />
        <van-icon name="wap-home-o" v-show="!props.active" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item name="member" to="/my">
      ๆ็
      <template #icon="props">
        <van-icon name="manager" v-show="props.active" />
        <van-icon name="manager-o" v-show="!props.active" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import PageLayout from "./PageLayout.vue";
import { useRoute, useRouter } from 'vue-router';

const Route = useRoute();
const Router = useRouter();

Router.afterEach((to) => {
  activeTabbar.value = to.name.toString();
})

const activeTabbar = ref<string>(Route.name.toString());

</script>

<style scoped>

</style>