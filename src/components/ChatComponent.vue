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
    :connect="{'handler': handler}"
    :demo="false"
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

  function handler(body, signals) {
    const message = body.messages[body.messages.length - 1];
    try {
      fetch("/api/query",{
        method: "POST",
        headers : {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({query: message.text})}
      ).then(response => response.json())
        .then(data => {
          signals.onResponse({role:"ai", text: data.answer }) });
    } catch (e) {
      console.error("Error in handler:", e);
    }
  }


</script>

<style scoped></style>