<template>
  <v-container class="py-12">
    <h1 class="text-h4 mb-4">Voice for Nature – Wadden</h1>
    <p class="mb-6">
      Welcome! This is the temporary home page. Click below to view the
      Seagrass.
    </p>
    <v-btn color="primary" :to="{ name: 'seagrass' }">Go to Seagrass</v-btn>
  </v-container>
</template>

<script setup>
definePage({
  name: "home",
  meta: { layout: "FullBleedLayout" },
});
</script>
