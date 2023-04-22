<script setup>
import { RouterLink, RouterView } from "vue-router";
import Header from "./components/Header.vue";
</script>

<template>
  <Header />
  <RouterView />
</template>

<style lang="scss">
$primary: #798cd1;
$secondary: #b0c1ff;
$bg: #e9efff;
$gold: #d2a517;

@import "bootstrap";
</style>
