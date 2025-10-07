<template>
  <div class="scene" :style="{ backgroundImage: `url('${bgUrl}')` }" />
  <div class="chat-container">
    <ChatComponent />
  </div>
</template>

<script setup>
  import ChatComponent from '@/components/ChatComponent.vue';
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useAppStore } from '@/stores/app'
  
  defineProps({
    id: {
      type: String,
      required: true,
    }
  })

  const route = useRoute();
  const item = ref(null);
  const bgUrl = ref("");

  onMounted(async () => {
    const appStore = useAppStore()
    await appStore.loadItems()
    item.value = appStore.items.find((i) => i.id === route.params.id);
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
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}
</style>
