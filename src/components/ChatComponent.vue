<template>
    <deep-chat class="chat" :demo="true" :textInput="{ placeholder: { text: 'Welcome to the demo!' } }" :history="history" />
</template>

<script setup>
import 'deep-chat'
</script>

<style scoped>
.chat {
    border-radius: 8px;
    background-color: #f7f7f7;
    opacity: 0.85;
    border-radius: 8px;
    
  min-width: 800px;
  min-height: 800px;
  max-width: 1200px;
  max-height: 900px;
  pointer-events: auto;
}
.chat-view {
   
}
</style>