<template>
  <van-config-provider >
    <router-view></router-view>
  </van-config-provider>
</template>

<script setup lang="ts">
import globalStore from "./store/globalStore";
import { showToast } from "vant";
import type { ConfigProviderThemeVars } from "vant";

window.onerror = function () {
  showToast("控制台有报错");
  globalStore.consoleErrorCount++;
};
</script>

<style>
:root {
  /* --van-primary-color: #79CFA5; */
}
</style>

<style scoped>
</style>
