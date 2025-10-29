<template>
  <div class="scene" :style="{ backgroundImage: `url('${bgUrl}')` }" />

  <div class="title-band">
    <div class="page-title">Voice for Nature – Wadden Sea</div>
    <div class="page-subtitle">Interact with the environment</div>
  </div>

  <div class="ecosystem-overlay">
    <div
      v-for="item in items"
      :key="item.id"
      class="ecosystem-item"
      :class="{ 'is-disabled': item.placeholder }"
      :style="getItemPosition(item)"
      @click="handleItemClick(item)"
    >
      <div class="ring-wrap" :class="{ 'is-disabled': item.placeholder }">
        <v-card
          elevation="8"
          class="gallery-card"
          :class="{ 'is-disabled': item.placeholder }"
          :aria-disabled="item.placeholder ? 'true' : 'false'"
        >
          <v-img :src="item.img" height="180" cover>
            <template #sources />
            <div class="card-title">
              {{ item.title }}
            </div>
          </v-img>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAppStore } from "@/stores/app";

const router = useRouter();

const base = import.meta.env.BASE_URL;
const bgUrl = base + "bg/waddensea.jpg";

const items = ref([]);

onMounted(async () => {
  const appStore = useAppStore();
  await appStore.loadItems();
  const data = appStore.items;
  // Prepend BASE_URL to image paths and ensure position data
  items.value = data.map((item) => ({
    ...item,
    img: base + item.img,
    // Default positions if not specified (for backwards compatibility)
    position: item.position || { x: 50, y: 50 },
  }));
});

/**
 * Calculate responsive position for an item based on its position data
 * Position values are percentages (0-100) relative to container
 */
function getItemPosition(item) {
  const position = item.position || { x: 50, y: 50 };
  return {
    left: `${position.x}%`,
    top: `${position.y}%`,
    transform: "translate(-50%, -50%)", // Center the item on its position point
  };
}

function handleItemClick(item) {
  if (!item?.id || item.placeholder) return;
  router.push(item.id);
}
</script>

<style scoped>
@font-face {
  font-family: "Chapaza";
  src: url("/font/chapaza/Chapaza Italic.ttf") format("truetype");
  font-style: italic;
  font-weight: normal;
}

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

.title-band {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  margin-top: 40px;
  padding: 8px 0 10px 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.4) 20%,
    rgba(0, 0, 0, 0.8) 50%,
    rgba(0, 0, 0, 0.4) 80%,
    rgba(0, 0, 0, 0) 100%
  );
  backdrop-filter: blur(1.5px);
  -webkit-backdrop-filter: blur(1.5px);
}

.page-title {
  position: relative;
  text-align: center;
  color: #c8a389;
  font-family: "Chapaza", serif;
  font-style: italic;
  font-size: 56px;
  font-weight: normal;
  padding: 20px 0 0 0;
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5);
}

.page-subtitle {
  position: relative;
  text-align: center;
  color: #c8a389;
  font-family: "Chapaza", serif;
  font-style: italic;
  font-size: 32px;
  font-weight: normal;
  padding: 8px 0 20px 0;
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5);
}

.ecosystem-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  pointer-events: none;
}

.ecosystem-item {
  position: absolute;
  width: 280px;
  pointer-events: auto;
  cursor: pointer;
  transition: transform 0.18s ease;
}

@media (max-width: 960px) {
  .ecosystem-item {
    width: 240px;
  }
}

@media (max-width: 600px) {
  .ecosystem-item {
    width: 200px;
  }
}

.ecosystem-item.is-disabled {
  pointer-events: none;
  cursor: default;
}

.ring-wrap {
  width: 100%;
  display: inline-block;
  border-radius: 14px;
  box-shadow: 0 0 10px 16px rgba(0, 0, 0, 0.6), 0 12px 28px rgba(0, 0, 0, 0.35);
  transition: box-shadow 0.18s ease, transform 0.18s ease;
}

.ring-wrap:hover {
  box-shadow: 0 0 10px 20px rgba(255, 255, 255, 0.6),
    0 18px 36px rgba(0, 0, 0, 0.45);
  transform: translateY(-2px);
}

.gallery-card {
  border-radius: 12px;
  overflow: hidden;
  width: 100% !important;
  display: block !important;
  min-height: 180px;
}

.gallery-card :deep(.v-img) {
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
  height: 180px;
  display: block;
}

.gallery-card :deep(.v-img__img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-title {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px 12px;
  font-weight: 600;
  color: white;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0));
}

.ring-wrap.is-disabled {
  pointer-events: none;
}
.gallery-card.is-disabled {
  cursor: default;
}
.ring-wrap.is-disabled:hover {
  box-shadow: 0 0 10px 16px rgba(0, 0, 0, 0.6), 0 12px 28px rgba(0, 0, 0, 0.35);
  transform: none;
}
</style>
