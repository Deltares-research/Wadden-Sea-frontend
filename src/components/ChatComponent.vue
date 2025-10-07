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
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { useAppStore } from '@/stores/app';
  import 'deep-chat'

  const route = useRoute();

  const history = ref([])
  const item = ref(null);

  onMounted(async () => {

    const appStore = useAppStore()
    await appStore.loadItems()
    item.value = appStore.items.find((i) => i.id === route.params.id);
    if (item.value) {
      history.value = [{ role: "ai", text: item.value.introduction || "Hello! I'm excited to chat with you about the Wadden Sea. Ask me anything!" }]
    }

  })


</script>

<style scoped></style>