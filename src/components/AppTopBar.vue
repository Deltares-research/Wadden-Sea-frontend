<template>
  <v-app-bar
    flat
    density="comfortable"
    :style="{ backgroundColor: '#141e95', color: 'white' }"
  >
    <v-app-bar-title>Voice for Nature – Wadden Sea</v-app-bar-title>

    <v-spacer />

    <!-- Gallery / Home button on the right -->
    <v-btn
      icon
      variant="text"
      :to="{ name: 'home' }"
      aria-label="Open gallery"
      class="text-white"
    >
      <v-icon icon="mdi-grid" />
    </v-btn>
  </v-app-bar>
</template>

<script setup>
// no script needed
</script>
