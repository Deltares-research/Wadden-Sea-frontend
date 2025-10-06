<template>
   <div class="scene" :style="{ backgroundImage: `url('${bgUrl}')` }"></div>
   <div class="chat-container">
    <ChatComponent />
   </div>
   
</template>

<script setup>
import ChatComponent from '@/components/ChatComponent.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const item = ref(null);
const bgUrl = ref("");

onMounted(async () => {
  const res = await fetch(import.meta.env.BASE_URL + "assets/items.json");
  const items = await res.json();
  item.value = items.find((i) => i.id === route.params.id);
  if (item.value) {
    bgUrl.value = import.meta.env.BASE_URL + item.value.img;
  }
});
</script>

<style scoped>
.scene {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.chat-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
