<template>
<deep-chat
    :demo="true"
    :textInput="{ placeholder: { text: 'Welcome to the demo!' } }"
    :history="history"
    style="border-radius: 8px;  background-color: #f7f7f7; opacity: 0.85;"
  />
</template>

<script setup>
import 'deep-chat'
</script>