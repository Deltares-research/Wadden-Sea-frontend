<template>
  <AppTopBar />
  <v-main>
    <router-view />
  </v-main>
</template>

<script setup>
  import AppTopBar from "@/components/AppTopBar.vue";
</script>
