<template>
  <deep-chat
    style=" border-radius: 8px;
    background-color: #f7f7f7;
    opacity: 0.85;
    border-radius: 8px;    
    width: 600px;
    height: 600px;
    max-width: 1200px;
    max-height: 900px;
    pointer-events: auto;"
    :demo="true"
    :text-input="{ placeholder: { text: 'Welcome to the demo!' } }"
    :history="history"
  />
</template>

<script setup>
  import 'deep-chat'
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'
  // const route = useRoute();

  const history = ref([
    {role: "ai", text: "Hello! I'm a "}
  ])


</script>

<style scoped></style>