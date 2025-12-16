<template>
  <div class="scene" :style="{ backgroundImage: `url('${bgUrl}')` }" />
  <div class="chat-container">
    <ChatComponent />
  </div>
  <div v-if="item?.attribution" class="attribution-container">
    <div class="attribution-text">{{ item.attribution }}</div>
  </div>
  <div class="back-button-container">
    <v-tooltip location="top" text="Back to the Wadden Sea">
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          class="back-button"
          icon
          :to="{ name: 'home' }"
          aria-label="Back to gallery"
        >
          <v-icon icon="mdi-arrow-u-left-top" class="back-icon" />
        </v-btn>
      </template>
    </v-tooltip>
  </div>
</template>

<script setup>
  import ChatComponent from "@/components/ChatComponent.vue";
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { useAppStore } from "@/stores/app";

  defineProps({
    id: {
      type: String,
      required: true,
    },
  });

  const route = useRoute();
  const item = ref(null);
  const bgUrl = ref("");

  onMounted(async () => {
    const appStore = useAppStore();
    await appStore.loadItems();
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
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}

.back-button-container {
  position: fixed;
  bottom: 50px;
  left: 50px;
  z-index: 10;
  pointer-events: auto;
}

.back-button {
  background-color: #141e95 !important;
  color: white !important;
  width: 70px !important;
  height: 70px !important;
  border-radius: 50% !important;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6), 0 4px 8px rgba(0, 0, 0, 0.5),
    0 2px 4px rgba(0, 0, 0, 0.3) !important;
}

.back-icon {
  font-size: 32px !important;
}

.back-button:hover {
  background-color: #646bc5 !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.7), 0 6px 12px rgba(0, 0, 0, 0.6),
    0 4px 8px rgba(0, 0, 0, 0.4) !important;
  transform: translateY(-2px);
}

.attribution-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 5;
  pointer-events: none;
}

.attribution-text {
  color: rgba(255, 255, 255, 0.85);
  font-size: 10px;
  font-weight: 300;
  padding: 6px 10px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.3px;
  opacity: 0.85;
}
</style>
